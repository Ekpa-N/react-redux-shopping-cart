const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const shortId = require("shortid");

const app = express();
app.use(bodyParser);

mongoose.connect("mongodb://localhost/react-shopping-cart-db", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

const Product = mongoose.model("products", new mongoose.Schema({
    _id: {type: shortId.generate}
}))

app.get("/api/products", (req, res) => {

})