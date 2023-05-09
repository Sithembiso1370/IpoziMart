import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InventoryForm from './InventoryForm';
import './Inventory.css'



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

  const [placeholders, setplaceholders] = useState(
    [
      { name: "KhonaMartStockId", label: "KhonaMart Stock ID", type: "text" },
      { name: "title", label: "Title", type: "text" },
      { name: "productDescription", label: "Product Description", type: "text" },
      { name: "costValue", label: "Cost (R)", type: "number" },
      { name: "saleValue", label: "Sale (R)", type: "number" },
      { name: "productupload", label: "product", type: "file" },
      { name: "sources", label: "Sources",  type: "text"},
      { name: "manufacturepn", label: "Manufacture PN", type: "text" },
      { name: "inventoryType", label: "inventoryType", type: "text" },
      { name: "quantity", label: "Quantity", type: "number"},
      { name: "deliveryCost", label: "deliveryCost", type: "number" },
      { name: "sourceAddress", label: "sourceAddress", type: "text" },
      { name: "storesDeployed", label: "storesDeployed", type: "text" },
      { name: "deliveryCost", label: "deliveryCost (R)", type: "number" },
      { name: "brand", label: "brand", type: "text" },
      { name: "productLifeSpan", label: "productLifeSpan (Days)", type: "number" },
      { name: "sourceContactno", label: "sourceContactno", type: "number"},
      { name: "costValue", label: "costValue", type: "number" },
      { name: "saleValue", label: "saleValue", type: "number" },
      { name: "category", label: "category", type: "text" },
      { name: "status", label: "status", type: "text" }
    ]
  )
  

  const fetchInventory = async () => {
    setIsLoading(true);
    try {
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
                <th>KhonaMartStockId</th> 
                <th>title</th>
                <th>Description</th>
                <th>quantity</th>
                <th>deliveryCost</th>
                <th>costValue</th>
                <th>saleValue</th>
                <th>inventoryType</th> 
                <th>Category</th>
                <th>source</th>
                <th>storesDeployed</th>
                <th>brand</th>
                <th>status</th>
                <th>Edit</th>
                <th>Delete</th>
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
                  <td>{inventory.KhonaMartStockId}</td>

                  <td>{inventory.title}</td>
                  <td>{inventory.productDescription}</td>
                  <td>{inventory.quantity}</td>
                  <td>{inventory.deliveryCost}</td>
                  <td>{inventory.costValue}</td>
                  <td>{inventory.saleValue}</td>
                  <td>{inventory.inventoryType}</td>
                  <td>{inventory.category}</td>
                  <td>{inventory.source}</td>
                  <td>{inventory.storesDeployed}</td>
                  <td>{inventory.brand}</td>
                  <td>{inventory.status}</td>
                  <td>
                    <button onClick={(e) => handleEdit(e,inventory)}>Edit</button>
                  </td>
                  <td>
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
