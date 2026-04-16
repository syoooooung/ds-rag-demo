import React from 'react';

/**
 * MessageBubble 컴포넌트
 * 채팅 메시지를 표시하는 말풍선
 */
const MessageBubble = ({ message, type }) => {
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`message-bubble ${type}`}>
      <div className="message-content">{message}</div>
      <div className="message-time">{formatTime(Date.now())}</div>
    </div>
  );
};

export default MessageBubble;
