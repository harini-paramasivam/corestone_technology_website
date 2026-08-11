import jsPDF from 'jspdf'

/**
 * Generates an official, beautifully styled PDF document containing all client
 * details filled in the form (Demo Request or Contact Enquiry), triggers an
 * automatic file download, and returns the generated PDF filename.
 */
export function generateLeadPDF(values, type = 'Demo Request') {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  })

  const submittedTime = new Date().toLocaleString()
  const fileName = `CoreStone_${type.replace(/\s+/g, '_')}_${(values.fullName || 'Lead').replace(/[^a-zA-Z0-9]/g, '_')}.pdf`

  // Branding Header (Primary Blue Banner)
  doc.setFillColor(30, 78, 216) // #1E4ED8
  doc.rect(0, 0, 210, 32, 'F')

  // Header Title
  doc.setTextColor(255, 255, 255)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(20)
  doc.text('CORESTONE TECHNOLOGIES', 15, 16)

  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.text('Smart Software Solutions for Every Business', 15, 24)

  // Document Title
  doc.setTextColor(15, 23, 42) // Slate 900
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(16)
  doc.text(`CLIENT ${type.toUpperCase()} SPECIFICATION`, 15, 45)

  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(100, 116, 139)
  doc.text(`Submitted On: ${submittedTime} | Contact Person: Fernandas (+91 77081 96424)`, 15, 52)

  // Divider Line
  doc.setDrawColor(226, 232, 240)
  doc.setLineWidth(0.5)
  doc.line(15, 56, 195, 56)

  // Fields Table
  let y = 66

  const fields = [
    { label: 'Full Name / Client', value: values.fullName },
    { label: 'Phone Number', value: values.phone },
    { label: 'Email Address', value: values.email },
    ...(values.companyName ? [{ label: 'Company / Shop Name', value: values.companyName }] : []),
    ...(values.businessType ? [{ label: 'Business Type', value: values.businessType }] : []),
    ...(values.industry ? [{ label: 'Industry Category', value: values.industry }] : []),
    ...(values.city ? [{ label: 'City', value: values.city }] : []),
    ...(values.state ? [{ label: 'State', value: values.state }] : []),
    ...(values.preferredDemoDate ? [{ label: 'Preferred Demo Date', value: values.preferredDemoDate }] : []),
    ...(values.preferredDemoTime ? [{ label: 'Preferred Demo Time', value: values.preferredDemoTime }] : []),
    ...(values.demoMode ? [{ label: 'Demo Mode', value: values.demoMode }] : []),
    ...(values.message ? [{ label: 'Client Message', value: values.message }] : []),
    ...(values.businessRequirement ? [{ label: 'Business Requirement', value: values.businessRequirement }] : []),
  ]

  fields.forEach((field, index) => {
    // Row Alternate Background
    if (index % 2 === 0) {
      doc.setFillColor(248, 250, 252) // Slate 50
      doc.rect(15, y - 5, 180, 10, 'F')
    }

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(10)
    doc.setTextColor(30, 41, 59)
    doc.text(`${field.label}:`, 18, y)

    doc.setFont('helvetica', 'normal')
    doc.setTextColor(51, 65, 85)
    
    // Wrap long strings cleanly
    const wrappedValue = doc.splitTextToSize(String(field.value || 'N/A'), 115)
    doc.text(wrappedValue, 70, y)

    y += Math.max(10, wrappedValue.length * 5)
  })

  // Footer Branding Notice
  doc.setDrawColor(226, 232, 240)
  doc.line(15, 270, 195, 270)

  doc.setFontSize(8)
  doc.setFont('helvetica', 'italic')
  doc.setTextColor(148, 163, 184)
  doc.text('CoreStone Technologies — Puducherry, India | Email: corestonetech2026@gmail.com | Phone: +91 77081 96424', 15, 276)

  // Save PDF file locally
  doc.save(fileName)
  return fileName
}
