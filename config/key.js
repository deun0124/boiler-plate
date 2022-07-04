if(process.env.NODE_ENV==='production'){
    module.exports=reuqire('./prod');
}else{
    module.exports = require('./dev');
}