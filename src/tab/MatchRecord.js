import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import "../GlobalStyle";
import "./MatchRecord.css"

function MatchRecord() {
    const MenuIcon = () => (
        <svg width="4rem" height="4rem" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.5 24.75H27.5C28.2563 24.75 28.875 24.1313 28.875 23.375C28.875 22.6187 28.2563 22 27.5 22H5.5C4.74375 22 4.125 22.6187 4.125 23.375C4.125 24.1313 4.74375 24.75 5.5 24.75ZM5.5 17.875H27.5C28.2563 17.875 28.875 17.2563 28.875 16.5C28.875 15.7438 28.2563 15.125 27.5 15.125H5.5C4.74375 15.125 4.125 15.7438 4.125 16.5C4.125 17.2563 4.74375 17.875 5.5 17.875ZM4.125 9.625C4.125 10.3812 4.74375 11 5.5 11H27.5C28.2563 11 28.875 10.3812 28.875 9.625C28.875 8.86875 28.2563 8.25 27.5 8.25H5.5C4.74375 8.25 4.125 8.86875 4.125 9.625Z" fill="black"/>
        </svg>
    );

    const CloseIcon = () => (
        <svg width="4rem" height="4rem" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M25.1625 7.85124C24.6262 7.31499 23.76 7.31499 23.2237 7.85124L16.5 14.5612L9.77624 7.83749C9.23999 7.30124 8.37374 7.30124 7.83749 7.83749C7.30124 8.37374 7.30124 9.23999 7.83749 9.77624L14.5612 16.5L7.83749 23.2237C7.30124 23.76 7.30124 24.6262 7.83749 25.1625C8.37374 25.6987 9.23999 25.6987 9.77624 25.1625L16.5 18.4387L23.2237 25.1625C23.76 25.6987 24.6262 25.6987 25.1625 25.1625C25.6987 24.6262 25.6987 23.76 25.1625 23.2237L18.4387 16.5L25.1625 9.77624C25.685 9.25374 25.685 8.37374 25.1625 7.85124Z" fill="black"/>
        </svg>
    );

    const [isMenuVisible, setMenuVisible] = useState(false);

    const toggleMenu = () => {
        setMenuVisible(!isMenuVisible);
    };

    return (
        <div className="default-container">
            <aside id="side-menu" className={`side-menu ${isMenuVisible ? 'show' : ''}`}>

            </aside>

            <div className={`container ${isMenuVisible ? 'shifted' : ''}`}>
                <section class="hamburger-menu" onClick={toggleMenu}>
                    {isMenuVisible ? <CloseIcon /> : <MenuIcon />}
                </section>

                <div className="title-home"><span>내 팀 명</span></div>

                <div className="record-summary">
                    <span className="record-summary-text">
                        <span>00 경기 / </span>
                        <span>00 승</span>
                        <span>00 무</span>
                        <span>00 패</span>
                    </span>
                </div>
                <hr/>
                <div style={{marginBottom: '3vh'}}></div>

                <div className="match-container">
                    <div className="date-info">
                        <div className="date">날짜</div>
                        <div className="day">요일</div>
                    </div>
                    <div className="match-details">
                        <div className="team-name">상대팀 명</div>
                        <div style={{width: "100%",display: "flex", "justify-content": "space-between", "align-items": "center"}}>
                            <div className="match-date">날짜</div>
                            <div className="day">요일</div>
                            <div className="time">시간</div>
                        </div>
                        <div class="location">장소</div>
                    </div>
                    <div class="match-result">
                        <div class="result-text">매치결과</div>
                        <div class="outcome">승/무/패</div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default MatchRecord;