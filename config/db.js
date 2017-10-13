var mongoose = require("mongoose");
var config   = require("./config");

mongoose.connect("mongodb://" + config.host + ":/" + config.port + "/" + config.database ,{});

require("../models/User");