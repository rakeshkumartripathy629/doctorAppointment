import { jsPDF } from 'jspdf';

export const generateAppointmentPDF = (appointment, doctor) => {
  const doc = new jsPDF();
  
  // Add header
  doc.setFontSize(20);
  doc.setTextColor(0, 0, 255);
  doc.text('MedBook Appointment Confirmation', 20, 20);
  
  // Add doctor info
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text('Doctor Details:', 20, 40);
  doc.setFontSize(12);
  doc.text(`Name: ${doctor.name}`, 30, 50);
  doc.text(`Specialty: ${doctor.specialty}`, 30, 60);
  doc.text(`Fee: $${doctor.fee}`, 30, 70);
  
  // Add appointment info
  doc.setFontSize(14);
  doc.text('Appointment Details:', 20, 90);
  doc.setFontSize(12);
  doc.text(`Patient Name: ${appointment.patientName}`, 30, 100);
  doc.text(`Date: ${appointment.date}`, 30, 110);
  doc.text(`Time: ${appointment.time}`, 30, 120);
  doc.text(`Email: ${appointment.patientEmail}`, 30, 130);
  doc.text(`Phone: ${appointment.patientPhone}`, 30, 140);
  
  // Add footer
  doc.setFontSize(10);
  doc.setTextColor(128, 128, 128);
  doc.text('Please arrive 15 minutes before your scheduled appointment time.', 20, 170);
  doc.text('For any changes or cancellations, please contact us 24 hours in advance.', 20, 180);
  
  // Save the PDF
  doc.save(`appointment-${appointment.id}.pdf`);
};
