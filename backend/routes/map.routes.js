const express = require("express");
const { authUser } = require("../middlewares/auth.middleware");
const { getCoordinates, getDistanceAndTime, getAutocompleteSuggestions } = require("../controllers/map.controller");
const router = express.Router();

router.get("/get-coordinates", authUser, getCoordinates);
router.get("/get-distanceTime", authUser, getDistanceAndTime);
router.get("/get-locationSuggestion", authUser, getAutocompleteSuggestions);
module.exports = router;
