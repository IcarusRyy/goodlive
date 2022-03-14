# GOODLIVE

## 技术栈
React + ReactHook + ReactRouter + Redux + axios + less + 第三方库

## 计划完成功能
1、首页展示
2、城市管理
3、搜索功能
4、上拉加载
5、详情页
6、收藏功能
7、订单评价

## 初始化环境构建
1、项目环境： create-react-app 脚手架构建项目环境
2、支持less语法（支持scss语法）
3、集成网络请求Axios
## Less支持的配置
在React脚手架的环境中，默认支持的是CSS和Sass/Scss，所以需要自己配置Less
1、执行命令行：npm run eject // 拉去配置环境webpack文件  (脚手架创建完项目不要做任何操作，直接执行此命令)，如果我们修改了文件，打开文件根目录，删除隐藏的.git文件夹，然后再次执行命令；
2、安装依赖
  yarn add --save-dev less less-loader
3、修改webpack.config.js 配置文件

## 配置网络请求
1、安装依赖
npm install --save axios (yarn add -S axios)

2、配置相关文件

src/utils

import axios from 'axios'
import qs from 'querystring'

/**
 * 处理失败的方法
 * status:状态码
 * info:信息
 */
const errorHandle = (status, info) => {
  switch (status) {
    case 400:
      console.log(
        '语义有误，当前请求无法被服务器理解。除非进行修改，否则客户端不应该重复提交这个请求。',
      )
      break
    case 401:
      // token:令牌
      console.log('服务器认证失败')
      break
    case 403:
      console.log('服务器已经理解请求，但是拒绝执行它')
      break
    case 404:
      console.log('请检查网络请求地址')
      break
    case 500:
      console.log(
        '服务器遇到了一个未曾预料的状况，导致了它无法完成对请求的处理。一般来说，这个问题都会在服务器的程序码出错时出现。',
      )
      break
    case 502:
      console.log('作为网关或者代理工作的服务器尝试执行请求时，从上游服务器接收到无效的响应。')
      break
    default:
      console.log(info)
      break
  }
}

/**
 * 创建axios实例对象
 */

const instance = axios.create({
  timeout: 5000,
})

/**
 * 处理拦截器
 */

/**
 * 请求拦截
 */
instance.interceptors.request.use(
  (config) => {
    if (config.method === 'post') {
      config.data = qs.stringify(config.data)
    }
    return config
  },
  (error) => Promise.reject(error),
)

/**
 * 响应拦截
 */
instance.interceptors.response.use(
  // 完成了
  (response) => (response.status === 200 ? Promise.resolve(response) : Promise.reject(response)),
  (error) => {
    const { response } = error
    errorHandle(response.status, response.info)
  },
)

export default instance

src/api

import axios from '../utils'

/**
 * 路径地址
 */
const base = {
  baseUrl: 'http://localhost:5566',
  homehot1: '/api/home/hot1',
  homehot2: '/api/home/hot2',
}

/**
 * 请求方法
 */
const api = {
  /**
   * 获取首页热门产品1
   */
  getHomtHot1() {
    return axios.get(base.baseUrl + base.homehot1)
  },
  getHomtHot2() {
    return axios.get(base.baseUrl + base.homehot2)
  },
}

export default api

## 配置初始化样式
1、初始化css文件
2、引入字体 图标库：iconfont

## 实现首页展示 
scr/pages 新建四个文件夹 HomePage LifeServer Shop User
1、创建页面：HomePage LifeServer Shop User
2、创建路由
  安装依赖 yarn add react-router-dom 
  配置AppRouter文件
3、底部导航
src/component
4、顶部导航
src/component/headnav
















# 创建一个基础项目
npm init -y 自动生成package.json文件
创建以下文件目录
└── src/
    ├── index.ts    // 项目入口文件
├── package.json
# 添加typescript
安装ts
yarn add typescript --dev
然后进行 TypeScript 配置！ 在项目根目录通过tsc --init命令来创建 tsconfig.json 文件并替换为以下内容
{
  "compilerOptions": {
    "module": "esnext",
    "target": "esnext",
    "lib": ["esnext", "dom"],
    "baseUrl": ".",
    "jsx": "react-jsx",
    "resolveJsonModule": true,
    "allowSyntheticDefaultImports": true,
    "moduleResolution": "node",
    "forceConsistentCasingInFileNames": true,
    "noImplicitReturns": true,
    "suppressImplicitAnyIndexErrors": true,
    "noUnusedLocals": false,
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "strict": true,
    "paths": {
      "@/*": ["./src/*"]
    },
    "noEmit": true
  },
  "include": [
    "src/**/*",
    "typings/**/*",
    "config/**/*",
    ".eslintrc.js",
    ".stylelintrc.js",
    ".prettierrc.js"
  ],
  "exclude": ["node_modules", "build", "dist"]
}

tsconfig.json 中的编译选项仅仅针对代码类型检查，而不是代码编译,因此不需要让 TypeScript 生成编译文件

以下是tsconfig.json中一些设置的解释

lib: TS 需要引用的库，即声明文件，ES5 默认 dom,es5,scripthost
allowJs: 允许编译 JS 文件(js,jsx)
allowSyntheticDefaultImports: 允许从没有设置默认导出的模块中默认导入. 参考文档
esModuleInterop: 参考文档
skipLibCheck:忽略所有的声明文件（ *.d.ts）的类型检查
strict:开启所有严格的类型检查.如果 strict=true,则 所有 strict 相关的配置都应该为 true
forceConsistentCasingInFileNames:禁止对同一个文件的不一致的引用.例如:引用文件时大小写必须一致
moduleResolution:使用哪种模块解析策略.参考文档
resolveJsonModule:是否可以导入 JSON 模块.参考文档
isolatedModules:每个文件必须是模块.参考文档
noEmit:不生成输出文件
jsx: 是否支持 JSX.参考文档
include:编译器需要编译的文件或者目录

# 添加ESlint代码规范校验

yarn add eslint eslint-plugin-react eslint-plugin-react-hooks @typescript-eslint/parser @typescript-eslint/eslint-plugin --dev

以下是一些 ESLint 依赖的解释

eslint: ESLint 核心库
eslint-plugin-react: React 代码规范的校验规则
react/jsx-key:用来检查是否声明了 key 属性
no-array-index-key:用来检查是否使用了数组索引声明 key 属性
eslint-plugin-react-hooks:React hooks 代码规范的校验规则
rules-of-hooks: 用来检查 Hook 的规则(不能 if/循环中使用 Hooks)
exhaustive-deps 规则，此规则会在useEffct添加错误依赖时发出警告并给出修复建议
@typescript-eslint/parser:将 TypeScript 代码纳入 ESLint 校验范围
@typescript-eslint/eslint-plugin:TypeScript 代码规范的校验规则

在根目录创建.eslintrc.json文件并加入以下内容
{
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "plugins": ["@typescript-eslint", "react-hooks"],
  "extends": [
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "rules": {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react/prop-types": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off"
  }
}

我们在 ESLint 配置文件中做了下面的事情

将@typescript-eslint/parser 作为ESLint 解析器
使用plugin:react/recommended/plugin:@typescript-eslint/recommended作为基本规则集
添加了两个 React Hooks 规则，并取消了 react/prop-types 规则,因为 prop 类型与 React 和 TypeScript 项目无关。
关闭了explicit-module-boundary-types,Typescript 中,必须明确指定函数的返回值类型。并且函数中的return后的类型必须与指定的类型一致 参考文档

如果需要屏蔽不需要检测的文件或目录，可以在项目根目录添加 .eslintignore 文件。并加入类似的如下内容
.DS_Store
node_modules
dist
build
public

# 添加Prettier
yarn add prettier -D
在项目根目录新建.prettierrc.js(可以出现注释) , 并加入以下内容
module.exports={
    "printWidth": 100, // 换行字符串阈值
    "semi": false, // 句末加分号
    "singleQuote": true, // 用单引号
    "tabWidth": 2,
    "trailingComma": "all", // 最后一个对象元素加逗号
    "bracketSpacing": true, // 对象，数组加空格
    "jsxBracketSameLine": false, // jsx > 是否另起一行
    "arrowParens": "always", // (x) => {} 是否要有小括号
    "requirePragma": false, // 是否要注释来决定是否格式化代码
    "proseWrap": "preserve" // 是否要换行
}
如果需要屏蔽不必要的文件，可以在项目根目录添加 .prettierignore文件, 并加入以下内容
*.svg
package.json
.DS_Store
.eslintignore
*.png
*.toml
.editorconfig
.gitignore
.prettierignore
LICENSE
.eslintcache
*.lock
yarn-error.log
/build
/public

# 添加 EditorConfig 代码风格统一工具
VSCode 安装 EditorConfig 插件
在项目根目录创建.editorconfig并加入以下内容
// # http://editorconfig.org
root = true

[*]
#缩进风格：空格
indent_style = space
#缩进大小2
indent_size = 2
#换行符lf
end_of_line = lf
#字符集utf-8
charset = utf-8
#是否删除行尾的空格
trim_trailing_whitespace = true
#是否在文件的最后插入一个空行
insert_final_newline = true

[*.md]
trim_trailing_whitespace = false

[Makefile]
indent_style = tab

# 添加 stylelint
为VSCode 安装 stylelint 插件
yarn add stylelint stylelint-config-standard --dev

在根目录新建 .stylelintrc.js文件, 并加入以下内容
module.exports = {
  extends: "stylelint-config-standard",
  rules: {
    // your rules
  },
  // 忽略其他文件，只校验样式相关的文件
  ignoreFiles: [
    "node_modules/**/*",
    "public/**/*",
    "dist/**/*",
    "**/*.js",
    "**/*.jsx",
    "**/*.tsx",
    "**/*.ts",
  ],
};
# 添加 Git Hook
yarn add husky lint-staged --dev
{
  "scripts": {
    "precommit": "lint-staged",
    "lint-staged:js": "eslint --ext .js,.jsx,.ts,.tsx"
  },
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "**/*.less": "stylelint --syntax less",
    "**/*.{js,jsx,ts,tsx}": "npm run lint-staged:js",
    "**/*.{js,jsx,tsx,ts,less,md,json}": ["prettier --write"]
  }
}
# 创建一个基础项目
└── config/                                            // webpack配置文件
    ├── webpack.dev.js
    ├── webpack.pro.js
    ├── webpack.common.js
└── public/
    ├── index.html/                                   // html模板文件
└── src/
    ├── index.tsx                                    // 项目入口文件
├── package.json

这个 HTML 文件是 Webpack 构建过程中的模板文件。目的是告诉 Webpack 将 React 代码注入到 id="root"的 div 元素中，并在 HTML 中自动引入打包好的 JavaScript 和 CSS。

# 添加React
yarn add react react-dom
yarn add   @types/react @types/react-dom --dev
# 添加 React 根组件
创建一个 src/index.tsx 来编写 React 组件，此代码将会被展示到index.html 文件id="root"的 div 元素下
import React from "react";
import ReactDOM from "react-dom";

const App = () => <h1>My React and TypeScript App!</h1>;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

# 添加Babel
使用 Babel 将 React 和 TypeScript 代码转换为 JavaScript。
 yarn add @babel/core @babel/preset-env @babel/preset-react @babel/preset-typescript @babel/plugin-transform-runtime @babel/runtime   --dev

以下是一些 Babel 依赖的解释

@babel/core:Babel 核心库
@babel/preset-env:让我们可以在不支持 JavaScript 最新特性的浏览器中使用 ES6+语法
@babel/preset-react:将 React 代码转换为 JavaScript
@babel/preset-typescript:将 TypeScript 代码转换为 JavaScript
@babel/plugin-transform-runtime 和@babel/runtime:支持在低版本浏览器使用 ES6+语法,如 async/await

# Babel 配置
我们通过.babelrc文件来进行 Babel 配置，在根目录创建此文件并加入以下内容
{
  "presets": [
    "@babel/preset-env",
    "@babel/preset-react",
    "@babel/preset-typescript"
  ],
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "regenerator": true
      }
    ]
  ]
}
# 添加 Webpack
yarn add webpack webpack-cli @types/webpack --dev

在开发环境中，我们还要使用 Webpack 为我们提供的 web server功能
yarn add webpack-dev-server @types/webpack-dev-server  --dev

安装babel-loader-通知 Babel 将 React 和 TypeScript 代码转换为 JavaScript
yarn add babel-loader  --dev

安装 html-webpack-plugin-用来生成 HTML 模板
yarn add html-webpack-plugin  --dev

# 开发环境配置
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = {
  mode: "development",
  entry: {
    main: path.resolve(__dirname, "../src/index.tsx"),
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "../build"),
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
            plugins: [
              [
                "@babel/plugin-transform-runtime",
                {
                  regenerator: true,
                },
              ],
            ],
          },
        },
      },
    ],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../src"),
    },
    extensions: [".tsx", ".ts", ".jsx", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devtool: "inline-source-map",
  devServer: {
    contentBase: path.join(__dirname, "../build"),
    historyApiFallback: true,
    port: 4000,
    hot: true,
  },
};

module.exports = config;

下面是一些相关配置的解释

mode : 构建开发环境代码还是生产环境代码。在上面的配置中我们使用development. Webpack 会自动将 process.env.NODE_ENV设置为development
output.public:构建的根路径是什么。
entry :模块构建的入口文件.在我们的项目中,入口是 src/index.tsx
module: 用于处理不同的资源模块.在我们的项目中，用babel-loader来处理.js,.jsx,.js,.tsx 后缀的文件
resolve.alias: 可以让我们在引入模块路径时使用别名
resolve.extensions告诉 Webpack 在模块解析期间要按顺序查找哪些文件的后缀,以方便我们在在引入模块文件时不带后缀名。
HtmlWebpackPlugin:用来创建 HTML 文件.在上面的配置中，我们告诉此插件使用public/index.html 作为文件模板
HotModuleReplacementPlugin/devServer.hot:修改业务代码后界面可以自动局部刷新，而不是整体刷新
devtool: 使用inline-source-map，可以在让我们在谷歌开发工具中调试源代码
devServer: 启动 Webpack 开发服务器，我们告诉 Webpack web 服务的根路径是 build目录,并且在4000端口上启动服务. historyApiFallback 对于多页面应用是比较有用的。最后，使用open在服务启动后自动打开浏览器

# 为开发环境添加 NPM 脚本
为了方便以开发模式启动应用,可以利用 npm 脚本-将以下内容添加到package.json中
  ...
  "scripts": {
    "start": "webpack serve --config config/webpack.dev.js",
  }
  ...


启动应用
yarn start
N 秒后，Webpack development server 将会启动，然后我们在浏览器中访问http://localhost:4000

# 在 Webpack 中手动配置热更新插件
可能因为各种各样的原因导致 webpack 的 HMR 不生效。我们还可以手动配置热更新插件！

安装 React 热更新插件react-refresh-webpack-plugin
yarn add -D @pmmmwh/react-refresh-webpack-plugin react-refresh

修改config/webpack.dev.js并加入以下内容
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const config = {
  // 指定target为 web
  target: "web",
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/i,
        include: path.resolve(__dirname, "../src"),
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
            plugins: [
              [
                "@babel/plugin-transform-runtime",
                {
                  regenerator: true,
                },
              ],
              // 热更新加载器
              "react-refresh/babel",
            ],
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // 热更新插件
    new ReactRefreshWebpackPlugin({
      exclude: [/node_modules/],
    }),
  ],
};

# 在 webpack 构建过程中添加类型检查
目前, Webpack 构建过程没有做任何类型检查，我们可以使用fork-ts-checker-webpack-plugin 让 Webpack 构建过程支持类型检查。这意味着 Webpack 会通知我们任何类型相关的错误。 接下来我们安装相关依赖
yarn add fork-ts-checker-webpack-plugin @types/fork-ts-checker-webpack-plugin --dev

在webpack.dev.js添加如下配置
...
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

const config = {
  ...,
  plugins: [
    ...,
    new ForkTsCheckerWebpackPlugin({
      async: false
    }),
  ],
};

# 在 webpack 构建过程中添加代码规范校验
目前，Webpack 构建流程不会执行代码规范校验。 我们可以使用ESLintPlugin来使 Webpack 构建过程能够使用 ESLint 进行代码规范校验。 这意味着 Webpack 会通知我们任何代码规范校验的错误。 让我们安装这个依赖
yarn add eslint-webpack-plugin --dev

在 webpack.dev.js 修改如下内容
...
const ESLintPlugin = require('eslint-webpack-plugin')

const config = {
  ...,
  plugins: [
    ...,
    new ESLintPlugin({
      extensions: ["js", "jsx", "ts", "tsx"],
    }),
  ],
};

# 生产环境配置
Webpack 的生产环境配置与开发环境有些不同-我们需要项目代码被打包到文件目录中，并且做一定的优化

不需要热更新/代码规范校验等功能
为打包的文件名生成 hash 串
清空打build目录
压缩代码
......

让我们创建webpack.pro.js并加入以下内容

const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = {
  mode: "production",

  entry: {
    main: path.resolve(__dirname, "../src/index.tsx"),
  },
  output: {
    filename: "[name].[contenthash].js",
    publicPath: "",
    path: path.resolve(__dirname, "../build"),
    // 打包前清空输出目录
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
    }),
  ],
};

module.exports = config;

配置与开发环境很像，但是又有以下不同


我们将mode设置为 production. Webpack 会自动将process.env.NODE_ENV设置为production.这意味着打包后的代码中不会包含 React 开发者工具


output告诉 Webpack 将打包后的资源放到哪里.在我们的项目中，是放在build 目录中.

如果项目中做了代码分离(code split).我们使用[name]标志告诉 Webpack 分离后的文件名称
同时将[contenthash]标志加入到文件名称中.以便在代码内容更改后，打包以生成新的文件名称。这就可以避免浏览器缓存旧的文件
clean: true用来在每次打包构建前清空build目录，而不需要额外的插件，比如CleanWebpackPlugin

# 为生产环境添加 NPM 脚本
  ...,
  "scripts": {
    "build": "webpack --config config/webpack.pro.js",
  },
  ...
npm run build

如果我们查看 JavaScript 文件，可以发现它是被压缩过的。因为 Webpack 在生产模式会使用TerserWebpackPlugin来压缩代码。

打包后的 JavaScript 文件也包含了我们应用程序中的所有代码以及 react 和 react-dom 依赖包中的代码。
如果我们查看 html 文件，会发现所有空格/换行都已被删除。 如果仔细观察，我们会看到一个 script 元素，该元素是通过HtmlWebpackPlugin自动插入的，以便引用打包后的 JavaScript 文件

# 抽离 Webpack 的公共配置
虽然，我们将 生产环境 和 开发环境 做了区分，但是我们还是应该遵循不重复原则(Don't repeat yourself - DRY)，保留一个 "common(通用)" 配置。为了将这些配置合并在一起，我们使用一个名为 webpack-merge 的工具。此工具会引用 "common" 配置，因此我们不必再在环境特定(environment-specific)的配置中编写重复代码。

yarn add  webpack-merge --dev

添加 config/webpack.common.js 文件并加入以下配置

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    main: path.resolve(__dirname, "../src/index.tsx"),
  },

  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
            plugins: [
              [
                "@babel/plugin-transform-runtime",
                {
                  regenerator: true,
                },
              ],
            ],
          },
        },
      },
    ],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../src"),
    },
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "React Build",
      template: "public/index.html",
    }),
  ],
};

修改 config/webpack.dev.js 的配置

const path = require("path");
const webpack = require("webpack");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "../build"),
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ForkTsCheckerWebpackPlugin({
      async: false,
    }),
    new ESLintPlugin({
      extensions: ["js", "jsx", "ts", "tsx"],
    }),
  ],
  devtool: "inline-source-map",
  devServer: {
    contentBase: path.join(__dirname, "../build"),
    historyApiFallback: true,
    port: 4000,
    hot: true,
  },
});

修改config/webpack.prod.js的配置

const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "production",
  output: {
    filename: "[name].[contenthash].js",
    publicPath: "",
    path: path.resolve(__dirname, "../build"),
    // 打包前清空输出目录
    clean: true,
  },
});

在 webpack.common.js 中，我们设置了 entry 和 output 配置，并且在其中引入了开发/生产环境公用的全部插件。
在 webpack.dev.js 中，我们将 mode 设置为 development，并且为此环境添加了推荐的 devtool（强大的 source map）和简单的 devServer 配置。
在 webpack.prod.js 中，我们将 mode 设置为 production


# 为开发环境配置css
yarn add css-loader style-loader --dev

我们需要让 Webpack 知道如何解析 CSS 文件，因此我们需要在webpack.dev.js中加入两个解析器
const config= {
  ...
  module: {
    rules: [
      ...,
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  ...
};

css-loader 在 import 语句（在我们的示例中为app.css）中读取引用的 CSS 文件并解析成 JavaScript 代码。
style-loader 将 JavaScript 代码中的 CSS 以 style 标签的形式插入到 html 文件中。

# 为生产环境配置 CSS
在生产环境中，需要把 CSS 样式抽离成单独的文件(避免浏览器缓存). 我们可以使用mini-css-extract-plugin代替style-loader来做到这一点。
yarn add mini-css-extract-plugin @types/mini-css-extract-plugin --dev

然后，我们需要把此 loader 加入到生产环境配置文件中，在webpack.prod.js中修改如下内容

...
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const config= {
  ...,
  module: {
    rules: [
      ...,
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  ...,
  plugins: [
    ...,
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
  ],
  ...
};
mini-css-extract-plugin会将 CSS 样式从 JS 代码中抽离出来并创建.css 文件

# 开启CSS module

css-module 作用 大家都知道相同的类名是可以覆盖的，如果我们在不同的css文件中使用了相同的css类名 那么后者就会将前者覆盖掉，这样对开发者十分不友好(想类名也是很累的)。
于是css-module应运而生，他将css模块化，在后面自动添加一写hash值以保证不会重复。
！注意： 这个配置不能用于匹配css文件中。
：原因： 如果项目中使用的是antd组件库的话，因为antd组件库使用的是css文件，如果写在匹配css文件的配置中就会造成antd组件样式不生效。

src/@types/typings.d.ts
并加入以下内容
declare module "*.css";


修改webpack.dev.js
...
      {
        test: /\.css$/i,
        use: ["style-loader", {
          loader: "css-loader",
          options: {
            modules: true,
          },
        },
        ],
      },
...
修改webpack.pro.js
...
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, {
          loader: "css-loader",
          options: {
            modules: true,
          },
        },],
      },
...


# 在项目中配置Less
yarn add less less-loader --dev


修改webpack.dev.js 配置

      {
        test: /\.less$/i,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
          {
            loader: "less-loader",
          },
        ],
      },

修改webpack.pro.js 配置
      {
        test: /\.less$/i,
        use: [MiniCssExtractPlugin.loader, {
          loader: "css-loader",
          options: {
            modules: true,
            importLoaders: 1,
          },
        },
        {
          loader: "less-loader",
        },
        ],
      },
在typings.d.ts添加以下内容，否则Ts无法识别less类型
declare module "*.less";

# 在项目中配置 Sass

修改webpack.dev.js 配置

      {
        test: /\.s[ac]ss$/i,
        use: [
          //从包含CSS的JS代码中 创建 `style` 节点
          {
            loader: "style-loader",
          },
          // 将 CSS 转换为 CommonJS 格式的JS代码
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
          // 将 Sass 转换为 CSS
          {
            loader: "sass-loader",
          },
        ],
      },

修改webpack.pro.js 为如下配置

      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, {
          loader: "css-loader",
          options: {
            modules: true,
            importLoaders: 1,
          },
        },
        {
          loader: "sass-loader",
        },
        ],
      },

在typings.d.ts添加以下内容，否则Ts无法识别sass、scss类型
declare module "*.sass";
declare module "*.scss";

# 为项目添加UI库 - Antd
yarn add antd

@import "~antd/dist/antd.css";

全局引入antd 样式  但是并不会生效

因为我们的webpack项目配置了css-modules，它会讲Ant的样式模块化前缀及哈希化处理，导致样式不匹配
因此建议CSS模块化配置将node_modules目录文件exclude掉，不要让它们走CSS Modules

换句话说就是让antd的less不通过css-module-loader
只让项目自己的 less 文件通过 css-module-loader

webpack.dev.js

const path = require('path')
const webpack = require('webpack')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')

const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'development',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../build'),
  },
  // 指定target为 web
  target: 'web',
  module: {
    rules: [
      // 配置css
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
        ],
       // exclude: path.resolve(__dirname, '../src'),
      },
      {
        test: /\.less$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
        include: path.resolve(__dirname, '../src'),
      },
      // 配置scss
      {
        test: /\.s[ac]ss$/i,
        use: [
          //从包含CSS的JS代码中 创建 `style` 节点
          {
            loader: 'style-loader',
          },
          // 将 CSS 转换为 CommonJS 格式的JS代码
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
          // 将 Sass 转换为 CSS
          {
            loader: 'sass-loader',
          },
        ],
      },
      // // 解析图片 ，字体
      {
        test: /\.(png|jpg|jpeg|gif|woff|woff2|eot|ttf|otf)$/i,
        type: 'asset',
        generator: {
          //与output.assetModuleFilename是相同的,这个写法引入的时候也会添加好这个路径
          filename: 'static/[hash][ext][query]',
        },
        // 只解析src目录
        include: path.resolve(__dirname, '../src'),
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    //
    new ReactRefreshWebpackPlugin({
      exclude: [/node_modules/],
    }),
    // 构建过程支持类型检查
    new ForkTsCheckerWebpackPlugin({
      async: false,
    }),
    // webpack 构建过程中使用ESLint 进行代码规范校验
    new ESLintPlugin({
      extensions: ['js', 'jsx', 'ts', 'tsx'],
    }),
  ],
  devtool: 'inline-source-map',
  devServer: {
    // contentBase: path.join(__dirname, "../build"),
    historyApiFallback: true,
    port: 4000,
    hot: true,
  },
})


# 配置webpack以解析图片

在src/typings.d.ts加入以下代码
declare module "*.svg";
declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.gif";
declare module "*.bmp";
declare module "*.tiff";


module: {
    rules: [
      ...,
      // 解析图片 ，字体
      {
        test: /\.(png|jpg|jpeg|gif|woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: 'static/[hash][ext][query]'
        },
        // 只解析src目录
        include: path.resolve(__dirname, "../src"),
      },
    ],
  },
在生产环境和开发环境的配置文件中都加入上面的代码


# 五 集成React-Router/Antd Menu
## 安装依赖
yarn add react-router-dom
yarn add @types/react-router-dom --dev
## 路由基础配置
我们先实现一个简单的路由配置及页面跳转功能
根目录下 创建routes文件夹 用于配置路由

// routes/index.ts

import About from './about'
import Home from './home'

const MyRoutes = [...About, ...Home]
export default MyRoutes


// routes/home

import Home from '../../src/pages/home'
const routes = [
  {
    key: 'home',
    path: '/',
    component: Home,
  },
]
export default routes

// routes/about
// 此处 在about中嵌套了 haha 路由
import About from '../../src/pages/about'
import Haha from '../../src/pages/haha'
const routes = [
  {
    key: 'about',
    path: 'about/*',
    component: About,
  },
  {
    key: 'haha',
    path: 'about/haha/*',
    component: Haha,
  },
]
export default routes

在src文件夹下创建pages文件夹，并分别创建各组件文件夹
 // src/pages/home
 //  home 文件夹 作为初始页面 可以跳转About页面及home页面
 import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
        <hr />
        <h1>Home</h1>
      </div>
    </>
  )
}
export default Home


// src/pages/about
// about 页面 嵌套了 haha页面

import About from '../../src/pages/about'
import Haha from '../../src/pages/haha'
import React from 'react'
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about/haha">haha</Link>
          </li>
        </ul>
        <hr />
        <h1>About</h1>
      </div>
    </>
  )
}
export default About

// src/pages/haha
// 可以返回初始home页面及about页面
import React from 'react'
import { Link } from 'react-router-dom'

const Haha = () => {
  return (
    <>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">about</Link>
          </li>
        </ul>
        <hr />
        <h1>haha</h1>
      </div>
    </>
  )
}
export default Haha

// 根目录下 App.tsx
// 在App根组件中 配置路由组件则
// react-router v6 将Switch 更名为 Routes 并配置规则改变为 path element等
import React from 'react'
import './app.less'
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom'
// import { Switch } from 'react-router-dom'
import MyRoutes from '../routes'
const App = () => (
  <>
    <Router>
      <Routes>
        {/* <Route path="/" element={<Home />} />
          <Route path="about/*" element={<About />} /> */}
        {MyRoutes.map((item) => (
          <Route key={item.key} path={item.path} element={<item.component />} />
        ))}
      </Routes>
    </Router>
  </>
)

export default App

# 六 集成Redux/Typescript
## 安装依赖
yarn add redux react-redux
yarn add @types/react-redux --dev
// 安装 redux开发者工具
yarn add redux-devtools --dev

### 通过 Redux 实现一个用户名的添加和删除
将以下类型作为 stores 的状态类型
// src/redux/data.d.ts

// 用户的字段类型
export type Person = {
  id: string;
  name: string;
};

// 所有用户的类型
export type AppState = {
  people: Person[];
};

可以发现，我们的应用状态是一个 people ,它是包含 id/name 的数组类型
状态我们尽量简化，因为我们主要专注于 Redux Store 以及 React 组件如何以强类型的方式进行交互。

### Actions 和 action 创建函数
众所周知，在 Redux 中改变状态必须发起一个 action,action 中必须包含
发起的动作是什么
发起的动作需要传递什么东西

在我们的例子中有两个 action

AddPerson:当一个用户名被添加时触发，该动作中包含了新的用户的名称
RemovePerson:当一个用户名被删除时触发，该动作中包含了用户的id

接下来是 action 创建函数，它的作用是创建并返回 action 对象，下面的是我们为两个 action 实现的 action 创建函数

// redux/actions/actionTypes.ts
enum actionTypes {
  ADD_PERSON = 'ADD_PERSON',
  REMOVE_PERSON = 'REMOVE_PERSON',
}

export default actionTypes;


// src/redux/actions/index.ts
import actionTypes from '../actionTypes'
// 当一个用户名被添加时触发，该动作中包含了新的用户的名称
export const addPerson = (personName: string) => {
  return {
    type: actionTypes.ADD_PERSON,
    payload: personName,
  } as const
}
// 当一个用户名被删除时触发，该动作中包含了用户的id
export const removePerson = (id: string) => {
  return {
    type: actionTypes.REMOVE_PERSON,
    payload: id,
  } as const
}

注意，我们没有给payload 明确类型，因为 action 创建函数可以自动推断是什么类型。

### Reducer

reducer 是一个接收 state 参数和 action，并用于更新 state 的函数，

首先我们为 action 参数定义 Typescript 类型

type Actions = ReturnType<typeof addPerson> | ReturnType<typeof removePerson>;

这是所有 action 的联合类型。 我们使用 typeof 关键字获取 action 创建函数的类型，然后使用ReturnType获取这些函数的返回类型。 使用这种方法，我们不需要显式为 action 对象创建类型。

reducer 函数如下所示
import { addPerson, removePerson } from "../actions/index";
import  { Person } from "../data.d";
import actionTypes from "../actions/actionTypes";

type Actions = ReturnType<typeof addPerson> | ReturnType<typeof removePerson>;

const initialState: Person[] = [{ id: "1", name: "小萝莉" }];

export default function peopleReducer(state = initialState, action: Actions) {
  switch (action.type) {
    case actionTypes.ADD_PERSON:
      return state.concat([
        {
          id: (Math.random() * 1000000).toFixed(0),
          name: action.payload,
        },
      ]);
    case actionTypes.REMOVE_PERSON:
      return state.filter((person) => person.id !== action.payload);
    default:
      break;
  }
  return state;
}

### Store
我们使用 Redux 中的 createStore 来创建一个生成 store 的函数

import { combineReducers, createStore } from "redux";
import { Store } from "redux";
import { AppState } from "./data.d";

import peopleReducer from "./reducers/index";

const rootReducer = combineReducers<AppState>({
  people: peopleReducer,
});

function configureStore(): Store<AppState> {
  const store = createStore(rootReducer, undefined);
  return store;
}

const storeData = configureStore();

export default storeData;

使用 Redux 中的combinedReducers函数创建rootReducer

store 的类型设置也很简单:使用 Redux 中的Store泛型类型，在我们的示例中为AppState

### 链接组件
首先我们需要使用 react-redux 中的 Provider 组件包裹顶层组件，然后将 store 传递到Provider组件中：

import { Provider } from "react-redux";
import store from './redux/store'

const App = () => (
  <Provider store={store}>
    <Page />
  </Provider>
);

在子组件内部，我们可以使用 React Redux 的useSelector钩子从 store 中获取数据
// src/pages/home/index.tsx

import React from "react";
import { useSelector } from 'react-redux'
import type { Person, AppState } from "@/redux/data.d"

const Index: React.FC = () => {
  .......
    const people: Person[] = useSelector((state: AppState) => state.people);
  .......
}
useSelector函数接收的参数也是一个函数，该函数从 store 获取状态并返回相关数据。 并且使用AppState类型显式设置 state 参数的类型。
// src/pages/home/homeByFunc.tsx

import React from "react";
import { useDispatch } from 'react-redux'

const Index: React.FC = () => {
  .......
    const dispatch = useDispatch();
  .......
}

useDispatch返回一个我们称为dispatch的函数。 然后，我们通过将 action 创建函数传递到dispatch中来触发 action：
// src/pages/home/homeByFunc.tsx
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  dispatch(addPerson(newPerson));
  ...
};

const dispatchNewPerson = (id: number) => () => {
  dispatch(removePerson(id));
};
...
<button onClick={dispatchNewPerson(person.id)}>Remove</button>

