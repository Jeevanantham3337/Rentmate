const express = require("express");
const router = express.Router();
const auth = require("./auth1.js");
const House = require("../model/HouseSchema.js");
const multer = require("multer");
const upload = multer();
// @route    POST api/houses
// @desc     Add a new house
// @access   Private
router.post("/houseDetail", upload.any(), async (req, res) => {
  console.log(req.body);
  const { ownerName, contactInfo, address, description, price } = req.body;

  try {
    const newHouse = new House({
      ownerName,
      contactInfo,
      address,
      description,
      price,
    });

    const house = await newHouse.save();
    res.json(house);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Backend route to fetch data from MongoDB and send it to the frontend
router.get("/", async (req, res) => {
  try {
    const houses = await House.find(); // Assuming House is your Mongoose model for houses
    res.json(houses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
