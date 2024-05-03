const NodeGeocoder = require("node-geocoder");

exports.autocomplete = async (req, res) => {
  try {
    const searchKey = req.params.searchKey;
    console.log("searchKey: " + searchKey);

    const geocoder = NodeGeocoder(options = { provider: "openstreetmap" });
    const geodata = await geocoder.geocode(searchKey);
    res.status(200).json({
      message: "Autocomplete search locations success",
      data: geodata,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error: " + error.message,
      data: null,
    });
  }
};
