import React, { useState, useContext, useEffect } from "react";
import ContactContext from "../context/ContactContext";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { contactSchema } from "../validations/contactSchema";
import { useNavigate } from "react-router-dom";
const EditContactForm = ({ contactToEdit, onClose }) => {
  const { editContact } = useContext(ContactContext);

  const navigate = useNavigate();
  const location = useLocation();
  const contact = location.state?.contact;

  console.log("contact====>", contact);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(contactSchema),
  });

  // پر کردن فرم با داده‌های فعلی
  useEffect(() => {
    if (contact) {
      reset(contact); //با اطلاعات مخاطب را پر میکنیم
    }
  }, [contact, reset]);

  const onSubmit = (data) => {
    const updateContact = { ...data, id: contact.id };
    editContact(updateContact);
    navigate("/");
  };
  // const handleSubmit = (e) => {
  //   e.preventDefault();

  // // اضافه کردن ID به دیتا
  // const updatedData = {
  //   ...formData,
  //   id: contactToEdit.id // این خط حیاتی است!
  // };
  //   editContact(updatedData);
  //   onClose();
  // };

  return (
    <div>
      <div
        style={{
          background: "white",
          padding: "2rem",
          borderRadius: "8px",
          width: "400px",
          direction: "rtl",
        }}
      >
        <h3>ویرایش مخاطب</h3>

        <form onSubmit={handleSubmit(onSubmit)} className="formStyle">
          <div
            style={{ marginBottom: "1rem" }}
            className="contactFormStyle backgroundContent"
          >
            <p style={{ color: "white" }}> : نام و نام خانوادگی</p>
            <input
              {...register("name")}
              type="text"
              className="inputEditeStyle"
            />
          </div>
          {errors.name && (
            <p className="errorFormStyle">{errors.name.message}</p>
          )}

          <div
            style={{ marginBottom: "1rem" }}
            className="contactFormStyle backgroundContent2"
          >
            <p style={{ color: "white" }}>ایمیل :</p>
            <input
              {...register("email")}
              type="email"
              className="inputEditeStyle"
            />
          </div>
          {errors.email && (
            <p className="errorFormStyle">{errors.email.message}</p>
          )}

          <div className="contactFormStyle backgroundContent">
            <p style={{ color: "white" }}>شغل :</p>
            <input
              {...register("role")}
              className="inputEditeStyle"
              type="text"
            />
          </div>
          {errors.role && (
            <p className="errorFormStyle">{errors.role.message}</p>
          )}

          <div
            style={{ marginBottom: "1.5rem" }}
            className="contactFormStyle backgroundContent2"
          >
            <p style={{ color: "white" }}>تلفن همراه :</p>
            <input
              {...register("phone")}
              type="tel"
              className="inputEditeStyle"
            />
          </div>
          {errors.phone && (
            <p className="errorFormStyle">{errors.phone.message}</p>
          )}
          <div style={{ display: "flex", gap: "1rem" }}>
            <button type="button" onClick={onClose} style={cancelButtonStyle}>
              انصراف
            </button>
            <button type="submit" style={saveButtonStyle}>
              ذخیره تغییرات
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// استایل‌های جداگانه برای خوانایی بهتر

const cancelButtonStyle = {
  width: "180px",
  border: "1px solid #e2e8f0",
  height: "35px",

  borderRadius: "6px",
  background: "#f8fafc",
  cursor: "pointer",
  flex: 1,
};

const saveButtonStyle = {
  width: "180px",
  height: "35px",
  border: "none",
  borderRadius: "6px",
  background: "#4f46e5",
  color: "white",
  cursor: "pointer",
  flex: 1,
};

export default EditContactForm;
