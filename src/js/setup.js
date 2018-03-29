exports.devPort = 8000

//NOTE: module rules
exports.postCssLoader = (prefix) => {
    return {
        loader: 'postcss-loader',
        options: {
            ident: 'postcss',
            plugins: () => [prefix()]
        }
    }
}

exports.sassLoader = {
    loader: 'sass-loader',
    options: {
        modules: true,
        localIdentName: '[name]__[local]___[hash:base64:5]'
    }
}

//NOTE: plugin rules
exports.fileManageStart = {
    delete: [
        './build',
        './SW_CORE',
        'SW_CORE.zip',
    ],
}

exports.fileManageEnd = {
    copy: [
        { source: './src/index.html', destination: './build' },
        { source: './src/fonts', destination: './build/fonts' },
        { source: './src/images', destination: './build/images' },
    ],

    archive: [
        {
            source: './build',
            destination: 'SW_CORE.zip',
            format: 'zip',
            options: {
                gzip: true,
                gzipOptions: {
                    level: 1
                }
            }
        },
    ],

    delete: [
        './build',
    ],
}

exports.JsUglify = {
    mangle: false,
    sourcemap: false,
    comments: false,
    compress: {
        warnings: false,
        drop_console: true
    }
}