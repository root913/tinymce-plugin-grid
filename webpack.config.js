const path = require('path');
const { merge } = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const config = {
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
                include: path.resolve(__dirname, 'src')
            }
        ],
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9091
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js', '.css' ],
    },
    stats: {
        assetsSort: '!size',
        children: false,
        usedExports: false,
        modules: false,
        entrypoints: false,
        // Hide source maps from output
        excludeAssets: [/\.*\.map/]
    }
};

const demoConfig = merge(config, {
    name: 'Demo',
    entry: {
        demo: './src/demo/ts/Demo.ts',
        'plugins/grid/plugin': './src/main/ts/Main.ts',
        'plugins/grid/langs/pl': './src/main/langs/en.js',
        'plugins/grid/langs/en': './src/main/langs/pl.js'
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'node_modules/tinymce/tinymce.min.js',
                    to: 'tinymce.min.js'
                },
                {
                    from: 'node_modules/tinymce/themes',
                    to: 'themes'
                },
                {
                    from: 'node_modules/tinymce/skins',
                    to: 'skins'
                },
                {
                    from: './src/demo/html/index.html',
                    to: 'index.html'
                },
                {
                    from: './src/main/bootstrap3.css',
                    to: 'plugins/grid/bootstrap3.css'
                },
                {
                    from: './src/main/foundation5.css',
                    to: 'plugins/grid/foundation5.css'
                }
            ]
        }),
    ],
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'demo'),
    },
});

const distConfig = merge(config,{
    name: "Dist",
    entry: {
        plugin: './src/main/ts/Main.ts'
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: './src/main/bootstrap3.css',
                    to: 'bootstrap3.css'
                },
                {
                    from: './src/main/foundation5.css',
                    to: 'foundation5.css'
                }
            ]
        })
    ],
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
});

const minDistConfig = merge(distConfig, {
    name: "minDist",
    entry: {
        plugin: './src/main/ts/Main.ts',
        'langs/pl': './src/main/langs/en.js',
        'langs/en': './src/main/langs/pl.js',
    },
    plugins: [
        new CleanWebpackPlugin(),
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                test: /\.js(\?.*)?$/i,
            }),
        ],
    },
    output: {
        filename: (pathData) => {
            return pathData.runtime.indexOf('langs/') != -1 ? '[name].js' : '[name].min.js';
        },
        path: path.resolve(__dirname, 'dist'),
    },
});

module.exports = [
    demoConfig, distConfig, minDistConfig
]