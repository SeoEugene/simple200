import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Modify = () => {
    const [postInfo, setPostInfo] = useState({});
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    let params = useParams();
    let navigate = useNavigate();

    useEffect(() => {
        let body = {
            postNum: params.postNum
        }
        axios.post("/api/post/detail", body)
            .then((response) => {
                if (response.data.success) {
                    setPostInfo(response.data.post)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }, [params.postNum])

    useEffect(() => {
        setTitle(postInfo.title);
        setContent(postInfo.content);
    }, [postInfo])


    const onSubmit = (e) => {
        e.preventDefault();

        if (title === "" || content === "") {
            return alert("모든 항목을 채워주세요!")
        }

        let body = {
            title: title,
            content: content,
            postNum: params.postNum
        }

        axios
            .post("/api/post/modify", body)
            .then((response) => {
                if (response.data.success) {
                    alert("수정 완료")
                    navigate("/list")
                } else {
                    alert("수정 실패")
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div className="write__wrap">
            <h2>글수정</h2>
            <form>
                <div>
                    <label htmlFor="wirte__title">제목</label>
                    <input
                        type="text"
                        id="wirte__title"
                        name="wirte__title"
                        autoComplete='off'
                        value={postInfo.title}
                        onChange={(e) => setTitle(e.currentTarget.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="text__content">내용</label>
                    <textarea
                        id="text__content"
                        name="text__content"
                        autoComplete="off"
                        value={postInfo.content}
                        onChange={(e) => setContent(e.currentTarget.value)}
                        required
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        className="btn_style2 mt30"
                        onClick={(e) => {
                            onSubmit(e);
                        }}
                    >수정하기</button>
                    <button
                        type="submit"
                        className="btn_style2 mt30">취소하기</button>
                </div>
            </form>
        </div >
    )
}

export default Modify