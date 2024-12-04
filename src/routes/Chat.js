import React, { useEffect, useRef } from 'react';

function Chat({ messages }) {
  const chatContainerRef = useRef(null); // 메시지 컨테이너를 참조하기 위한 ref

  useEffect(() => {
    // 메시지가 변경될 때마다 스크롤을 맨 아래로 이동
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]); // messages가 변경될 때마다 실행

  return (
    <div
      ref={chatContainerRef} // ref를 적용하여 DOM을 직접 참조
      style={{
        height: "400px",
        overflowY: "scroll",
        borderRadius: "8px",
        padding: "10px",
        marginBottom: "10px",
      }}
    >
      {messages.map((msg, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
            marginBottom: "10px",
          }}
        >
          <div
            style={{
              maxWidth: "70%",
              padding: "10px",
              borderRadius: "15px",
              backgroundColor: msg.sender === "user" ? "#dcf8c6" : "#ffffff",
              color: "#333",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              position: "relative",
              textAlign: "left",
            }}
          >
            <strong
              style={{
                display: "block",
                marginBottom: "5px",
                fontSize: "0.9em",
                color: msg.sender === "user" ? "#0b7300" : "#555",
              }}
            >
              {msg.sender === "user" ? "나" : "푸른뱀"}
            </strong>
            {msg.text}
            <div
              style={{
                content: "",
                position: "absolute",
                bottom: "10px",
                width: "0",
                height: "0",
                borderStyle: "solid",
                borderWidth: "10px",
                borderColor:
                  msg.sender === "user"
                    ? "transparent transparent transparent #dcf8c6"
                    : "transparent #ffffff transparent transparent",
                left: msg.sender === "user" ? "auto" : "-10px",
                right: msg.sender === "user" ? "-10px" : "auto",
              }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Chat;
