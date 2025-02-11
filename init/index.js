const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const Mongo_URL = "mongodb://127.0.0.1:27017/wonderlust"
main().then((res) => {
    console.log("DB was reinslized");
}).catch((err) => {
    console.log(err);
});
async function main() {
    await mongoose.connect(Mongo_URL);
}

const initDB = async()=>{
await Listing.deleteMany({});
initData.data = initData.data.map((obj)=>({...obj,owner:'6788de36709d5004290dc7e3'}))
await Listing.insertMany(initData.data);
// console.log("Data was inslized");
}

initDB();