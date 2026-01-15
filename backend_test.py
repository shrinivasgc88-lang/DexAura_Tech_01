#!/usr/bin/env python3
"""
Backend API Testing for Nivaas Manufacturing Admin Panel
Tests all 6 admin modules with authentication
"""

import requests
import json
import sys
from datetime import datetime

# Configuration
BASE_URL = "https://manuportal-2.preview.emergentagent.com/api"
ADMIN_EMAIL = "admin@nivaas.com"
ADMIN_PASSWORD = "admin123"

class AdminAPITester:
    def __init__(self):
        self.base_url = BASE_URL
        self.auth_token = None
        self.headers = {"Content-Type": "application/json"}
        self.test_results = []
        
    def log_test(self, module, endpoint, status, message, response_data=None):
        """Log test results"""
        result = {
            "timestamp": datetime.now().isoformat(),
            "module": module,
            "endpoint": endpoint,
            "status": status,
            "message": message,
            "response_data": response_data
        }
        self.test_results.append(result)
        status_symbol = "✅" if status == "PASS" else "❌"
        print(f"{status_symbol} {module} - {endpoint}: {message}")
        
    def authenticate_admin(self):
        """Login as admin and get auth token"""
        print("\n🔐 Authenticating as admin...")
        
        login_data = {
            "email": ADMIN_EMAIL,
            "password": ADMIN_PASSWORD
        }
        
        try:
            response = requests.post(
                f"{self.base_url}/auth/login",
                json=login_data,
                headers=self.headers,
                timeout=30
            )
            
            if response.status_code == 200:
                data = response.json()
                self.auth_token = data.get("access_token")
                self.headers["Authorization"] = f"Bearer {self.auth_token}"
                
                # Verify admin role
                customer = data.get("customer", {})
                if customer.get("role") == "Admin":
                    self.log_test("Authentication", "POST /auth/login", "PASS", 
                                f"Admin login successful, role: {customer.get('role')}")
                    return True
                else:
                    self.log_test("Authentication", "POST /auth/login", "FAIL", 
                                f"User role is {customer.get('role')}, not Admin")
                    return False
            else:
                self.log_test("Authentication", "POST /auth/login", "FAIL", 
                            f"Login failed: {response.status_code} - {response.text}")
                return False
                
        except Exception as e:
            self.log_test("Authentication", "POST /auth/login", "FAIL", f"Exception: {str(e)}")
            return False
    
    def test_contact_submissions(self):
        """Test Module 1: Contact Submissions"""
        print("\n📧 Testing Contact Submissions Module...")
        
        try:
            response = requests.get(
                f"{self.base_url}/admin/contact-submissions",
                headers=self.headers,
                timeout=30
            )
            
            if response.status_code == 200:
                data = response.json()
                total = data.get("total", 0)
                submissions = data.get("submissions", [])
                
                if isinstance(data, dict) and "total" in data and "submissions" in data:
                    self.log_test("Contact Submissions", "GET /admin/contact-submissions", "PASS",
                                f"Retrieved {total} contact submissions, structure correct")
                    
                    # Verify expected count (should be 3 according to test plan)
                    if total == 3:
                        self.log_test("Contact Submissions", "Data Count", "PASS", 
                                    "Contact submissions count matches expected (3)")
                    else:
                        self.log_test("Contact Submissions", "Data Count", "FAIL", 
                                    f"Expected 3 contact submissions, got {total}")
                else:
                    self.log_test("Contact Submissions", "GET /admin/contact-submissions", "FAIL",
                                "Response structure incorrect - missing total or submissions")
            else:
                self.log_test("Contact Submissions", "GET /admin/contact-submissions", "FAIL",
                            f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_test("Contact Submissions", "GET /admin/contact-submissions", "FAIL", 
                        f"Exception: {str(e)}")
    
    def test_leads_crm(self):
        """Test Module 2: Leads & CRM"""
        print("\n👥 Testing Leads & CRM Module...")
        
        # Test GET /admin/leads
        try:
            response = requests.get(
                f"{self.base_url}/admin/leads",
                headers=self.headers,
                timeout=30
            )
            
            if response.status_code == 200:
                data = response.json()
                total = data.get("total", 0)
                leads = data.get("leads", [])
                
                self.log_test("Leads & CRM", "GET /admin/leads", "PASS",
                            f"Retrieved {total} leads")
                
                # Verify expected count (should be 5 according to test plan)
                if total == 5:
                    self.log_test("Leads & CRM", "Leads Count", "PASS", 
                                "Leads count matches expected (5)")
                else:
                    self.log_test("Leads & CRM", "Leads Count", "FAIL", 
                                f"Expected 5 leads, got {total}")
                
                # Test followups with first lead if available
                if leads:
                    first_lead_id = leads[0].get("id")
                    if first_lead_id:
                        self.test_lead_followups(first_lead_id)
                    
                    # Test lead status update
                    self.test_lead_status_update(first_lead_id)
                        
            else:
                self.log_test("Leads & CRM", "GET /admin/leads", "FAIL",
                            f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_test("Leads & CRM", "GET /admin/leads", "FAIL", f"Exception: {str(e)}")
        
        # Test GET /admin/meetings
        self.test_meetings()
    
    def test_lead_followups(self, lead_id):
        """Test lead followups endpoint"""
        try:
            response = requests.get(
                f"{self.base_url}/admin/leads/{lead_id}/followups",
                headers=self.headers,
                timeout=30
            )
            
            if response.status_code == 200:
                followups = response.json()
                self.log_test("Leads & CRM", f"GET /admin/leads/{lead_id}/followups", "PASS",
                            f"Retrieved {len(followups)} followups for lead")
            else:
                self.log_test("Leads & CRM", f"GET /admin/leads/{lead_id}/followups", "FAIL",
                            f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_test("Leads & CRM", f"GET /admin/leads/{lead_id}/followups", "FAIL", 
                        f"Exception: {str(e)}")
    
    def test_lead_status_update(self, lead_id):
        """Test lead status update endpoint"""
        try:
            update_data = {"status": "qualified"}
            response = requests.patch(
                f"{self.base_url}/admin/leads/{lead_id}",
                json=update_data,
                headers=self.headers,
                timeout=30
            )
            
            if response.status_code == 200:
                self.log_test("Leads & CRM", f"PATCH /admin/leads/{lead_id}", "PASS",
                            "Lead status update successful")
            else:
                self.log_test("Leads & CRM", f"PATCH /admin/leads/{lead_id}", "FAIL",
                            f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_test("Leads & CRM", f"PATCH /admin/leads/{lead_id}", "FAIL", 
                        f"Exception: {str(e)}")
    
    def test_meetings(self):
        """Test meetings endpoint"""
        try:
            response = requests.get(
                f"{self.base_url}/admin/meetings",
                headers=self.headers,
                timeout=30
            )
            
            if response.status_code == 200:
                meetings = response.json()
                self.log_test("Leads & CRM", "GET /admin/meetings", "PASS",
                            f"Retrieved {len(meetings)} meetings")
                
                # Verify expected count (should be 3 according to test plan)
                if len(meetings) == 3:
                    self.log_test("Leads & CRM", "Meetings Count", "PASS", 
                                "Meetings count matches expected (3)")
                else:
                    self.log_test("Leads & CRM", "Meetings Count", "FAIL", 
                                f"Expected 3 meetings, got {len(meetings)}")
            else:
                self.log_test("Leads & CRM", "GET /admin/meetings", "FAIL",
                            f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_test("Leads & CRM", "GET /admin/meetings", "FAIL", f"Exception: {str(e)}")
    
    def test_projects_parts(self):
        """Test Module 3: Projects & Parts"""
        print("\n🏗️ Testing Projects & Parts Module...")
        
        # Test GET /admin/projects
        try:
            response = requests.get(
                f"{self.base_url}/admin/projects",
                headers=self.headers,
                timeout=30
            )
            
            if response.status_code == 200:
                data = response.json()
                total = data.get("total", 0)
                projects = data.get("projects", [])
                
                self.log_test("Projects & Parts", "GET /admin/projects", "PASS",
                            f"Retrieved {total} projects")
                
                # Verify expected count (should be 3 according to test plan)
                if total == 3:
                    self.log_test("Projects & Parts", "Projects Count", "PASS", 
                                "Projects count matches expected (3)")
                else:
                    self.log_test("Projects & Parts", "Projects Count", "FAIL", 
                                f"Expected 3 projects, got {total}")
                
                # Test project parts with first project if available
                if projects:
                    first_project_id = projects[0].get("id")
                    if first_project_id:
                        self.test_project_parts(first_project_id)
                        
            else:
                self.log_test("Projects & Parts", "GET /admin/projects", "FAIL",
                            f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_test("Projects & Parts", "GET /admin/projects", "FAIL", f"Exception: {str(e)}")
    
    def test_project_parts(self, project_id):
        """Test project parts endpoint"""
        try:
            response = requests.get(
                f"{self.base_url}/admin/projects/{project_id}/parts",
                headers=self.headers,
                timeout=30
            )
            
            if response.status_code == 200:
                parts = response.json()
                self.log_test("Projects & Parts", f"GET /admin/projects/{project_id}/parts", "PASS",
                            f"Retrieved {len(parts)} parts for project")
                
                # Verify parts structure
                if parts and isinstance(parts, list):
                    sample_part = parts[0]
                    required_fields = ["id", "part_name", "status"]
                    missing_fields = [field for field in required_fields if field not in sample_part]
                    
                    if not missing_fields:
                        self.log_test("Projects & Parts", "Parts Structure", "PASS",
                                    "Parts have correct structure")
                    else:
                        self.log_test("Projects & Parts", "Parts Structure", "FAIL",
                                    f"Parts missing fields: {missing_fields}")
            else:
                self.log_test("Projects & Parts", f"GET /admin/projects/{project_id}/parts", "FAIL",
                            f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_test("Projects & Parts", f"GET /admin/projects/{project_id}/parts", "FAIL", 
                        f"Exception: {str(e)}")
    
    def test_suppliers(self):
        """Test Module 4: Suppliers"""
        print("\n🏭 Testing Suppliers Module...")
        
        try:
            response = requests.get(
                f"{self.base_url}/admin/suppliers",
                headers=self.headers,
                timeout=30
            )
            
            if response.status_code == 200:
                suppliers = response.json()
                self.log_test("Suppliers", "GET /admin/suppliers", "PASS",
                            f"Retrieved {len(suppliers)} suppliers")
                
                # Verify expected count (should be 5 according to test plan)
                if len(suppliers) == 5:
                    self.log_test("Suppliers", "Suppliers Count", "PASS", 
                                "Suppliers count matches expected (5)")
                else:
                    self.log_test("Suppliers", "Suppliers Count", "FAIL", 
                                f"Expected 5 suppliers, got {len(suppliers)}")
                
                # Verify supplier structure
                if suppliers:
                    sample_supplier = suppliers[0]
                    required_fields = ["company_name", "capabilities", "rating"]
                    missing_fields = [field for field in required_fields if field not in sample_supplier]
                    
                    if not missing_fields:
                        self.log_test("Suppliers", "Supplier Structure", "PASS",
                                    "Suppliers have correct structure with company_name, capabilities, rating")
                    else:
                        self.log_test("Suppliers", "Supplier Structure", "FAIL",
                                    f"Suppliers missing fields: {missing_fields}")
                        
                    # Store first supplier ID for assignment testing
                    self.first_supplier_id = sample_supplier.get("id")
                        
            else:
                self.log_test("Suppliers", "GET /admin/suppliers", "FAIL",
                            f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_test("Suppliers", "GET /admin/suppliers", "FAIL", f"Exception: {str(e)}")
    
    def test_supplier_assignments(self):
        """Test Module 5: Supplier Assignments"""
        print("\n📋 Testing Supplier Assignments Module...")
        
        if hasattr(self, 'first_supplier_id') and self.first_supplier_id:
            try:
                response = requests.get(
                    f"{self.base_url}/admin/suppliers/{self.first_supplier_id}/assignments",
                    headers=self.headers,
                    timeout=30
                )
                
                if response.status_code == 200:
                    assignments = response.json()
                    self.log_test("Supplier Assignments", 
                                f"GET /admin/suppliers/{self.first_supplier_id}/assignments", "PASS",
                                f"Retrieved {len(assignments)} assignments for supplier")
                    
                    # Verify assignment structure
                    if assignments:
                        sample_assignment = assignments[0]
                        if "project_details" in sample_assignment or "parts_details" in sample_assignment:
                            self.log_test("Supplier Assignments", "Assignment Structure", "PASS",
                                        "Assignments include project and parts information")
                        else:
                            self.log_test("Supplier Assignments", "Assignment Structure", "FAIL",
                                        "Assignments missing project/parts details")
                else:
                    self.log_test("Supplier Assignments", 
                                f"GET /admin/suppliers/{self.first_supplier_id}/assignments", "FAIL",
                                f"HTTP {response.status_code}: {response.text}")
                    
            except Exception as e:
                self.log_test("Supplier Assignments", 
                            f"GET /admin/suppliers/{self.first_supplier_id}/assignments", "FAIL", 
                            f"Exception: {str(e)}")
        else:
            self.log_test("Supplier Assignments", "Supplier ID", "FAIL", 
                        "No supplier ID available for testing assignments")
    
    def test_blog_management(self):
        """Test Module 6: Blog Management"""
        print("\n📝 Testing Blog Management Module...")
        
        try:
            response = requests.get(
                f"{self.base_url}/admin/blog/posts/all",
                headers=self.headers,
                timeout=30
            )
            
            if response.status_code == 200:
                posts = response.json()
                self.log_test("Blog Management", "GET /admin/blog/posts/all", "PASS",
                            f"Retrieved {len(posts)} blog posts")
                
                # Verify blog post structure
                if posts:
                    sample_post = posts[0]
                    required_fields = ["id", "title", "content", "published"]
                    missing_fields = [field for field in required_fields if field not in sample_post]
                    
                    if not missing_fields:
                        self.log_test("Blog Management", "Blog Post Structure", "PASS",
                                    "Blog posts have correct structure")
                    else:
                        self.log_test("Blog Management", "Blog Post Structure", "FAIL",
                                    f"Blog posts missing fields: {missing_fields}")
            else:
                self.log_test("Blog Management", "GET /admin/blog/posts/all", "FAIL",
                            f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_test("Blog Management", "GET /admin/blog/posts/all", "FAIL", f"Exception: {str(e)}")
    
    def run_all_tests(self):
        """Run all admin panel tests"""
        print("🚀 Starting Admin Panel API Testing...")
        print(f"Base URL: {self.base_url}")
        
        # Step 1: Authenticate
        if not self.authenticate_admin():
            print("❌ Authentication failed. Cannot proceed with tests.")
            return False
        
        # Step 2: Test all modules
        self.test_contact_submissions()
        self.test_leads_crm()
        self.test_projects_parts()
        self.test_suppliers()
        self.test_supplier_assignments()
        self.test_blog_management()
        
        # Step 3: Generate summary
        self.generate_summary()
        return True
    
    def generate_summary(self):
        """Generate test summary"""
        print("\n" + "="*60)
        print("📊 TEST SUMMARY")
        print("="*60)
        
        total_tests = len(self.test_results)
        passed_tests = len([t for t in self.test_results if t["status"] == "PASS"])
        failed_tests = total_tests - passed_tests
        
        print(f"Total Tests: {total_tests}")
        print(f"Passed: {passed_tests}")
        print(f"Failed: {failed_tests}")
        print(f"Success Rate: {(passed_tests/total_tests)*100:.1f}%")
        
        if failed_tests > 0:
            print("\n❌ FAILED TESTS:")
            for test in self.test_results:
                if test["status"] == "FAIL":
                    print(f"  - {test['module']} - {test['endpoint']}: {test['message']}")
        
        print("\n" + "="*60)

def main():
    """Main test execution"""
    tester = AdminAPITester()
    success = tester.run_all_tests()
    
    # Exit with appropriate code
    sys.exit(0 if success else 1)

if __name__ == "__main__":
    main()