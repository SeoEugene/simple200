const mongoose = require('mongoose');

// 스키마 정의
const userSchema = new mongoose.Schema({
    userNum: Number,
    email: String,
    displayname: String,
    uid: String
}, { collection: "users" });

// 모델 생성
const User = mongoose.model('User', userSchema);

// 모델 내보내기
module.exports = { User };