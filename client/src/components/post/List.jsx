import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

const List = () => {
    const [postList, setPostList] = useState([]);

    useEffect(() => {
        axios.post("/api/post/list")
            .then((response) => {
                console.log(response);
                if (response.data.success) {
                    setPostList([...response.data.postList]);
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }, []);
    return (
        <div className="list__wrap">
            {postList.map((post, key) => (
                <div className="list" key={key}>
                    <span className="cate">이벤트</span>
                    <h3 className='title'>
                        <Link to={`/detail/${post.postNum}`}>{post.title}</Link></h3>
                    <h3 className='desc'>{post.content}</h3>
                    <h3 className='auth'>Joy</h3>
                </div>
            ))}
        </div>
    )
}

export default List