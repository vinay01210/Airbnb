const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer = require('multer');
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

// Index Route
router.route("/")
    .get(wrapAsync(listingController.index))
    //Create listing
    .post(
        isLoggedIn,
        upload.single("listing[image]"),
        validateListing,
    wrapAsync(listingController.createListing))
   
// new route
router.get("/new",  isLoggedIn, listingController.renderNewForm);

router.route("/:id")
    //Show Route
    .get(wrapAsync(listingController.showListing))
    //Update route
    .put(
        isLoggedIn, 
        isOwner,
         upload.single("listing[image]"), 
         validateListing, 
         wrapAsync(listingController.updateListing))
    //Delete Route
    .delete(
        isLoggedIn, 
        isOwner,
        wrapAsync(listingController.distroyListing));


//Edit Route
router.get("/:id/edit", isLoggedIn, wrapAsync(listingController.editListingForm));

module.exports = router;