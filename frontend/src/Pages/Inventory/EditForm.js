import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './InventoryForm.css';

const EditForm = (props) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    // Set the initial form data
    setFormData(props.inventory);
  }, [props.inventory]);

  const handleInputChange = (e) => {
    // Dynamically set the value of the input
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.type === 'file' ? e.target.files[0] : e.target.value,
    }));
  };

  const handleUpdate = async (event) => {
    event.preventDefault();

    // Create a new formData object to submit
    const formDataToSubmit = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSubmit.append(key, value);
    });

    // Make a PUT request to the server with the form data
    try {
      const response = await axios.put(
        `http://localhost:5000/api/inventory/${props.inventory._id}`,
        formDataToSubmit
      );
      console.log('Product updated successfully!!!!', response.data);
      alert('Product updated successfully!!!!');
      props.fetchInventory();
    } catch (error) {
      console.log('Error submitting form:', error);
      alert('Error submitting form:');
    }
  };

  const returnInput = (field) => {
    switch (field.type) {
      case 'file':
        return (
          <input
            type={field.type}
            name={field.name}
            onChange={handleInputChange}
          />
        );
      case 'select':
        return (
          <select
            type={field.type}
            name={field.name}
            onChange={handleInputChange}
            value={formData[field.name] || ''}
          >
            {field.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      default:
        return (
          <input
            type={field.type}
            name={field.name}
            onChange={handleInputChange}
            value={formData[field.name] || ''}
          />
        );
    }
  };

  return (
    <form className="createForm" onSubmit={handleUpdate}>
      <div className="formHead">{props.label}</div>
      <div className="formInputsContainer">
        {props.placeholders.map((field) => (
          <div key={field.name} className="formInputContainer">
            <label htmlFor={field.name}>{field.label}</label>
            {returnInput(field)}
          </div>
        ))}
      </div>
      <div className="formButtonsContainer">
        <button type="submit">Update</button>
      </div>
    </form>
  );
};

export default EditForm;