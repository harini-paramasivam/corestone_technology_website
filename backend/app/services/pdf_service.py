"""
PDF Generation Service — uses ReportLab on the backend to dynamically generate
official, beautifully formatted PDF specification sheets for Contact Form enquiries
and Demo Requests.
"""
import io
import logging
from datetime import datetime, timezone

from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.platypus import (
    HRFlowable,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)

from app.models.lead import CustomerLead, DemoRequest

logger = logging.getLogger(__name__)


class PDFService:
    @staticmethod
    def generate_contact_pdf(lead: CustomerLead) -> bytes:
        """Generates a professional PDF for a Contact Form enquiry."""
        buffer = io.BytesIO()
        doc = SimpleDocTemplate(
            buffer,
            pagesize=letter,
            rightMargin=36,
            leftMargin=36,
            topMargin=36,
            bottomMargin=36,
        )

        styles = getSampleStyleSheet()
        
        # Custom Styles
        title_style = ParagraphStyle(
            'HeaderTitle',
            parent=styles['Heading1'],
            fontName='Helvetica-Bold',
            fontSize=20,
            textColor=colors.HexColor('#1E4ED8'),
            spaceAfter=4,
        )
        subtitle_style = ParagraphStyle(
            'HeaderSubtitle',
            parent=styles['Normal'],
            fontName='Helvetica',
            fontSize=10,
            textColor=colors.HexColor('#475569'),
            spaceAfter=15,
        )
        section_style = ParagraphStyle(
            'SectionTitle',
            parent=styles['Heading2'],
            fontName='Helvetica-Bold',
            fontSize=14,
            textColor=colors.HexColor('#0F172A'),
            spaceAfter=10,
        )
        cell_bold = ParagraphStyle(
            'CellBold',
            parent=styles['Normal'],
            fontName='Helvetica-Bold',
            fontSize=10,
            textColor=colors.HexColor('#1E293B'),
        )
        cell_text = ParagraphStyle(
            'CellText',
            parent=styles['Normal'],
            fontName='Helvetica',
            fontSize=10,
            textColor=colors.HexColor('#334155'),
        )

        elements = []

        # Header Title
        elements.append(Paragraph("CORESTONE TECHNOLOGIES", title_style))
        elements.append(Paragraph("Smart Software Solutions for Every Business", subtitle_style))
        elements.append(HRFlowable(width="100%", thickness=2, color=colors.HexColor('#1E4ED8'), spaceAfter=15))

        # Title
        elements.append(Paragraph("NEW CONTACT FORM ENQUIRY", section_style))

        submitted_at = lead.created_at.strftime("%d-%b-%Y %I:%M %p") if lead.created_at else datetime.now(timezone.utc).strftime("%d-%b-%Y %I:%M %p")

        data = [
            [Paragraph("Lead ID:", cell_bold), Paragraph(lead.lead_id, cell_text)],
            [Paragraph("Full Name:", cell_bold), Paragraph(lead.full_name, cell_text)],
            [Paragraph("Phone Number:", cell_bold), Paragraph(lead.phone, cell_text)],
            [Paragraph("Email Address:", cell_bold), Paragraph(lead.email, cell_text)],
            [Paragraph("Message:", cell_bold), Paragraph(lead.message or "N/A", cell_text)],
            [Paragraph("Submitted At:", cell_bold), Paragraph(submitted_at, cell_text)],
            [Paragraph("Source:", cell_bold), Paragraph("Contact Form", cell_text)],
        ]

        table = Table(data, colWidths=[130, 410])
        table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor('#F8FAFC')),
            ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#E2E8F0')),
            ('PADDING', (0, 0), (-1, -1), 8),
            ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ]))

        elements.append(table)
        elements.append(Spacer(1, 20))
        elements.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor('#CBD5E1'), spaceAfter=10))

        footer_style = ParagraphStyle('Footer', parent=styles['Italic'], fontSize=8, textColor=colors.HexColor('#94A3B8'))
        elements.append(Paragraph("CoreStone Technologies | Email: corestonetech2026@gmail.com | Phone: +91 77081 96424", footer_style))

        doc.build(elements)
        pdf_bytes = buffer.getvalue()
        buffer.close()
        logger.info(f"PDF_GENERATED lead_id={lead.lead_id} type=contact bytes={len(pdf_bytes)}")
        return pdf_bytes

    @staticmethod
    def generate_demo_request_pdf(lead: CustomerLead, demo: DemoRequest) -> bytes:
        """Generates a professional PDF for a Demo Request."""
        buffer = io.BytesIO()
        doc = SimpleDocTemplate(
            buffer,
            pagesize=letter,
            rightMargin=36,
            leftMargin=36,
            topMargin=36,
            bottomMargin=36,
        )

        styles = getSampleStyleSheet()
        
        title_style = ParagraphStyle(
            'HeaderTitle',
            parent=styles['Heading1'],
            fontName='Helvetica-Bold',
            fontSize=20,
            textColor=colors.HexColor('#1E4ED8'),
            spaceAfter=4,
        )
        subtitle_style = ParagraphStyle(
            'HeaderSubtitle',
            parent=styles['Normal'],
            fontName='Helvetica',
            fontSize=10,
            textColor=colors.HexColor('#475569'),
            spaceAfter=15,
        )
        section_style = ParagraphStyle(
            'SectionTitle',
            parent=styles['Heading2'],
            fontName='Helvetica-Bold',
            fontSize=14,
            textColor=colors.HexColor('#0F172A'),
            spaceAfter=10,
        )
        cell_bold = ParagraphStyle(
            'CellBold',
            parent=styles['Normal'],
            fontName='Helvetica-Bold',
            fontSize=10,
            textColor=colors.HexColor('#1E293B'),
        )
        cell_text = ParagraphStyle(
            'CellText',
            parent=styles['Normal'],
            fontName='Helvetica',
            fontSize=10,
            textColor=colors.HexColor('#334155'),
        )

        elements = []

        # Header Title
        elements.append(Paragraph("CORESTONE TECHNOLOGIES", title_style))
        elements.append(Paragraph("Smart Software Solutions for Every Business", subtitle_style))
        elements.append(HRFlowable(width="100%", thickness=2, color=colors.HexColor('#1E4ED8'), spaceAfter=15))

        # Title
        elements.append(Paragraph("NEW DEMO REQUEST SPECIFICATION", section_style))

        submitted_at = lead.created_at.strftime("%d-%b-%Y %I:%M %p") if lead.created_at else datetime.now(timezone.utc).strftime("%d-%b-%Y %I:%M %p")
        demo_date = demo.preferred_demo_date.strftime("%d-%b-%Y") if demo.preferred_demo_date else "N/A"

        data = [
            [Paragraph("Lead ID:", cell_bold), Paragraph(lead.lead_id, cell_text)],
            [Paragraph("Full Name:", cell_bold), Paragraph(lead.full_name, cell_text)],
            [Paragraph("Company Name:", cell_bold), Paragraph(demo.company_name, cell_text)],
            [Paragraph("GST Number:", cell_bold), Paragraph(getattr(demo, "gst_number", None) or "Not Provided", cell_text)],
            [Paragraph("Business Type:", cell_bold), Paragraph(demo.business_type, cell_text)],
            [Paragraph("Industry Category:", cell_bold), Paragraph(demo.industry, cell_text)],
            [Paragraph("Email Address:", cell_bold), Paragraph(lead.email, cell_text)],
            [Paragraph("Phone Number:", cell_bold), Paragraph(lead.phone, cell_text)],
            [Paragraph("City:", cell_bold), Paragraph(demo.city, cell_text)],
            [Paragraph("State:", cell_bold), Paragraph(demo.state, cell_text)],
            [Paragraph("Business Requirement:", cell_bold), Paragraph(demo.business_requirement, cell_text)],
            [Paragraph("Preferred Demo Date:", cell_bold), Paragraph(demo_date, cell_text)],
            [Paragraph("Preferred Demo Time:", cell_bold), Paragraph(demo.preferred_demo_time, cell_text)],
            [Paragraph("Demo Mode:", cell_bold), Paragraph(str(demo.demo_mode.value if hasattr(demo.demo_mode, 'value') else demo.demo_mode), cell_text)],
            [Paragraph("Submitted At:", cell_bold), Paragraph(submitted_at, cell_text)],
            [Paragraph("Source:", cell_bold), Paragraph("Request Demo Form", cell_text)],
        ]

        table = Table(data, colWidths=[150, 390])
        table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor('#F8FAFC')),
            ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#E2E8F0')),
            ('PADDING', (0, 0), (-1, -1), 6),
            ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ]))

        elements.append(table)
        elements.append(Spacer(1, 20))
        elements.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor('#CBD5E1'), spaceAfter=10))

        footer_style = ParagraphStyle('Footer', parent=styles['Italic'], fontSize=8, textColor=colors.HexColor('#94A3B8'))
        elements.append(Paragraph("CoreStone Technologies | Email: corestonetech2026@gmail.com | Phone: +91 77081 96424", footer_style))

        doc.build(elements)
        pdf_bytes = buffer.getvalue()
        buffer.close()
        logger.info(f"PDF_GENERATED lead_id={lead.lead_id} type=demo_request bytes={len(pdf_bytes)}")
        return pdf_bytes
