import React from 'react';

/**
 * 간단한 마크다운 텍스트 렌더러
 * **bold**, 줄바꿈, 리스트 등을 렌더링
 */
const MarkdownText = ({ content }) => {
  if (!content) return null;

  // 텍스트를 단락으로 분리
  const paragraphs = content.split('\n\n');

  return (
    <div className="markdown-content">
      {paragraphs.map((paragraph, idx) => {
        // 빈 줄 건너뛰기
        if (!paragraph.trim()) return null;

        // 숫자로 시작하는 리스트 항목 확인 (예: "1. ", "2. ")
        if (/^\d+\.\s/.test(paragraph.trim())) {
          return (
            <div key={idx} className="markdown-list-item">
              {renderInlineMarkdown(paragraph)}
            </div>
          );
        }

        // 일반 단락
        return (
          <p key={idx} className="markdown-paragraph">
            {renderInlineMarkdown(paragraph)}
          </p>
        );
      })}
    </div>
  );
};

/**
 * 인라인 마크다운 렌더링 (볼드, 이탤릭 등)
 */
function renderInlineMarkdown(text) {
  const parts = [];
  let currentIndex = 0;
  let key = 0;

  // **bold** 패턴 찾기
  const boldRegex = /\*\*([^*]+)\*\*/g;
  let match;

  while ((match = boldRegex.exec(text)) !== null) {
    // 매칭 전의 일반 텍스트
    if (match.index > currentIndex) {
      parts.push(
        <span key={`text-${key++}`}>
          {text.substring(currentIndex, match.index)}
        </span>
      );
    }

    // 볼드 텍스트
    parts.push(
      <strong key={`bold-${key++}`}>
        {match[1]}
      </strong>
    );

    currentIndex = match.index + match[0].length;
  }

  // 남은 텍스트
  if (currentIndex < text.length) {
    parts.push(
      <span key={`text-${key++}`}>
        {text.substring(currentIndex)}
      </span>
    );
  }

  return parts.length > 0 ? parts : text;
}

export default MarkdownText;
