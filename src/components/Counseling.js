import React, { useState, useEffect, useRef } from 'react';
import Chat from './Chat';
import Input from './Input';
import logoImg from '../assets/logo.png';
import styles from './Home.module.css';
import { useNavigate } from 'react-router-dom';
import LoadingIndicator from './LoadingIndicator';

function Counseling() {
  const [messages, setMessages] = useState([]); // 대화 메시지 관리
  const [step, setStep] = useState(0); // 입력 단계 관리
  const [userInfo, setUserInfo] = useState({}); // 유저 정보 저장
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 관리
  const fortuneRef = useRef(null); // fortune 메시지를 참조하는 ref
  const lambdaUrl = "https://m9xr5grrkj.execute-api.ap-northeast-2.amazonaws.com/dev/api/fortune";

  const navigate = useNavigate(); // useNavigate 훅 사용
  const goHome = () => {
    navigate("/"); // 버튼 클릭 시 / 페이지로 이동
  };

  const getQuestions = (concern) => [
    "이름이 무엇이지?",
    `태어난 연도, 월, 일을 차례로 말하시오 (예: 1990년 1월 1일)`,
    `태어난 시간도 혹시 아는가? 안다면 말하시오(모를 경우 ‘모름’이라고 작성하시오) (예: 14시 30분)`,
    `자, 무엇이 고민이지?`,
    `당신은 '${concern}'에 대해 고민하고 있군. 제시할 수 있는 해답은 이렇소.` // 고민 언급
  ];

  useEffect(() => {
    setMessages([{ sender: "bot", text: getQuestions('', '')[0] }]);
  }, []); // 첫 질문 추가

  const handleSend = (input) => {
    const newMessages = [{ sender: "user", text: input }];
    const keys = ["name", "birthDate", "birthTime", "concern"];

    if (step < 4) {
      setUserInfo((prev) => ({ ...prev, [keys[step]]: input }));

      const updatedQuestions = getQuestions(userInfo.name || input, userInfo.concern || input);

      if (step < 3) {
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            { sender: "bot", text: updatedQuestions[step + 1] },
          ]);
        }, 500);
      } else {
        setTimeout(async () => {
          setMessages((prev) => [
            ...prev,
            { sender: "bot", text: `당신은 ${input}에 대해 고민하고 있군. 이에 대해 내가 당신에게 줄 수 있는 해답은 이렇소.` }
          ]);

          // 로딩 상태 활성화
          setIsLoading((prev) => true);

          const response = await sendUserInfoToServer({ ...userInfo, concern: input });

          // 로딩 상태 비활성화
          setIsLoading((prev) => false);

          setMessages((prev) => [
            ...prev,
            { sender: "bot", type: "fortune", data: response }, // 응답 데이터 추가
          ]);
        }, 500);
      }

      setMessages((prev) => [...prev, ...newMessages]);
      setStep(step + 1);
    }
  };

  const sendUserInfoToServer = async (data) => {
    try {
      const response = await fetch(lambdaUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        return await response.json();
      } else {
        console.error('데이터 전송 실패:', response.statusText);
        return { advice: '서버로부터 유효한 응답을 받지 못했습니다.' };
      }
    } catch (error) {
      console.error('데이터 전송 중 오류 발생:', error);
      return { advice: '데이터 전송 중 오류가 발생했습니다.' };
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <div className={styles.logoContainer} onClick={goHome}>
          <img src={logoImg} alt="logo" />
        </div>
        <div style={{ padding: "20px", maxWidth: "600px", margin: "auto", borderRadius: "8px" }}>
          <Chat messages={messages} userInfo={userInfo} fortuneRef={fortuneRef} />
          {isLoading && <LoadingIndicator />} {/* 로딩 메시지 */}
          <Input onSend={handleSend} disabled={isLoading}/>
        </div>
      </div>
    </div>
  );
}

export default Counseling;
