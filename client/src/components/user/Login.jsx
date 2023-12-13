import React, { useState } from 'react'
import firebase from '../../firebase';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();

    const LoginFunc = async (e) => {
        e.preventDefault();

        if (!(email && password)) {
            return alert("모든 값을 채워주세요!")
        }
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password)
            alert("로그인을 했습니다.")
            navigate("/")
        }
        catch (err) {
            console.log(err)
            setErrorMsg("로그인을 실패했습니다.")
        }
    }

    return (
        <div className="login__wrap">
            <h2>LOGIN</h2>
            <form>
                <div>
                    <label htmlFor="youEmail">이메일</label>
                    <input
                        type="text"
                        id="youEmail"
                        name="youEmail"
                        autoComplete='off'
                        required
                        value={email}
                        onChange={(e) => setEmail(e.currentTarget.value)}
                    />
                </div>
                <div>
                    <label htmlFor="youPass">비밀번호</label>
                    <input
                        type="password"
                        id="youPass"
                        name="youPass"
                        autoComplete="off"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.currentTarget.value)}
                    />
                </div>
                <div>
                    {/* 에러 메시지가 있을 때 나오도록 설정 */}
                    {errorMsg !== "" && <p>{errorMsg}</p>}
                </div>
                <div>
                    <button type="submit"
                        onClick={(e) => LoginFunc(e)}
                        className="btn_style2 mt30">로그인</button>
                </div>
            </form>
        </div >
    )
}

export default Login