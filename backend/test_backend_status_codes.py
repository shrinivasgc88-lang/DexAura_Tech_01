#!/usr/bin/env python3
"""Test backend login directly with detailed output"""

import subprocess
import time
import requests
import json
import sys

# Start backend
print("Starting backend server...")
server = subprocess.Popen(
    [sys.executable, "start_server.py"],
    cwd="e:\\manufacturing_web\\DexAura_Tech-main\\backend"
)

time.sleep(5)

try:
    print("\nTest 1: WRONG PASSWORD")
    print("="*60)
    
    response = requests.post(
        "http://127.0.0.1:8000/api/auth/login",
        json={"email": "admin@dexaura.com", "password": "wrongpass"},
        timeout=10
    )
    
    print(f"Status Code: {response.status_code}")
    print(f"Headers: {dict(response.headers)}")
    print(f"Content Length: {len(response.content)}")
    print(f"Response Text: {response.text}")
    print(f"Response JSON: {response.json()}")
    
    # Check if status code is correct
    if response.status_code == 401:
        print("\n✓ CORRECT: Backend returned 401 for wrong password")
    else:
        print(f"\n✗ ERROR: Backend returned {response.status_code} instead of 401!")
    
    print("\n\nTest 2: CORRECT PASSWORD")
    print("="*60)
    
    response2 = requests.post(
        "http://127.0.0.1:8000/api/auth/login",
        json={"email": "admin@dexaura.com", "password": "admin123"},
        timeout=10
    )
    
    print(f"Status Code: {response2.status_code}")
    print(f"Headers: {dict(response2.headers)}")
    print(f"Content Length: {len(response2.content)}")
    
    if response2.status_code == 200:
        data = response2.json()
        print(f"Has access_token: {'access_token' in data}")
        print(f"Has customer: {'customer' in data}")
        if 'customer' in data:
            print(f"Customer email: {data['customer'].get('email')}")
        print("\n✓ CORRECT: Backend returned 200 with token and customer")
    else:
        print(f"\n✗ ERROR: Backend returned {response2.status_code} instead of 200!")
        print(f"Response: {response2.text}")

finally:
    server.terminate()
    server.wait()
    print("\nServer stopped")
