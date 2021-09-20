const path = require("path")
const webpack = require("webpack")

module.exports = {
  mode: "development", 
  devtool:"eval",
  resolve: {
  	extensions: [".js",".jsx"]
        },
  entry:{
		app:["./App.js"]
	},
  module : {
  	rules:[
	{
		test: /\.js?$/,
		loader: "babel-loader",
		options: {
			presets: ["@babel/preset-env","@babel/preset-react"],
			plugins:[]
		},
		exclude: /node_modules/
        }, { test: /\.css$/, use: [ 'style-loader', 'css-loader' ] }
  	]
  },
  output: {
    path:path.join(__dirname, "dist"), // string (default)
    filename: "bundle.js", // string (default)
  }
}