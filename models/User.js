const mongoose = require('mongoose')

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

//스키마를 모델로 감쌈('이름',스키마)
const User = mongoose.model('User', userSchema); 
module.exports = {User}