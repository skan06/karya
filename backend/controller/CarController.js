const Car = require("../models/CarModel");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Features = require("../utils/Features");

//create car
exports.createCar = catchAsyncErrors(async (req, res, next) => {
  const car = await Car.create(req.body);
  res.status(201).json({
    success: true,
    car,
  });
});
//get all cars
exports.getAllCars = catchAsyncErrors(async (req, res) => {
  resultPerPage = 9;
  carCount = await Car.countDocuments();
  const feature = new Features(Car.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const cars = await feature.query;
  res.status(200).json({
    success: true,
    cars,
  });
});

//update admin
exports.updateCar = catchAsyncErrors(async (req, res, next) => {
  let car = await Car.findById(req.params.id);
  if (!car) {
    return next(new ErrorHandler("car is not found with this id", 404));
  }
  car = await Car.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useUnified: false,
  });
  res.status(200).json({
    success: true,
    car,
  });
});
//delete car
exports.deleteCar = catchAsyncErrors(async (req, res, next) => {
  const car = await Car.findById(req.params.id);
  if (!car) {
    return next(new ErrorHandler("car is not found with this id", 404));
  }
  await car.remove();
  res.status(200).json({
    success: true,
    message: "Car is deleted",
  });
});
// singel car details
exports.getSingleCar = catchAsyncErrors(async (req, res, next) => {
  const car = await Car.findById(req.params.id);
  if (!car) {
    return next(new ErrorHandler("car is not found with this id", 404));
  }
  await car.remove();
  res.status(200).json({
    success: true,
    car,
    carCount,
  });
});
// creat review and update review
exports.createCarReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, carId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const car = await Car.findById(carId);

  const isReviewed = car.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    car.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    car.reviews.push(review);
    car.numOfReviews = car.reviews.length;
  }

  let avg = 0;

  car.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  car.ratings = avg / car.reviews.length;

  await car.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

//get All review of singel car user
exports.getSingleCarReviews = catchAsyncErrors(async (req, res, next) => {
  const car = await Car.findById(req.query.id);

  if (!car) {
    return next(new ErrorHandler("car is not found with this id", 404));
  }

  res.status(200).json({
    success: true,
    reviews: car.reviews,
  });
});
// delet rev--admin
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {

  const car = await Car.findById(req.query.carId);

  if (!car) {
    return next(new ErrorHandler("car not found with this id", 404));
  }

  const reviews = car.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Car.findByIdAndUpdate(
    req.query.carId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});