import foodModel from "../models/foodModel.js";
import cloudinary from "../config/cloudinaryConfig.js";

// Add Food Item
const addFood = async (req, res) => {
  try {
    // Upload image to Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(req.file.path, {
      folder: "ecommerce_images", // Folder name in Cloudinary
    });

    // Create new food item with Cloudinary image URL
    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: cloudinaryResponse.secure_url, // Store Cloudinary URL
    });

    await food.save();
    res.json({ success: true, message: "Food Added", imageUrl: cloudinaryResponse.secure_url });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// List All Food Items
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// Remove Food Item
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);

    if (!food) {
      return res.json({ success: false, message: "Food item not found" });
    }

    // Extract Cloudinary public ID from URL
    const imagePublicId = food.image.split("/").pop().split(".")[0];

    // Delete image from Cloudinary
    await cloudinary.uploader.destroy(`ecommerce_images/${imagePublicId}`);

    // Delete food item from database
    await foodModel.findByIdAndDelete(req.body.id);

    res.json({ success: true, message: "Food Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { addFood, listFood, removeFood };
