const mongoose = require("mongoose");
const carSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: [true, "Please enter a brand of a car"],
    trim: true,
    maxLength: [20, "car name not exceed than 20 characters"],
  },
  phone: {
    type: Number,
    required: [true, "please enter your phone number"],
    maxLength: [20, "phone number not exceed than 20 characters"],
  },
  description: {
    type: String,
    required: [true, "Please add a description of your car"],
    maxlength: [4000, "Description is can not exceed than 4000 characters"],
  },
  price: {
    type: Number,
    required: [true, "Please add a price for your car"],
    maxLength: [8, "Price can not exceed than 8 characters"],
  },

  ratings: {
    type: Number,
    default: 0,
  },
  location: {
    type: String,
    required: [true, "Please add your location"],
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],

  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        
      },
      time: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    //required: true,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Car", carSchema);
