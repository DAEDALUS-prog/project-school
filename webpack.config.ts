import { join } from "path";
import { Configuration } from "webpack";

const {  env } = process

const devMode = env.NODE_ENV != 'prod'
const watchMode = devMode

const mode = env.NODE_ENV = devMode ?
  'development' : 'production'

const entry: Configuration['entry'] =
  { main: "./index.tsx" }

const output: Configuration['output'] = {
  filename: '[name].js',
  path: join(__dirname, 'dist'),
  publicPath: 'dist/'
}

const devtool: Configuration['devtool'] =
  devMode ? 'source-map' : false

const watch: Configuration['watch'] =
  devMode || watchMode

const resolve: Configuration['resolve'] = {
  extensions:
    ['.ts', '.tsx', '.js', '.json']
}

const modules: Configuration['module'] = {
  rules: [
    {
      test: /\.(eot|woff|woff2|ttf|gif|svg|png|jpg|txt)$/,
      loader: 'url-loader',
      options: {
        regExp: /([a-z0-9]+)\/([a-z0-9\-\_]+)\/[a-z0-9\-\_]+\.[a-z]+$/i,
        name: `[2]/[1]/[name].[ext]`
      }
    },
    {
      test: /\.tsx?$/,
      loader: "ts-loader"
    },
    {
      test: /\.scss|\.sass$/,
      use: [
        'style-loader',
        "css-loader",
        {
          loader: 'sass-loader',
          options: {
            implementation: require('sass'),
            sourceMap: true,
            sassOptions: {
              outputStyle: 'compressed',
            },
          },
        }
      ]
    }
  ]
}

const externals: Configuration['externals'] = {
  "react": "React",
  "react-dom": "ReactDOM"
}

export {
  entry, output,
  mode, devtool,
  watch, resolve,
  modules as module,
  externals
}