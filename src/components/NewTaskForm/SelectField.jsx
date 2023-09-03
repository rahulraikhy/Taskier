import React from 'react';

function SelectField({ label, name, value, onChange, options }) {
    return (
        <div className="form-group">
            <label>{label}:</label>
            <select
                name={name}
                value={value}
                onChange={onChange}
            >
                {options.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
            </select>
        </div>
    );
}

export default SelectField;