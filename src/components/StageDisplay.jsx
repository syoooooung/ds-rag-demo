import React from 'react';
import MarkdownText from './MarkdownText';

/**
 * StageDisplay 컴포넌트
 * DS-RAG 각 단계의 결과를 상세하게 표시
 */
const StageDisplay = ({ stage, compact = false, isSelected = false, onClick }) => {
  const { stageNumber, stageName, description, data, timing } = stage;

  // Compact 모드: 간단한 요약만 표시
  if (compact) {
    return (
      <div
        className={`stage-card ${isSelected ? 'selected' : ''}`}
        onClick={onClick}
      >
        <div className="stage-card-header">
          <div className="stage-number">{stageNumber}</div>
          <div className="stage-card-title">
            <h4>{stageName}</h4>
            <p>{description}</p>
          </div>
          <div className="stage-card-arrow">›</div>
        </div>
      </div>
    );
  }

  // Detailed 모드: 전체 내용 표시
  return (
    <div className="stage-display">
      <div className="stage-header">
        <div className="stage-number">{stageNumber}</div>
        <div className="stage-title">
          <h3>{stageName}</h3>
          <p>{description}</p>
          {timing && <span className="stage-timing">⏱ {timing}</span>}
        </div>
      </div>

      <div className="stage-content">
        {renderStageContent(stageNumber, data)}
      </div>
    </div>
  );
};

/**
 * Render stage-specific content
 */
function renderStageContent(stageNumber, data) {
  switch (stageNumber) {
    case 1:
      return renderStage1(data);
    case 2:
      return renderStage2(data);
    case 3:
      return renderStage3(data);
    case 4:
      return renderStage4(data);
    case 5:
      return renderStage5(data);
    default:
      return <p>Unknown stage</p>;
  }
}

/**
 * Stage 1: User Input
 */
function renderStage1(data) {
  return (
    <div className="stage-1-content">
      <div className="question-box">
        <strong>질문:</strong>
        <div className="question-text">{data.question}</div>
      </div>
    </div>
  );
}

/**
 * Stage 2: EPQD - 다이어그램 형태
 */
function renderStage2(data) {
  const segments = [
    { label: '비교 대상 1', entity: '찰리 채플린' },
    { label: '비교 속성', entity: '아이코닉 지위' },
    { label: '비교 대상 2', entity: '브루스 빌슨' }
  ];

  return (
    <div className="stage-2-content">
      {/* 다이어그램: 원본 질문 → 세그먼트 → 하위 질문 */}
      <div className="epqd-diagram">
        <h4 className="diagram-title">🔄 질문 분해 프로세스</h4>

        {/* 원본 질문 */}
        <div className="original-question-box">
          {data.originalQuestion}
        </div>

        {/* 화살표 */}
        <div className="diagram-arrow-down">
          <div className="arrow-icon">↓</div>
          <div className="arrow-label">분절 규칙 적용</div>
        </div>

        {/* 세그먼트들 */}
        <div className="segments-container">
          {segments.map((seg, idx) => (
            <div key={idx} className="segment-box">
              <div className="segment-label">{seg.label}</div>
              <div className="segment-entity">{seg.entity}</div>
            </div>
          ))}
        </div>

        {/* 화살표들 */}
        <div className="multi-arrows-down">
          <div className="arrow-icon">↓</div>
          <div className="arrow-icon">↓</div>
          <div className="arrow-icon">↓</div>
        </div>

        {/* 하위 질문들 */}
        <div className="subquestions-container">
          {data.subQuestions.map((sq, idx) => (
            <div key={idx} className="subquestion-box">
              <div className="subquestion-label">Q{idx + 1}</div>
              <div className="subquestion-text">{sq}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 핵심 특징 (간단하게) */}
      {data.keyFeatures && (
        <div className="epqd-features-compact">
          <div className="feature-badge feature-success">
            ✅ 엔티티 보존
          </div>
          <div className="feature-badge feature-warning">
            🚫 불필요한 질문 억제
          </div>
          <div className="feature-badge feature-info">
            ⚖️ 세그먼트 정합 (3→3)
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Question Graph 시각화 헬퍼 함수
 */
function renderQuestionGraph(graphData) {
  // 노드 위치 설정 (삼각형 배치)
  const nodePositions = {
    '찰리 채플린': { x: '15%', y: '20%' },
    '브루스 빌슨': { x: '15%', y: '70%' },
    '아이코닉 지위': { x: '70%', y: '45%' }
  };

  // 엣지 그리기를 위한 좌표 계산
  const getNodeCenter = (label) => {
    const pos = nodePositions[label];
    return {
      x: parseFloat(pos.x),
      y: parseFloat(pos.y)
    };
  };

  // 주요 엣지 (찰리 채플린/브루스 빌슨 -> 아이코닉 지위)
  const primaryEdges = graphData.edges.filter(
    edge => edge.target === '아이코닉 지위'
  );

  return (
    <>
      {/* 노드 렌더링 */}
      {graphData.nodes.map((node) => (
        <div
          key={node.id}
          className={`graph-node ${node.importance === 'critical' ? 'core-node' : ''}`}
          style={{
            left: nodePositions[node.label].x,
            top: nodePositions[node.label].y
          }}
        >
          {node.label}
        </div>
      ))}

      {/* 엣지 렌더링 - SVG로 화살표 그리기 */}
      <svg
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 1
        }}
      >
        <defs>
          <marker
            id="arrowhead-primary"
            markerWidth="10"
            markerHeight="10"
            refX="9"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 10 3, 0 6" fill="#d97706" />
          </marker>
        </defs>

        {/* 찰리 채플린 -> 아이코닉 지위 */}
        <line
          x1="20%"
          y1="25%"
          x2="67%"
          y2="47%"
          stroke="#d97706"
          strokeWidth="3"
          markerEnd="url(#arrowhead-primary)"
        />

        {/* 브루스 빌슨 -> 아이코닉 지위 */}
        <line
          x1="20%"
          y1="75%"
          x2="67%"
          y2="53%"
          stroke="#d97706"
          strokeWidth="3"
          markerEnd="url(#arrowhead-primary)"
        />
      </svg>

      {/* 엣지 레이블 */}
      <div
        className="graph-edge-label"
        style={{ left: '43%', top: '32%' }}
      >
        여겨지다
      </div>
      <div
        className="graph-edge-label"
        style={{ left: '43%', top: '67%' }}
      >
        여겨지다
      </div>
    </>
  );
}

/**
 * Stage 3: Retrieval - 다이어그램 형태
 */
function renderStage3(data) {
  return (
    <div className="stage-3-content">
      <div className="retrieval-diagram">
        {data.retrievalNote && (
          <div className="note-box">
            ℹ️ {data.retrievalNote}
          </div>
        )}

        {data.retrievalResults.map((result, idx) => (
          <div key={idx} className="retrieval-section">
            <div className="retrieval-section-title">
              <span>Q{idx + 1}</span> {result.subQuestion}
            </div>
            <div className="document-cards">
              {result.chunks.map((chunk) => (
                <div key={chunk.id} className="document-card" title={chunk.text}>
                  <div className="doc-emoji">📄</div>
                  <div className="doc-id">{chunk.id}</div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="stats-bar">
          <div className="stat-badge">
            <span className="stat-number">{data.totalChunksRetrieved}</span>
            <span className="stat-label">총 검색된 청크</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Stage 4: DICS - Most Important!
 */
function renderStage4(data) {
  return (
    <div className="stage-4-content">
      {/* Section 4a: Question Graph - 시각적 그래프 */}
      <div className="dics-section">
        <h4>🕸️ 단계 4a: 질문 그래프 구축</h4>
        <p className="section-description">{data.questionGraph.description}</p>

        <div className="question-graph-container">
          <div className="graph-title">질문 그래프 시각화</div>
          <div className="graph-visualization">
            {renderQuestionGraph(data.questionGraph)}
          </div>
          <div className="core-node-info">
            진입 차수가 가장 높은 <strong>'{data.coreNodeIdentification.coreNode}'</strong>가 코어 노드로 선택됨
          </div>
        </div>

        <div className="graph-analysis">
          <strong>분석:</strong> {data.questionGraph.graphAnalysis}
        </div>
      </div>

      {/* Section 4b: Core Node Identification - 간소화 */}
      <div className="dics-section">
        <h4>🎯 단계 4b: 코어 노드 식별</h4>
        <div className="core-result">
          <strong>결과:</strong> <span className="core-node-highlight">{data.coreNodeIdentification.coreNode}</span>가 코어 노드로 식별되었습니다.
          <p>{data.coreNodeIdentification.explanation}</p>
        </div>
      </div>

      {/* Section 4c: Selection Criteria - 시각적 다이어그램 */}
      <div className="dics-section">
        <h4>📌 단계 4c: 선택 기준 도출</h4>
        <p className="section-description">{data.selectionCriteria.description}</p>

        <div className="criteria-diagram">
          {data.selectionCriteria.criteria.map((criterion) => {
            const matchedChunks = data.selectedChunks.filter(chunk =>
              chunk.matchedCriteria.includes(criterion.id)
            );
            return (
              <div key={criterion.id} className="criterion-section">
                <div className="criterion-header">
                  <div className="criterion-badge">{criterion.id}</div>
                  <div className="criterion-text">{criterion.criterion}</div>
                </div>
                <div className="criterion-arrow">↓</div>
                <div className="matched-chunks">
                  {matchedChunks.map((chunk) => (
                    <div key={chunk.id} className="chunk-badge">
                      📄 {chunk.id}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Fixed Top-K vs DICS 비교 */}
        {data.selectionCriteria.comparisonWithTopK && (
          <div className="topk-comparison">
            <h5>🔄 Fixed Top-K vs DICS 비교</h5>
            <div className="comparison-grid">
              <div className="comparison-item topk">
                <div className="comparison-label">❌ Fixed Top-K 방식</div>
                <p>{data.selectionCriteria.comparisonWithTopK.topKApproach}</p>
              </div>
              <div className="comparison-item dics">
                <div className="comparison-label">✅ DICS 방식</div>
                <p>{data.selectionCriteria.comparisonWithTopK.dicsApproach}</p>
              </div>
            </div>
            <div className="comparison-advantage">
              <strong>💡 장점:</strong> {data.selectionCriteria.comparisonWithTopK.advantage}
            </div>
          </div>
        )}
      </div>

      {/* Section 4d: Context Selection - 간소화 */}
      <div className="dics-section">
        <h4>✨ 단계 4d: 컨텍스트 선택</h4>
        <p className="section-description">
          각 기준(criterion)마다 가장 적합한 청크를 동적으로 선택합니다.
        </p>

        <div className="selected-chunks-flow">
          {data.selectedChunks.map((chunk) => (
            <div key={chunk.id} className="chunk-badge">
              📄 {chunk.id}
            </div>
          ))}
        </div>

        <details style={{ marginTop: '16px' }}>
          <summary style={{ cursor: 'pointer', fontWeight: 600, color: '#6c8dfa' }}>
            선택된 청크 상세 정보 ({data.selectedChunks.length}개)
          </summary>
          <div className="selected-chunks-section" style={{ marginTop: '12px' }}>
            {data.selectedChunks.map((chunk) => (
              <div key={chunk.id} className="selected-chunk">
                <div className="chunk-header">
                  <span className="chunk-id">[{chunk.id}]</span>
                  <span className="chunk-source">{chunk.source}</span>
                  <span className="relevance-score">{(chunk.relevanceScore * 100).toFixed(0)}%</span>
                </div>
                <div className="chunk-text">{chunk.text}</div>
                <div className="selection-meta">
                  <div className="selection-reason">
                    <strong>선택 이유:</strong> {chunk.selectionReason}
                  </div>
                  <div className="matched-criteria">
                    <strong>매칭된 기준:</strong> {chunk.matchedCriteria.map(id => (
                      <span key={id} className="criterion-tag">{id}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </details>

        <details style={{ marginTop: '12px' }}>
          <summary style={{ cursor: 'pointer', fontWeight: 600, color: '#9ca3af' }}>
            거부된 청크 ({data.rejectedChunks.length}개)
          </summary>
          <div className="rejected-chunks-section" style={{ marginTop: '12px' }}>
            {data.rejectedChunks.map((chunk, idx) => (
              <div key={idx} className="rejected-chunk">
                <div className="chunk-header">
                  <span className="chunk-id">[{chunk.id}]</span>
                  <span className="relevance-score low">{(chunk.relevanceScore * 100).toFixed(0)}%</span>
                </div>
                <div className="rejection-reason">
                  <strong>거부 이유:</strong> {chunk.rejectionReason}
                </div>
              </div>
            ))}
          </div>
        </details>
      </div>

      {/* Statistics */}
      <div className="dics-statistics">
        <h4>📊 DICS 성능</h4>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">{data.statistics.totalChunksRetrieved}</div>
            <div className="stat-label">검색됨</div>
          </div>
          <div className="stat-card highlight">
            <div className="stat-value">{data.statistics.chunksAfterCriteriaFiltering}</div>
            <div className="stat-label">선택됨</div>
          </div>
          <div className="stat-card success">
            <div className="stat-value">{data.statistics.reductionRate}</div>
            <div className="stat-label">감소율</div>
          </div>
        </div>
        <div className="stats-notes">
          <p>💰 <strong>비용 절감:</strong> {data.statistics.costSavingEstimate}</p>
          <p>🎯 <strong>품질:</strong> {data.statistics.qualityImprovement}</p>
        </div>
      </div>

      <div className="dics-summary">
        <strong>요약:</strong> {data.summary}
      </div>
    </div>
  );
}

/**
 * Stage 5: LLM Generation - 플로우 다이어그램
 */
function renderStage5(data) {
  return (
    <div className="stage-5-content">
      {/* LLM 생성 플로우 다이어그램 */}
      <div className="llm-flow-diagram">
        <div className="flow-step">
          <div className="flow-step-title">선택된 청크</div>
          <div className="flow-step-content">
            DICS가 선택한 {data.contextUsed}개의 핵심 청크
          </div>
          <div className="selected-chunks-flow">
            {Array.from({ length: data.contextUsed }, (_, i) => (
              <div key={i} className="chunk-badge">
                📄 Chunk {i + 1}
              </div>
            ))}
          </div>
        </div>

        <div className="flow-arrow">↓</div>

        <div className="flow-step">
          <div className="flow-step-title">컨텍스트 조립</div>
          <div className="flow-step-content">
            최소한의 컨텍스트로 프롬프트 구성
          </div>
        </div>

        <div className="flow-arrow">↓</div>

        <div className="flow-step">
          <div className="flow-step-title">LLM 생성</div>
          <div className="flow-step-content">
            {data.generationMethod}
          </div>
        </div>

        <div className="flow-arrow">↓</div>

        <div className="flow-step">
          <div className="flow-step-title">최종 답변</div>
          <div className="flow-step-content">
            {data.answerQuality}
          </div>
        </div>
      </div>

      {/* 최소 컨텍스트 강조 */}
      <div className="minimal-context-highlight">
        <div className="highlight-icon">⚡</div>
        <div className="highlight-content">
          <h4>핵심: 최소 컨텍스트로 답변 생성</h4>
          <p>DICS가 선택한 <strong>{data.contextUsed}개의 핵심 청크</strong>만으로 정확한 답변을 생성합니다.</p>
          <p className="highlight-note">
            일반적인 RAG는 검색된 모든 청크를 사용하지만, DS-RAG는 필요한 최소한의 컨텍스트만 사용하여
            비용을 절감하고 노이즈를 제거합니다.
          </p>
        </div>
      </div>

      <details style={{ marginTop: '16px' }}>
        <summary style={{ cursor: 'pointer', fontWeight: 600, color: '#10b981' }}>
          최종 답변 보기
        </summary>
        <div className="final-answer-section" style={{ marginTop: '12px' }}>
          <div className="final-answer">
            <MarkdownText content={data.finalAnswer} />
          </div>
        </div>
      </details>

      {data.tokenEstimate && (
        <div className="token-estimate">
          <h5>💰 토큰 사용량 및 비용 절감</h5>
          <div className="token-info">
            <div>📥 입력: {data.tokenEstimate.input}</div>
            <div>📤 출력: {data.tokenEstimate.output}</div>
            <div className="savings-highlight">💰 절감: {data.tokenEstimate.savings}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StageDisplay;
