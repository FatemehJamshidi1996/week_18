
// import React from 'react';
// import { ContactProvider } from './context/ContactContex';
// import { Routes, Route } from 'react-router-dom';
// import ContactForm from './component/ContactForm';
// import ContactList from './component/ContactList';
// import Search from './component/SearchBar';
// import './index.css'

// const App = () => {
//     return (
//         <ContactProvider>
//             <div className="mainContext">
               
//                 <Routes>
//                     {/*صفحه اصلی*/}
//                     <Route path="/" element={
//                         <>
//                          <h2>Contact App</h2>
//                             <Search />
//                             <ContactList />
//                         </>
//                     } />

//                     {/*صفحه افزودن مخاطب */}


//                     <Route path="/ContactForm" element={<ContactForm />} />


//                 </Routes>
//             </div>
//         </ContactProvider>
//     );
// };

// export default App;
import React, { useState } from 'react';
import { ContactProvider } from './context/ContactContext';
import { Routes, Route } from 'react-router-dom';
import ContactForm from './component/ContactForm';
import ContactList from './component/ContactList';
import EditContactForm from './component/EditeContactForm'
import Search from './component/SearchBar';
import './index.css'

const App = () => {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <ContactProvider>
            <div className="mainContext">
                <Routes>
                    <Route path="/" element={
                        <>
                            <h2>Contact App</h2>
                            <Search onSearch={setSearchTerm} />
                            <ContactList searchTerm={searchTerm} />
                        </>
                    } />
                    
                    <Route path="/ContactForm" element={<ContactForm />} />
                </Routes>
            </div>
        </ContactProvider>
    );
};

export default App;

