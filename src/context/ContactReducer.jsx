

const contactReducer = (state, action) => {
  switch (action.type) {
    case "ADD_CONTACT":
      return [action.payload, ...state];

    case "DELETE_CONTACT":
      return state.filter(contact => contact.id !== action.payload);

    case "EDIT_CONTACT":

      return state.map(contact => {
        // بررسی وجود ID در payload
        if(!action.payload?.id) return contact;
        
        return contact.id === action.payload.id ? {
          ...contact,
          ...action.payload // ادغام هوشمند فیلدها
        } : contact;
      });

    default:
      return state;
  }
};

export default contactReducer;
