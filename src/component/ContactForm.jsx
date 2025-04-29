import React, { useState, useContext } from 'react';
import ContactContext from '../context/ContactContext';
import { useNavigate } from "react-router-dom";

const ContactForm = () => {
    const { addContact } = useContext(ContactContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [phone, setPhone] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [errors, setErrors] = useState('');
    const navigate = useNavigate();

    // اعتبارسنجی فرم
    //   const validate = () => {
    //     const newErrors = {};
    // debugger
    //     if (!name.trim()) newErrors.name = 'نام الزامی است';
    //     if (!role.trim()) newErrors.role = 'شغل الزامی است';

    //     if (!email.trim()) {
    //       newErrors.email = 'ایمیل الزامی است';
    //     } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/.test(email)) {
    //       newErrors.email = 'ایمیل معتبر وارد کنید';
    //     }

    //     if (!phone.trim()) {
    //       newErrors.phone = 'شماره تماس الزامی است';
    //     } else if (!/^09\d{9}$/.test(phone)) {
    //       newErrors.phone = 'شماره موبایل معتبر وارد کنید (مثلاً 09123456789)';
    //     }

    //     setErrors(newErrors);
    //     return Object.keys(newErrors).length === 0;
    //   }

    //     const handleSubmit = (e) => {
    //        debugger
    //        if (Object.keys(newErrors).length > 0) return;

    //     const newContact = {
    //       id: Date.now(),
    //       name,
    //       email,
    //       role,
    //       phone,
    //     };
    //         addContact(newContact);
    //         setShowModal(true);
    //         setName('');
    //         setEmail('');
    //         setRole('');
    //         setPhone('');
    //         setErrors({});

    //     };

    const handleSubmit = (e) => {
        e.preventDefault();

        // اعتبارسنجی
        const newErrors = {};
        if (!name.trim()) newErrors.name = '*نام الزامی است*';
        if (!email.trim()) {
            newErrors.email = 'ایمیل الزامی است';
        } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/.test(email)) {
            newErrors.email = '*ایمیل معتبر وارد کنید*';
        }
        if (!role.trim()) newErrors.role = '*شغل الزامی است*';
        if (!phone.trim()) {
            newErrors.phone = '*شماره تماس الزامی است*';
        } else if (!/^09\d{9}$/.test(phone)) {
            newErrors.phone = 'شماره موبایل معتبر وارد کنید (مثلاً 09123456789)';
        }

        setErrors(newErrors);

        // اگر خطا وجود دارد، ثبت انجام نشود و اینپوت‌ها پاک نشوند
        if (Object.keys(newErrors).length > 0) return;

        // اگر خطا نیست، ثبت انجام شود
        const newContact = {
            id: Date.now(),
            name,
            email,
            role,
            phone,
        };
        addContact(newContact);
        setShowModal(true);
        setName('');
        setEmail('');
        setRole('');
        setPhone('');
        setErrors({});
    };


    const _handleNavigate = () => {
        navigate('/'); // هدایت به صفحه اصلی
    };
    return (
        <div>
            <button onClick={_handleNavigate} className="navigateButton">بازگشت به لیست مخاطب‌ها</button>
            <form onSubmit={handleSubmit} className="formStyle" noValidate>
                <div className="contactFormStyle backgroundContent">
                    <p style={{ color: "white" }}>نام و نام خانوادگی</p>
                    <input className="inputStyle" type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                {errors.name && <p style={{ color: 'red', marginTop: 4 }}>{errors.name}</p>}  

                <div className="contactFormStyle backgroundContent2">
                    <p style={{ color: "white" }}>ایمیل :</p>
                    <input className="inputStyle" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                {errors.email && <p style={{ color: 'red', marginTop: 4 }}>{errors.email}</p>}

                <div className="contactFormStyle backgroundContent">
                    <p style={{ color: "white" }}>شغل :</p>
                    <input className="inputStyle" type="text" placeholder="Role" value={role} onChange={(e) => setRole(e.target.value)} required />
                </div>
                {errors.role && <p style={{ color: 'red', marginTop: 4 }}>{errors.role}</p>}

                <div className="contactFormStyle backgroundContent2">
                    <p style={{ color: "white" }}>تلفن همراه :</p>
                    <input className="inputStyle" type="tel" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />

                </div>
                {errors.phone && <p style={{ color: 'red', marginTop: 4 }}>{errors.phone}</p>}

                <button type="submit" className="submitBtnStyle">Add Contact</button>

            </form>
            {
                showModal && (
                    <div className="modal">
                        <div className="modalContent">
                            <h3>مخاطب با موفقیت اضافه شد !!</h3>
                            <button onClick={() => setShowModal(false)}>بستن</button>
                        </div>
                    </div>
                )
            }
        </div>

    );
};

export default ContactForm;