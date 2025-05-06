import React, { useState, useContext } from "react";
import ContactContext from "../context/ContactContext";
import { useNavigate } from "react-router-dom";
import { contactSchema } from "../validations/contactSchema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const ContactForm = () => {
  const { addContact } = useContext(ContactContext);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(contactSchema),
  });

const onSubmit = (data)=>{
    console.log(data);
    addContact(data);
        setShowModal(true);
        reset();

}

  const _handleNavigate = () => {
    navigate("/"); // هدایت به صفحه اصلی
  };
  return (
    <div>
      <button onClick={_handleNavigate} className="navigateButton">
        بازگشت به لیست مخاطب‌ها
      </button>
      <form onSubmit={handleSubmit(onSubmit)} className="formStyle" noValidate>
        <div className="contactFormStyle backgroundContent">
          <p style={{ color: "white" }}>نام و نام خانوادگی</p>
          <input {...register('name')}
            className="inputStyle"
            type="text"
            placeholder="Name"
            
          />
        </div>
        {errors.name && (
          <p className="errorFormStyle">{errors.name.message}</p>
        )}

        <div className="contactFormStyle backgroundContent2">
          <p style={{ color: "white" }}>ایمیل :</p>
          <input {...register('email')}
            className="inputStyle"
            type="email"
            placeholder="Email"
            
          />
        </div>
        {errors.email && (
          <p className="errorFormStyle">{errors.email.message}</p>
        )}

        <div className="contactFormStyle backgroundContent">
          <p style={{ color: "white" }}>شغل :</p>
          <input {...register('role')}
            className="inputStyle"
            type="text"
            placeholder="Role"
           
          />
        </div>
        {errors.role && (
          <p className="errorFormStyle">{errors.role.message}</p>
        )}

        <div className="contactFormStyle backgroundContent2">
          <p style={{ color: "white" }}>تلفن همراه :</p>
          <input {...register('phone')}
            className="inputStyle"
            type="tel"
            placeholder="Phone"
           
          />
        </div>
        {errors.phone && (
          <p className="errorFormStyle">{errors.phone.message}</p>
        )}

        <button type="submit" className="submitBtnStyle">
          Add Contact
        </button>
      </form>
      {showModal && (
        <div className="modal">
          <div className="modalContent">
            <h3>مخاطب با موفقیت اضافه شد !!</h3>
            <button onClick={() => setShowModal(false)}>بستن</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactForm;
