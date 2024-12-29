import { useState, useEffect, useRef } from 'react';
import styles from './Input.module.css';

function Input({ onSend, disabled }) {
  const [input, setInput] = useState('');
  const [keyboardOffset, setKeyboardOffset] = useState(0); // 키보드로 인한 오프셋 높이 관리
  const formRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.visualViewport) {
        const { height, offsetTop } = window.visualViewport;
        const viewportHeight = window.innerHeight;

        // 키보드가 올라온 경우 계산
        if (height < viewportHeight) {
          setKeyboardOffset(viewportHeight - height - offsetTop);
        } else {
          setKeyboardOffset(0); // 키보드가 내려오면 초기화
        }
      }
    };

    window.visualViewport?.addEventListener('resize', handleResize);
    return () => {
      window.visualViewport?.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSend(input.trim());
      setInput('');
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        gap: '5px',
        bottom: `${keyboardOffset}px`, // 키보드 오프셋 적용
        zIndex: 1000,
      }}
      className={styles.inputContainer}
    >
      <input
        disabled={disabled}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="답변을 입력하시오"
        className={styles.inputField}
      />
      <button
        type="submit"
        disabled={disabled}
        className={styles.inputButton}
      >
        입력
      </button>
    </form>
  );
}

export default Input;
