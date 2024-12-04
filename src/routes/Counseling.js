import React, { useState, useEffect } from 'react';
import Chat from './Chat';
import Input from './Input';
import logoImg from '../assets/logo.png';
import titleImg from '../assets/title.png';
import styles from './Home.module.css';

function Counseling() {
  const [messages, setMessages] = useState([]); // 대화 메시지 관리
  const [step, setStep] = useState(0); // 입력 단계 관리
  const [userInfo, setUserInfo] = useState({}); // 유저 정보 저장

  const getQuestions = (name, concern) => [
    "이름이 무엇이지?",
    `${name}님이 태어난 연도, 월, 일을 차례로 말하시오 (예: 1990년 1월 1일)`,
    `${name}님, 태어난 시간도 혹시 아는가? 안다면 말하시오(모를 경우 ‘모름’이라고 작성하시오) (예: 14시 30분)`,
    `자, ${name}님, 무엇이 고민이지?`,
    `${name}님, 당신은 '${concern}'에 대해 고민하고 있군요. 제시할 수 있는 해답은 이렇소.` // 고민 언급
  ];

  useEffect(() => {
    // 페이지에 들어오자마자 첫 번째 질문 추가
    setMessages([{ sender: "bot", text: getQuestions('', '')[0] }]);
  }, []); // 빈 배열을 넣어 컴포넌트 첫 렌더링 시 실행

  const handleSend = (input) => {
    const newMessages = [{ sender: "user", text: input }];
    const keys = ["name", "birthDate", "birthTime", "concern"];

    if (step < 4) {
      // 유저 정보 저장
      setUserInfo((prev) => ({ ...prev, [keys[step]]: input }));

      // 다음 질문 생성
      const updatedQuestions = getQuestions(userInfo.name || input, userInfo.concern || input);

      if (step < 3) {
        // 봇의 질문을 0.5초 지연 후 추가
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            { sender: "bot", text: updatedQuestions[step + 1] },
          ]);
        }, 500);
      } else {
        // 마지막 응답
        setTimeout(async () => {
          // 서버로 데이터 전송
          setMessages((prev) => [
            ...prev,
            { sender: "bot", text: `${userInfo.name}은 ${input}에 대해 고민하고 있군. 이에 대해 내가 당신에게 줄 수 있는 해답은 이렇소.` }, 
          ]);
        }, 500);

        setTimeout(async () => {
          // 서버로 데이터 전송
          const response = await sendUserInfoToServer({ ...userInfo, [keys[step]]: input });
          setMessages((prev) => [
            ...prev,
            { sender: "bot", text: `${response.fact}` }, // TODO: 응답 데이터에 맞춰 수정 필요
          ]);
        }, 500);
      }

      // 유저 메시지는 즉시 추가
      setMessages((prev) => [...prev, ...newMessages]);
      setStep(step + 1);
    }
  };

  const sendUserInfoToServer = async (data) => {
    try {
      const response = await fetch('https://catfact.ninja/fact', { // TODO: 요청 url로 수정
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        return await response.json();
      } else {
        console.error('데이터 전송 실패:', response.statusText);
      }
    } catch (error) {
      console.error('데이터 전송 중 오류 발생:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <div className={styles.logoContainer}>
          <img src={logoImg} alt="logo" />
        </div>
        <div className={styles.titleContainer}>
          <img className={styles.img} src={titleImg} alt="title" />
        </div>
        <div style={{ padding: "20px", maxWidth: "500px", margin: "auto", borderRadius: "8px" }}>
          <Chat messages={messages} />
          <Input onSend={handleSend} />
        </div>
      </div>
    </div>
  );
}

export default Counseling;
