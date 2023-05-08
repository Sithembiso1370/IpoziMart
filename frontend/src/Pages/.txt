import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InventoryForm from './InventoryForm';
import './Inventory.css'
import { handleFormCreate } from '../../services/crudServices';
import departmentsArray from '../Departments/DepartmentsArray';

const Inventory = () => {
  const [inventoryList, setInventoryList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [departmentCategories, setdepartmentCategories] = useState(['Upper Body','Lower Body','T-Shirts'])

  const handleAddNewSupplier = () => {
    console.log("I need to work on this pop up feature to be able to add a supplier asyncronously")
    alert("I need to work on this pop up feature to be able to add a supplier asyncronously")
  }
  // Need to Create a Backend Table for Creating Data for Eact Supplier and track relationship Timeline 'Alie Express'
  const [suppliers, setsuppliers] = useState(['Alie Express',<button
  // type={field.type}
  name='suppliers'
  onClick={handleAddNewSupplier}
> 
Add New Supplier
</button>])
  const [colors, setcolors] = useState([''])
  const [placeholders, setplaceholders] = useState(
    [
      { name: "rekaStockId", label: "Reka Stock ID", type: "text" },
      { name: "title", label: "Title", type: "text" },
      { name: "productDescription", label: "Product Description", type: "text" },
      { name: "costPrice", label: "Cost (R)", type: "number" },
      { name: "salePrice", label: "Sale (R)", type: "number" },
      { name: "upload", label: "Image", type: "file" },
      { name: "supplier", label: "Supplier", type: "select" , options: suppliers},
      { name: "manufacturepn", label: "Manufacture PN", type: "text" },
      { name: "quantity", label: "Quantity", type: "number" },
      { name: "color", label: "Color", type: "select",  options: colors },
      { name: "department", label: "Department", type: "select", options: departmentsArray },
      { name: "brand", label: "Brands", type: "text" },
      { name: "store", label: "Store", type: "text" },
      { name: "deliveryCost", label: "deliveryCost (R)", type: "number" },
      { name: "sourceCountry", label: "sourceCountry", type: "text" },
      { name: "specs", label: "specs", type: "text" },
      { name: "category", label: "category", type: "select",  options: departmentCategories },
      { name: "inventoryDetails", label: "inventoryDetails", type: "text" },
      { name: "sourceLink", label: "sourceLink", type: "text" },
      { name: "sourcingLeadTimes", label: "sourcingLeadTimes", type: "text" }
    ]
  )
  

  const fetchInventory = async () => {
    setIsLoading(true);
    try {
      // const response = await axios.get('http://localhost:5000/api/inventory')
      // const data = await response.data;
      // await setInventoryList(data);
      // console.log(response)
      axios.get('http://localhost:5000/api/inventory')
      .then((res)=>{
        console.log("axios res = ",res);
        setInventoryList(res.data)
      })
      .catch((err)=>{
        console.log("axios error : ",err)
      });
      
      
    } catch (err) {
      console.log(err);
    }
    console.log("Inventory in backend = ",inventoryList);
    // console.log("Inventory length = ",inventoryList.length());
    setIsLoading(false);
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleInputChange = (e) => {
    e.preventDefault();

    // Dynamically set the value of the input
    setFormData({
      ...formData,
      [e.target.name]: e.target.type === 'file' ? e.target.files[0] : e.target.value,
    });
    console.log("formdata now = ",formData);
  };

  const handleSuccess = () => {
    setInventoryList([]);
    fetchInventory();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    
  };

  const handleFileChange = (event) => {
    setFormData({ ...formData, file: event.target.files[0] });
  };

  const handleDelete = async (e,inventory_id) => {
    e.preventDefault();
    const confirmed = window.confirm(`Are you sure you want to delete ${inventory_id}?`);
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:5000/api/inventory/${inventory_id}`);
        setInventoryList((prevInventoryList) => prevInventoryList.filter((item) => item._id !== inventory_id));
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleSubmit = async (event,label) => {
    event.preventDefault();
    setIsLoading(true);


    setIsLoading(true);

    console.log("formData to send = ",formData)
    // const submitStatus = await handleFormCreate(event,5000,'inventory',formData);

    // if(submitStatus  & submitStatus.status === "success"){
    //   setIsLoading(false);
    // }
    // else{
    //   console.log("error submiting data..")
    // }

  };

  const handleEdit = async (event,inventory) => {
    event.preventDefault();
    const confirmed = window.confirm(`Are you sure you want to Edit ${inventory.productDescription}?`);
    setcrudForm(<InventoryForm btnLabel='Update' label="edit" isLoading={isLoading} formData={formData} onSuccess={handleSuccess} handleSubmit={handleSubmit} handleChange={handleChange} handleFileChang={handleFileChange} placeholders={placeholders}/>)
  }
  const [crudForm, setcrudForm] = useState(<InventoryForm fetchInventory={fetchInventory} btnLabel='Save' label="create" isLoading={isLoading} formData={formData} onSuccess={handleSuccess} handleSubmit={handleSubmit} handleChange={handleInputChange} handleFileChang={handleFileChange} placeholders={placeholders}/>)


  // console.log('inventoryList.length : ', inventoryList.length)
  return (
    <div  className='inventoryPage'>
      <div className='label'>
      <h1>Inventory Management</h1>
      </div>
      <div className='formCrud'>
      {crudForm}
      </div>
      <div className='formTable'>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Created By</th>
                <th>Attachement</th>
                <th>rekaStockId</th> 
                <th>title</th>
                <th>manufacturepn</th>
                <th>quantity</th>
                <th>deliveryCost}</th>
                <th>sourceCountry</th>
                <th>specs</th>
                <th>Description</th> 
                <th>Category</th>
                <th>Supplier</th>
                <th>Quantity</th>
                <th>Department</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                
                inventoryList ?
              inventoryList.slice(0, 10).map((inventory) => (
                <tr key={inventory._id}>
                  
                  <td>{inventory.createdBy}</td>
                  <td>
                    {inventory.url && (
                      <img src={inventory.url} alt={inventory.productDescription} height="50" />
                    )}
                  </td>
                  <td>{inventory.rekaStockId}</td>

                  <td>{inventory.title}</td>
                  <td>{inventory.manufacturepn}</td>
                  <td>{inventory.quantity}</td>
                  <td>{inventory.deliveryCost}</td>
                  <td>{inventory.sourceCountry}</td>
                  <td>{inventory.specs}</td>
                  <td>{inventory.productDescription}</td>
                  <td>{inventory.category}</td>
                  <td>{inventory.supplier}</td>
                  <td>{inventory.quantity}</td>
                  <td>{inventory.department}</td>
                  <td>
                    <button onClick={(e) => handleEdit(e,inventory)}>Edit</button>
                    <button onClick={(e) => handleDelete(e,inventory._id)}>Delete</button>
                  </td>
                </tr>
              ))
              :
              ''
              }
            </tbody>
          </table>
      )}
      </div>
        

    </div>
  );
};

export default Inventory;
