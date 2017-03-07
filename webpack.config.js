module.exports =  {
    entry: {
        sfSelect: "./src/select.vue",
        sfOption: "./src/option.vue"
    },
    output: {
        path: "./docs",
        filename: "[name].js",
        library : '[name]'
    },
	//devtool: "source-map",
    resolve:{
        extensions: ['', '.js', '.vue']
    },
    module: {
        loaders: [
            {test: /.vue/, loader: 'vue'},
            {test: /\.js$/, loader: 'babel', exclude: /node_modules/},
            {test: /.html/, loader: 'html'},
			{test: /.scss$/,  loader: "style!css!sass" },
            {test: /\.(png|jpg)$/,loader: 'url?limit=40000'}
        ]
    },
    babel: {
        presets: ['es2015']
    }
}