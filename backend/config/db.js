import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose.connect('mongodb+srv://pavanipottuparthy:00JP5TJP8tH2wAgG@cluster0.iqlqc.mongodb.net/ofds')
    .then(() =>console.log("DB Connected"));
};