import React from 'react';
import receiptImage from '../assets/receipt.png'; // 이미지 import
import styles from './FortuneMessage.module.css';

const FortuneMessage = ({ userInfo, msg }) => {
  return (
    <div
      className={styles.fortuneMessageContainer}
    >
      <img src={receiptImage}/>
      <div className={styles.textOverlay}>
        <div className={styles.infoContainer}>
          <p className={styles.name}>{userInfo.name}</p>
          <p>{userInfo.birthTime}</p>
          <p>{userInfo.birthDate}</p>
        </div>
        <div className={styles.adviceContainer}>
          <p>{msg.data.advice}</p>
        </div>
        <div className={styles.amuletContainer}>
          <p><strong>추천 부적</strong> : {msg.data.amulet}</p>
          <span>{msg.data.amuletDescription}</span>
        </div>
        <div className={styles.fortuneContainer}>
          <p className={styles.plainText1}>총운: {msg.data.total}</p>
          <p className={styles.plainText1}>재물운: {msg.data.finance}</p>
          <p className={styles.plainText1}>애정운: {msg.data.love}</p>
          <p className={styles.plainText1}>건강운: {msg.data.health}</p>
        </div>
        <div className={styles.messageContainer}>
          <p>{msg.data.message}</p>
        </div>
      </div>
    </div>
  );
};

export default FortuneMessage;
