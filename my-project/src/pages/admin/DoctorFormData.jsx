import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { ArrowLeft } from 'lucide-react';

export const DoctorForm = () => {
  const navigate = useNavigate();
  const { doctorId } = useParams();
  const { state, dispatch } = useApp();
  const isEditing = Boolean(doctorId);

  const [formData, setFormData] = useState({
    name: '',
    specialty: '',
    experience: 0,
    fee: 0,
    bio: '',
    image: '',
    email: '',
    phone: '',
  });

  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (isEditing) {
      const doctor = state.doctors.find((d) => d.id === doctorId);
      if (doctor) {
        setFormData({
          name: doctor.name,
          specialty: doctor.specialty,
          experience: doctor.experience,
          fee: doctor.fee,
          bio: doctor.bio,
          image: doctor.image,
          email: doctor.contact.email,
          phone: doctor.contact.phone,
        });
      }
    }
  }, [doctorId, state.doctors, isEditing]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'your_upload_preset'); // Replace with your Cloudinary upload preset

    try {
      const response = await fetch(
        'https://api.cloudinary.com/v1_1/your_cloud_name/image/upload', // Replace with your Cloudinary URL
        {
          method: 'POST',
          body: formData,
        }
      );
      const data = await response.json();
      setFormData((prevData) => ({ ...prevData, image: data.secure_url }));
      alert('Image uploaded successfully!');
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const doctorData = {
      id: isEditing ? doctorId : crypto.randomUUID(),
      ...formData,
      status: 'active',
      contact: {
        email: formData.email,
        phone: formData.phone,
      },
    };

    dispatch({
      type: isEditing ? 'UPDATE_DOCTOR' : 'ADD_DOCTOR',
      payload: doctorData,
    });

    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-6">
        <button
          onClick={() => navigate('/admin')}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-8"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Dashboard
        </button>

        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-6">
            {isEditing ? 'Edit Doctor' : 'Add New Doctor'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                required
                className="w-full p-2 border rounded-md"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Specialty
              </label>
              <input
                type="text"
                required
                className="w-full p-2 border rounded-md"
                value={formData.specialty}
                onChange={(e) =>
                  setFormData({ ...formData, specialty: e.target.value })
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Experience (years)
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  className="w-full p-2 border rounded-md"
                  value={formData.experience}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      experience: parseInt(e.target.value),
                    })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Consultation Fee ($)
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  className="w-full p-2 border rounded-md"
                  value={formData.fee}
                  onChange={(e) =>
                    setFormData({ ...formData, fee: parseInt(e.target.value) })
                  }
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bio
              </label>
              <textarea
                required
                rows={4}
                className="w-full p-2 border rounded-md"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Profile Image
              </label>
              <input
                type="file"
                accept="image/*"
                className="w-full p-2 border rounded-md"
                onChange={handleFileChange}
              />
              {isUploading && <p className="text-blue-600">Uploading image...</p>}
              {formData.image && (
                <img
                  src={formData.image}
                  alt="Profile"
                  className="mt-4 w-32 h-32 object-cover rounded"
                />
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  required
                  className="w-full p-2 border rounded-md"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  required
                  className="w-full p-2 border rounded-md"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
              disabled={isUploading}
            >
              {isEditing ? 'Update Doctor' : 'Add Doctor'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};



