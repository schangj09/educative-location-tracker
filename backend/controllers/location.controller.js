const parser = require('papaparse');
const User = require('../model/User.model');

exports.addLocation = async (req, res) => {
    const {
        name, latitude, longitude
    } = req.body;

    const { _id } = req.user;

    try {
        const updatedUser = await User.findByIdAndUpdate(
            _id,
            {
                $push: {
                    locations: {
                        name, latitude, longitude
                    }
                },
                $set: {
                    currentLocation: {
                        name, latitude, longitude
                    }
                }
            },
            {
                new: true,
                useFindAndModify: false
            }
        );

        if (!updatedUser) {
            return res.status(404).json({
                message: "User not found",
                data: null
            });
        }
        res.status(200).json({
            messge: "add location success",
            data: updatedUser
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            data: null
        });
    }
}

exports.getLocationCsvData = async (req, res) => { }

exports.deleteLocation = async (req, res) => { }

exports.editLocation = async (req, res) => { }

exports.getUser = async (req, res) => { }