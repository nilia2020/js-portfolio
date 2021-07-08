const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
/* const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin"); */
const Dotenv = require("dotenv-webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
module.exports = {
    entry: "./src/index.js",
    output: {
        //usamos resolve para que no haya conflicto de sistemas operativos
        path: path.resolve(__dirname, "dist"),
        // Nombre del archico de salida
        filename: "[name].[contenthash].js",
        //para que me cree un hash para el nombre de los archivos de imagenes
        assetModuleFilename: "assets/images/[hash][ext][query]",
    },
    mode: "development",
    watch: true,
    resolve: {
        // archivos aque va a leer webpack
        extensions: [".js"],
        alias: {
            "@utils": path.resolve(__dirname, "src/utils/"),
            "@templates": path.resolve(__dirname, "src/templates/"),
            "@styles": path.resolve(__dirname, "src/styles/"),
            "@images": path.resolve(__dirname, "src/assets/images/"),
        },
    },
    module: {
        rules: [
            {
                // Test declara que extensión de archivos aplicara el loader. Empiezan con m y tienen extensión js. Se pone con una epresión regular
                test: /\.m?js$/,
                // ignorar los archivos de node module
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: /\.css|.styl$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader", "stylus-loader"],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset/resource",
            },

            {
                test: /\.(woff|woff2)$/,
                use: {
                    loader: "url-loader",
                    options: {
                        limit: 10000,
                        mimetype: "application/font-woff",
                        name: "[name].[contenthash].[ext]",
                        outputPath: "./assets/fonts/",
                        publicPath: "../assets/fonts/",
                        esModule: false,
                    },
                },
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
        new MiniCssExtractPlugin({
            filename: "assets/[name].[contenthash].css",
        }), //plugin de css
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "src", "assets/images"),
                    to: "assets/images",
                },
            ],
        }),
        new Dotenv(),
        new CleanWebpackPlugin(),
    ],
    /* optimization: {
        minimize: true,
        minimizer: [
            //Instanciamos las dependencias que estamos importando
            new CssMinimizerPlugin(),
            new TerserPlugin(),
        ],
    }, */
};
