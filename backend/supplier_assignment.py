"""
DexAura Manufacturing Marketplace - Supplier Assignment Algorithm
Intelligent supplier matching and assignment system
"""

from typing import Dict, List, Optional, Any, Tuple
from datetime import datetime, timezone
import math
import logging

logger = logging.getLogger(__name__)

class SupplierScorer:
    """Scores suppliers based on various criteria"""

    def __init__(self):
        self.weights = {
            'capability_match': 0.25,
            'material_expertise': 0.20,
            'quality_score': 0.15,
            'delivery_performance': 0.15,
            'capacity_availability': 0.10,
            'cost_competitiveness': 0.10,
            'location_proximity': 0.05
        }

    def calculate_score(self, part_requirements: Dict[str, Any], supplier: Dict[str, Any]) -> float:
        """Calculate overall supplier score for a part"""
        score = 0.0

        # Capability Match (25%)
        score += self._score_capability_match(part_requirements, supplier) * self.weights['capability_match']

        # Material Expertise (20%)
        score += self._score_material_expertise(part_requirements, supplier) * self.weights['material_expertise']

        # Quality Score (15%)
        score += self._score_quality(supplier) * self.weights['quality_score']

        # Delivery Performance (15%)
        score += self._score_delivery_performance(supplier) * self.weights['delivery_performance']

        # Capacity Availability (10%)
        score += self._score_capacity_availability(supplier) * self.weights['capacity_availability']

        # Cost Competitiveness (10%)
        score += self._score_cost_competitiveness(supplier) * self.weights['cost_competitiveness']

        # Location Proximity (5%)
        score += self._score_location_proximity(part_requirements, supplier) * self.weights['location_proximity']

        return min(score, 1.0)  # Cap at 100%

    def _score_capability_match(self, requirements: Dict[str, Any], supplier: Dict[str, Any]) -> float:
        """Score based on manufacturing capability match"""
        required_process = requirements.get('manufacturing_process', '').lower()
        supplier_capabilities = [cap.lower() for cap in supplier.get('capabilities', [])]

        # Exact match
        if required_process in supplier_capabilities:
            return 1.0

        # Partial match (contains keywords)
        process_keywords = set(required_process.split())
        capability_keywords = set()
        for cap in supplier_capabilities:
            capability_keywords.update(cap.split())

        if process_keywords & capability_keywords:
            return 0.7

        # Related capabilities (e.g., CNC Milling vs CNC Turning)
        related_processes = self._get_related_processes(required_process)
        if any(related in supplier_capabilities for related in related_processes):
            return 0.5

        return 0.0

    def _score_material_expertise(self, requirements: Dict[str, Any], supplier: Dict[str, Any]) -> float:
        """Score based on material expertise"""
        required_material = requirements.get('material', '').lower()
        supplier_materials = [mat.lower() for mat in supplier.get('materials', [])]

        if required_material in supplier_materials:
            return 1.0

        # Material family match (e.g., Aluminum 6061 vs Aluminum)
        material_family = required_material.split()[0] if required_material.split() else ""
        if any(material_family in mat for mat in supplier_materials):
            return 0.8

        # Similar materials
        similar_materials = self._get_similar_materials(required_material)
        if any(similar in supplier_materials for similar in similar_materials):
            return 0.6

        return 0.0

    def _score_quality(self, supplier: Dict[str, Any]) -> float:
        """Score based on quality metrics"""
        quality_score = supplier.get('quality_score', 50) / 100.0
        rating = supplier.get('rating', 3.0) / 5.0

        # Weighted average of quality score and rating
        return (quality_score * 0.7) + (rating * 0.3)

    def _score_delivery_performance(self, supplier: Dict[str, Any]) -> float:
        """Score based on delivery performance"""
        on_time_rate = supplier.get('on_time_delivery_rate', 80) / 100.0
        return on_time_rate

    def _score_capacity_availability(self, supplier: Dict[str, Any]) -> float:
        """Score based on current capacity availability"""
        # This would typically check current workload vs capacity
        # For now, assume active suppliers have capacity
        status = supplier.get('status', 'inactive')
        if status == 'active':
            return 1.0
        return 0.0

    def _score_cost_competitiveness(self, supplier: Dict[str, Any]) -> float:
        """Score based on cost competitiveness"""
        # This could be based on historical pricing data
        # For now, use rating as proxy
        rating = supplier.get('rating', 3.0) / 5.0
        return rating

    def _score_location_proximity(self, requirements: Dict[str, Any], supplier: Dict[str, Any]) -> float:
        """Score based on location proximity (if shipping address provided)"""
        # This would calculate distance between supplier and delivery location
        # For now, assume all suppliers are equally accessible
        return 1.0

    def _get_related_processes(self, process: str) -> List[str]:
        """Get related manufacturing processes"""
        process_map = {
            'cnc milling': ['cnc turning', 'cnc machining'],
            'cnc turning': ['cnc milling', 'cnc machining'],
            'sheet metal': ['laser cutting', 'forming', 'punching'],
            '3d printing': ['additive manufacturing'],
        }
        return process_map.get(process, [])

    def _get_similar_materials(self, material: str) -> List[str]:
        """Get similar materials"""
        material_map = {
            'aluminum': ['aluminum 6061', 'aluminum 7075', 'aluminum 2024'],
            'steel': ['stainless steel', 'carbon steel', 'alloy steel'],
            'plastic': ['abs', 'nylon', 'polycarbonate', 'acetal'],
        }
        base_material = material.split()[0].lower()
        return material_map.get(base_material, [])

class SupplierAssignmentEngine:
    """Main engine for supplier assignment"""

    def __init__(self):
        self.scorer = SupplierScorer()
        self.min_score_threshold = 0.6  # Minimum score to consider a supplier

    async def assign_suppliers_to_project(self, project_data: Dict[str, Any], available_suppliers: List[Dict[str, Any]]) -> Dict[str, Any]:
        """Assign suppliers to all parts in a project"""
        assignments = {}
        part_assignments = []

        for part in project_data.get('parts', []):
            assignment = await self.assign_supplier_to_part(part, available_suppliers)
            if assignment:
                part_assignments.append({
                    'part_id': part['id'],
                    'supplier_id': assignment['supplier_id'],
                    'score': assignment['score'],
                    'reasoning': assignment['reasoning']
                })
                assignments[part['id']] = assignment

        return {
            'project_id': project_data['id'],
            'assignments': part_assignments,
            'unassigned_parts': [
                part['id'] for part in project_data.get('parts', [])
                if part['id'] not in assignments
            ]
        }

    async def assign_supplier_to_part(self, part_data: Dict[str, Any], available_suppliers: List[Dict[str, Any]]) -> Optional[Dict[str, Any]]:
        """Assign the best supplier to a single part"""
        if not available_suppliers:
            return None

        scored_suppliers = []

        for supplier in available_suppliers:
            score = self.scorer.calculate_score(part_data, supplier)
            if score >= self.min_score_threshold:
                scored_suppliers.append({
                    'supplier_id': supplier['id'],
                    'supplier_name': supplier.get('company_name', ''),
                    'score': score,
                    'capabilities': supplier.get('capabilities', []),
                    'materials': supplier.get('materials', []),
                    'quality_score': supplier.get('quality_score', 0),
                    'delivery_rate': supplier.get('on_time_delivery_rate', 0)
                })

        if not scored_suppliers:
            return None

        # Sort by score (highest first)
        scored_suppliers.sort(key=lambda x: x['score'], reverse=True)

        best_supplier = scored_suppliers[0]

        return {
            'supplier_id': best_supplier['supplier_id'],
            'supplier_name': best_supplier['supplier_name'],
            'score': best_supplier['score'],
            'reasoning': self._generate_assignment_reasoning(best_supplier, part_data)
        }

    def _generate_assignment_reasoning(self, supplier_data: Dict[str, Any], part_data: Dict[str, Any]) -> str:
        """Generate human-readable reasoning for supplier assignment"""
        reasons = []

        score = supplier_data['score']
        if score >= 0.9:
            reasons.append("Excellent match")
        elif score >= 0.8:
            reasons.append("Very good match")
        elif score >= 0.7:
            reasons.append("Good match")
        else:
            reasons.append("Acceptable match")

        # Add specific reasons
        capabilities = supplier_data.get('capabilities', [])
        part_process = part_data.get('manufacturing_process', '')
        if part_process and any(part_process.lower() in cap.lower() for cap in capabilities):
            reasons.append(f"Has {part_process} capability")

        materials = supplier_data.get('materials', [])
        part_material = part_data.get('material', '')
        if part_material and any(part_material.lower() in mat.lower() for mat in materials):
            reasons.append(f"Experienced with {part_material}")

        quality_score = supplier_data.get('quality_score', 0)
        if quality_score >= 90:
            reasons.append("High quality performance")
        elif quality_score >= 80:
            reasons.append("Good quality performance")

        delivery_rate = supplier_data.get('delivery_rate', 0)
        if delivery_rate >= 95:
            reasons.append("Excellent delivery performance")
        elif delivery_rate >= 90:
            reasons.append("Good delivery performance")

        return "; ".join(reasons)

    async def reassign_supplier(self, part_id: str, current_supplier_id: str, reason: str,
                               available_suppliers: List[Dict[str, Any]]) -> Optional[Dict[str, Any]]:
        """Reassign a part to a different supplier"""
        # Get part data (would be fetched from database)
        part_data = {}  # Placeholder

        # Remove current supplier from available list
        filtered_suppliers = [
            s for s in available_suppliers
            if s['id'] != current_supplier_id
        ]

        assignment = await self.assign_supplier_to_part(part_data, filtered_suppliers)

        if assignment:
            assignment['reasignment_reason'] = reason
            assignment['previous_supplier_id'] = current_supplier_id

        return assignment

    async def get_supplier_recommendations(self, part_data: Dict[str, Any],
                                         available_suppliers: List[Dict[str, Any]],
                                         limit: int = 5) -> List[Dict[str, Any]]:
        """Get top supplier recommendations for a part"""
        scored_suppliers = []

        for supplier in available_suppliers:
            score = self.scorer.calculate_score(part_data, supplier)
            scored_suppliers.append({
                'supplier_id': supplier['id'],
                'supplier_name': supplier.get('company_name', ''),
                'score': score,
                'reasoning': self._generate_assignment_reasoning({
                    'supplier_id': supplier['id'],
                    'supplier_name': supplier.get('company_name', ''),
                    'score': score,
                    'capabilities': supplier.get('capabilities', []),
                    'materials': supplier.get('materials', []),
                    'quality_score': supplier.get('quality_score', 0),
                    'delivery_rate': supplier.get('on_time_delivery_rate', 0)
                }, part_data)
            })

        # Sort by score and return top recommendations
        scored_suppliers.sort(key=lambda x: x['score'], reverse=True)
        return scored_suppliers[:limit]

class LoadBalancer:
    """Balances workload across suppliers"""

    def __init__(self):
        self.max_workload_per_supplier = 10  # Maximum concurrent projects per supplier

    async def check_supplier_capacity(self, supplier_id: str, current_workload: int) -> bool:
        """Check if supplier has capacity for new work"""
        return current_workload < self.max_workload_per_supplier

    async def get_supplier_workload(self, supplier_id: str) -> int:
        """Get current workload for a supplier"""
        # This would query the database for active assignments
        return 0  # Placeholder

    async def balance_assignments(self, assignments: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """Balance assignments to avoid overloading suppliers"""
        supplier_workload = {}

        balanced_assignments = []

        for assignment in assignments:
            supplier_id = assignment['supplier_id']

            # Check current workload
            current_load = supplier_workload.get(supplier_id, 0)

            if current_load >= self.max_workload_per_supplier:
                # Find alternative supplier
                assignment['reassigned'] = True
                assignment['reasignment_reason'] = "Supplier at capacity"
                # Alternative assignment logic would go here
            else:
                supplier_workload[supplier_id] = current_load + 1
                assignment['reassigned'] = False

            balanced_assignments.append(assignment)

        return balanced_assignments

# Global instances
supplier_assignment_engine = SupplierAssignmentEngine()
load_balancer = LoadBalancer()