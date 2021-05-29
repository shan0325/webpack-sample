const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  mode: "development",
  entry: {
    main: "./src/app.js",
  },
  output: {
    filename: "[name].js", // [name]은 enrty에 추가한 main이 들어옴
    path: path.resolve("./dist"), // 절대경로를 구하기 위해 사용
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [path.resolve("./myloader.js")],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.png$/,
        loader: "file-loader",
        options: {
          publicPath: "./",
          name: "[name].[ext]?[hash]",
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({}),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html", // 템플릿 경로를 지정
      templateParameters: {
        // 템플릿에 주입할 파라매터 변수 지정
        env: process.env.NODE_ENV === "development" ? "(개발용)" : "",
      },
      minify:
        process.env.NODE_ENV === "production"
          ? {
              collapseWhitespace: true, // 빈칸 제거
              removeComments: true, // 주석 제거
            }
          : false,
      hash: true, // 정적 파일을 불러올때 쿼리문자열에 웹팩 해쉬값을 추가한다
    }),
  ],
};
