import React from 'react';

function InputField({ label, name, value, onChange }) {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}:</label>
            <input
                className='form-input'
                type="text"
                name={name}
                id={name}
                value={value}
                onChange={onChange}
            />
        </div>
    );
}

export default InputField;