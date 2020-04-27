module.exports = {
    configureWebpack:{
        resolve:{
           alias: {
               'assets':'@/assets',
               'common':'@/common',
               'components':'@/components',
               'network':'@/network',
               'views':'@/views' 
           }
        }
        // devServer:{
        //     host:'192.168.31.158',
        //     port:8000
        // }
    }
}