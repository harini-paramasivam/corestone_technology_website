"""
Email Notification Service — sends formatted HTML email alerts to the
CoreStone admin email (NOTIFICATION_EMAIL) whenever a Contact Form or
Demo Request is submitted.

Sent via Resend's HTTPS API (https://api.resend.com/emails) rather than
raw SMTP: Render blocks outbound SMTP ports (25/465/587) on free-tier web
services, which made smtplib fail with "[Errno 101] Network is unreachable"
in production even though it worked locally. HTTPS on port 443 is never
blocked, so this transport works identically on free and paid Render plans.
"""
import base64
import logging
from typing import Any

import httpx

from app.core.config import get_settings
from app.models.lead import CustomerLead, DemoRequest

RESEND_API_URL = "https://api.resend.com/emails"

logger = logging.getLogger(__name__)


class EmailService:
    def __init__(self):
        self.settings = get_settings()

    def _build_contact_html(self, lead: CustomerLead) -> str:
        submitted_time = lead.created_at.strftime("%d-%b-%Y %I:%M %p IST") if lead.created_at else "N/A"
        return f"""
        <html><body style="font-family:Arial,sans-serif;background:#f4f4f4;padding:20px;">
        <div style="max-width:600px;margin:auto;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.1);">
          <div style="background:#1e3a8a;padding:20px 30px;">
            <h2 style="color:#fff;margin:0;">CoreStone Technologies</h2>
            <p style="color:#93c5fd;margin:4px 0 0;">New Contact Enquiry Received</p>
          </div>
          <div style="padding:24px 30px;">
            <table style="width:100%;border-collapse:collapse;font-size:14px;">
              <tr><td style="padding:8px 0;color:#64748b;width:140px;">Lead ID</td>
                  <td style="padding:8px 0;font-weight:bold;color:#1e3a8a;">{lead.lead_id}</td></tr>
              <tr style="background:#f8fafc;"><td style="padding:8px 0;color:#64748b;">Name</td>
                  <td style="padding:8px 0;">{lead.full_name}</td></tr>
              <tr><td style="padding:8px 0;color:#64748b;">Phone</td>
                  <td style="padding:8px 0;"><a href="tel:{lead.phone}" style="color:#1e3a8a;">{lead.phone}</a></td></tr>
              <tr style="background:#f8fafc;"><td style="padding:8px 0;color:#64748b;">Email</td>
                  <td style="padding:8px 0;"><a href="mailto:{lead.email}" style="color:#1e3a8a;">{lead.email}</a></td></tr>
              <tr><td style="padding:8px 0;color:#64748b;vertical-align:top;">Message</td>
                  <td style="padding:8px 0;line-height:1.6;">{lead.message or "N/A"}</td></tr>
              <tr style="background:#f8fafc;"><td style="padding:8px 0;color:#64748b;">Submitted</td>
                  <td style="padding:8px 0;">{submitted_time}</td></tr>
            </table>
            <div style="margin-top:24px;padding:16px;background:#f0fdf4;border-left:4px solid #22c55e;border-radius:4px;">
              <p style="margin:0;font-size:13px;color:#166534;">
                <strong>Action Required:</strong> Call or WhatsApp the customer at <strong>{lead.phone}</strong> within 24 hours.
              </p>
            </div>
          </div>
          <div style="background:#f8fafc;padding:12px 30px;text-align:center;font-size:12px;color:#94a3b8;">
            CoreStone Technologies &mdash; Puducherry, India &mdash; corestonetech2026@gmail.com
          </div>
        </div>
        </body></html>
        """

    def _build_demo_html(self, lead: CustomerLead, demo: DemoRequest) -> str:
        submitted_time = lead.created_at.strftime("%d-%b-%Y %I:%M %p IST") if lead.created_at else "N/A"
        demo_date = demo.preferred_demo_date.strftime("%d-%b-%Y") if demo.preferred_demo_date else "N/A"
        demo_mode_str = demo.demo_mode.value.replace("_", " ").title() if hasattr(demo.demo_mode, "value") else str(demo.demo_mode)
        return f"""
        <html><body style="font-family:Arial,sans-serif;background:#f4f4f4;padding:20px;">
        <div style="max-width:600px;margin:auto;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.1);">
          <div style="background:#1e3a8a;padding:20px 30px;">
            <h2 style="color:#fff;margin:0;">CoreStone Technologies</h2>
            <p style="color:#93c5fd;margin:4px 0 0;">New Demo Request Received</p>
          </div>
          <div style="padding:24px 30px;">
            <table style="width:100%;border-collapse:collapse;font-size:14px;">
              <tr><td style="padding:8px 0;color:#64748b;width:160px;">Lead ID</td>
                  <td style="padding:8px 0;font-weight:bold;color:#1e3a8a;">{lead.lead_id}</td></tr>
              <tr style="background:#f8fafc;"><td style="padding:8px 0;color:#64748b;">Name</td>
                  <td style="padding:8px 0;">{lead.full_name}</td></tr>
              <tr><td style="padding:8px 0;color:#64748b;">Company</td>
                  <td style="padding:8px 0;">{demo.company_name}</td></tr>
              <tr style="background:#f8fafc;"><td style="padding:8px 0;color:#64748b;">GST Number</td>
                  <td style="padding:8px 0;font-weight:bold;">{getattr(demo, "gst_number", None) or "Not Provided"}</td></tr>
              <tr><td style="padding:8px 0;color:#64748b;">Business Type</td>
                  <td style="padding:8px 0;">{demo.business_type}</td></tr>
              <tr><td style="padding:8px 0;color:#64748b;">Industry</td>
                  <td style="padding:8px 0;">{demo.industry}</td></tr>
              <tr style="background:#f8fafc;"><td style="padding:8px 0;color:#64748b;">Phone</td>
                  <td style="padding:8px 0;"><a href="tel:{lead.phone}" style="color:#1e3a8a;">{lead.phone}</a></td></tr>
              <tr><td style="padding:8px 0;color:#64748b;">Email</td>
                  <td style="padding:8px 0;"><a href="mailto:{lead.email}" style="color:#1e3a8a;">{lead.email}</a></td></tr>
              <tr style="background:#f8fafc;"><td style="padding:8px 0;color:#64748b;">City / State</td>
                  <td style="padding:8px 0;">{demo.city}, {demo.state}</td></tr>
              <tr><td style="padding:8px 0;color:#64748b;vertical-align:top;">Requirement</td>
                  <td style="padding:8px 0;line-height:1.6;">{demo.business_requirement}</td></tr>
              <tr style="background:#f8fafc;"><td style="padding:8px 0;color:#64748b;">Demo Date</td>
                  <td style="padding:8px 0;"><strong>{demo_date}</strong> at <strong>{demo.preferred_demo_time}</strong></td></tr>
              <tr><td style="padding:8px 0;color:#64748b;">Demo Mode</td>
                  <td style="padding:8px 0;">{demo_mode_str}</td></tr>
              <tr style="background:#f8fafc;"><td style="padding:8px 0;color:#64748b;">Submitted</td>
                  <td style="padding:8px 0;">{submitted_time}</td></tr>
            </table>
            <div style="margin-top:24px;padding:16px;background:#eff6ff;border-left:4px solid #1e3a8a;border-radius:4px;">
              <p style="margin:0;font-size:13px;color:#1e40af;">
                <strong>Action Required:</strong> Confirm the demo slot and call <strong>{lead.phone}</strong> within 24 hours.
              </p>
            </div>
          </div>
          <div style="background:#f8fafc;padding:12px 30px;text-align:center;font-size:12px;color:#94a3b8;">
            CoreStone Technologies &mdash; Puducherry, India &mdash; corestonetech2026@gmail.com
          </div>
        </div>
        </body></html>
        """

    def send_notification(
        self,
        lead: CustomerLead,
        demo: DemoRequest | None = None,
        pdf_bytes: bytes | None = None,
    ) -> dict[str, Any]:
        """
        Sends a formatted HTML email to NOTIFICATION_EMAIL via the Resend
        HTTPS API. Returns a result dict with email_sent and email_status.
        """
        api_key = self.settings.RESEND_API_KEY.strip() if self.settings.RESEND_API_KEY else ""
        from_email = self.settings.RESEND_FROM_EMAIL.strip() if self.settings.RESEND_FROM_EMAIL else ""
        notify_email = self.settings.NOTIFICATION_EMAIL.strip() if self.settings.NOTIFICATION_EMAIL else ""

        if not api_key or not from_email or not notify_email:
            logger.warning(
                f"EMAIL_NOT_CONFIGURED lead_id={lead.lead_id} "
                f"reason='RESEND_API_KEY/RESEND_FROM_EMAIL/NOTIFICATION_EMAIL missing in .env'"
            )
            return {"email_sent": False, "email_status": "NOT_CONFIGURED",
                    "message": "Resend email API is not configured in .env."}

        try:
            if demo:
                subject = f"[CoreStone] New Demo Request — {lead.full_name} | {demo.company_name} | {lead.lead_id}"
                html_body = self._build_demo_html(lead, demo)
                pdf_filename = f"demo_request_{lead.lead_id}.pdf"
            else:
                subject = f"[CoreStone] New Contact Enquiry — {lead.full_name} | {lead.lead_id}"
                html_body = self._build_contact_html(lead)
                pdf_filename = f"contact_enquiry_{lead.lead_id}.pdf"

            payload: dict[str, Any] = {
                "from": from_email,
                "to": [notify_email],
                "subject": subject,
                "html": html_body,
            }

            # Attach PDF if generated (Resend expects base64-encoded content)
            if pdf_bytes:
                payload["attachments"] = [{
                    "filename": pdf_filename,
                    "content": base64.b64encode(pdf_bytes).decode("ascii"),
                }]

            response = httpx.post(
                RESEND_API_URL,
                headers={
                    "Authorization": f"Bearer {api_key}",
                    "Content-Type": "application/json",
                },
                json=payload,
                timeout=15,
            )
            response.raise_for_status()
            resend_id = response.json().get("id")

            logger.info(f"EMAIL_SENT_SUCCESS lead_id={lead.lead_id} to={notify_email} resend_id={resend_id}")
            return {
                "email_sent": True,
                "email_status": "SENT",
                "message": f"Email notification sent to {notify_email}.",
            }

        except httpx.HTTPStatusError as exc:
            logger.error(
                f"EMAIL_SEND_FAILED lead_id={lead.lead_id} "
                f"status={exc.response.status_code} error={exc.response.text}"
            )
            return {
                "email_sent": False,
                "email_status": "FAILED",
                "message": f"Email delivery failed: {exc.response.text}",
            }
        except Exception as exc:  # noqa: BLE001
            logger.error(f"EMAIL_SEND_FAILED lead_id={lead.lead_id} error={exc}")
            return {
                "email_sent": False,
                "email_status": "FAILED",
                "message": f"Email delivery failed: {exc}",
            }