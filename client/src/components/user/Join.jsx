import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import firebase from '../../firebase';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


const Join = () => {
    const [youName, setYouName] = useState("");
    const [youEmail, setYouEmail] = useState("");
    const [youPass, setYouPass] = useState("");
    const [youPassC, setYouPassC] = useState("");
    const [flag, setFlag] = useState(false);

    let navigate = useNavigate();

    const JoinFunc = async (e) => {
        e.preventDefault();
        setFlag(true);
        if (!(youName && youEmail && youPass && youPassC)) {
            return alert("모든 항목을 입력하셔야 회원가입이 가능합니다.");
        }
        if (youPass !== youPassC) {
            return alert("비밀번호가 일치하지 않습니다.")
        }

        // 개인정보 --> firebase
        let createdUser = await firebase.auth().createUserWithEmailAndPassword(youEmail, youPass);

        await createdUser.user.updateProfile({
            displayName: youName,
        });

        console.log(createdUser.user)

        // 개인정보-- > mongodb
        let body = {    // 정보를 body로 넘겨줌, email, name
            email: createdUser.user.multiFactor.user.email,
            displayName: createdUser.user.multiFactor.user.displayName,
            uid: createdUser.user.multiFactor.user.uid,
        }
        axios.post("/api/user/join", body)
            .then((response) => {
                setFlag(false);
                if (response.data.success) {
                    //회원가입성공
                    navigate("/login");
                } else {
                    //회원가입 실패
                }
            })

    }

    return (
        <div className='join__wrap'>
            <h2>회원가입</h2>
            <p>이미 회원인 분은 이쪽으로 가세요. <span><Link to='/login'>로그인하기</Link></span></p>
            <form className='join__form'>
                <fieldset>
                    <legend className="blind">회원가입 영역</legend>
                    <div>
                        <label htmlFor="youName" className="required blind">이름</label>
                        <input
                            type="text"
                            id="youName"
                            name="youName"
                            placeholder="이름"
                            className="input__style"
                            autoComplete='off'
                            required
                            value={youName}
                            onChange={(e) => setYouName(e.currentTarget.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="youEmail" className="required blind">이메일</label>
                        <input type="email"
                            id="youEmail"
                            name="youEmail"
                            placeholder="이메일"
                            className="input__style"
                            autoComplete='off'
                            required
                            value={youEmail}
                            onChange={(e) => setYouEmail(e.currentTarget.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="youPass" className="required blind">비밀번호</label>
                        <input type="text"
                            id="youPass"
                            name="youPass"
                            placeholder="비밀번호"
                            className="input__style"
                            autoComplete="off"
                            required
                            value={youPass}
                            onChange={(e) => setYouPass(e.currentTarget.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="youPassC" className="required blind">비밀번호 확인</label>
                        <input type="text"
                            id="youPassC"
                            name="youPassC"
                            placeholder="비밀번호 확인"
                            className="input__style"
                            autoComplete="off"
                            required
                            minLength={8}
                            value={youPassC}
                            onChange={(e) => setYouPassC(e.currentTarget.value)}
                        />
                    </div>
                    <button
                        // flag가 true 일때만 회원가입 가능
                        disabled={flag}
                        type="submit"
                        className="btn__style2 mt30"
                        onClick={(e) => JoinFunc(e)}
                    >회원가입</button>
                </fieldset>
            </form>
        </div >
    )
}

export default Join