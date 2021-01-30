const path = require("path");

module.exports = {
  "mode": "none",
  "entry": ["./app/index.js"],
  "output": {
    "path": __dirname + '/dist',
    "filename": "bundle.js"
  },
  "devServer": {
    contentBase: path.join(__dirname),
    port: 3000,
    historyApiFallback:true
  },
  "devtool": "source-map",
  "module":{
    "rules":[
      {
        "test": /\.css$/,
        "use": [
          "style-loader",
          "css-loader"
        ]
      },
      {
        "test": /\.js$/,
        "exclude": /node_modules/,
        "use": {
          "loader": "babel-loader",
          "options": {
            "presets": [
              "@babel/preset-env"             
            ],
            "plugins":[
              ["@babel/transform-runtime"]
            ]
          }
        }
      }
    ]
  }
}