import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function KakaoOAuth2RedirectPage() {
    // 1. 인가코드
    const code = new URL(window.location.href).searchParams.get("code");
    console.log(code);
    // 2. access Token 요청
    const getToken = async (code: string) => {
        const KAKAO_REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
        const KAKAO_REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;

        const response = await fetch(`https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&code=${code}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
        });
        return response.json();
    }

    const getUserInfo = async (access_token : string) => {
        const response = await fetch('https://kapi.kakao.com/v2/user/me', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${access_token}`,
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
        });
        return response.json();
    }

    const sendUserInfoToServer = async (id, nickname) => {
        const response = await fetch('http://www.apromatch.com:8080/user-info', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, nickname }),
        });
        return response.json();
    };

    const [loading, setLoading] = useState(true);  // Set initial loading state to true
    const navigate = useNavigate();
    useEffect(() => {
        if (code && loading) {
            getToken(code)
                .then((res) => {
                    console.log(res.access_token);
                    return getUserInfo(res.access_token);
                })
                .then((res) => {
                    console.log(res.id, res.kakao_account.profile.nickname);
                    document.cookie = "userId=" + res.id + "; path=/;";
                    return sendUserInfoToServer(res.id, res.kakao_account.profile.nickname)
                        .then((serverResponse) => {
                            return { serverResponse, id: res.id }; // 두 번째 .then()에 전달하기 위해 객체 반환
                        });
                })
                .then(({serverResponse, id}) => {
                    console.log(serverResponse);  // Print the server response

                    setLoading(false);  // Set loading state to false when done
                    // Assuming serverResponse.newUser is a boolean indicating whether the user is new or not
                    if (serverResponse.newUser) {
                        navigate('/register');
                    } else {
                        navigate('/home');
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);  // Handle errors
                    setLoading(false);  // Set loading state to false on error
                    alert("로그인에 실패했습니다");
                    navigate('/');
                });
        }
    }, []);

    return (
        <div>
            <h1>Connecting to Server...</h1>
        </div>
    );
}

export default KakaoOAuth2RedirectPage;