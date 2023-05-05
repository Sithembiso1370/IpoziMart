const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require('dotenv').config()

// Route Imports
const userRoute = require('./routes/userRoute')
const enquiryRouter = require("./routes/EnquiryRoute");
const projectsRouter = require("./routes/ProjectRoute");
const repairsRouter = require("./routes/RepairRouter");
const supplierQuotesRouter = require('./routes/supplierQuotesRouter');
const customerQuotesRuoter = require('./routes/customerQuotesRoute');
const customerOrdersRouter = require('./routes/customerOrdersRouter');
const supplierOrdersRouter= require('./routes/supplierOrdersRouter');
const supplierInvoicesRouter= require('./routes/supplierInvoicesRouter');
const customerInvoicesRouter= require('./routes/customerInvoicesRouter');
const supplierDeliveryNotesRouter = require('./routes/supplierDeliveryNotesRouter');
const customerDeliveryNotesRoute = require('./routes/customerDeliveryNotesRoute');
const inventoryRouter = require('./routes/inventoryRouter');
const employeesRouter= require('./routes/employeesRouter');
const customersRouter = require('./routes/CustomersRouter');
const suppliersRouter = require('./routes/SuppliersRoute');


require('dotenv').config()

const app = express();

var corsOptions = {
    origin: "*"
  };



app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


mongoose.set('strictQuery', true);
mongoose
    .connect('mongodb://127.0.0.1:27017/reka_ecommerce',)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));


// Add Auth route
app.use("/api/auth/users", userRoute); // fields confirmed
app.use("/api/enquiries",enquiryRouter); // fields confirmed,tested crud
app.use("/api/projects", projectsRouter); // fields confirmed,tested crud
app.use("/api/repairs", repairsRouter); // fields confirmed,tested crud
app.use("/api/supplierQuotes", supplierQuotesRouter); // fields confirmed,tested crud
app.use("/api/customerQuotes", customerQuotesRuoter); // fields confirmed,tested crud
app.use("/api/customerOrders", customerOrdersRouter); // fields confirmed,tested crud
app.use("/api/supplierOrders", supplierOrdersRouter); // fields confirmed,tested crud
app.use("/api/supplierInvoices", supplierInvoicesRouter); // fields confirmed,tested crud
app.use("/api/customerInvoices", customerInvoicesRouter); // fields confirmed,tested crud
app.use("/api/supplierDeliveryNotes", supplierDeliveryNotesRouter); // fields confirmed,tested crud
app.use("/api/customerDeliveryNotes", customerDeliveryNotesRoute); // fields confirmed,tested crud
app.use("/api/inventory", inventoryRouter); // fields confirmed,tested crud
app.use("/api/employees", employeesRouter); // fields confirmed,tested crud


app.use("/api/customers", customersRouter); // fields confirmed
app.use("/api/suppliers", suppliersRouter); // fields confirmed


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
