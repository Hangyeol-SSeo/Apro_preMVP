import React from 'react';

import '../GlobalStyle';
import './Login.css';

import GoogleLoginButton from "./GoogleLoginButton";

function Login() {
    // kakao login
    const KAKAO_REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY; //REST API KEY
    const KAKAO_REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI; //Redirect URI
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

    const handleKakaoLogin = ()=>{
        window.location.href = kakaoURL;
    }

    return (
        <div className="login-container default-container">
            <h1 className="login-title">GOAL LOG</h1>
            <p className="login-message">간단하게 축구를 기록해보세요</p>
            <a id="kakao-login-btn" onClick={handleKakaoLogin}>
                <img className="kakao-login" src="//k.kakaocdn.net/14/dn/btqCn0WEmI3/nijroPfbpCa4at5EIsjyf0/o.jpg" />
            </a>
            <div id="google-login-btn"><GoogleLoginButton/></div>
        </div>
    );
}

export default Login;
