const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "main.js",
    },
    resolve: {
        extensions: [".js"],
    },
    module: {
        rules: [
            {
                // Test declara que extensión de archivos aplicara el loader. Empiezan con m y tienen extensión js. Se pone con una epresión regular
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: /\.css|.styl$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader", "stylus-loader"],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            // plugin de html
            inject: true, // INYECTA EL BUNDLE AL TEMPLATE HTML
            template: "./public/index.html", // LA RUTA AL TEMPLATE HTML
            filename: "./index.html", // NOMBRE FINAL DEL ARCHIVO
        }),
        new MiniCssExtractPlugin(), //plugin de css
    ],
};
