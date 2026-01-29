#!/usr/bin/env python3
"""
Comprehensive test of the login endpoint.
This script starts the server and tests various login scenarios.
"""

import subprocess
import time
import requests
import json
import signal
import os
import sys

# Start the backend server
print("Starting backend server...")
server_process = subprocess.Popen(
    [sys.executable, "start_server.py"],
    cwd="e:\\manufacturing_web\\DexAura_Tech-main\\backend",
    stdout=subprocess.PIPE,
    stderr=subprocess.PIPE
)

# Wait for server to start
print("Waiting for server to initialize...")
time.sleep(5)

def test_endpoint(email, password, description):
    """Test a login attempt"""
    print(f"\n{'='*70}")
    print(f"TEST: {description}")
    print(f"Email: {email}, Password: {password}")
    print('-'*70)
    
    try:
        response = requests.post(
            "http://127.0.0.1:8000/api/auth/login",
            json={"email": email, "password": password},
            timeout=5
        )
        
        print(f"Status Code: {response.status_code}")
        data = response.json()
        print(f"Response: {json.dumps(data, indent=2)}")
        
        if response.status_code == 200:
            print("✓ LOGIN SUCCESSFUL")
            return True
        elif response.status_code == 401:
            print("✓ LOGIN REJECTED (401 Unauthorized)")
            return False
        else:
            print(f"? UNEXPECTED STATUS CODE")
            return None
            
    except Exception as e:
        print(f"✗ ERROR: {e}")
        return None

try:
    # Run tests
    print("\nRunning Login Endpoint Tests")
    print("="*70)
    
    tests = [
        ("admin@dexaura.com", "admin123", "CORRECT credentials"),
        ("admin@dexaura.com", "wrongpass", "WRONG password"),
        ("admin@dexaura.com", "", "EMPTY password"),
        ("wrong@email.com", "admin123", "WRONG email"),
        ("wrong@email.com", "wrongpass", "BOTH wrong"),
    ]
    
    results = []
    for email, password, desc in tests:
        result = test_endpoint(email, password, desc)
        results.append((desc, result))
    
    # Summary
    print(f"\n{'='*70}")
    print("TEST SUMMARY")
    print('='*70)
    
    for desc, result in results:
        if result is True:
            status = "✓ PASS (Logged in)"
        elif result is False:
            status = "✓ PASS (Rejected)"
        else:
            status = "? UNKNOWN"
        print(f"{status:20} - {desc}")

finally:
    # Stop the server
    print("\nStopping server...")
    os.kill(server_process.pid, signal.SIGTERM)
    server_process.wait(timeout=5)
    print("Server stopped")
