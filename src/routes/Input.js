import { useState } from 'react';
import btnSend from '../assets/send_btn.png';

function Input({ onSend }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSend(input.trim());
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', margin: '30px 0' }}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="답변을 입력하시오"
        style={{ flex: 1, padding: '15px', borderRadius: '40px', border: '1px solid #ccc', fontSize: '18px' }}
      />
      <button
        type="submit"
        style={{
          padding: '15px',
          borderRadius: '40px',
          border: 'none',
          width: '100px', // 버튼 너비를 고정
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          src={btnSend} // 원하는 이미지의 URL
          alt="보내기"
          style={{
            height: '20px', // 이미지 크기 조정
            width: '20px',  // 이미지 크기 조정
          }}
        />
    </button>
    </form>
  );
}

export default Input;
