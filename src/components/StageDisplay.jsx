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
 * Stage 2: EPQD
 */
function renderStage2(data) {
  return (
    <div className="stage-2-content">
      <div className="info-section">
        <h4>📋 원본 질문</h4>
        <p className="original-question">{data.originalQuestion}</p>
      </div>

      {data.explanation && (
        <div className="info-section">
          <h4>💡 분해 프로세스</h4>
          <p>{data.explanation}</p>
        </div>
      )}

      {data.decompositionDetails && (
        <div className="info-section">
          <h4>🔍 식별된 요소</h4>
          <div className="detail-grid">
            <div className="detail-item">
              <strong>개체(Entities):</strong> {data.decompositionDetails.identifiedEntities.join(', ')}
            </div>
            <div className="detail-item">
              <strong>비교 속성:</strong> {data.decompositionDetails.comparisonAttribute}
            </div>
            <div className="detail-item">
              <strong>질문 유형:</strong> {data.decompositionDetails.questionType}
            </div>
          </div>
        </div>
      )}

      <div className="info-section">
        <h4>📝 생성된 하위 질문</h4>
        <p className="strategy-note">전략: {data.decompositionStrategy}</p>
        <ol className="sub-questions">
          {data.subQuestions.map((sq, idx) => (
            <li key={idx}>{sq}</li>
          ))}
        </ol>
      </div>

      {/* EPQD 핵심 특징 표시 */}
      {data.keyFeatures && (
        <div className="info-section">
          <h4>🎯 EPQD 핵심 특징</h4>
          <div className="epqd-features">
            {/* 엔티티 보존 */}
            <div className="feature-card feature-success">
              <h5>{data.keyFeatures.entityPreservation.title}</h5>
              <p>{data.keyFeatures.entityPreservation.description}</p>
              <div className="feature-examples">
                {data.keyFeatures.entityPreservation.examples.map((ex, idx) => (
                  <div key={idx} className="example-item">{ex}</div>
                ))}
              </div>
            </div>

            {/* 불필요한 서브질문 억제 */}
            <div className="feature-card feature-warning">
              <h5>{data.keyFeatures.unnecessarySupression.title}</h5>
              <p>{data.keyFeatures.unnecessarySupression.description}</p>
              <div className="avoided-questions">
                <strong>회피된 불필요한 질문들:</strong>
                <ul>
                  {data.keyFeatures.unnecessarySupression.avoided.map((q, idx) => (
                    <li key={idx}>{q}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 세그먼트 정합성 */}
            <div className="feature-card feature-info">
              <h5>{data.keyFeatures.segmentAlignment.title}</h5>
              <div className="alignment-details">
                <div className="alignment-row">
                  <span className="label">원문 세그먼트:</span>
                  <span className="value">{data.keyFeatures.segmentAlignment.original}</span>
                </div>
                <div className="alignment-row">
                  <span className="label">생성된 서브질문:</span>
                  <span className="value">{data.keyFeatures.segmentAlignment.generated}</span>
                </div>
                <div className="alignment-status">{data.keyFeatures.segmentAlignment.status}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Stage 3: Retrieval
 */
function renderStage3(data) {
  return (
    <div className="stage-3-content">
      <div className="stats-bar">
        <div className="stat-badge">
          <span className="stat-number">{data.totalChunksRetrieved}</span>
          <span className="stat-label">총 검색된 청크</span>
        </div>
      </div>

      {data.retrievalNote && (
        <div className="note-box">
          ℹ️ {data.retrievalNote}
        </div>
      )}

      <div className="retrieval-results">
        {data.retrievalResults.map((result, idx) => (
          <div key={idx} className="retrieval-item">
            <h4>📝 하위 질문 {idx + 1}: {result.subQuestion}</h4>
            <p className="chunk-count">검색된 {result.chunkCount}개 청크:</p>
            <div className="chunks-list">
              {result.chunks.map((chunk) => (
                <div key={chunk.id} className="chunk">
                  <div className="chunk-header">
                    <span className="chunk-id">[{chunk.id}]</span>
                    <span className="chunk-source">{chunk.source}</span>
                  </div>
                  <div className="chunk-text">{chunk.text}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
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
      {/* Section 4a: Question Graph */}
      <div className="dics-section">
        <h4>🕸️ 단계 4a: 질문 그래프 구축</h4>
        <p className="section-description">{data.questionGraph.description}</p>

        <div className="graph-container">
          <div className="graph-nodes">
            <h5>노드 (개체 & 속성):</h5>
            {data.questionGraph.nodes.map((node) => (
              <div key={node.id} className={`graph-node node-${node.importance}`}>
                <div className="node-header">
                  <span className="node-label">{node.label}</span>
                  <span className={`node-badge badge-${node.type.toLowerCase()}`}>
                    {node.type}
                  </span>
                </div>
                <div className="node-stats">
                  <span>진입 차수: {node.inDegree}</span>
                  <span>진출 차수: {node.outDegree}</span>
                  {node.importance === 'critical' && (
                    <span className="core-indicator">⭐ 코어 노드 후보</span>
                  )}
                </div>
                {node.note && <div className="node-note">{node.note}</div>}
              </div>
            ))}
          </div>

          <div className="graph-edges">
            <h5>엣지 (관계):</h5>
            {data.questionGraph.edges.map((edge) => (
              <div key={edge.id} className="graph-edge">
                <span className="edge-source">{edge.source}</span>
                <span className="edge-arrow">→</span>
                <span className="edge-target">{edge.target}</span>
                <span className="edge-relation">({edge.relation})</span>
              </div>
            ))}
          </div>
        </div>

        <div className="graph-analysis">
          <strong>분석:</strong> {data.questionGraph.graphAnalysis}
        </div>
      </div>

      {/* Section 4b: Core Node Identification */}
      <div className="dics-section">
        <h4>🎯 단계 4b: 코어 노드 식별</h4>
        <p className="section-description">
          <strong>알고리즘:</strong> {data.coreNodeIdentification.algorithm}
        </p>

        <div className="process-steps">
          <h5>프로세스:</h5>
          <ol>
            {data.coreNodeIdentification.process.map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ol>
        </div>

        <div className="rankings-table">
          <h5>노드 순위:</h5>
          <table>
            <thead>
              <tr>
                <th>순위</th>
                <th>노드</th>
                <th>진입 차수</th>
                <th>코어로 선택</th>
              </tr>
            </thead>
            <tbody>
              {data.coreNodeIdentification.rankings.map((ranking, idx) => (
                <tr key={idx} className={ranking.selected ? 'core-selected' : ''}>
                  <td>{ranking.rank}</td>
                  <td>{ranking.node}</td>
                  <td><strong>{ranking.inDegree}</strong></td>
                  <td>{ranking.selected ? '✓ 예' : '✗ 아니오'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="core-result">
          <strong>결과:</strong> <span className="core-node-highlight">{data.coreNodeIdentification.coreNode}</span>가 코어 노드로 식별되었습니다.
          <p>{data.coreNodeIdentification.explanation}</p>
        </div>
      </div>

      {/* Section 4c: Selection Criteria */}
      <div className="dics-section">
        <h4>📌 단계 4c: 선택 기준 도출</h4>
        <p className="section-description">{data.selectionCriteria.description}</p>

        <div className="criteria-list">
          {data.selectionCriteria.criteria.map((criterion, idx) => (
            <div key={criterion.id} className="criterion-item">
              <div className="criterion-header">
                <span className="criterion-id">{criterion.id}</span>
                <span className="criterion-name">{criterion.criterion}</span>
                <span className="relevance-badge">{(criterion.relevanceScore * 100).toFixed(0)}%</span>
                {criterion.targetChunks && (
                  <span className="target-chunks-badge">→ {criterion.targetChunks}개 청크 선택</span>
                )}
              </div>
              <p className="criterion-rationale">{criterion.rationale}</p>
            </div>
          ))}
        </div>

        <div className="criteria-explanation">
          <strong>핵심 차별점:</strong> {data.selectionCriteria.explanation}
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

      {/* Section 4d: Context Selection */}
      <div className="dics-section">
        <h4>✨ 단계 4d: 컨텍스트 선택</h4>
        <p className="section-description">
          도출된 기준을 적용하여 검색된 청크를 필터링하고 최적 컨텍스트를 선택합니다.
          <strong> 각 기준(criterion)마다 가장 적합한 청크를 동적으로 선택합니다.</strong>
        </p>

        {/* Criterion별 선택된 청크 매핑 */}
        <div className="criterion-chunk-mapping">
          <h5>📊 기준별 청크 선택 (Criterion → Chunks)</h5>
          {data.selectionCriteria.criteria.map((criterion) => {
            const matchedChunks = data.selectedChunks.filter(chunk =>
              chunk.matchedCriteria.includes(criterion.id)
            );
            return (
              <div key={criterion.id} className="criterion-mapping-item">
                <div className="criterion-mapping-header">
                  <span className="criterion-id">{criterion.id}</span>
                  <span className="criterion-name">{criterion.criterion}</span>
                  <span className="chunk-count-badge">{matchedChunks.length}개 청크</span>
                </div>
                <div className="mapped-chunks">
                  {matchedChunks.map((chunk) => (
                    <div key={chunk.id} className="mapped-chunk-mini">
                      <span className="chunk-id">[{chunk.id}]</span>
                      <span className="chunk-preview">{chunk.text.substring(0, 80)}...</span>
                      <span className="relevance-score">{(chunk.relevanceScore * 100).toFixed(0)}%</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="selected-chunks-section">
          <h5>✓ 최종 선택된 청크 ({data.selectedChunks.length}개):</h5>
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

        <div className="rejected-chunks-section">
          <h5>✗ 거부된 청크 ({data.rejectedChunks.length}개):</h5>
          <details>
            <summary>거부된 청크 및 이유 보기</summary>
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
          </details>
        </div>
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
 * Stage 5: LLM Generation
 */
function renderStage5(data) {
  return (
    <div className="stage-5-content">
      {/* 핵심 강조: 최소 컨텍스트 */}
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

      <div className="generation-info">
        <div className="info-row">
          <strong>방법:</strong> {data.generationMethod}
        </div>
        <div className="info-row">
          <strong>사용된 컨텍스트:</strong> 신중하게 선택된 {data.contextUsed}개 청크 (DICS 선택)
        </div>
        <div className="info-row">
          <strong>답변 품질:</strong> {data.answerQuality}
        </div>
      </div>

      <div className="final-answer-section">
        <h4>📋 최종 답변</h4>
        <div className="final-answer">
          <MarkdownText content={data.finalAnswer} />
        </div>
      </div>

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
