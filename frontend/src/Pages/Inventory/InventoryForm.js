import React, { useState } from 'react';
import axios from 'axios';
import './InventoryForm.css'
// import { input } from '@testing-library/user-event/dist/types/utils';

const InventoryForm = (props) => {
  const [formData, setFormData] = useState({});

  const handleInputChange = (e) => {
    // Dynamically set the value of the input
    setFormData({
      ...formData,
      [e.target.name]: e.target.type === 'file' ? e.target.files[0] : e.target.value,
    });
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create a new formData object to submit
    const formDataToSubmit = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSubmit.append(key, value);
    });

    // Make a POST request to the server with the form data
    try {
      const response = await axios.post('http://localhost:5000/api/inventory', formDataToSubmit);
      console.log('Product saved successfully!!!!', response.data);
      alert('Product saved successfully!!!!');
      props.fetchInventory()
      setFormData({})
    } catch (error) {
      console.log('Error submitting form:', error.response.data);
      alert('Error submitting form:')
    }
  };





  const returnInput = (field) => {
    switch (field.type) {
      case 'file':
      return <input
        type={field.type}
        name={field.name}
        onChange={handleInputChange}
      />
        // break;
      case 'select':
        return <select
          type={field.type}
          name={field.name}
          onChange={handleInputChange}
        > 
        {field.options.map((option)=><option>{option}</option>)}
        </select>
      default:
        return <input
        type={field.type}
        name={field.name}
        onChange={handleInputChange}
      />
        // break;
    }
  }
  
  return (
    <form onSubmit={handleSubmit} className="createForm">
      <div className="formHead">{props.label}</div>
      <div className="formInputsContainer">
      {props.placeholders.map((field) => (
        <div key={field.name} className="formInputContainer">
          <label htmlFor={field.name}>{field.label}</label>
          
          {
          // field.type === "file" ? (
          //   <input
          //     type={field.type}
          //     name={field.name}
          //     onChange={handleInputChange}
          //   />
          // ) : (
          //   <input
          //     type={field.type}
          //     name={field.name}
          //     onChange={handleInputChange}
          //   />
          // )
          returnInput(field)


          }
        </div>
      ))}
      </div>
      <div className="formButtonsContainer">
      <button type="submit">Save</button>
      </div>
    </form>
  );
};

export default InventoryForm;

