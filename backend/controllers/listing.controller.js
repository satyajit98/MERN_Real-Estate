const Listing = require("../models/listing.model");
const errorHandler = require("../utils/error");

// creating listing
const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

// delete listing
const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return next(errorHandler(404, "Listing not found"));
  }

  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, "You can only delete your own listing!"));
  }
  try {
    const listingDelete = await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json("Listing deleted");
  } catch (error) {
    next(error);
  }
};

// update listing
const editListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return next(errorHandler(404, "Listing Not Found"));
  }
  if (req.user._id !== listing.userRef) {
    return next(errorHandler(401, "You can only update your own listing!"));
  }
  try {
    const updateListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updateListing);
  } catch (error) {
    next(error);
  }
};

module.exports = { createListing, deleteListing, editListing };
