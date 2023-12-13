import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const Detail = () => {
    let params = useParams();

    const [postInfo, setPostInfo] = useState({});

    useEffect(() => {
        let body = {
            postNum: params.postNum
        }
        axios.post("/api/post/detail", body)
            .then((response) => {
                if (response.data.success) {
                    setPostInfo(response.data.post)
                    console.log(response)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }, [params.postNum])

    const DeleteHandler = () => {
        if (window.confirm("정말로 삭제하시겠습니까?")) {
            let body = {
                postNum: params.postNum,
            }
            axios.post("api/post/delete", body)
                .then((response) => {
                    if (response.data.success) {
                        alert("게시글이 삭제되었습니다.");
                        navigator("/list")
                    }
                })
                .catch((err) => {
                    console.log(err)
                    alert("게시글 삭제 실패")
                })
        }
    }
    return (
        <div className='detail__Wrap'>
            <div className="detail__title">
                <h3>{postInfo.title}</h3>
                <div className='auth'>Joy</div>
            </div>
            <div className='detail__content'>
                {postInfo.image ? <img src={`${postInfo.image}`} alt={postInfo.title} /> : null}
                {postInfo.content}
            </div>
            <div className='detail__btn'>
                <button><Link to={`/modify/${postInfo.postNum}`}>수정하기</Link></button>
                <button onClick={() => DeleteHandler}>삭제하기</button>
                <button><Link to='/list'>목록보기</Link></button>
            </div>
        </div>
    )
}

export default Detail