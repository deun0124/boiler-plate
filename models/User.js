const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken')


const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true, // 스페이스바를 없애줌
        unique: 1 // 같은 이메일이 없도록
    },
    password: {
        type: String,
        minlength: 6
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number, // 일반유저와 관리자 구분하려고
        default: 0
    },
    image: String,
    token: {
        type: String, //유효성관리하려고
    },
    tokenExp: {
        type: Number //토큰 유효기간 지정하려고
    }
})




userSchema.pre('save', function (next){
    var user = this;
    //bcrypt로 암호화 하기 => 비밀번호가 수정 될 때만
    if(user.isModified('password')){
            //비밀번호를 암호화 시킨다.
    bcrypt.genSalt(saltRounds, function(err, salt) {
        if(err) return next(err)
        bcrypt.hash(user.password, salt, function(err, hash) {
            if(err) return next(err)
            user.password = hash
            next()
        });
    });

    } else {
        //비밀번호 바꾸는게 아니라면 그냥 넘김
        next()
    }


})

userSchema.methods.comparePassword = function(plainPassword, cb){
    //plainpassword = 1234567 암호화비밀번호 = ~~~~
    //plain을 암호화 해서 암호화 비밀번호와 비교
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return cb(err);
            cb(null,isMatch)
    })

}

userSchema.methods.generateToken = function(cb){
    var user = this;
    //jsonwebtoekn이용해 token생성
    var token =  jwt.sign(user._id.toHexString(),'secretToken')
    user.token = token
    user.save(function(err,user){
        if(err) return cb(err)
        cb(null,user)
    })
}

userSchema.statics.findByToken = function(token, cb) {
    var user = this;

    // 토큰 decode
    jwt.verify(token,'secretToken', function(err, decoded){
        //유저 아이디를 이용해 유저 찾은 후
        //클라이언트에서 가져온 토큰과 db에 보관된 토큰 일치 여부 확인

        user.findOne({"_id":decoded, "token":token}, function(err, user){
            if(err) return cb(err)
            cb(null,user)
        })
    })
}

//스키마를 모델로 감쌈('이름',스키마)
const User = mongoose.model('User', userSchema); 
module.exports = {User}