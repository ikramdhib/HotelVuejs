module.exports = {
	publicPath: process.env.NODE_ENV === 'production' ? '/sakai-vue' : '/',
	devServer: {
		proxy: 'http://localhost:8000'
	  }
}