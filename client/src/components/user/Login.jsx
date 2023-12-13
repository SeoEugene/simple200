import React, { useEffect, useState } from 'react'
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
            return alert("모든 값을 채워주세요");
        }
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
            setErrorMsg("로그인 성공하였습니다.")
            navigate("/")
        } catch (err) {
            console.log(err.code)
            if (err.code === "auth/invalid-email") {
                setErrorMsg("존재하지 않는 이메일 입니다.")
            } else if (err.code === "auth/invalid-credential") {
                setErrorMsg("비밀번호가 일치하지 않습니다.")
            } else {
                setErrorMsg("로그인 실패하였습니다.")
            }
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setErrorMsg("");
        }, 5000)
    }, [errorMsg]);

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