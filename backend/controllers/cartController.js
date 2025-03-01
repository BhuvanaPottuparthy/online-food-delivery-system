import userModel from "../models/userModel.js";

// Add item to cart
const addToCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    if (!userData) return res.json({ success: false, message: "User not found" });

    let cartData = userData.cartData || {};
    cartData[req.body.itemId] = (cartData[req.body.itemId] || 0) + 1;

    await userModel.findByIdAndUpdate(req.body.userId, { cartData }, { new: true });
    res.json({ success: true, message: "Added to Cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// Remove item from cart
const removeFromCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    if (!userData) return res.json({ success: false, message: "User not found" });

    let cartData = userData.cartData || {};
    if (cartData[req.body.itemId]) {
      cartData[req.body.itemId] -= 1;
      if (cartData[req.body.itemId] === 0) {
        delete cartData[req.body.itemId];
      }
    }

    await userModel.findByIdAndUpdate(req.body.userId, { cartData }, { new: true });
    res.json({ success: true, message: "Removed from Cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// Get user cart
const getCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    if (!userData) return res.json({ success: false, message: "User not found" });

    res.json({ success: true, cartData: userData.cartData || {} });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { addToCart, removeFromCart, getCart };
