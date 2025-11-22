const questionAnswerPrompt = (role, experience, topicsToFocus, numberOfQuestions) => {
  return `
You are an expert technical interviewer.

Generate exactly ${numberOfQuestions} interview questions with detailed answers for a ${experience} level ${role} position.

Focus Areas: ${topicsToFocus}

Each item MUST follow this exact JSON format:

[
  {
    "question": "Question here",
    "answer": "Detailed answer here",
    "concept": "Main concept",
    "difficulty": "easy | medium | hard",
    "tags": ["tag1", "tag2"]
  }
]

Make sure the questions match the expected difficulty for a ${experience} level candidate.
Return ONLY valid JSON.
`;
};

const conceptExplainPrompt = (question) => {
  return `
You are an expert technical interviewer and educator.

Provide a clear, detailed explanation for the following interview question:

"${question}"

Your explanation should:
1. Break down the concept in simple terms
2. Provide examples where applicable
3. Explain why this is important in real-world scenarios
4. Be concise but comprehensive

Return your explanation as plain text (not JSON).
`;
};

module.exports = {
  questionAnswerPrompt,
  conceptExplainPrompt,
};
