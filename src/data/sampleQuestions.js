/**
 * 샘플 질문 데이터
 * DS-RAG 프레임워크를 테스트하기 위한 예시 질문들
 */

export const sampleQuestions = [
  {
    id: 1,
    question: '찰리 채플린과 브루스 빌슨 중 누가 더 아이코닉한 인물로 여겨지나요?',
    category: '아이코닉 비교',
    description: 'DS-RAG 전체 파이프라인과 DICS 모듈의 상세 시각화를 보여주는 핵심 질문'
  }
];

export const getRandomQuestion = () => {
  const randomIndex = Math.floor(Math.random() * sampleQuestions.length);
  return sampleQuestions[randomIndex];
};
