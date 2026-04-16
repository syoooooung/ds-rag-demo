import React, { useState, useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import StageDisplay from './StageDisplay';
import QuestionInput from './QuestionInput';
import MarkdownText from './MarkdownText';
import { runDSRAGPipeline } from '../services/dsragSimulator';

/**
 * ChatInterface 컴포넌트
 * 전체 채팅 인터페이스를 관리하고 DS-RAG 파이프라인 실행
 */
const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedStage, setSelectedStage] = useState(null);
  const chatContainerRef = useRef(null);

  // 자동 스크롤
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleQuestionSubmit = async (question) => {
    // 사용자 질문 추가
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        type: 'user',
        content: question
      }
    ]);

    setIsProcessing(true);

    // 로딩 메시지 추가
    const loadingId = Date.now() + 1;
    setMessages((prev) => [
      ...prev,
      {
        id: loadingId,
        type: 'loading',
        content: 'DS-RAG 파이프라인을 실행 중입니다...'
      }
    ]);

    try {
      // DS-RAG 파이프라인 실행
      const stages = await runDSRAGPipeline(question);

      // 로딩 메시지 제거
      setMessages((prev) => prev.filter((msg) => msg.id !== loadingId));

      // 각 단계를 순차적으로 표시
      for (const stage of stages) {
        await new Promise((resolve) => setTimeout(resolve, 200));
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + Math.random(),
            type: 'stage',
            content: stage
          }
        ]);
      }

      // 최종 답변 표시 (Stage 5의 finalAnswer)
      const finalStage = stages.find(s => s.stageNumber === 5);
      if (finalStage && finalStage.data && finalStage.data.finalAnswer) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            type: 'answer',
            content: finalStage.data.finalAnswer
          }
        ]);
      }
    } catch (error) {
      console.error('DS-RAG pipeline error:', error);
      setMessages((prev) => [
        ...prev.filter((msg) => msg.id !== loadingId),
        {
          id: Date.now(),
          type: 'system',
          content: '❌ 오류가 발생했습니다. 다시 시도해주세요.'
        }
      ]);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="interface-layout">
      <div className="left-panel">
        <div className="chat-container" ref={chatContainerRef}>
          {messages.length === 0 && (
            <div className="welcome-message">
              <h3>👋 환영합니다!</h3>
              <p>질문을 입력하여 DS-RAG의 5단계 프로세스를 경험해보세요</p>
            </div>
          )}

          {messages.map((message) => {
            if (message.type === 'user') {
              return (
                <MessageBubble
                  key={message.id}
                  message={message.content}
                  type="user"
                />
              );
            } else if (message.type === 'system') {
              return (
                <MessageBubble
                  key={message.id}
                  message={message.content}
                  type="system"
                />
              );
            } else if (message.type === 'answer') {
              return (
                <div key={message.id} className="final-answer-bubble">
                  <div className="answer-header">
                    <span className="answer-icon">✨</span>
                    <span className="answer-title">최종 답변</span>
                  </div>
                  <div className="answer-content">
                    <MarkdownText content={message.content} />
                  </div>
                </div>
              );
            } else if (message.type === 'stage') {
              return (
                <StageDisplay
                  key={message.id}
                  stage={message.content}
                  compact={true}
                  isSelected={selectedStage?.id === message.id}
                  onClick={() => setSelectedStage({ id: message.id, content: message.content })}
                />
              );
            } else if (message.type === 'loading') {
              return (
                <div key={message.id} className="loading">
                  <div className="loading-spinner"></div>
                  <div className="loading-text">{message.content}</div>
                </div>
              );
            }
            return null;
          })}
        </div>

        <QuestionInput onSubmit={handleQuestionSubmit} isProcessing={isProcessing} />
      </div>

      <div className="right-panel">
        {selectedStage ? (
          <div className="detail-view">
            <div className="detail-header">
              <h2>단계 상세 정보</h2>
              <button className="close-button" onClick={() => setSelectedStage(null)}>✕</button>
            </div>
            <StageDisplay stage={selectedStage.content} compact={false} />
          </div>
        ) : (
          <div className="detail-placeholder">
            <div className="placeholder-content">
              <div className="placeholder-orb"></div>
              <h3>DS-RAG 파이프라인</h3>
              <p>왼쪽의 단계를 클릭하면 상세 정보를 확인할 수 있습니다</p>
              <div className="placeholder-steps">
                <div className="placeholder-step">1️⃣ 사용자 입력</div>
                <div className="placeholder-step">2️⃣ EPQD 모듈</div>
                <div className="placeholder-step">3️⃣ 문서 검색</div>
                <div className="placeholder-step">4️⃣ DICS 모듈</div>
                <div className="placeholder-step">5️⃣ LLM 생성</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatInterface;
