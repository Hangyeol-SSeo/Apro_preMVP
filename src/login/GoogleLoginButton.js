import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import {jwtDecode} from "jwt-decode";
import { useNavigate } from 'react-router-dom';

const GoogleLoginButton = () => {
    const sendUserInfoToServer = async (id, nickname) => {
        const response = await fetch('http://localhost:8080/user-info', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, nickname }),
        });
        return response.json();
    };

    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    const navigate = useNavigate();

    return (
        <>
            <GoogleOAuthProvider clientId={clientId}>
                <GoogleLogin
                    onSuccess={credentialResponse => {
                        let response = jwtDecode(credentialResponse.credential);
                        document.cookie = "userId=" + response.sub + "; path=/;";
                        sendUserInfoToServer(response.sub, response.name)
                            .then((serverResponse) => {
                                console.log(serverResponse);  // Print the server response

                                // Assuming serverResponse.newUser is a boolean indicating whether the user is new or not
                                if (serverResponse.newUser) {
                                    navigate('/register');
                                } else {
                                    navigate('/home');
                                }
                            })
                            .catch((error) => {
                                console.error('Error:', error);  // Handle errors
                                alert("로그인에 실패했습니다");
                                navigate('/');
                            });
                    }}
                    onError={() => {
                        console.log("Login Failed");
                    }}
                />
            </GoogleOAuthProvider>
        </>
    );
};

export default GoogleLoginButton;