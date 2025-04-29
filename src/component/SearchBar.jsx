

import React from 'react';
import { useNavigate } from "react-router-dom";
import plusImg from '../assets/plus2.png';

const Search = ({ onSearch }) => {
    const navigate = useNavigate();

    return (
        <div>
            <div className="searchBoxStyle">
                <p>جستجو در مخاطبین</p>
                <input
                    type="text"
                    placeholder="جستجو..."
                    onChange={(e) => onSearch(e.target.value)}
                    style={{ width: '650px', height: '30px', margin: '0 10px' }}
                />
                <button className="buttonStyle" onClick={() => navigate('/ContactForm')}>
                    <img src={plusImg} alt="افزودن مخاطب" />
                </button>
               
            </div>
        </div>
    );
};

export default Search;
