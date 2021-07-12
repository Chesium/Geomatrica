const path = require("path");
module.exports = {
  entry: "./src/Geomatrica.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "geomatrica.bundle.js",
  },
};
