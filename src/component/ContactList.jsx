
import React, { useContext, useEffect, useState } from 'react';
import ContactContext from '../context/ContactContext';
import { useNavigate } from 'react-router-dom';
import EditContactForm from './EditeContactForm';

const ContactList = ({ searchTerm }) => {

    const { contacts, deleteContact } = useContext(ContactContext);
    const [filteredContacts, setFilteredContacts] = useState(contacts);
    const [showActions, setShowActions] = useState(null);
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [selectedContacts, setSelectedContacts] = useState(new Set());
    const [isSelectMode, setIsSelectMode] = useState(false);

    useEffect(() => {
        const lowerTerm = searchTerm.toLowerCase();
        const filtered = contacts?.filter(contact => {
            const phone = contact.phone?.toString() || '';
            return (
                contact.name?.toLowerCase().includes(lowerTerm) ||
                phone.includes(searchTerm) ||
                contact.email?.toLowerCase().includes(lowerTerm)
            );
        });
        setFilteredContacts(filtered);
    }, [searchTerm, contacts]);

    // توابع مدیریت انتخاب
    const handleSelect = (id) => {
        setSelectedContacts(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    };


    const handleBulkDelete = () => {
        if (selectedContacts.size === 0) return;
        if (!window.confirm(`آیا از حذف ${selectedContacts.size} مخاطب اطمینان دارید؟`)) return;

        selectedContacts.forEach(id => deleteContact(id));
        setSelectedContacts(new Set());
        setIsSelectMode(false);
    };

    console.log('Contacts in Component:', contacts); // باید آرایه را ببینید
    const [contactToDelete, setContactToDelete] = useState(null);
    const [editingContact, setEditingContact] = useState(null);


    const handleDelete = (id) => {
        debugger
        setContactToDelete(id);
        setShowModal(true);
    };

    const confirmDelete = () => {
        deleteContact(contactToDelete);
        setShowModal(false);
    };

    return (
        <div style={{ marginTop: '2rem' }}>
            
            <ul className="ulStyleFormList">
                {filteredContacts?.map((contact, index) => (
                    <li
                        key={contact.id}
                        style={{

                            background: index % 2 === 0 ? '#a3b2c1' : '#ebe3e3',
                        }}
                        className="liStyleFormList"
                    >
                        {isSelectMode && (
                <input
                    type="checkbox"
                    checked={selectedContacts.has(contact.id)}
                    onChange={() => handleSelect(contact.id)}
                    style={{ marginRight: '10px', cursor: 'pointer' }}
                />
            )}
                        <div style={{ flex: 1 }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                            }}>
                                <div className="circleName">
                                    {contact.name[0]}
                                </div>

                                <div>

                                    <div className="liItemStyle">
                                        <strong style={{
                                            fontSize: '1.2rem',
                                            color: '#1e293b'
                                        }}>
                                            {contact.name}
                                        </strong>
                                        <strong style={{
                                            fontSize: '1.2rem',
                                            color: '#1e293b'
                                        }}>  <span>{contact.email}</span>
                                        </strong>
                                        <strong style={{
                                            fontSize: '1.2rem',
                                            color: '#1e293b'
                                        }}>
                                            <span>•{contact.phone}</span>
                                        </strong>

                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* بخش دکمه‌ها */}
                        <div style={{
                            display: 'flex',
                            gap: '10px',
                            alignItems: 'center'
                        }}>
                            {/* دکمه‌های اکشن */}
                            {showActions && isSelectMode === !contact.id && (
                                <>
                                    <button
                                        onClick={() => setEditingContact(contact)}
                                        className="editeBtnStyle"
                                    >
                                        <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="#4f46e5"
                                        >
                                            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                                        </svg>
                                        <span style={{ color: '#4f46e5', fontSize: '0.9rem' }}>ویرایش</span>
                                    </button>

                                    <button
                                        onClick={() => handleDelete(contact.id)}
                                       className="deletBtnStyle"
                                    >
                                        <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="#dc2626"
                                        >
                                            <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6" />
                                        </svg>
                                        <span style={{ color: '#dc2626', fontSize: '0.9rem' }}>حذف</span>
                                    </button>
                                </>
                            )}

                            {/* دکمه سه نقطه */}
                            <button
                                onClick={() => setShowActions(showActions === contact.id ? null : contact.id)}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    padding: '6px',
                                    borderRadius: '50%',
                                    transition: 'all 0.2s ease',
                                    ':hover': {
                                        background: '#f1f5f9'
                                    }
                                }}
                            >
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#64748b"
                                >
                                    <circle cx="12" cy="12" r="1" />
                                    <circle cx="12" cy="5" r="1" />
                                    <circle cx="12" cy="19" r="1" />
                                </svg>
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            {editingContact && (
                <EditContactForm
                    contactToEdit={editingContact}
                    onClose={() => setEditingContact(null)}
                />
            )}
            {filteredContacts?.length === 0 && (
                <div style={{
                    textAlign: 'center',
                    marginTop: '3rem',
                    padding: '2rem',
                    borderRadius: '12px',
                    background: '#f8fafc',
                    maxWidth: '600px',
                    margin: '2rem auto'
                }}>
                    <svg
                        width="64"
                        height="64"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#94a3b8"
                        style={{ marginBottom: '1rem' }}
                    >
                        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <p style={{
                        color: '#64748b',
                        fontSize: '1.1rem',
                        marginTop: '1rem'
                    }}>
                        {contacts.length === 0
                            ? 'هنوز مخاطبی اضافه نشده است'
                            : 'مخاطبی با این مشخصات یافت نشد'}
                    </p>
                </div>
            )}
            {/* مودال تایید */}
            {showModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1000
                }}>
                    <div style={{
                        background: 'white',
                        padding: '2rem',
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                        maxWidth: '400px',
                        textAlign: 'center'
                    }}>
                        <h3>آیا مطمئن هستید؟</h3>
                        <p>این عمل قابل بازگشت نیست</p>

                        <div style={{
                            marginTop: '1.5rem',
                            display: 'flex',
                            gap: '1rem',
                            justifyContent: 'center'
                        }}>
                            <button
                                onClick={() => setShowModal(false)}
                                style={{
                                    padding: '8px 16px',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '6px',
                                    background: '#f8fafc',
                                    cursor: 'pointer',
                                    ':hover': {
                                        background: '#e2e8f0'
                                    }
                                }}
                            >
                                انصراف
              </button>

                            <button
                                onClick={confirmDelete}
                                style={{
                                    padding: '8px 16px',
                                    border: 'none',
                                    borderRadius: '6px',
                                    background: '#ef4444',
                                    color: 'white',
                                    cursor: 'pointer',
                                    ':hover': {
                                        background: '#dc2626'
                                    }
                                }}
                            >
                                حذف کن
              </button>
                        </div>
                    </div>
                </div>
            )}
            <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem' }}>
                <button
                    onClick={() => {
                        setIsSelectMode(!isSelectMode);
                        setSelectedContacts(new Set()); // پاک کردن انتخاب‌ها هنگام تغییر حالت
                    }}
                    style={{
                        padding: '8px 16px',
                        background: isSelectMode ? '#dc2626' : '#4f46e5',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer'
                    }}
                >
                    {isSelectMode ? 'لغو انتخاب گروهی' : 'انتخاب گروهی'}
                </button>

                {isSelectMode && selectedContacts.size > 0 && (
                    <button
                        onClick={handleBulkDelete}
                        style={{
                            padding: '8px 16px',
                            background: '#ef4444',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer'
                        }}
                    >
                        حذف انتخاب شده‌ها ({selectedContacts.size})
                    </button>
                )}
            </div>

        </div>
    );
}

export default ContactList;
