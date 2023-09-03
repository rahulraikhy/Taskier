import React from 'react';

function TextAreaField({ label, name, value, onChange }) {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}:</label>
            <textarea
                className='form-input description-textarea'
                name={name}
                id={name}
                value={value}
                onChange={onChange}
                rows="5"
            ></textarea>
        </div>
    );
}

export default TextAreaField;