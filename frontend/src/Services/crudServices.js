import axios from 'axios';

// Fields
// , upload,ntproId,description,customer,supplier,status,comments
// example values object
// const myvaluesObject =
// [
//     {
//         _id: '0244_hjdjgdggsggsggs',
//         upload: 'NTPRODI28822',
//         ntproId: 'GDJHDJJDJD',
//         description: 'hssjhjajja',
//         customer: 'gahkajakka',
//         supplier: 'hsiisiiss',
//         status:'psjjdhdhhdd',
//         comments: 'skskssls'
//     }
// ]


//  function loopToDuplicateObject(Object2Loop,Object2Return){
//         // Loop through the object passed in and append formdata
//         if(Object2Loop.length > 0){
//             Object.keys(Object2Loop).map((columnname)=>{
//                 console.log(' columnname : ',valuesObject[columnname]);
//                 if (valuesObject[columnname]) Object2Return.append(columnname, Object2Loop[columnname]);
//                 return { status: 'success', data: };
//             }); return 1;
//         }
//         else{
//             return 0
//         }
//  }


const handleFormCreate = async (e,port,cluster,valuesObject) => {
    // e.preventDefault();
    let response = {}

    const formData = new FormData();
    console.log("values object passed in : ", valuesObject)
    // Loop through the object passed in and append formdata
    if(valuesObject.length > 0){
        Object.keys(valuesObject).map((columnname)=>{
            console.log(' columnname : ',valuesObject[columnname]);
            if (valuesObject[columnname]) formData.append(columnname, valuesObject[columnname]);
            return 1;
        }); return 1;
    }


    // Try send a post request
    try {
        // console.log("formData to send = ",formData.getAll());
        const res = await axios.post(`http://localhost:${port}/api/${cluster}`, formData,
        {
            headers: {
            'Content-Type': 'multipart/form-data'
            }
        }
        );
            console.log('axios succes ', res);
            response = { status: "success",data: res.data.data}
    } catch (err) {
        console.log('axios error: ', err);
        response = { status: "failure",data: err}
    }
    return response;
};


// Can Update One Record or Multiple records at Once Depending on 
// The size/length of the Values Objec Passed In
const handleUpdateFromCluster = async (e,port,cluster,valuesObject) => {
    e.preventDefault();

    const formData = new FormData();

    // example valuesObject
    const examplevaluesObject = {
        _id: "hdjjdddkdkdkkdkdkkdd>",
        ntproId: "NT21232"
    }

    if (valuesObject.length > 0) {

        // formData.append(valuesObject.keys()[1], valuesObject[valuesObject.keys()[1]]);
        // Loop through the Values Object to append the data to formData
        Object.keys(valuesObject).map((columnname) => {
            console.log(' columnname : ',valuesObject[columnname]);
            if (valuesObject[columnname]) formData.append(columnname, valuesObject[columnname]);
            return 1;
        }
        ); 
       
        try {
            const res = await axios.put(`http://localhost:${port}/api/${cluster}}`, formData,
                {
                    headers: {
                    'Content-Type': 'multipart/form-data'
                    }
                }
            );
            console.log('axios response: ', res);
            // await props.fetchData();
        } catch (err) {
        console.log('axios error: ', err);
        }
    } else{
        console.log("No Columns to Update");
    }



    // props.fetchData();
};


const handleDelete = async (id,table) => {
    // const id = e.target.id;
    try {
        const response = await fetch(`http://localhost:5000/api/${table}/${id}`, {
            method: 'DELETE'
        });
        if(response.status === 200) {
            alert(`${table} deleted successfully`);
            // You may want to update the table data by removing the deleted row from the rows state
            // setrows(rows.filter(row => row._id !== id));
        } else {
            throw new Error(`Error deleting ${table}`);
        }
    } catch (error) {
        console.log(error);
    }
}

const getData = async (datatable) => {
    var response = await axios.get(`http://localhost:5000/api/${datatable}`);

    if(response){
        return { "message": response.message ,"data": response.data};
    }
    else{
        return { "message": response.message ,"data": []};
    }
}



export  {handleFormCreate, handleDelete, getData, handleUpdateFromCluster};