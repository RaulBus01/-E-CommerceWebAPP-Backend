const express = require('express');
const database = require('./config/database'); 
const eventRoutes = require('./routes/eventRoutes');
const authUserRoute = require('./routes/auth/user/authUser');
const authAdminRoute = require('./routes/auth/admin/authAdmin');
const authDistributorRoute = require('./routes/auth/distributor/authDistributor');
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');
const voucherRoutes = require('./routes/voucher');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());
//Authentication
app.use("/api/authUser", authUserRoute); 
app.use("/api/authAdmin", authAdminRoute);
app.use("/api/authDistributor", authDistributorRoute);


app.use("/api/events", eventRoutes); 
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);

app.use("/api/products",productRoutes);
app.use("/api/cart",cartRoutes);
app.use("/api/voucher",voucherRoutes);


app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
