const express = require('express');
const database = require('./config/database'); 
const authUserRoute = require('./routes/auth/authUser');
const userRoutes = require('./routes/user');


const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order');
const cartRoutes = require('./routes/cart');
const voucherRoutes = require('./routes/voucher');
const favouritesRoutes = require('./routes/favourites');
const reviewsRoutes = require('./routes/review');
const questionRoutes = require('./routes/question');
const paymentRoutes = require('./routes/stripe');
const categoriesRoutes = require('./routes/categories');
const dotenv = require('dotenv');
const cors = require('cors');



dotenv.config();

const app = express();
app.use(express.json());
app.use(cors( {origin: true, credentials: true} ));
//Authentication
app.use("/api/authUser", authUserRoute); 
app.use("/api/users", userRoutes);

app.use("/api/products", productRoutes);
app.use("/api/cart",cartRoutes);
app.use("/api/voucher",voucherRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/products",productRoutes);
app.use("/api/question",questionRoutes);
app.use("/api/favourites",favouritesRoutes);
app.use("/api/reviews", reviewsRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api", categoriesRoutes);


app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});