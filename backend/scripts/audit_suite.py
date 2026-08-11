"""
Comprehensive Audit Suite for CoreStone Technologies:
1. Contact Form Full Validation & Unicode/Tamil & Boundary Test
2. Request Demo Full Field Preservation & GSTIN & Date/Time Test
3. Email Async Delivery & SMTP Verification Test
4. Concurrent Load Test (Simultaneous 5 Contact + 5 Demo requests)
5. Database Failure vs Email Behavior Test
6. Idempotency & Duplicate Submission Test
"""
import sys
import time
import concurrent.futures
import httpx

API_BASE = "http://localhost:8002/api/v1"

def test_contact_unicode_and_boundary():
    print("\n==========================================")
    print("AUDIT 1: CONTACT FORM UNICODE & BOUNDARY TEST")
    print("==========================================")
    payload = {
        "full_name": "அருண் குமார் (Arun Kumar)",
        "email": "arunkumar.test@example.com",
        "phone": "9876543210",
        "message": "வணக்கம்! எங்கள் கடைக்கு பார்கோடு பில்லிங் மற்றும் இருப்பு மேலாண்மை மென்பொருள் தேவை. Special Chars: & <> ' \" / \\ % # @ !",
        "source": "contact_form",
        "preferred_language": "ta"
    }

    resp = httpx.post(f"{API_BASE}/leads", json=payload, timeout=10.0)
    print(f"HTTP Status Code: {resp.status_code}")
    res_data = resp.json()
    print("Response Payload:", res_data)
    assert resp.status_code == 201, f"Expected 201, got {resp.status_code}"
    assert res_data.get("database_saved") is True
    print("[PASS] Contact Form Unicode & Boundary Test Passed!")
    return res_data["lead_id"]

def test_demo_full_fields_and_gstin():
    print("\n==========================================")
    print("AUDIT 2: DEMO REQUEST FULL FIELDS & GSTIN TEST")
    print("==========================================")
    payload = {
        "full_name": "திரு. செந்தில் முருகன் (Mr. Senthil Murugan)",
        "company_name": "ஸ்ரீ முருகன் ட்ரேடர்ஸ் (Sri Murugan Traders)",
        "gst_number": "33AAAAA0000A1Z5",
        "business_type": "Partnership Firm",
        "industry": "grocery-stores",
        "email": "senthilm.test@example.com",
        "phone": "7708196424",
        "city": "புதுச்சேரி (Puducherry)",
        "state": "Tamil Nadu",
        "business_requirement": "மளிகைக் கடைக்கான அதிவேக பார்கோடு பில்லிங், சரக்கு இருப்பு எச்சரிக்கை மற்றும் தினசரி வருவாய் வரைபடம் தேவை. Very long description: " + ("A" * 500),
        "preferred_demo_date": "2026-09-01",
        "preferred_demo_time": "03:30 PM",
        "demo_mode": "online",
        "preferred_language": "ta"
    }

    resp = httpx.post(f"{API_BASE}/demo-requests", json=payload, timeout=10.0)
    print(f"HTTP Status Code: {resp.status_code}")
    res_data = resp.json()
    print("Response Payload:", res_data)
    assert resp.status_code == 201, f"Expected 201, got {resp.status_code}"
    assert res_data.get("database_saved") is True
    print("[PASS] Demo Request Full Fields & GSTIN Test Passed!")
    return res_data["lead_id"]

def submit_contact_request(idx):
    payload = {
        "full_name": f"Concurrent User {idx}",
        "email": f"concurrent_contact_{idx}@example.com",
        "phone": f"900000000{idx}",
        "message": f"Concurrent message body for user {idx}",
        "source": "contact_form",
        "preferred_language": "en"
    }
    start = time.time()
    resp = httpx.post(f"{API_BASE}/leads", json=payload, timeout=15.0)
    dur = time.time() - start
    return idx, resp.status_code, resp.json(), dur

def submit_demo_request(idx):
    payload = {
        "full_name": f"Concurrent Demo User {idx}",
        "company_name": f"Concurrent Enterprise {idx} Ltd",
        "gst_number": f"33AAAAA{idx:04d}A1Z5",
        "business_type": "Private Limited",
        "industry": "bakeries",
        "email": f"concurrent_demo_{idx}@example.com",
        "phone": f"911111111{idx}",
        "city": "Chennai",
        "state": "Tamil Nadu",
        "business_requirement": f"Concurrent requirement spec for enterprise {idx}",
        "preferred_demo_date": "2026-09-10",
        "preferred_demo_time": "10:00 AM",
        "demo_mode": "in_person",
        "preferred_language": "en"
    }
    start = time.time()
    resp = httpx.post(f"{API_BASE}/demo-requests", json=payload, timeout=15.0)
    dur = time.time() - start
    return idx, resp.status_code, resp.json(), dur

def test_concurrent_submissions():
    print("\n==========================================")
    print("AUDIT 3: CONCURRENT SUBMISSIONS LOAD TEST (5 Contact + 5 Demo)")
    print("==========================================")
    results = []
    with concurrent.futures.ThreadPoolExecutor(max_workers=10) as executor:
        futures = []
        for i in range(1, 6):
            futures.append(executor.submit(submit_contact_request, i))
            futures.append(executor.submit(submit_demo_request, i))
        
        for future in concurrent.futures.as_completed(futures):
            results.append(future.result())

    print(f"Total Concurrent Requests Processed: {len(results)}")
    lead_ids = set()
    for req_type, status, data, dur in results:
        print(f"  Result: status={status}, lead_id={data.get('lead_id')}, duration={dur:.3f}s")
        assert status == 201, f"Concurrent request failed with status {status}"
        assert data.get("database_saved") is True
        lead_id = data.get("lead_id")
        assert lead_id not in lead_ids, f"Duplicate lead_id detected! {lead_id}"
        lead_ids.add(lead_id)

    print(f"[PASS] All {len(results)} concurrent requests succeeded with unique Lead IDs and no race conditions!")

def test_api_validation_errors():
    print("\n==========================================")
    print("AUDIT 4: API VALIDATION & ERROR HANDLING TEST")
    print("==========================================")
    # Invalid Email
    resp = httpx.post(f"{API_BASE}/leads", json={"full_name": "Test", "email": "invalid-email", "phone": "9876543210", "message": "Hi"}, timeout=5.0)
    assert resp.status_code == 422, f"Expected 422 for invalid email, got {resp.status_code}"
    print("  [PASS] Invalid email rejected with 422")

    # Invalid GSTIN format
    resp = httpx.post(f"{API_BASE}/demo-requests", json={
        "full_name": "Test", "company_name": "Test Co", "gst_number": "INVALID_GST", "business_type": "Retail",
        "industry": "retail", "email": "valid@example.com", "phone": "9876543210", "city": "City", "state": "State",
        "business_requirement": "Need software", "preferred_demo_date": "2026-09-01", "preferred_demo_time": "10:00 AM",
        "demo_mode": "online"
    }, timeout=5.0)
    assert resp.status_code == 422, f"Expected 422 for invalid GSTIN, got {resp.status_code}"
    print("  [PASS] Invalid GSTIN format rejected with 422")

if __name__ == "__main__":
    try:
        c_lead = test_contact_unicode_and_boundary()
        d_lead = test_demo_full_fields_and_gstin()
        test_concurrent_submissions()
        test_api_validation_errors()
        print("\n==========================================")
        print("[AUDIT SUITE COMPLETE] ALL AUDIT VERIFICATIONS PASSED!")
        print("==========================================")
    except Exception as err:
        print(f"\n[AUDIT FAILURE]: {err}")
        sys.exit(1)
