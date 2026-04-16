/**
 * DS-RAG Framework 상세 시뮬레이터 (한글판)
 *
 * 단일 예시 질문: "찰리 채플린과 브루스 빌슨 중 누가 더 아이코닉한 인물로 여겨지나요?"
 * DICS 모듈 시각화를 중심으로 한 단계별 상세 시뮬레이션 제공
 */

/**
 * 단계 2: EPQD (Entity-Preserving Question Decomposition)
 * 논문 Table 5 기반
 */
export function simulateEPQD(question) {
  // 특정 질문만 처리
  if (!question.includes('채플린') || !question.includes('빌슨')) {
    return {
      originalQuestion: question,
      subQuestions: [
        '이 데모는 "찰리 채플린과 브루스 빌슨 중 누가 더 아이코닉한 인물로 여겨지나요?" 질문을 위해 설계되었습니다.',
        '제공된 샘플 질문을 사용해주세요.'
      ],
      decompositionStrategy: '단일 예시 시연',
      explanation: '이 데모는 하나의 상세한 예시에 집중합니다.'
    };
  }

  return {
    originalQuestion: question,
    decompositionStrategy: '개체 보존형 분절 규칙(Entity-Preserving with Segmentation Rule)',
    explanation: 'EPQD 모듈은 비교 질문을 분해하면서 개체(entity) 정보를 보존합니다. 분절 규칙에 따라 핵심 개체(찰리 채플린, 브루스 빌슨)와 비교 속성(아이코닉 지위)을 식별합니다.',
    subQuestions: [
      '누가 더 아이코닉한 인물로 여겨지나요?',
      '찰리 채플린은 아이코닉한 인물로 여겨지나요?',
      '브루스 빌슨은 아이코닉한 인물로 여겨지나요?'
    ],
    decompositionDetails: {
      identifiedEntities: ['찰리 채플린', '브루스 빌슨'],
      comparisonAttribute: '아이코닉 지위',
      questionType: '비교형 질문 (누가 더 ~)',
      segmentationApproach: '비교 맥락을 유지하면서 개별 개체 질의로 분리'
    },
    // EPQD 핵심 특징 강조
    keyFeatures: {
      entityPreservation: {
        title: '✅ 원문 엔티티 보존',
        description: '개체명 "찰리 채플린", "브루스 빌슨"이 모든 하위 질문에서 정확하게 보존됨',
        examples: ['원문: 찰리 채플린 → 하위질문: 찰리 채플린 (동일)', '원문: 브루스 빌슨 → 하위질문: 브루스 빌슨 (동일)']
      },
      unnecessarySupression: {
        title: '🚫 불필요한 서브질문 억제',
        description: '의미가 중복되거나 필요하지 않은 서브질문을 생성하지 않음',
        avoided: ['채플린의 생애는?', '빌슨의 출생지는?', '두 사람의 나이 차이는?']
      },
      segmentAlignment: {
        title: '⚖️ 세그먼트 수와 서브질문 수 정합',
        original: '원문 질문 세그먼트: 3개 (비교 대상 2개 + 비교 속성 1개)',
        generated: '생성된 서브질문: 3개',
        status: '✓ 정합성 확인됨'
      }
    }
  };
}

/**
 * 단계 3: 문서 검색 시뮬레이션
 * 각 하위 질문에 대한 관련 문서 청크 검색 시뮬레이션
 */
export function simulateRetrieval(subQuestions, originalQuestion) {
  const retrievalResults = [
    {
      subQuestion: '누가 더 아이코닉한 인물로 여겨지나요?',
      chunks: [
        {
          id: 'ICON-1.1',
          text: '아이코닉한 지위는 대중적 인지도와 문화적 영향력으로 측정됩니다. 찰리 채플린은 무성영화 시대와 그 이후 시기에 엄청난 세계적 명성을 얻었으며, 영화사에서 가장 잘 알려진 인물 중 한 명이 되었습니다.',
          source: '문화적 영향력 연구, 45권'
        },
        {
          id: 'ICON-1.2',
          text: '"아이코닉"의 정의는 주관적일 수 있지만, 일반적으로 세대를 넘어 널리 인정받고 존경받는 인물을 의미합니다. 이 용어는 보통 해당 분야에 지속적인 공헌을 한 개인에게 사용됩니다.',
          source: '문화 용어 사전'
        },
        {
          id: 'ICON-1.3',
          text: '아이코닉 지위의 비교 평가에서는 명성의 지속성, 문화적 영향력의 폭, 다양한 인구통계와 지역에 걸친 인지도 등이 고려됩니다.',
          source: '유명인 연구 저널'
        }
      ],
      chunkCount: 3
    },
    {
      subQuestion: '찰리 채플린은 아이코닉한 인물로 여겨지나요?',
      chunks: [
        {
          id: 'CC-2.1',
          text: '찰리 채플린의 영화들, 예를 들어 "황금광 시대"(1925), "시티 라이트"(1931), "위대한 독재자"(1940)는 그를 20세기의 세계적 아이콘으로 확립시켰습니다. 그의 캐릭터 "떠돌이(The Tramp)"는 영화사에서 가장 인식 가능한 인물 중 하나가 되었습니다.',
          source: '영화사 백과사전'
        },
        {
          id: 'CC-2.2',
          text: '많은 역사학자와 영화 평론가들은 찰리 채플린을 영화사에서 가장 중요한 코미디 배우이자 영화 제작자 중 한 명으로 평가합니다. 그의 영향력은 엔터테인먼트를 넘어 사회 비평과 예술적 혁신으로 확장됩니다.',
          source: '영화 전설: 비평적 분석'
        },
        {
          id: 'CC-2.3',
          text: '채플린은 1972년 아카데미 명예상을 포함한 수많은 상을 받았으며, 수상 이유는 "영화를 이 세기의 예술 형식으로 만드는 데 미친 헤아릴 수 없는 영향"이었습니다. 그의 유산은 전 세계 영화 제작자들에게 계속 영향을 미치고 있습니다.',
          source: '아카데미상 역사 기록'
        },
        {
          id: 'CC-2.4',
          text: '예술적 업적을 넘어, 채플린의 얼굴과 실루엣은 무성영화 시대 동안 언어와 문화적 장벽을 초월하여 전 세계적으로 즉시 인식 가능한 상징이 되었습니다.',
          source: '세계 문화 아이콘 연구'
        }
      ],
      chunkCount: 4
    },
    {
      subQuestion: '브루스 빌슨은 아이코닉한 인물로 여겨지나요?',
      chunks: [
        {
          id: 'BB-3.1',
          text: '브루스 빌슨(1928-2017)은 다양한 TV 시리즈로 알려진 미국의 영화 및 TV 감독이었습니다. 그는 "Get Smart", "The Odd Couple", "CHiPs" 등 인기 프로그램의 에피소드를 연출했습니다.',
          source: 'TV 감독 데이터베이스'
        },
        {
          id: 'BB-3.2',
          text: '브루스 빌슨은 수십 년에 걸쳐 TV 연출 분야에서 성공적인 경력을 쌓았지만, 문화 아이콘에 대한 광범위한 논의에서는 일반적으로 언급되지 않습니다. 그의 작업은 주로 카메라 앞이 아닌 뒤에서 이루어졌습니다.',
          source: 'TV 업계 경력 프로필'
        },
        {
          id: 'BB-3.3',
          text: '빌슨의 TV에 대한 기여는 업계 내에서 인정받지만, 대중적 인지도는 화면에 출연한 배우나 가명(household name) 수준을 달성한 혁신적 감독들에 비해 제한적입니다.',
          source: '비하인드 씬: TV 감독들'
        }
      ],
      chunkCount: 3
    }
  ];

  return {
    retrievalResults: retrievalResults,
    totalChunksRetrieved: retrievalResults.reduce((sum, r) => sum + r.chunkCount, 0),
    retrievalNote: '이것은 시연 목적의 시뮬레이션된 문서 청크입니다. 실제 시스템에서는 벡터 데이터베이스의 의미 검색을 통해 제공됩니다.'
  };
}

/**
 * 단계 4: DICS (Dynamic Input Context Selection) - 상세
 * DS-RAG의 핵심이며 광범위한 시각화가 필요
 */
export function simulateDICS(retrievalResults, originalQuestion) {
  // 4a. 질문 그래프 구축
  const questionGraph = {
    description: 'DICS 모듈은 질문을 그래프 구조로 변환하여 핵심 요소와 관계를 식별합니다.',
    nodes: [
      {
        id: 'N1',
        type: '개체(Entity)',
        label: '찰리 채플린',
        importance: 'high',
        inDegree: 2,
        outDegree: 2
      },
      {
        id: 'N2',
        type: '개체(Entity)',
        label: '브루스 빌슨',
        importance: 'high',
        inDegree: 2,
        outDegree: 2
      },
      {
        id: 'N3',
        type: '속성(Attribute)',
        label: '아이코닉 지위',
        importance: 'critical',
        inDegree: 4,
        outDegree: 0,
        note: '코어 노드 - 최고 진입 차수(in-degree), 비교의 중심'
      }
    ],
    edges: [
      {
        id: 'E1',
        source: '찰리 채플린',
        target: '아이코닉 지위',
        relation: '아이코닉으로_여겨짐',
        predicate: '속성을_가짐'
      },
      {
        id: 'E2',
        source: '브루스 빌슨',
        target: '아이코닉 지위',
        relation: '아이코닉으로_여겨짐',
        predicate: '속성을_가짐'
      },
      {
        id: 'E3',
        source: '찰리 채플린',
        target: '브루스 빌슨',
        relation: '비교_대상',
        predicate: '비교됨'
      },
      {
        id: 'E4',
        source: '브루스 빌슨',
        target: '찰리 채플린',
        relation: '비교_대상',
        predicate: '비교됨'
      }
    ],
    graphAnalysis: '그래프 분석 결과, "아이코닉 지위"가 두 개체를 연결하는 중심 개념입니다. 이 노드는 최고 진입 차수(4개 연결)를 가지므로 주요 코어 노드가 됩니다.'
  };

  // 4b. 코어 노드 식별
  const coreNodeIdentification = {
    algorithm: '진입 차수 기반 순위 결정 (논문의 Algorithm 1)',
    process: [
      '단계 1: 각 노드의 진입 차수(in-degree) 계산',
      '단계 2: 진입 차수로 노드 순위 매기기',
      '단계 3: 최상위 노드를 코어 노드로 선택'
    ],
    rankings: [
      { node: '아이코닉 지위', inDegree: 4, rank: 1, selected: true },
      { node: '찰리 채플린', inDegree: 2, rank: 2, selected: false },
      { node: '브루스 빌슨', inDegree: 2, rank: 2, selected: false }
    ],
    coreNode: '아이코닉 지위',
    explanation: '"아이코닉 지위"가 코어 노드로 식별되었습니다. 이는 최고 진입 차수(4)를 가지며, 두 개체가 모두 관련되는 중심 주제임을 나타냅니다. 이것이 컨텍스트 선택의 기준이 됩니다.'
  };

  // 4c. 선택 기준 도출
  const selectionCriteria = {
    description: '코어 노드를 기반으로 관련 컨텍스트 선택을 위한 구체적인 기준을 도출합니다.',
    criteria: [
      {
        id: 'SC1',
        criterion: '찰리 채플린의 아이코닉 지위',
        rationale: '찰리 채플린의 아이코닉 지위에 관한 정보는 비교 질문에 답하는 데 직접적으로 관련됩니다.',
        relevanceScore: 1.0,
        targetChunks: 2  // 이 기준으로 선택될 청크 수
      },
      {
        id: 'SC2',
        criterion: '브루스 빌슨의 아이코닉 지위',
        rationale: '브루스 빌슨의 아이코닉 지위에 관한 정보는 비교를 위해 직접적으로 관련됩니다.',
        relevanceScore: 1.0,
        targetChunks: 1  // 이 기준으로 선택될 청크 수
      },
      {
        id: 'SC3',
        criterion: '아이코닉 지위의 비교 지표',
        rationale: '두 개체 간의 아이코닉 지위를 비교하거나 맥락화하는 데 도움이 되는 정보입니다.',
        relevanceScore: 0.9,
        targetChunks: 1  // 이 기준으로 선택될 청크 수
      }
    ],
    explanation: '⚠️ 핵심: Fixed top-K와 달리, 각 기준(criterion)마다 필요한 청크만 선택합니다. Top-K는 일괄적으로 K개를 선택하지만, DICS는 각 기준의 중요도와 필요성에 따라 동적으로 선택합니다.',
    comparisonWithTopK: {
      topKApproach: 'Fixed top-K (예: top-5)는 relevance score 상위 5개를 무조건 선택',
      dicsApproach: 'DICS는 각 selection criterion에 매칭되는 청크 중 최적의 것만 선택 (criterion 당 1~2개)',
      advantage: '불필요한 중복 정보를 제거하고 각 기준에 가장 적합한 청크만 선택하여 컨텍스트를 최소화'
    }
  };

  // 4d. 기준 기반 컨텍스트 선택
  const selectedChunks = [
    {
      id: 'CC-2.1',
      text: '찰리 채플린의 영화들, 예를 들어 "황금광 시대"(1925), "시티 라이트"(1931), "위대한 독재자"(1940)는 그를 20세기의 세계적 아이콘으로 확립시켰습니다. 그의 캐릭터 "떠돌이(The Tramp)"는 영화사에서 가장 인식 가능한 인물 중 하나가 되었습니다.',
      source: '영화사 백과사전',
      relevanceScore: 0.98,
      selectionReason: '구체적인 증거와 함께 찰리 채플린의 아이코닉 지위를 직접 다룸 (SC1)',
      matchedCriteria: ['SC1', 'SC3']
    },
    {
      id: 'CC-2.2',
      text: '많은 역사학자와 영화 평론가들은 찰리 채플린을 영화사에서 가장 중요한 코미디 배우이자 영화 제작자 중 한 명으로 평가합니다. 그의 영향력은 엔터테인먼트를 넘어 사회 비평과 예술적 혁신으로 확장됩니다.',
      source: '영화 전설: 비평적 분석',
      relevanceScore: 0.96,
      selectionReason: '채플린의 아이코닉 지위에 대한 전문가 합의, 권위 있는 비교 기준 제공 (SC1)',
      matchedCriteria: ['SC1', 'SC3']
    },
    {
      id: 'BB-3.2',
      text: '브루스 빌슨은 수십 년에 걸쳐 TV 연출 분야에서 성공적인 경력을 쌓았지만, 문화 아이콘에 대한 광범위한 논의에서는 일반적으로 언급되지 않습니다. 그의 작업은 주로 카메라 앞이 아닌 뒤에서 이루어졌습니다.',
      source: 'TV 업계 경력 프로필',
      relevanceScore: 0.95,
      selectionReason: '빌슨의 제한적인 아이코닉 지위를 명시적으로 다룸, 비교에 중요 (SC2)',
      matchedCriteria: ['SC2', 'SC3']
    },
    {
      id: 'ICON-1.1',
      text: '아이코닉한 지위는 대중적 인지도와 문화적 영향력으로 측정됩니다. 찰리 채플린은 무성영화 시대와 그 이후 시기에 엄청난 세계적 명성을 얻었으며, 영화사에서 가장 잘 알려진 인물 중 한 명이 되었습니다.',
      source: '문화적 영향력 연구, 45권',
      relevanceScore: 0.92,
      selectionReason: '아이코닉 지위의 정의를 제공하고 채플린에게 적용 (SC1, SC3)',
      matchedCriteria: ['SC1', 'SC3']
    }
  ];

  const rejectedChunks = [
    {
      id: 'BB-3.1',
      text: '브루스 빌슨(1928-2017)은 다양한 TV 시리즈로 알려진...',
      rejectionReason: '아이코닉 지위 비교와 직접적으로 관련 없는 전기적 정보',
      relevanceScore: 0.45
    },
    {
      id: 'CC-2.4',
      text: '예술적 업적을 넘어, 채플린의 얼굴과 실루엣은 즉시 인식 가능한...',
      rejectionReason: '이미 선택된 청크와 중복, 새로운 비교 가치를 추가하지 않음',
      relevanceScore: 0.72
    },
    {
      id: 'ICON-1.2',
      text: '"아이코닉"의 정의는 주관적일 수 있지만...',
      rejectionReason: '너무 일반적, 구체적인 비교 정보를 제공하지 않음',
      relevanceScore: 0.58
    }
  ];

  const statistics = {
    totalChunksRetrieved: retrievalResults.totalChunksRetrieved,
    chunksAfterCriteriaFiltering: selectedChunks.length,
    reductionRate: ((1 - selectedChunks.length / retrievalResults.totalChunksRetrieved) * 100).toFixed(1) + '%',
    costSavingEstimate: '약 60% LLM 입력 토큰 감소',
    qualityImprovement: '관련 없는 컨텍스트 제거로 답변 정확도 향상'
  };

  return {
    // 4a
    questionGraph,
    // 4b
    coreNodeIdentification,
    // 4c
    selectionCriteria,
    // 4d
    selectedChunks,
    rejectedChunks,
    // 통계
    statistics,
    // 요약
    summary: `DICS 모듈이 "아이코닉 지위"를 핵심 개념으로 성공적으로 식별하고, 검색된 ${retrievalResults.totalChunksRetrieved}개 청크 중 ${selectedChunks.length}개의 고도로 관련성 높은 청크를 선택하여 ${statistics.reductionRate} 감소를 달성하면서 답변 품질을 유지했습니다.`
  };
}

/**
 * 단계 5: LLM 생성
 */
export function simulateLLMGeneration(dicsResult, originalQuestion) {
  const finalAnswer = `선택된 컨텍스트를 기반으로, **찰리 채플린이 브루스 빌슨보다 훨씬 더 아이코닉한 인물로 여겨집니다**.

**주요 증거:**

1. **세계적 인지도**: 찰리 채플린의 영화들, 예를 들어 "황금광 시대", "시티 라이트", "위대한 독재자"는 그를 20세기의 세계적 아이콘으로 확립시켰습니다. 그의 캐릭터 "떠돌이(The Tramp)"는 영화사에서 가장 인식 가능한 인물 중 하나가 되었습니다.

2. **전문가 합의**: 역사학자와 영화 평론가들은 찰리 채플린을 영화사에서 가장 중요한 코미디 배우이자 영화 제작자 중 한 명으로 평가하며, 그의 영향력은 엔터테인먼트를 넘어 사회 비평과 예술적 혁신으로 확장됩니다.

3. **문화적 영향**: 채플린은 무성영화 시대 동안 엄청난 세계적 명성을 얻었으며, 대중적 인지도와 지속적인 문화적 영향력으로 측정되는 영화사에서 가장 잘 알려진 인물 중 한 명이 되었습니다.

4. **제한적 비교**: 브루스 빌슨은 TV 연출 분야에서 성공적인 경력을 쌓았지만, 문화 아이콘에 대한 광범위한 논의에서는 일반적으로 언급되지 않으며, 그의 작업은 주로 카메라 뒤에서 이루어져 가명(household name) 수준을 달성하지 못했습니다.

**결론**: 증거는 세계적 인지도, 비평적 찬사, 지속적인 문화적 영향을 기반으로 찰리 채플린이 훨씬 더 아이코닉한 인물임을 압도적으로 뒷받침합니다.`;

  return {
    finalAnswer: finalAnswer,
    contextUsed: dicsResult.selectedChunks.length,
    generationMethod: '비교 분석을 포함한 컨텍스트 기반 종합',
    answerQuality: '높음 - 신중하게 선택된 관련 컨텍스트로 잘 뒷받침되는 답변',
    tokenEstimate: {
      input: `약 ${dicsResult.selectedChunks.length * 150}개 토큰 (선택된 컨텍스트만)`,
      output: '약 200개 토큰',
      savings: `전체 ${dicsResult.statistics.totalChunksRetrieved}개 청크를 모두 사용하는 것과 비교: ${dicsResult.statistics.reductionRate} 감소`
    }
  };
}

/**
 * 메인 파이프라인 오케스트레이터
 */
export async function runDSRAGPipeline(question) {
  const stages = [];

  // 단계 1: 사용자 입력
  stages.push({
    stageNumber: 1,
    stageName: '사용자 입력',
    description: '사용자가 DS-RAG 시스템에 질문을 제출합니다',
    data: { question },
    timing: '즉시'
  });

  await delay(800);

  // 단계 2: EPQD
  const epqdResult = simulateEPQD(question);
  stages.push({
    stageNumber: 2,
    stageName: 'EPQD (개체 보존 질문 분해)',
    description: '질문이 개체 정보를 보존하면서 하위 질문으로 분해됩니다',
    data: epqdResult,
    timing: '약 50ms (LLM 호출)'
  });

  await delay(1000);

  // 단계 3: 검색
  const retrievalResult = simulateRetrieval(epqdResult.subQuestions, question);
  stages.push({
    stageNumber: 3,
    stageName: '문서 검색',
    description: '각 하위 질문에 대해 관련 문서 청크가 검색됩니다',
    data: retrievalResult,
    timing: '약 200ms (벡터 검색)'
  });

  await delay(1200);

  // 단계 4: DICS (가장 중요한 단계 - 상세 시각화)
  const dicsResult = simulateDICS(retrievalResult, question);
  stages.push({
    stageNumber: 4,
    stageName: 'DICS (동적 입력 컨텍스트 선택)',
    description: '핵심 단계: 질문 그래프 구축, 코어 노드 식별, 선택 기준 도출 및 최적 컨텍스트 선택',
    data: dicsResult,
    timing: '약 100ms (그래프 분석 + 필터링)'
  });

  await delay(1200);

  // 단계 5: LLM 생성
  const generationResult = simulateLLMGeneration(dicsResult, question);
  stages.push({
    stageNumber: 5,
    stageName: 'LLM 생성',
    description: '신중하게 선택된 컨텍스트를 사용하여 최종 답변이 생성됩니다',
    data: generationResult,
    timing: '약 2초 (LLM 생성)'
  });

  return stages;
}

// 유틸리티: 지연 함수
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
