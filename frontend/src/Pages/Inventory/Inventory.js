import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InventoryForm from './InventoryForm';
import './Inventory.css'
import Moment from 'react-moment';
import 'moment-timezone';
import { Inventories1 } from './sampleInventory';
import EditForm from './EditForm';






const Inventory = () => {
  const [inventoryList, setInventoryList] = useState([]);
  const [inventoryItem, setinventoryItem] = useState({});
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
      { name: "source", label: "Sources",  type: "text"},
      { name: "manufacturepn", label: "Manufacture PN", type: "text" },
      { name: "inventoryType", label: "inventoryType", type: "text" },
      { name: "quantity", label: "Quantity", type: "number"},
      { name: "deliveryCost", label: "deliveryCost", type: "number" },
      { name: "sourceAddress", label: "sourceAddress", type: "text" },
      { name: "storesDeployed", label: "storesDeployed", type: "text" },
      { name: "brand", label: "brand", type: "text" },
      { name: "productLifeSpan", label: "productLifeSpan (Days)", type: "number" },
      { name: "sourceContactno", label: "sourceContactno", type: "tel"},
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
        console.log("axios error : ",err);
        setInventoryList(Inventories1);
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

  const inventoryTotalNoProducts = ()=>{
    let total = 0;
    inventoryList.forEach(element => {
      if(element.inventoryType  !== 'Operational Equipment'){
        total = total + element.quantity;
      }
    });

    return total;
  }

  const inventoryTotalNoProductsInStock = ()=>{
    let total = 0;
    inventoryList.forEach(element => {
      if(element.status  === 'In Stock' && element.inventoryType  !== 'Operational Equipment'){
        total = total + element.quantity;
      }

    });

    return total;
  }

  const inventoryTotalNoProductsEquipment = ()=>{
    let total = 0;
    inventoryList.forEach(element => {
      if(element.inventoryType  === 'Operational Equipment'){
        total = total + element.costValue*element.quantity;
      }

    });

    return total;
  }

  const inventoryTotalCost = ()=>{
    let total = 0;
    inventoryList.forEach(element => {
      if( element.inventoryType  !== 'Operational Equipment'){
        total += element.costValue*element.quantity;
      }
    });

    return total;
  }

  const inventoryTotalCostInStock = ()=>{
    let total = 0;
    inventoryList.forEach(element => {
      if(element.status  === 'In Stock' && element.inventoryType  !== 'Operational Equipment'){
        total += element.costValue*element.quantity;
      }
    });

    return total;
  }

  const inventoryTotalRevenue = ()=>{
    let total = 0;
    inventoryList.forEach(element => {
      if(element.inventoryType  !== 'Operational Equipment'){
        total = total + element.saleValue*element.quantity;
      }
      
    });
    return total;
  }

  const inventoryTotalRevenueInStock = ()=>{
    let total = 0;
    inventoryList.forEach(element => {
      if(element.status  === 'In Stock' && element.inventoryType  !== 'Operational Equipment'){
        total = total + element.saleValue*element.quantity;
      }
      
    });
    return total;
  }

  const handleEdit = async (event,inventory) => {
    event.preventDefault();
    // SET THE INVENTORY ITEM BEING CHANGED
    setinventoryItem(inventory);
    const confirmed = window.confirm(`Are you sure you want to Edit ${inventory.productDescription}?`);
    setcrudForm(<EditForm inventory={inventory} placeholders={placeholders}/>)
  }
  const [crudForm, setcrudForm] = useState(<InventoryForm inventoryItem={inventoryItem} fetchInventory={fetchInventory} btnLabel='Save' label="create" isLoading={isLoading} formData={formData} onSuccess={handleSuccess} handleSubmit={handleSubmit} handleChange={handleInputChange} handleFileChang={handleFileChange} placeholders={placeholders}/>)

 const handeTitleSearch = (e) =>{
  e.preventDefault()
  console.log(e.target.value);

  const newList = []
  inventoryList.forEach(element => {
    const title = element.title.toLowerCase();
    
    const currValue = e.target.value.toLowerCase();
    if(title.includes(currValue)){
      newList.push(element)
    }
    
  });

  if(e.target.value === ''){
    console.log("nothing typed");
    fetchInventory()
    setInventoryList(inventoryList)
  }
  else{
    if(newList.length < 1){
      console.log("no data found");
      setInventoryList(inventoryList)
    }
    else{
      console.log("matching data found")
      setInventoryList(newList)
    }
  }
 }

 const handeinventoryTypeSearch = (e) =>{
  e.preventDefault()
  console.log(e.target.value);
  console.log("Inventory list = ",inventoryList)
  const newList = []
  inventoryList.forEach(element => {
    const inventoryType = element.inventoryType;
    
    const currValue = e.target.value;
    if(inventoryType === currValue){
      newList.push(element)
    }
    
  });

  if(e.target.value === ''){
    console.log("nothing typed");
    fetchInventory()
    setInventoryList(inventoryList)
  }
  else{
    if(newList.length < 1){
      console.log("no data found");
      setInventoryList(inventoryList)
    }
    else{
      console.log("matching data found")
      setInventoryList(newList)
    }
  }
 }
 const handeinventoryStatusSearch = (e) =>{
  e.preventDefault()
  console.log(e.target.value);
  console.log("Inventory list = ",inventoryList)
  const newList = []
  inventoryList.forEach(element => {
    const inventoryStatus = element.status;
    
    const currValue = e.target.value;


    if(inventoryStatus === currValue){
      newList.push(element)
    }
    
  });

  if(e.target.value === ''){
    console.log("nothing typed");
    fetchInventory()
    setInventoryList(inventoryList)
  }
  else{
    if(newList.length < 1){
      console.log("no data found");
      setInventoryList(inventoryList)
    }
    else{
      console.log("matching data found")
      setInventoryList(newList)
    }
  }
 }

  return (
    <div  className='inventoryPage'
    style={
      { backgroundColor : 'whitesmoke'}
    }
    >
      <div className='label'>
      <h1 align="center"
      
      style={
        { color : 'orangered'}
      }
      >Central Inventory Management</h1>
      <div
          style={
            { 
              backgroundColor : 'white',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr',
              gap: '1%'
          }
          }
      >
          <div>
            Total Products Added :  <h3
                  style={
                    { color : 'orangered'}
                  }
            >{inventoryTotalNoProducts()}</h3> products
          </div>
          <div>
            Total Products on Stocked on current stock : <h3
                  style={
                    { color : 'orangered'}
                  }
            >{inventoryTotalNoProductsInStock()}</h3>   products
          </div>
          <div>
            Total Cost for all Added stock : R <h3
                  style={
                    { color : 'orangered'}
                  }
            >{inventoryTotalCost()}.00</h3>
          </div>
          <div>
            Total Revenue for all Added Stock : R <h3
                  style={
                    { color : 'orangered'}
                  }
            >{inventoryTotalRevenue()}.00</h3>
          </div>
          <div>
            Total Profit for all Added Stock : R <h3
                  style={
                    { color : 'orangered'}
                  }
            >{inventoryTotalRevenue()-inventoryTotalCost()}.00</h3>
          </div>
          <div>
            Expected Moving ROI % for all Added :  <h3
                  style={
                    { color : 'orangered'}
                  }
            >{((inventoryTotalRevenue()-inventoryTotalCost())/inventoryTotalCost())*100}%</h3>
          </div>
        
          <div>
            Total Cost for all In Stock: R <h3
                  style={
                    { color : 'orangered'}
                  }
            >{inventoryTotalCostInStock()}.00</h3>
          </div>
          <div>
            Total Expected Revenue for all In stock : R <h3
                  style={
                    { color : 'orangered'}
                  }
            >{inventoryTotalRevenueInStock()}.00</h3>
          </div>
          <div>
            Total Profit for all In stock : R <h3
                  style={
                    { color : 'orangered'}
                  }
            >{inventoryTotalRevenueInStock()-inventoryTotalCostInStock()}.00</h3>
          </div>
          <div>
            Expected Moving ROI % for all In stock :  <h3
                  style={
                    { color : 'orangered'}
                  }
            >{((inventoryTotalRevenueInStock()-inventoryTotalCostInStock())/inventoryTotalCostInStock())*100}%</h3>
          </div>
          <div>
            Total cost of all Equipment needed : R <h3
                  style={
                    { color : 'orangered'}
                  }
            >{inventoryTotalNoProductsEquipment()}.00</h3>
          </div>
          <div>
            Total cost of all Equipment Aquired : R <h3
                  style={
                    { color : 'orangered'}
                  }
            >?.00</h3>
          </div>
      </div>
      </div>
      <div className='formCrud'>
      <div align="center">
          <input type="text" placeholder='Title search...' onChange={(e)=>handeTitleSearch(e)}/>
          <input type="text" placeholder='Inventory type search...' onChange={(e)=>handeinventoryTypeSearch(e)}/>
          <input type="text" placeholder='Inventory Status search...' onChange={(e)=>handeinventoryStatusSearch(e)}/>
        </div>
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
                <th>title</th>
                <th>Description</th>
                <th>quantity</th>
                <th>Total Cost</th>
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
              inventoryList.slice(0, 150).map((inventory) => (
                <tr key={inventory._id}
                style={
                  { 
                    backgroundColor : inventory.status === 'In Stock' ? 'greenyellow' : 'gray',
                    color: inventory.status === 'In Stock' ? 'red' : 'white'
                }
                }
                >
                  
                  <td>
                    {inventory.createdBy} 
                    {/* <Moment fromNow>{inventory.createdAt }</Moment>  */}
                   </td>
                  <td>
                    {inventory.url && (
                      <img src={inventory.url} alt={inventory.productDescription} height="50" />
                    )}
                  </td>

                  <td>{inventory.title}</td>
                  <td>{inventory.productDescription}</td>
                  <td>{inventory.quantity}</td>
                  <td>{inventory.deliveryCost+inventory.costValue}</td>
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
