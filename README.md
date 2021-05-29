# # 웹팩 이해

## 웹팩 이란?

- 웹팩은 현대의 자바스크립트 응용 프로그램을 위한 `정적 모듈 번들러`이다.

  웹 팩은 응용프로그램을 처리할 때 프로젝트에 필요한 모든 모듈을 매핑하고 하나 이상의 번들을 생성하는 종속성 그래프를 내부적으로 작성합니다

  쉽게 말해서 모듈 번들러 즉 내가 만든 모듈들을 html 파일에 들어가는 자바스크립트 파일로 변환해주는 방식을 모듈 번들링이라고 합니다.

<br>

## 모듈이란?

- 모듈은 단지 파일 하나에 불과합니다. 스크립트 하나는 모듈 하나입니다.  
  모듈에 특수한 지시자 export와 import를 적용하면 다른 모듈을 불러와 불러온 모듈에 있는 함수를 호출하는 것과 같은 기능 공유가 가능합니다.

  - export 지시자를 변수나 함수 앞에 붙이면 외부 모듈에서 해당 변수나 함수에 접근할 수 있습니다(모듈 내보내기).
  - import 지시자를 사용하면 외부 모듈의 기능을 가져올 수 있습니다(모듈 가져오기).

<br>

## 웹팩 로더란?

- 웹팩은 모든 파일을 모듈로 바라본다. 자바스크립트로 만든 모듈 뿐만아니라 스타일시트, 이미지, 폰트까지도 전부 모듈로 보기 때문에  
  import 구문을 사용하면 자바스크립트 코드 안으로 가져올수 있다.  
  이것이 가능한 이유는 웹팩의 로더 덕분이다. 로더는 타입스크립트 같은 다른 언어를 자바스크립트 문법으로 변환해 주거나 이미지를  
  data URL 형식의 문자열로 변환한다. 뿐만아니라 CSS 파일을 자바스크립트에서 직접 로딩할수 있도록 해준다.

<br>

## 웹팩 플러그인이란?

- 로더가 파일 단위로 처리하는 반면 플러그인은 번들된 결과물을 처리한다.  
  번들된 자바스크립트를 난독화 한다거나 특정 텍스트를 추출하는 용도로 사용한다.

<br>
<br>

# # 웹팩 설정

1. 프로젝트 생성(package.json)

   ```
   npm init
   ```

2. 웹팩 설치

   - 번들 작업에 필요한 webpack과 터미널 도구 cli 설치

   ```
    npm install -D webpack webpack-cli
   ```

3. 명령어로 번들링 시

   ```
   ./node_modules/.bin/webpack --mode development --entry ./src/app.js --output-path ./dist
   ```

   - --mode, --enrty, --output를 사용하면 코드를 번들링 할 수 있음

4. webpack.config.js 파일 생성

   - webpack.config.js는 webpack이 참조하는 기본 설정파일
   - mode : none, development, production(기본값) 이 있으며 mode에 따라 설정을 다르게 할 수 있음
   - entry : 시작 경로
   - output : 결과물 경로

   ```
   const path = require("path")

   module.exports = {
       mode: "development",
       entry: {
           main: "./src/app.js",
       },
       output: {
           filename: "[name].js",
           path: path.resolve("./dist"),
       },
   }
   ```

5. npm으로 웹팩 실행을 위한 package.json scripts에 명령어 추가

   - package.json 수정

   ```
   {
      "scripts": {
          "build": "./node_modules/.bin/webpack"
      }
   }
   ```

6. 커스텀 로더 만들기

   - myloader.js

   ```
   module.exports = function myloader(content) {
       console.log("myloader가 동작함")
       return content
   }
   ```

   - webpack.config.js 설정  
     로더를 사용하려면 웹팩 설정파일의 module에 추가

   ```
   module: {
        rules: [{
            test: /\.js$/, // .js 확장자로 끝나는 모든 파일
            use: [path.resolve('./myloader.js')] // 방금 만든 로더를 적용한다
        }],
   }
   ```

7. 자주 사용하는 로더
   - css-loader
     - app.js
     ```
     import "./style.css"
     ```
     - style.css
     ```
     body {
        background-color: green;
     }
     ```
     - CSS 파일을 자바스크립트에서 불러와 사용하려면 CSS를 모듈로 변환하는 작업이 필요함  
       css-loader 설치 필요
     ```
     npm install -D css-loader
     ```
     - webpack.config.js에 로더 추가
     ```
     module.exports = {
        module: {
           rules: [
                {
                    test: /\.css$/, // 로딩할 파일을 지정 .css 확장자로 끝나는 모든 파일
                    use: ["css-loader"], // 적용할 로더를 설정 css-loader를 적용한다
                },
           ],
        },
     }
     ```
   - style-loader  
     모듈로 변경된 스타일 시트는 돔에 추가되어야만 브라우져가 해석할 수 있다.  
     css-loader로 처리하면 자바스크립트 코드로만 변경되었을 뿐 돔에 적용되지 않았기 때문에 스트일이 적용되지 않았다.  
     style-loader는 자바스크립트로 변경된 스타일을 동적으로 돔에 추가하는 로더이다. CSS를 번들링하기 위해서는 css-loader와 style-loader를 함께 사용한다.
     - style-loader 설치
     ```
     npm install -D style-loader
     ```
     - webpack.config.js에 로더 추가
     ```
     module.exports = {
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: ["style-loader", "css-loader"], // style-loader를 앞에 추가한다
                },
            ],
        },
     }
     ```
     - 배열로 설정하면 뒤에서부터 앞으로 순서대로 로더가 동작한다. 위 설정은 모든 .css 확장자로 끝나는 모듈을 읽어 들여 css-loader를 적용하고 그 다음 style-loader를 적용한다.
   - file-loader
     - 파일을 모듈로 사용할 수 있음
     - style.css
     ```
     body {
        background-image: url(bg.png);
     }
     ```
     - 웹팩은 엔트리 포인트인 app.js가 로딩하는 style.css 파일을 읽을 것이다. 그리고 이 스타일시트는 url() 함수로 bg.png를 사용하는데 이때 로더를 동작시킨다.
     - file-loader 설치
     ```
     npm install -D file-loader
     ```
     - webpack.config.js에 로더 추가
     ```
     module.exports = {
        module: {
            rules: [
            {
                test: /\.png$/, // .png 확장자로 마치는 모든 파일
                loader: "file-loader",
                options: {
                    publicPath: "./dist/", // prefix를 아웃풋 경로로 지정
                    name: "[name].[ext]?[hash]", // 파일명 형식
                },
            },
            ],
        },
     }
     ```
8. 자주사용하는 플러그인

   - HtmlWebpackPlugin  
     이 플러그인으로 빌드하면 HTML파일로 아웃풋에 생성될 것이다.

     - HtmlWebpackPlugin 설치

     ```
     npm install -D html-webpack-plugin
     ```

     - src/index.html

     ```
     <!DOCTYPE html>
     <html>
        <head>
            <title>타이틀<%= env %></title>
        </head>
        <body>
            <!-- 로딩 스크립트 제거 -->
            <!-- <script src="dist/main.js"></script> -->
        </body>
     </html>
     ```

     - webpack.config.js 설정

     ```
     const HtmlWebpackPlugin = require('html-webpack-plugin');

     module.exports {
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/index.html', // 템플릿 경로를 지정
                templateParameters: { // 템플릿에 주입할 파라매터 변수 지정
                    env: process.env.NODE_ENV === 'development' ? '(개발용)' : '',
                },
                hash: true, // 정적 파일을 불러올때 쿼리문자열에 웹팩 해쉬값을 추가한다
                minify: process.env.NODE_ENV === 'production' ? {
                    collapseWhitespace: true, // 빈칸 제거
                    removeComments: true, // 주석 제거
                } : false,
            })
        ]
     }
     ```

     환경 변수에 따라 타이틀 명 뒤에 "(개발용)" 문자열을 붙이거나 떼거나 하도록 했다.  
     NODEENV=development 로 설정해서 빌드하면 빌드결과 "타이틀(개발용)"으로 나온다.  
     NODEENV=production 으로 설정해서 빌드하면 빌드결과 "타이틀"로 나온다.

   - CleanWebpackPlugin  
     CleanWebpackPlugin은 빌드 이전 결과물을 제거하는 플러그인

     - CleanWebpackPlugin 설치

     ```
     npm install -D clean-webpack-plugin
     ```

     - webpack.config.js 설정

     ```
     const { CleanWebpackPlugin } = require("clean-webpack-plugin")

     module.exports = {
        plugins: [new CleanWebpackPlugin()],
     }
     ```

## 출처 : https://ko.javascript.info/modules-intro

## 출처 : https://jeonghwan-kim.github.io/series/2019/12/10/frontend-dev-env-webpack-basic.html
