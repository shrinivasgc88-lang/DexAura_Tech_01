"""
DexAura Manufacturing Marketplace - Workflow Automation Logic
Handles business process automation for the manufacturing platform
"""

from enum import Enum
from typing import Dict, List, Optional, Any, Callable
from datetime import datetime, timezone
import asyncio
import logging

logger = logging.getLogger(__name__)

class WorkflowStatus(str, Enum):
    PENDING = "pending"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    FAILED = "failed"
    CANCELLED = "cancelled"

class WorkflowStep:
    def __init__(self, name: str, action: Callable, dependencies: List[str] = None, retries: int = 3):
        self.name = name
        self.action = action
        self.dependencies = dependencies or []
        self.retries = retries
        self.status = WorkflowStatus.PENDING
        self.attempts = 0
        self.error = None
        self.completed_at = None

class Workflow:
    def __init__(self, workflow_id: str, name: str):
        self.workflow_id = workflow_id
        self.name = name
        self.steps: Dict[str, WorkflowStep] = {}
        self.status = WorkflowStatus.PENDING
        self.created_at = datetime.now(timezone.utc)
        self.completed_at = None
        self.context: Dict[str, Any] = {}

    def add_step(self, step: WorkflowStep):
        self.steps[step.name] = step

    def get_ready_steps(self) -> List[WorkflowStep]:
        """Get steps that are ready to execute (all dependencies completed)"""
        ready_steps = []
        for step in self.steps.values():
            if step.status == WorkflowStatus.PENDING:
                dependencies_met = all(
                    self.steps[dep].status == WorkflowStatus.COMPLETED
                    for dep in step.dependencies
                )
                if dependencies_met:
                    ready_steps.append(step)
        return ready_steps

    async def execute_step(self, step: WorkflowStep) -> bool:
        """Execute a single workflow step"""
        try:
            step.attempts += 1
            step.status = WorkflowStatus.IN_PROGRESS

            # Execute the step action
            result = await step.action(self.context)

            step.status = WorkflowStatus.COMPLETED
            step.completed_at = datetime.now(timezone.utc)
            logger.info(f"Workflow {self.workflow_id}: Step {step.name} completed successfully")
            return True

        except Exception as e:
            logger.error(f"Workflow {self.workflow_id}: Step {step.name} failed: {str(e)}")
            step.error = str(e)

            if step.attempts < step.retries:
                step.status = WorkflowStatus.PENDING
                return False
            else:
                step.status = WorkflowStatus.FAILED
                return False

class WorkflowEngine:
    def __init__(self):
        self.workflows: Dict[str, Workflow] = {}
        self.active_workflows: set = set()

    async def create_workflow(self, workflow_type: str, context: Dict[str, Any]) -> str:
        """Create a new workflow instance"""
        workflow_id = f"{workflow_type}_{datetime.now(timezone.utc).timestamp()}"
        workflow = Workflow(workflow_id, workflow_type)
        workflow.context = context

        # Initialize workflow steps based on type
        if workflow_type == "project_creation":
            self._init_project_creation_workflow(workflow)
        elif workflow_type == "part_processing":
            self._init_part_processing_workflow(workflow)
        elif workflow_type == "quotation":
            self._init_quotation_workflow(workflow)
        elif workflow_type == "order_fulfillment":
            self._init_order_fulfillment_workflow(workflow)
        elif workflow_type == "quality_inspection":
            self._init_quality_inspection_workflow(workflow)

        self.workflows[workflow_id] = workflow
        return workflow_id

    async def execute_workflow(self, workflow_id: str) -> bool:
        """Execute a workflow until completion or failure"""
        if workflow_id not in self.workflows:
            raise ValueError(f"Workflow {workflow_id} not found")

        workflow = self.workflows[workflow_id]
        self.active_workflows.add(workflow_id)

        try:
            workflow.status = WorkflowStatus.IN_PROGRESS

            while True:
                ready_steps = workflow.get_ready_steps()

                if not ready_steps:
                    # Check if workflow is complete
                    if all(step.status == WorkflowStatus.COMPLETED for step in workflow.steps.values()):
                        workflow.status = WorkflowStatus.COMPLETED
                        workflow.completed_at = datetime.now(timezone.utc)
                        break
                    elif any(step.status == WorkflowStatus.FAILED for step in workflow.steps.values()):
                        workflow.status = WorkflowStatus.FAILED
                        break
                    else:
                        # Wait for async operations or external triggers
                        await asyncio.sleep(1)
                        continue

                # Execute ready steps concurrently
                tasks = [workflow.execute_step(step) for step in ready_steps]
                results = await asyncio.gather(*tasks, return_exceptions=True)

                # Check for failures
                if any(isinstance(r, Exception) or r is False for r in results):
                    # Some steps failed, continue to next iteration to retry
                    pass

        finally:
            self.active_workflows.remove(workflow_id)

        return workflow.status == WorkflowStatus.COMPLETED

    def _init_project_creation_workflow(self, workflow: Workflow):
        """Initialize project creation workflow"""
        async def validate_project_data(context):
            # Validate project information
            project_data = context.get('project_data', {})
            if not project_data.get('project_name'):
                raise ValueError("Project name is required")
            return True

        async def assign_project_number(context):
            # Generate unique project number
            context['project_number'] = f"PRJ-{datetime.now().strftime('%Y%m%d')}-{workflow.workflow_id.split('_')[-1][:4]}"
            return True

        async def create_project_record(context):
            # Create project in database
            context['project_created'] = True
            return True

        async def notify_customer(context):
            # Send notification to customer
            context['customer_notified'] = True
            return True

        workflow.add_step(WorkflowStep("validate_data", validate_project_data))
        workflow.add_step(WorkflowStep("assign_number", assign_project_number, ["validate_data"]))
        workflow.add_step(WorkflowStep("create_record", create_project_record, ["assign_number"]))
        workflow.add_step(WorkflowStep("notify_customer", notify_customer, ["create_record"]))

    def _init_part_processing_workflow(self, workflow: Workflow):
        """Initialize part processing workflow"""
        async def validate_part_data(context):
            part_data = context.get('part_data', {})
            if not part_data.get('part_name'):
                raise ValueError("Part name is required")
            return True

        async def upload_cad_file(context):
            # Handle CAD file upload and validation
            context['cad_uploaded'] = True
            return True

        async def perform_dfm_analysis(context):
            # Trigger DFM analysis
            context['dfm_completed'] = True
            return True

        async def assign_supplier(context):
            # Find and assign suitable supplier
            context['supplier_assigned'] = True
            return True

        async def create_quotation(context):
            # Generate quotation for part
            context['quotation_created'] = True
            return True

        workflow.add_step(WorkflowStep("validate_part", validate_part_data))
        workflow.add_step(WorkflowStep("upload_cad", upload_cad_file, ["validate_part"]))
        workflow.add_step(WorkflowStep("dfm_analysis", perform_dfm_analysis, ["upload_cad"]))
        workflow.add_step(WorkflowStep("supplier_assignment", assign_supplier, ["dfm_analysis"]))
        workflow.add_step(WorkflowStep("create_quote", create_quotation, ["supplier_assignment"]))

    def _init_quotation_workflow(self, workflow: Workflow):
        """Initialize quotation workflow"""
        async def gather_part_quotes(context):
            # Collect quotes from all parts in project
            context['part_quotes_collected'] = True
            return True

        async def calculate_total(context):
            # Calculate project total
            context['total_calculated'] = True
            return True

        async def apply_discounts(context):
            # Apply any applicable discounts
            context['discounts_applied'] = True
            return True

        async def generate_quote_document(context):
            # Generate formal quote document
            context['quote_document_generated'] = True
            return True

        async def send_to_customer(context):
            # Send quote to customer
            context['quote_sent'] = True
            return True

        workflow.add_step(WorkflowStep("gather_quotes", gather_part_quotes))
        workflow.add_step(WorkflowStep("calculate_total", calculate_total, ["gather_quotes"]))
        workflow.add_step(WorkflowStep("apply_discounts", apply_discounts, ["calculate_total"]))
        workflow.add_step(WorkflowStep("generate_document", generate_quote_document, ["apply_discounts"]))
        workflow.add_step(WorkflowStep("send_quote", send_to_customer, ["generate_document"]))

    def _init_order_fulfillment_workflow(self, workflow: Workflow):
        """Initialize order fulfillment workflow"""
        async def validate_order(context):
            # Validate order data and payment
            context['order_validated'] = True
            return True

        async def assign_parts_to_suppliers(context):
            # Assign each part to its supplier
            context['parts_assigned'] = True
            return True

        async def send_po_to_suppliers(context):
            # Send purchase orders to suppliers
            context['po_sent'] = True
            return True

        async def monitor_production(context):
            # Monitor production progress
            context['production_monitored'] = True
            return True

        async def quality_inspection(context):
            # Perform quality inspection
            context['quality_checked'] = True
            return True

        async def arrange_shipping(context):
            # Arrange shipping and logistics
            context['shipping_arranged'] = True
            return True

        async def deliver_to_customer(context):
            # Complete delivery
            context['delivered'] = True
            return True

        workflow.add_step(WorkflowStep("validate_order", validate_order))
        workflow.add_step(WorkflowStep("assign_suppliers", assign_parts_to_suppliers, ["validate_order"]))
        workflow.add_step(WorkflowStep("send_po", send_po_to_suppliers, ["assign_suppliers"]))
        workflow.add_step(WorkflowStep("monitor_production", monitor_production, ["send_po"]))
        workflow.add_step(WorkflowStep("quality_check", quality_inspection, ["monitor_production"]))
        workflow.add_step(WorkflowStep("arrange_shipping", arrange_shipping, ["quality_check"]))
        workflow.add_step(WorkflowStep("deliver", deliver_to_customer, ["arrange_shipping"]))

    def _init_quality_inspection_workflow(self, workflow: Workflow):
        """Initialize quality inspection workflow"""
        async def schedule_inspection(context):
            # Schedule quality inspection
            context['inspection_scheduled'] = True
            return True

        async def perform_inspection(context):
            # Perform the actual inspection
            context['inspection_performed'] = True
            return True

        async def document_findings(context):
            # Document inspection findings
            context['findings_documented'] = True
            return True

        async def make_decision(context):
            # Pass/fail/rework decision
            context['decision_made'] = True
            return True

        async def notify_stakeholders(context):
            # Notify relevant stakeholders
            context['stakeholders_notified'] = True
            return True

        workflow.add_step(WorkflowStep("schedule", schedule_inspection))
        workflow.add_step(WorkflowStep("perform", perform_inspection, ["schedule"]))
        workflow.add_step(WorkflowStep("document", document_findings, ["perform"]))
        workflow.add_step(WorkflowStep("decide", make_decision, ["document"]))
        workflow.add_step(WorkflowStep("notify", notify_stakeholders, ["decide"]))

# ===== SUPPLIER ASSIGNMENT ALGORITHM =====
class SupplierAssignmentAlgorithm:
    def __init__(self):
        self.criteria_weights = {
            'capability_match': 0.3,
            'material_expertise': 0.2,
            'quality_score': 0.2,
            'on_time_delivery': 0.15,
            'price_competitiveness': 0.1,
            'capacity_availability': 0.05
        }

    async def find_best_supplier(self, part_requirements: Dict[str, Any], available_suppliers: List[Dict[str, Any]]) -> Optional[str]:
        """Find the best supplier for a part based on requirements"""
        if not available_suppliers:
            return None

        scored_suppliers = []

        for supplier in available_suppliers:
            score = self._calculate_supplier_score(part_requirements, supplier)
            scored_suppliers.append((supplier['id'], score))

        # Sort by score (highest first)
        scored_suppliers.sort(key=lambda x: x[1], reverse=True)

        # Return the best supplier if score is above threshold
        if scored_suppliers and scored_suppliers[0][1] > 0.6:
            return scored_suppliers[0][0]

        return None

    def _calculate_supplier_score(self, requirements: Dict[str, Any], supplier: Dict[str, Any]) -> float:
        """Calculate supplier score based on part requirements"""
        score = 0.0

        # Capability match
        required_process = requirements.get('manufacturing_process', '')
        supplier_capabilities = supplier.get('capabilities', [])
        if required_process in supplier_capabilities:
            score += self.criteria_weights['capability_match']
        elif any(cap.lower() in required_process.lower() or required_process.lower() in cap.lower()
                for cap in supplier_capabilities):
            score += self.criteria_weights['capability_match'] * 0.7

        # Material expertise
        required_material = requirements.get('material', '')
        supplier_materials = supplier.get('materials', [])
        if required_material and required_material in supplier_materials:
            score += self.criteria_weights['material_expertise']

        # Quality score
        quality_score = supplier.get('quality_score', 50) / 100.0
        score += quality_score * self.criteria_weights['quality_score']

        # On-time delivery rate
        delivery_rate = supplier.get('on_time_delivery_rate', 80) / 100.0
        score += delivery_rate * self.criteria_weights['on_time_delivery']

        # Price competitiveness (simplified)
        supplier_rating = supplier.get('rating', 3.0) / 5.0
        score += supplier_rating * self.criteria_weights['price_competitiveness']

        # Capacity availability (simplified - assume available if active)
        if supplier.get('status') == 'active':
            score += self.criteria_weights['capacity_availability']

        return min(score, 1.0)  # Cap at 1.0

# ===== WORKFLOW TRIGGERS =====
class WorkflowTriggers:
    @staticmethod
    async def on_project_created(project_data: Dict[str, Any]):
        """Trigger when a new project is created"""
        workflow_engine = WorkflowEngine()
        await workflow_engine.create_workflow("project_creation", {"project_data": project_data})

    @staticmethod
    async def on_part_added(part_data: Dict[str, Any]):
        """Trigger when a new part is added to a project"""
        workflow_engine = WorkflowEngine()
        await workflow_engine.create_workflow("part_processing", {"part_data": part_data})

    @staticmethod
    async def on_quote_requested(project_id: str):
        """Trigger when customer requests a quote"""
        workflow_engine = WorkflowEngine()
        await workflow_engine.create_workflow("quotation", {"project_id": project_id})

    @staticmethod
    async def on_order_confirmed(order_data: Dict[str, Any]):
        """Trigger when an order is confirmed"""
        workflow_engine = WorkflowEngine()
        await workflow_engine.create_workflow("order_fulfillment", {"order_data": order_data})

    @staticmethod
    async def on_part_ready_for_inspection(part_id: str):
        """Trigger when a part is ready for quality inspection"""
        workflow_engine = WorkflowEngine()
        await workflow_engine.create_workflow("quality_inspection", {"part_id": part_id})

# Global workflow engine instance
workflow_engine = WorkflowEngine()
supplier_matcher = SupplierAssignmentAlgorithm()