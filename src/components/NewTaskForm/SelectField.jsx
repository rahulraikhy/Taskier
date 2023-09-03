import React from 'react';

function SelectField({ label, name, value, onChange, options, placeholder }) {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}:</label>
            <select name={name} value={value} onChange={onChange}>
                {placeholder && <option value="">{placeholder}</option>}
                {options.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
            </select>
        </div>
    );
}

export default SelectField;