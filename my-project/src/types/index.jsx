// Doctor object structure
export const Doctor = {
    id: '',
    name: '',
    specialty: '',
    experience: 0,
    fee: 0,
    status: 'active' || 'inactive',
    image: '',
    bio: '',
    contact: {
      email: '',
      phone: ''
    }
  };
  
  // Appointment object structure
  export const Appointment = {
    id: '',
    doctorId: '',
    patientName: '',
    patientEmail: '',
    patientPhone: '',
    date: '',
    time: '',
    status: 'pending' || 'confirmed' || 'cancelled'
  };
  