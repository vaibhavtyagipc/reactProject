
import React from 'react';

const Dropdown = ({ title = "Select an option", options, func }) => {
  return (
    <div className="select">
      <label htmlFor="dropdown" className="sr-only">{title}</label>
      <select defaultValue="0" onChange={func} id="dropdown" name="dropdown">
        <option value="0" disabled>
          {title}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option.toUpperCase()}
          </option>
        ))}
      </select>
    </div>  );
};

export default Dropdown;

