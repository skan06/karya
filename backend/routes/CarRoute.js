const express = require("express");
const {
  getAllCars,
  createCar,
  updateCar,
  deleteCar,
  getSingleCar,
  createCarReview,
  getSingleCarReviews,
  deleteReview,
} = require("../controller/CarController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/cars").get(getAllCars);
router
  .route("/car/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createCar);
router
  .route("/car/:id")
  .put(updateCar)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteCar)
  .get(getSingleCar);
router.route("/car/review").post(isAuthenticatedUser, createCarReview);
router.route("/reviews").get(getSingleCarReviews);
router.route("/reviews").delete(isAuthenticatedUser,authorizeRoles("admin"),deleteReview)
module.exports = router;
