const mongoose = require('mongoose');

// 스키마 정의
const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    postNum: Number,
    image: String,
}, { collection: "posts" });

// 모델 생성
const Post = mongoose.model('Post', postSchema);

// 모델 내보내기
module.exports = { Post };