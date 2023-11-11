import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';

import "../GlobalStyle";
import "./RegisterTeam.css"

function RegisterTeam() {
    const cookies = document.cookie.split('; ');
    const userIdCookie = cookies.find(cookie => cookie.startsWith('userId='));
    const id = userIdCookie ? userIdCookie.split('=')[1] : null;
    console.log(id);

    // 활동지역 선택
    const areaLists = {
        area0: ["시/도 선택","서울특별시","인천광역시","대전광역시","광주광역시","대구광역시","울산광역시","부산광역시","경기도","강원도","충청북도","충청남도","전라북도","전라남도","경상북도","경상남도","제주도"],
        area1: ["강남구","강동구","강북구","강서구","관악구","광진구","구로구","금천구","노원구","도봉구","동대문구","동작구","마포구","서대문구","서초구","성동구","성북구","송파구","양천구","영등포구","용산구","은평구","종로구","중구","중랑구"],
        area2: ["계양구","남구","남동구","동구","부평구","서구","연수구","중구","강화군","옹진군"],
        area3: ["대덕구","동구","서구","유성구","중구"],
        area4: ["광산구","남구","동구","북구","서구"],
        area5: ["남구","달서구","동구","북구","서구","수성구","중구","달성군"],
        area6: ["남구","동구","북구","중구","울주군"],
        area7: ["강서구","금정구","남구","동구","동래구","부산진구","북구","사상구","사하구","서구","수영구","연제구","영도구","중구","해운대구","기장군"],
        area8: ["고양시","과천시","광명시","광주시","구리시","군포시","김포시","남양주시","동두천시","부천시","성남시","수원시","시흥시","안산시","안성시","안양시","양주시","오산시","용인시","의왕시","의정부시","이천시","파주시","평택시","포천시","하남시","화성시","가평군","양평군","여주군","연천군"],
        area9: ["강릉시","동해시","삼척시","속초시","원주시","춘천시","태백시","고성군","양구군","양양군","영월군","인제군","정선군","철원군","평창군","홍천군","화천군","횡성군"],
        area10: ["제천시","청주시","충주시","괴산군","단양군","보은군","영동군","옥천군","음성군","증평군","진천군","청원군"],
        area11: ["계룡시","공주시","논산시","보령시","서산시","아산시","천안시","금산군","당진군","부여군","서천군","연기군","예산군","청양군","태안군","홍성군"],
        area12: ["군산시","김제시","남원시","익산시","전주시","정읍시","고창군","무주군","부안군","순창군","완주군","임실군","장수군","진안군"],
        area13: ["광양시","나주시","목포시","순천시","여수시","강진군","고흥군","곡성군","구례군","담양군","무안군","보성군","신안군","영광군","영암군","완도군","장성군","장흥군","진도군","함평군","해남군","화순군"],
        area14: ["경산시","경주시","구미시","김천시","문경시","상주시","안동시","영주시","영천시","포항시","고령군","군위군","봉화군","성주군","영덕군","영양군","예천군","울릉군","울진군","의성군","청도군","청송군","칠곡군"],
        area15: ["거제시","김해시","마산시","밀양시","사천시","양산시","진주시","진해시","창원시","통영시","거창군","고성군","남해군","산청군","의령군","창녕군","하동군","함안군","함양군","합천군"],
        area16: ["서귀포시","제주시","남제주군","북제주군"]
    }

    const [selectedSido, setSelectedSido] = useState('area0');
    const [gugunOptions, setGugunOptions] = useState([]);

    const handleSidoChange = (event) => {
        const areaKey = `area${event.target.selectedIndex}`;
        setSelectedSido(areaKey);
        setGugunOptions(areaLists[areaKey] || []);
    };

    // 팀 연령대
    const ageGroups = ['10대', '20대', '30대', '40대', '50대', '60대이상'];
    const [selectedAges, setSelectedAges] = useState([]);

    const toggleAge = (age) => {
        setSelectedAges((prevSelectedAges) => {
            if (prevSelectedAges.includes(age)) {
                return prevSelectedAges.filter(selectedAge => selectedAge !== age);
            } else {
                return [...prevSelectedAges, age].sort((a, b) => ageGroups.indexOf(a) - ageGroups.indexOf(b));
            }
        });
    };

    const [ageRangeStart, setAgeRangeStart] = useState('');
    const [ageRangeEnd, setAgeRangeEnd] = useState('');
    useEffect(() => {
        if (selectedAges.length === 0) {
            setAgeRangeStart('');
            setAgeRangeEnd('');
            // 예: 사용자에게 경고를 표시하거나, 입력을 강제하는 로직을 추가할 수 있습니다.
        } else {
            const startAge = selectedAges[0];
            const endAge = selectedAges[selectedAges.length - 1];
            setAgeRangeStart(startAge);
            setAgeRangeEnd(endAge);
        }
    }, [selectedAges]);

    // 팀 실력
    const [selectedValue, setSelectedValue] = useState('하');

    const handleSkillChange = (event) => {
        setSelectedValue(event.target.value);
    };

    // 서버 응답에 따라 /home 페이지로 라우팅
    const navigate = useNavigate();
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        // for (let [key, value] of formData.entries()) {
        //     console.log(`${key}: ${value}`);
        // }

        try {
            const response = await fetch('http://localhost:8080/enroll/team', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                navigate('/home');
            } else {
                console.error('Server responded with non-OK status');
                navigate('/');
            }
        } catch (error) {
            console.error('Network error:', error);
            navigate('/register');
        }
    }

    return (
        <div className="default-container">
            <div className="container">
                <div className="title">우리 팀 등록</div>

                <form onSubmit={handleSubmit} name="team_info">
                    <input type="hidden" name="leader_id" value={id} />
                    <div className="section-title">팀명</div>
                    <div className="input-group">
                        <svg width="2.8rem" height="2.8rem" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.5 14.375V17.5H5.625L14.8417 8.28334L11.7167 5.15834L2.5 14.375ZM17.2583 5.86667C17.5833 5.54167 17.5833 5.01667 17.2583 4.69167L15.3083 2.74167C14.9833 2.41667 14.4583 2.41667 14.1333 2.74167L12.6083 4.26667L15.7333 7.39167L17.2583 5.86667Z" fill="#999999"/>
                        </svg>
                        <input type="text" name="team_name" placeholder="팀명을 입력해 주세요" required/>
                    </div>

                    <div className="section-title">활동지역</div>
                    <div className="region-select">
                        <div className="input-group" style={{marginRight: 20}}>
                            <select name="region_sido" onChange={handleSidoChange}>
                                {areaLists.area0.map((sido, index) => (
                                    <option key={index} value={sido}>{sido}</option>
                                ))}
                            </select>
                        </div>
                        <div className="input-group" style={{marginLeft: 20}}>
                            <select name="region_gugun">
                                <option>구/군 선택</option>
                                {gugunOptions.map((gugun, index) => (
                                    <option key={index} value={gugun}>{gugun}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="section-title">선호 구장</div>
                    <div className="input-group">
                        <svg width="2.8rem" height="2.8rem" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 1.66663C6.77502 1.66663 4.16669 4.27496 4.16669 7.49996C4.16669 10.975 7.85002 15.7666 9.36669 17.5916C9.70002 17.9916 10.3084 17.9916 10.6417 17.5916C12.15 15.7666 15.8334 10.975 15.8334 7.49996C15.8334 4.27496 13.225 1.66663 10 1.66663ZM10 9.58329C8.85002 9.58329 7.91669 8.64996 7.91669 7.49996C7.91669 6.34996 8.85002 5.41663 10 5.41663C11.15 5.41663 12.0834 6.34996 12.0834 7.49996C12.0834 8.64996 11.15 9.58329 10 9.58329Z" fill="#999999"/>
                        </svg>
                        <input type="text" name="field" placeholder="선호구장을 입력해 주세요" required/>
                    </div>

                    <div className="section-title">팀 연령대 (중복선택 가능)</div>
                    <div className="age-selector">
                        <div className="age-group">
                            {ageGroups.map((age) => (
                                <button className="age-button"
                                        type="button"
                                    key={age}
                                    onClick={() => toggleAge(age)}
                                    style={{ backgroundColor: selectedAges.includes(age) ? '#999999' : '#F1F1F5' }}>
                                    {age}
                                </button>
                            ))}
                        </div>
                        <input type="hidden" name="age_range_start" value={ageRangeStart} />
                        <input type="hidden" name="age_range_end" value={ageRangeEnd} />
                    </div>

                    <div className="section-title">팀 실력</div>
                    <div className="radio-button-group">
                        <label className="custom-radio-button">
                            <input type="radio" name="competence" value="하" checked={selectedValue === '하'} onChange={handleSkillChange}/>
                            <span className="radio-text">하</span>
                        </label>
                        <label className="custom-radio-button">
                            <input type="radio" name="competence" value="하하" checked={selectedValue === '하하'} onChange={handleSkillChange}/>
                            <span className="radio-text">하하</span>
                        </label>
                        <label className="custom-radio-button">
                            <input type="radio" name="competence" value="하하하" checked={selectedValue === '하하하'} onChange={handleSkillChange}/>
                            <span className="radio-text">하하하</span>
                        </label>
                    </div>
                    <div>
                        <button type="submit" className="submit-button"><span className="submit-text">팀 등록 완료</span></button>
                    </div>
                </form>

            </div>

        </div>
    );
}

export default RegisterTeam;