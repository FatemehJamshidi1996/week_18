import React, { useState, useContext, useEffect } from 'react';
import  ContactContext  from '../context/ContactContext';


const EditContactForm = ({ contactToEdit, onClose }) => {

  const { editContact } = useContext(ContactContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  // پر کردن فرم با داده‌های فعلی
  useEffect(() => {
    if(contactToEdit) {
      setFormData(contactToEdit);
    }
  }, [contactToEdit]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
  // اضافه کردن ID به دیتا
  const updatedData = {
    ...formData,
    id: contactToEdit.id // این خط حیاتی است!
  };
    editContact(updatedData);
    onClose();
  };

  return (
    <div className="editFormMainStyle">
      <div style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '8px',
        width: '400px'
      }}>
        <h3>ویرایش مخاطب</h3>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label>نام:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #e2e8f0'
              }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label>ایمیل:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label>شماره تماس:</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              type="button"
              onClick={onClose}
              style={cancelButtonStyle}
            >
              انصراف
            </button>
            <button
              type="submit"
              style={saveButtonStyle}
            >
              ذخیره تغییرات
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// استایل‌های جداگانه برای خوانایی بهتر
const inputStyle = {
  width: '100%',
  padding: '8px',
  borderRadius: '4px',
  border: '1px solid #e2e8f0'
};

const cancelButtonStyle = {
  padding: '8px 16px',
  border: '1px solid #e2e8f0',
  borderRadius: '6px',
  background: '#f8fafc',
  cursor: 'pointer',
  flex: 1
};

const saveButtonStyle = {
  padding: '8px 16px',
  border: 'none',
  borderRadius: '6px',
  background: '#4f46e5',
  color: 'white',
  cursor: 'pointer',
  flex: 1
};

export default EditContactForm;
