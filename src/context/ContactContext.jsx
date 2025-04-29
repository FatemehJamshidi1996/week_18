import React, { createContext, useReducer, useEffect } from 'react';
import contactReducer from './ContactReducer';

const ContactContext = createContext();
export default ContactContext;

export const ContactProvider = ({ children }) => {
  const getInitialState = () => {
    try {
      const localData = localStorage.getItem('contacts');
      return localData ? JSON.parse(localData) : [];
    } catch (error) {
      console.error('Error parsing localStorage:', error);
      return [];
    }
  };

  const [state, dispatch] = useReducer(contactReducer, getInitialState());

  useEffect(() => {
    try {
      localStorage.setItem('contacts', JSON.stringify(state));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }, [state]);

  const addContact = (contact) => {
    dispatch({
      type: "ADD_CONTACT",
      payload: {
        ...contact,
        id: Date.now()
      }
    });
  };

  const deleteContact = (id) => {
    dispatch({ type: "DELETE_CONTACT", payload: id });
  };
// ContactContext.js
const editContact = (updatedContact) => {
  if(!updatedContact?.id) {
    console.error('مخاطب معتبر نیست: ID وجود ندارد');
    return;
  }
  
  dispatch({ type: "EDIT_CONTACT", payload: updatedContact });
};


 
  return (
    <ContactContext.Provider value={{
      contacts: state,
      addContact,
      deleteContact,
      editContact
    }}>
      {children}
    </ContactContext.Provider>
  );
};
