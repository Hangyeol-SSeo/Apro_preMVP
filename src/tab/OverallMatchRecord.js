import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";

import "../GlobalStyle";
import "./MatchRecord.css"
import "./Sidebar.css"

function OverallMatchRecord() {
    // sidebar
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

    // 팀 정보 로드
    const cookies = document.cookie.split('; ');
    const userIdCookie = cookies.find(cookie => cookie.startsWith('userId='));
    const id = userIdCookie ? userIdCookie.split('=')[1] : null;
    const [teamData, setTeamData] = useState({team_name: "내팀명", played: 0, won: 0, draw: 0, loss: 0 });
    useEffect(() => {
        const fetchTeamData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/team-data?id=${id}`, {
                    method: "GET",
                });
                const data = await response.json();
                console.log(data);
                setTeamData(data);
            } catch (error) {
                console.error('Error fetching game data:', error);
            }
        };
        fetchTeamData();
    }, []);

    // TODO: 매치 기록 로드 & 박스 만들기

    return (
        <div className="default-container">
            <aside id="side-menu" className={`side-menu ${isMenuVisible ? 'show' : ''}`}>
                <div id="side-title">
                    <svg width="15.5rem" height="4.25rem" viewBox="0 0 121 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.3022 6.56214C13.1306 6.02356 12.8997 5.54119 12.6097 5.11506C12.3256 4.683 11.9853 4.31605 11.5888 4.0142C11.1922 3.70644 10.7395 3.47266 10.2305 3.31285C9.72739 3.15305 9.17401 3.07315 8.57031 3.07315C7.5464 3.07315 6.62311 3.33653 5.80043 3.86328C4.97775 4.39003 4.3267 5.16241 3.8473 6.1804C3.37382 7.19247 3.13707 8.43241 3.13707 9.90021C3.13707 11.3739 3.37678 12.6198 3.85618 13.6378C4.33558 14.6558 4.99254 15.4281 5.82706 15.9549C6.66158 16.4817 7.61151 16.745 8.67685 16.745C9.66525 16.745 10.5264 16.5438 11.2603 16.1413C12.0001 15.7389 12.5713 15.1707 12.9737 14.4368C13.3821 13.697 13.5863 12.8269 13.5863 11.8267L14.2965 11.9599H9.09411V9.69602H16.2408V11.7646C16.2408 13.2915 15.9152 14.6173 15.2642 15.7418C14.6191 16.8604 13.7254 17.7246 12.5831 18.3342C11.4467 18.9438 10.1446 19.2486 8.67685 19.2486C7.03149 19.2486 5.58736 18.8698 4.34446 18.1122C3.10748 17.3546 2.14276 16.2804 1.45028 14.8896C0.757813 13.4928 0.411577 11.8356 0.411577 9.91797C0.411577 8.46792 0.612808 7.16584 1.01527 6.01172C1.41773 4.8576 1.98295 3.87808 2.71094 3.07315C3.44484 2.26231 4.30599 1.64382 5.29439 1.21768C6.28871 0.785629 7.37476 0.569602 8.55256 0.569602C9.53504 0.569602 10.4495 0.714606 11.2958 1.00462C12.1481 1.29463 12.9057 1.70597 13.5685 2.23864C14.2373 2.77131 14.7907 3.40459 15.2287 4.13849C15.6667 4.86648 15.9626 5.67436 16.1165 6.56214H13.3022ZM35.0168 9.90909C35.0168 11.8504 34.6617 13.5194 33.9514 14.9162C33.2412 16.3071 32.2676 17.3783 31.0306 18.13C29.7996 18.8757 28.3998 19.2486 26.8314 19.2486C25.2571 19.2486 23.8514 18.8757 22.6144 18.13C21.3834 17.3783 20.4127 16.3041 19.7025 14.9073C18.9923 13.5105 18.6372 11.8445 18.6372 9.90909C18.6372 7.9678 18.9923 6.30173 19.7025 4.91087C20.4127 3.51409 21.3834 2.44283 22.6144 1.69709C23.8514 0.94543 25.2571 0.569602 26.8314 0.569602C28.3998 0.569602 29.7996 0.94543 31.0306 1.69709C32.2676 2.44283 33.2412 3.51409 33.9514 4.91087C34.6617 6.30173 35.0168 7.9678 35.0168 9.90909ZM32.3002 9.90909C32.3002 8.42945 32.0605 7.18359 31.5811 6.17152C31.1076 5.15353 30.4565 4.38411 29.6279 3.86328C28.8052 3.33653 27.8731 3.07315 26.8314 3.07315C25.7838 3.07315 24.8487 3.33653 24.026 3.86328C23.2033 4.38411 22.5523 5.15353 22.0729 6.17152C21.5994 7.18359 21.3627 8.42945 21.3627 9.90909C21.3627 11.3887 21.5994 12.6375 22.0729 13.6555C22.5523 14.6676 23.2033 15.437 24.026 15.9638C24.8487 16.4846 25.7838 16.745 26.8314 16.745C27.8731 16.745 28.8052 16.4846 29.6279 15.9638C30.4565 15.437 31.1076 14.6676 31.5811 13.6555C32.0605 12.6375 32.3002 11.3887 32.3002 9.90909ZM38.5695 19H35.6576L42.2006 0.818181H45.3699L51.9129 19H49.001L43.8607 4.12074H43.7187L38.5695 19ZM39.0578 11.88H48.5038V14.1882H39.0578V11.88ZM54.0385 19V0.818181H56.7818V16.6385H65.0204V19H54.0385ZM73.7661 19V0.818181H76.5093V16.6385H84.748V19H73.7661ZM102.463 9.90909C102.463 11.8504 102.108 13.5194 101.398 14.9162C100.688 16.3071 99.7139 17.3783 98.4769 18.13C97.2459 18.8757 95.8461 19.2486 94.2777 19.2486C92.7034 19.2486 91.2977 18.8757 90.0607 18.13C88.8297 17.3783 87.859 16.3041 87.1488 14.9073C86.4386 13.5105 86.0835 11.8445 86.0835 9.90909C86.0835 7.9678 86.4386 6.30173 87.1488 4.91087C87.859 3.51409 88.8297 2.44283 90.0607 1.69709C91.2977 0.94543 92.7034 0.569602 94.2777 0.569602C95.8461 0.569602 97.2459 0.94543 98.4769 1.69709C99.7139 2.44283 100.688 3.51409 101.398 4.91087C102.108 6.30173 102.463 7.9678 102.463 9.90909ZM99.7464 9.90909C99.7464 8.42945 99.5067 7.18359 99.0273 6.17152C98.5539 5.15353 97.9028 4.38411 97.0742 3.86328C96.2515 3.33653 95.3194 3.07315 94.2777 3.07315C93.2301 3.07315 92.295 3.33653 91.4723 3.86328C90.6496 4.38411 89.9986 5.15353 89.5192 6.17152C89.0457 7.18359 88.8089 8.42945 88.8089 9.90909C88.8089 11.3887 89.0457 12.6375 89.5192 13.6555C89.9986 14.6676 90.6496 15.437 91.4723 15.9638C92.295 16.4846 93.2301 16.745 94.2777 16.745C95.3194 16.745 96.2515 16.4846 97.0742 15.9638C97.9028 15.437 98.5539 14.6676 99.0273 13.6555C99.5067 12.6375 99.7464 11.3887 99.7464 9.90909ZM117.688 6.56214C117.516 6.02356 117.285 5.54119 116.995 5.11506C116.711 4.683 116.371 4.31605 115.975 4.0142C115.578 3.70644 115.125 3.47266 114.616 3.31285C114.113 3.15305 113.56 3.07315 112.956 3.07315C111.932 3.07315 111.009 3.33653 110.186 3.86328C109.363 4.39003 108.712 5.16241 108.233 6.1804C107.76 7.19247 107.523 8.43241 107.523 9.90021C107.523 11.3739 107.763 12.6198 108.242 13.6378C108.721 14.6558 109.378 15.4281 110.213 15.9549C111.047 16.4817 111.997 16.745 113.063 16.745C114.051 16.745 114.912 16.5438 115.646 16.1413C116.386 15.7389 116.957 15.1707 117.359 14.4368C117.768 13.697 117.972 12.8269 117.972 11.8267L118.682 11.9599H113.48V9.69602H120.627V11.7646C120.627 13.2915 120.301 14.6173 119.65 15.7418C119.005 16.8604 118.111 17.7246 116.969 18.3342C115.832 18.9438 114.53 19.2486 113.063 19.2486C111.417 19.2486 109.973 18.8698 108.73 18.1122C107.493 17.3546 106.528 16.2804 105.836 14.8896C105.144 13.4928 104.797 11.8356 104.797 9.91797C104.797 8.46792 104.999 7.16584 105.401 6.01172C105.803 4.8576 106.369 3.87808 107.097 3.07315C107.831 2.26231 108.692 1.64382 109.68 1.21768C110.674 0.785629 111.761 0.569602 112.938 0.569602C113.921 0.569602 114.835 0.714606 115.682 1.00462C116.534 1.29463 117.291 1.70597 117.954 2.23864C118.623 2.77131 119.176 3.40459 119.614 4.13849C120.052 4.86648 120.348 5.67436 120.502 6.56214H117.688Z" fill="#00A77F"/>
                    </svg>
                </div>

                <div className="side-container">
                    <Link to="/home"><div className="side-element">
                        <svg width="6.25rem" height="6.25rem" viewBox="0 0 53 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22.0832 41.9581V30.9164H30.9166V41.9581C30.9166 43.1726 31.9103 44.1664 33.1249 44.1664H39.7499C40.9645 44.1664 41.9582 43.1726 41.9582 41.9581V26.4997H45.7124C46.7282 26.4997 47.2141 25.241 46.4412 24.5785L27.9795 7.94972C27.1403 7.19889 25.8595 7.19889 25.0203 7.94972L6.55866 24.5785C5.80783 25.241 6.27158 26.4997 7.28741 26.4997H11.0416V41.9581C11.0416 43.1726 12.0353 44.1664 13.2499 44.1664H19.8749C21.0895 44.1664 22.0832 43.1726 22.0832 41.9581Z" fill="black"/>
                        </svg>
                        <svg width="14.8rem" height="4rem" viewBox="0 0 114 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.73428 3.15V15.25C4.88428 15.225 7.25928 15.075 9.93428 14.55L10.1343 16.325C7.10928 16.9 4.53428 17.025 2.10928 17.025H0.684277V3.15H2.73428ZM16.6343 0.425H18.6093V22.825H16.6343V11.25H13.4593V21.7H11.5343V0.924999H13.4593V9.55H16.6343V0.425ZM44.3485 6.225H38.7485C37.2985 9.825 33.8985 12.45 29.0735 13.85L28.2485 12.225C33.5985 10.625 36.9235 7.65 37.2985 3.775H29.3985V2.125H39.5235C39.5235 2.95 39.4235 3.775 39.2735 4.55H44.3485V0.449999H46.4235V13.85H44.3485V10.9H38.4735V9.225H44.3485V6.225ZM39.0985 21.15C42.3985 21.15 44.4985 20.125 44.4985 18.425C44.4985 16.75 42.3985 15.725 39.0985 15.725C35.7985 15.725 33.6985 16.75 33.6985 18.425C33.6985 20.125 35.7985 21.15 39.0985 21.15ZM39.0985 14.1C43.6235 14.1 46.5235 15.725 46.5235 18.425C46.5235 21.125 43.6235 22.75 39.0985 22.75C34.5735 22.75 31.6735 21.125 31.6735 18.425C31.6735 15.725 34.5735 14.1 39.0985 14.1ZM51.6466 2.85H62.1466C62.1466 9.325 59.1716 15.025 51.7216 18.675L50.6216 17C56.6466 14.125 59.6466 9.825 60.0716 4.5H51.6466V2.85ZM66.6716 0.425H68.7216V22.85H66.6716V0.425ZM84.5946 6.625H89.0946V0.449999H91.1696V16.875H89.0946V8.3H84.5946V6.625ZM85.9196 11.9L84.8946 13.5C82.3946 12.6 80.4696 10.725 79.4946 8.425C78.5196 10.975 76.4696 13.05 73.8446 14L72.7696 12.4C76.0946 11.2 78.4196 8.225 78.4196 5.05V3.925H73.4196V2.25H85.3946V3.925H80.4696V5.025C80.4696 7.95 82.6696 10.75 85.9196 11.9ZM78.8946 20.675H91.7946V22.35H76.8196V15.425H78.8946V20.675ZM108.293 11.375L107.268 12.975C104.768 12.075 102.843 10.225 101.843 7.9C100.893 10.475 98.8427 12.525 96.2177 13.5L95.1427 11.875C98.4677 10.7 100.793 7.7 100.793 4.525V3.625H95.7927V1.95H107.768V3.625H102.843V4.525C102.843 7.4 105.043 10.225 108.293 11.375ZM98.5427 16.725V15.075H113.543V22.875H111.468V16.725H98.5427ZM111.468 0.425H113.543V13.85H111.468V7.95H107.093V6.275H111.468V0.425Z" fill="black"/>
                        </svg>
                    </div></Link>
                    <Link to="/score/info"><div className="side-element" >
                        <svg width="6.25rem" height="6.25rem" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M40.8334 8.16663H8.16671C5.92087 8.16663 4.10379 10.0041 4.10379 12.25L4.08337 36.75C4.08337 38.9958 5.92087 40.8333 8.16671 40.8333H40.8334C43.0792 40.8333 44.9167 38.9958 44.9167 36.75V12.25C44.9167 10.0041 43.0792 8.16663 40.8334 8.16663ZM30.625 36.75H8.16671V28.5833H30.625V36.75ZM30.625 26.5416H8.16671V18.375H30.625V26.5416ZM40.8334 36.75H32.6667V18.375H40.8334V36.75Z" fill="black"/>
                        </svg>
                        <svg width="8.5rem" height="4rem" viewBox="0 0 66 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.55 11.225L12.525 12.825C10.025 11.925 8.1 10.05 7.125 7.75C6.15 10.325 4.1 12.375 1.475 13.325L0.4 11.725C3.725 10.525 6.05 7.55 6.05 4.375V3.525H1.05V1.85H13.025V3.525H8.1V4.35C8.1 7.275 10.3 10.075 13.55 11.225ZM6.225 16.275V20.9H16.8V16.275H6.225ZM4.225 22.55V14.65H18.8V22.55H4.225ZM16.725 0.425H18.8V13.55H16.725V7.75H12.3V6.05H16.725V0.425ZM41.998 8.975L41.148 10.625C37.673 10.025 34.298 8.075 32.848 5.375C31.448 8.1 28.073 10.025 24.573 10.625L23.748 8.975C27.823 8.375 31.773 5.675 31.773 2.475V1.225H33.923V2.475C33.923 5.6 37.923 8.375 41.998 8.975ZM42.973 13.05L42.998 14.75H33.823V22.875H31.773V14.75H22.723V13.05H42.973ZM49.9711 4.175V11.825C51.1461 11.8 52.3461 11.775 53.5461 11.7V4.175H49.9711ZM58.7961 11.275L58.9461 12.8C54.4711 13.5 49.2461 13.6 45.3711 13.6L45.1461 11.9C46.0211 11.9 46.9711 11.9 47.9711 11.875V4.175H45.7711V2.525H57.7461V4.175H55.5211V11.575C56.6461 11.5 57.7461 11.4 58.7961 11.275ZM50.5711 15.4V20.675H63.4711V22.35H48.5211V15.4H50.5711ZM62.4711 7.25H65.7711V8.95H62.4711V16.95H60.4211V0.425H62.4711V7.25Z" fill="black"/>
                        </svg>
                    </div></Link>
                    <Link to="/anlysis"><div className="side-element">
                        <svg width="6.25rem" height="6.25rem" viewBox="0 0 62 62" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.5334 23.7667H17.0501C19.0392 23.7667 20.6667 25.3942 20.6667 27.3834V45.4668C20.6667 47.4559 19.0392 49.0834 17.0501 49.0834H16.5334C14.5442 49.0834 12.9167 47.4559 12.9167 45.4668V27.3834C12.9167 25.3942 14.5442 23.7667 16.5334 23.7667ZM31.0001 12.9167C32.9893 12.9167 34.6167 14.5442 34.6167 16.5334V45.4668C34.6167 47.4559 32.9893 49.0834 31.0001 49.0834C29.0109 49.0834 27.3834 47.4559 27.3834 45.4668V16.5334C27.3834 14.5442 29.0109 12.9167 31.0001 12.9167ZM45.4668 33.5834C47.4559 33.5834 49.0834 35.2109 49.0834 37.2001V45.4668C49.0834 47.4559 47.4559 49.0834 45.4668 49.0834C43.4776 49.0834 41.8501 47.4559 41.8501 45.4668V37.2001C41.8501 35.2109 43.4776 33.5834 45.4668 33.5834Z" fill="black"/>
                        </svg>
                        <svg width="11.3rem" height="4rem" viewBox="0 0 86 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.65 2.85H12.15C12.15 9.325 9.175 15.025 1.725 18.675L0.625 17C6.65 14.125 9.65 9.825 10.075 4.5H1.65V2.85ZM16.675 0.425H18.725V22.85H16.675V0.425ZM24.948 17.825V16.15H40.548V22.65H38.498V17.825H24.948ZM33.898 12.75H43.023V14.425H22.673V12.75H31.823V10.4H25.298V4.925H38.398V2.6H25.248V1H40.423V6.45H27.323V8.8H40.898V10.4H33.898V12.75ZM60.6711 8.475V5.575H49.7711V8.475H60.6711ZM62.6961 1.125V10.1H47.7461V1.125H49.7711V4H60.6711V1.125H62.6961ZM49.6461 16.25V20.675H63.1211V22.35H47.6211V16.25H49.6461ZM45.0211 12.275H65.3961V13.925H56.3961V18.275H54.3461V13.925H45.0211V12.275ZM80.5441 11.1L79.4441 12.725C76.9941 11.775 75.0691 9.9 74.0941 7.55C73.1441 10.175 71.1691 12.175 68.5441 13.225L67.4691 11.575C70.8691 10.35 73.0191 7.325 73.0191 3.925V1.55H75.0691V4C75.0691 7.075 77.2941 9.95 80.5441 11.1ZM70.8941 16.575V14.925H85.9191V22.875H83.8441V16.575H70.8941ZM83.8441 0.449999H85.9191V13.675H83.8441V6.8H78.9691V5.125H83.8441V0.449999Z" fill="black"/>
                        </svg>
                    </div></Link>
                </div>
            </aside>

            <div className={`container ${isMenuVisible ? 'shifted' : ''}`}>
                <section className="register-menu">
                    <Link to="/register">
                        <svg width="3.5rem" height="3.5rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22.5 10.5H5.74497L13.065 3.17996C13.65 2.59496 13.65 1.63496 13.065 1.04996C12.48 0.464956 11.535 0.464956 10.95 1.04996L1.06497 10.935C0.479971 11.52 0.479971 12.465 1.06497 13.05L10.95 22.935C11.535 23.52 12.48 23.52 13.065 22.935C13.65 22.35 13.65 21.405 13.065 20.82L5.74497 13.5H22.5C23.325 13.5 24 12.825 24 12C24 11.175 23.325 10.5 22.5 10.5Z" fill="black"/>
                        </svg>
                    </Link>
                </section>

                <section className="hamburger-menu" onClick={toggleMenu}>
                    {isMenuVisible ? <CloseIcon /> : <MenuIcon />}
                </section>

                <div className="title-home"><span>{teamData.team_name}</span></div>

                <div className="record-summary">
                    <span className="record-summary-text">
                        <span>{teamData.played} 경기 / </span>
                        <span>{teamData.won} 승</span>
                        <span>{teamData.draw} 무</span>
                        <span>{teamData.loss} 패</span>
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
                        <div className="location">장소</div>
                    </div>
                    <div className="match-result">
                        <div className="result-text">매치결과</div>
                        <div className="outcome">승/무/패</div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default OverallMatchRecord;