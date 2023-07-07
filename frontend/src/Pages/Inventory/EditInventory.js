import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const EditInventory = () => {
  const { editId } = useParams();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);
  const navigate = useNavigate();
  const [inventory, setInventory] = useState(false);
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
  


  useEffect(() => {
    fetchTodo();
    console.log("inventory id is = ",editId)
  }, []);

  const fetchTodo = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/inventory/${editId}`);
    //   setTitle(res.data.title);
    //   setDescription(res.data.description);
    //   setCompleted(res.data.completed);

        console.log("inventory edited is : ",res.data)
        setInventory(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/inventory/${editId}`, 
      // { title, description, completed }
      inventory
      );
    //   history.push('/');
    navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    console.log("Inventory before change is : ",inventory);
    const ename=  e.target.name;
    const evalue=  e.target.value;
    inventory[ename] = evalue;


    console.log("Inventory now is : ",inventory);
  }

  const getInventoryToDisplay = () => {Object.keys(inventory).map((inventoryItemKey) =>{
      return <input
        type="text"
          placeholder={`Enter ${inventoryItemKey}`}
          name={inventoryItemKey}
          value={inventory[inventoryItemKey]}
          onChange={(e) => handleChange(e)}
    />
    })}


  return (
    <div>
      <h2>Edit Inventory ID : {inventory.title}</h2>
      {
          Object.keys(inventory).map((inventoryItemKey) =>{
            if(inventoryItemKey !== '_id' && inventoryItemKey !=='url' && inventoryItemKey !=='createdAt' && inventoryItemKey !=='updatedAt'){
                return <input
                type="text"
                  placeholder={`Enter ${inventoryItemKey}`}
                  name={inventoryItemKey}
                  // value={inventory[inventoryItemKey]}
                  onChange={(e) => handleChange(e)}
                />
            }
          })
      }
      {/* <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label>
          Completed:
          <input
            type="checkbox"
            checked={completed}
            onChange={() => setCompleted(!completed)}
          />
        </label>
        <button type="submit">Save</button>
      </form> */}
      <button type="submit" onClick={(e)=>handleSubmit(e)}>Save</button>
    </div>
  );
};

export default EditInventory;
