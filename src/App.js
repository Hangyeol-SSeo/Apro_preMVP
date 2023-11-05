import React, { useEffect } from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import GlobalStyle from "./GlobalStyle";
import Login from './login/Login';
import './App.css';
import KakaoOAuth2RedirectPage from "./login/KakaoOAuth2RedirectPage";

function App() {
    const removeEvent = e => {
        e.preventDefault();
        e.stopPropagation();
    };

    const disableScroll = () => {
        document.querySelector('body').addEventListener('touchmove', removeEvent, { passive: false });
        document.querySelector('body').addEventListener('onclick', removeEvent, { passive: false });
        document.querySelector('body').addEventListener('mousewheel', removeEvent, { passive: false });
    };

    const enableScroll = () => {
        document.querySelector('body').removeEventListener('touchmove', removeEvent);
        document.querySelector('body').removeEventListener('onclick', removeEvent);
        document.querySelector('body').removeEventListener('mousewheel', removeEvent);
    };

    const setScreenSize = () => {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    useEffect(() => {
        disableScroll();
        setScreenSize();
        window.addEventListener('resize', setScreenSize);
        return () => {
            enableScroll();
            window.removeEventListener('resize', setScreenSize);
        };
    }, []);

    return (
    <BrowserRouter>
        <GlobalStyle />
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/oauth/kakao" element={<KakaoOAuth2RedirectPage/>}/>
        </Routes>
    </BrowserRouter>
    );
}

export default App;
