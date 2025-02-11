const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
// const ExpressError = require("./utils/ExpressError.js");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");
const reviewController = require("../controllers/review.js")

//Review post route
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.createReview));

//Review Delete Route
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(reviewController.distroyReview));

module.exports = router;