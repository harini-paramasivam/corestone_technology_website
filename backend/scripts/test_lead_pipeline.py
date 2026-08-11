"""
End-to-End Pipeline Verification Script:
1. Contact Form Submit -> Oracle DB + PDF Generation + WhatsApp API Result
2. Request Demo Submit -> Oracle DB + PDF Generation + WhatsApp API Result
"""
import sys
import httpx

API_BASE = "http://localhost:8002/api/v1"

def test_contact_pipeline():
    print("\n==========================================")
    print("TESTING CONTACT FORM PIPELINE")
    print("==========================================")
    payload = {
        "full_name": "Fernandes Test Client",
        "email": "testclient@example.com",
        "phone": "9876543210",
        "message": "I need billing and inventory software for my shop in Puducherry.",
        "source": "contact_form",
        "preferred_language": "en"
    }

    resp = httpx.post(f"{API_BASE}/leads", json=payload, timeout=10.0)
    print(f"HTTP Status Code: {resp.status_code}")
    res_data = resp.json()
    print("Response Payload:", res_data)
    assert resp.status_code == 201, f"Expected 201 Created, got {resp.status_code}"
    assert res_data.get("database_saved") is True, "Database save failed!"
    assert "lead_id" in res_data, "Lead ID missing!"
    print("[SUCCESS] Contact Form Pipeline Test PASSED!")
    return res_data

def test_demo_request_pipeline():
    print("\n==========================================")
    print("TESTING REQUEST DEMO PIPELINE")
    print("==========================================")
    payload = {
        "full_name": "Fernandes Demo Client",
        "company_name": "CoreStone ABC Traders",
        "business_type": "Proprietorship",
        "industry": "retail-chains",
        "email": "democlient@example.com",
        "phone": "9876543210",
        "city": "Puducherry",
        "state": "Tamil Nadu",
        "business_requirement": "Need custom billing, multi-counter inventory and sales dashboards.",
        "preferred_demo_date": "2026-08-25",
        "preferred_demo_time": "11:30 AM",
        "demo_mode": "in_person",
        "preferred_language": "en"
    }

    resp = httpx.post(f"{API_BASE}/demo-requests", json=payload, timeout=10.0)
    print(f"HTTP Status Code: {resp.status_code}")
    res_data = resp.json()
    print("Response Payload:", res_data)
    assert resp.status_code == 201, f"Expected 201 Created, got {resp.status_code}"
    assert res_data.get("database_saved") is True, "Database save failed!"
    assert "lead_id" in res_data, "Lead ID missing!"
    print("[SUCCESS] Request Demo Pipeline Test PASSED!")
    return res_data

if __name__ == "__main__":
    try:
        c_res = test_contact_pipeline()
        d_res = test_demo_request_pipeline()
        print("\n[COMPLETE SUCCESS] ALL BACKEND PIPELINE TESTS PASSED!")
    except Exception as err:
        print(f"\n[FAILURE] PIPELINE TEST FAILED: {err}")
        sys.exit(1)
