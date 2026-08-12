"""
Email Notification Service — sends formatted HTML email alerts to the
CoreStone admin email (NOTIFICATION_EMAIL) whenever a Contact Form or
Demo Request is submitted. Uses Python's built-in smtplib with Gmail SMTP.
No third-party library needed — only requires SMTP credentials in .env.
"""
import logging
import smtplib
from email import encoders
from email.mime.base import MIMEBase
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from typing import Any

from app.core.config import get_settings
from app.models.lead import CustomerLead, DemoRequest

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
        Sends a formatted HTML email to NOTIFICATION_EMAIL via Gmail SMTP.
        Returns a result dict with email_sent and email_status.
        """
        smtp_host = self.settings.SMTP_HOST.strip() if self.settings.SMTP_HOST else ""
        smtp_user = self.settings.SMTP_USER.strip() if self.settings.SMTP_USER else ""
        smtp_pass = self.settings.SMTP_PASSWORD.strip() if self.settings.SMTP_PASSWORD else ""
        notify_email = self.settings.NOTIFICATION_EMAIL.strip() if self.settings.NOTIFICATION_EMAIL else ""

        if not smtp_host or not smtp_user or not smtp_pass or not notify_email:
            logger.warning(
                f"EMAIL_NOT_CONFIGURED lead_id={lead.lead_id} "
                f"reason='SMTP_HOST/SMTP_USER/SMTP_PASSWORD/NOTIFICATION_EMAIL missing in .env'"
            )
            return {"email_sent": False, "email_status": "NOT_CONFIGURED",
                    "message": "Email SMTP is not configured in .env."}

        try:
            if demo:
                subject = f"[CoreStone] New Demo Request — {lead.full_name} | {demo.company_name} | {lead.lead_id}"
                html_body = self._build_demo_html(lead, demo)
                pdf_filename = f"demo_request_{lead.lead_id}.pdf"
            else:
                subject = f"[CoreStone] New Contact Enquiry — {lead.full_name} | {lead.lead_id}"
                html_body = self._build_contact_html(lead)
                pdf_filename = f"contact_enquiry_{lead.lead_id}.pdf"

            msg = MIMEMultipart("alternative")
            msg["Subject"] = subject
            msg["From"] = smtp_user
            msg["To"] = notify_email
            msg.attach(MIMEText(html_body, "html"))

            # Attach PDF if generated
            if pdf_bytes:
                attachment = MIMEBase("application", "pdf")
                attachment.set_payload(pdf_bytes)
                encoders.encode_base64(attachment)
                attachment.add_header("Content-Disposition", f'attachment; filename="{pdf_filename}"')
                msg.attach(attachment)

            # Send via Gmail SMTP (TLS)
            smtp_port = int(self.settings.SMTP_PORT) if self.settings.SMTP_PORT else 587
            with smtplib.SMTP(smtp_host, smtp_port, timeout=15) as server:
                server.ehlo()
                server.starttls()
                server.login(smtp_user, smtp_pass)
                server.sendmail(smtp_user, notify_email, msg.as_string())

            logger.info(f"EMAIL_SENT_SUCCESS lead_id={lead.lead_id} to={notify_email}")
            return {
                "email_sent": True,
                "email_status": "SENT",
                "message": f"Email notification sent to {notify_email}.",
            }

        except Exception as exc:  # noqa: BLE001
            logger.error(f"EMAIL_SEND_FAILED lead_id={lead.lead_id} error={exc}")
            return {
                "email_sent": False,
                "email_status": "FAILED",
                "message": f"Email delivery failed: {exc}",
            }
