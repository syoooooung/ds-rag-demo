import React, { useState } from 'react';
import { sampleQuestions } from '../data/sampleQuestions';

/**
 * QuestionInput 컴포넌트
 * 사용자 질문 입력 인터페이스 (OrbitaGPT 스타일)
 */
const QuestionInput = ({ onSubmit, isProcessing }) => {
  const [inputValue, setInputValue] = useState('');

  const icons = {
    code: (
      <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
    send: (
      <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
      </svg>
    ),
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() && !isProcessing) {
      onSubmit(inputValue.trim());
      setInputValue('');
    }
  };

  const handleSampleClick = (question) => {
    if (!isProcessing) {
      setInputValue(question);
    }
  };

  return (
    <div className="input-area">
      <div className="input-container">
        {/* Sample Questions */}
        {sampleQuestions.length > 0 && (
          <div className="sample-questions">
            <div className="sample-questions-title">💡 샘플 질문</div>
            {sampleQuestions.map((sq) => (
              <button
                key={sq.id}
                className="sample-button"
                onClick={() => handleSampleClick(sq.question)}
                disabled={isProcessing}
                title={sq.description}
              >
                {sq.category}
              </button>
            ))}
          </div>
        )}

        {/* Input Form */}
        <form onSubmit={handleSubmit}>
          <div className="input-form">
            <span className="input-icon">{icons.code}</span>
            <input
              type="text"
              className="input-field"
              placeholder="질문을 입력하세요..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isProcessing}
            />
          </div>

          {/* Action Buttons */}
          <div className="input-actions">
            <div style={{ flex: 1 }} />
            <button
              type="submit"
              className="input-btn-primary"
              disabled={isProcessing || !inputValue.trim()}
            >
              {icons.send} {isProcessing ? '처리 중...' : '전송'}
            </button>
          </div>
        </form>
      </div>

      {/* Footer */}
      <p className="input-footer">
        DS-RAG는 시연 목적의 시뮬레이션 정보를 표시할 수 있습니다.{' '}
        <a
          href="https://www.mdpi.com/2079-9292/14/4/659"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'underline', cursor: 'pointer' }}
        >
          논문 읽기
        </a>
      </p>
    </div>
  );
};

export default QuestionInput;
