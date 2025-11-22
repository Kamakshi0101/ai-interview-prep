const Groq = require("groq-sdk");
const { questionAnswerPrompt, conceptExplainPrompt } = require("../utils/prompts");

// Rate limiting (simple)
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 5000;

// ----------------------------------------------------------
// 1️⃣ Generate Interview Questions
// ----------------------------------------------------------
const generateInterviewQuestions = async (req, res) => {
  try {
    const now = Date.now();
    if (now - lastRequestTime < MIN_REQUEST_INTERVAL) {
      return res.status(429).json({
        message: `Please wait a few seconds before trying again.`,
      });
    }
    lastRequestTime = now;

    const { role, experience, topicsToFocus, numberOfQuestions } = req.body;

    if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    const prompt = questionAnswerPrompt(
      role,
      experience,
      topicsToFocus,
      numberOfQuestions
    );

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 2048,
    });

    const output = completion.choices[0].message.content;

    let parsedJson;
    try {
      parsedJson = JSON.parse(output);
    } catch (error) {
      const match = output.match(/\[[\s\S]*\]/);
      if (!match) {
        return res.status(500).json({
          message: "Model returned non-JSON output",
          raw: output,
        });
      }
      parsedJson = JSON.parse(match[0]);
    }

    return res.status(200).json({
      success: true,
      questions: parsedJson,
    });

  } catch (error) {
    console.error("Groq AI Error:", error);
    return res.status(500).json({
      message: "Failed to generate questions",
      error: error.message,
    });
  }
};

// ----------------------------------------------------------
// 2️⃣ Generate Concept Explanations
// ----------------------------------------------------------
const generateConceptExplanation = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const prompt = conceptExplainPrompt(question);

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1024,
    });

    let rawText = completion.choices[0].message.content;

    // Clean it: Remove ```json and ``` from beginning/end
    rawText = rawText.replace(/```json\s*/g, "").replace(/```\s*$/g, "").trim();

    return res.status(200).json({
      success: true,
      explanation: rawText,
    });

  } catch (error) {
    console.error("Groq AI Error:", error);
    return res.status(500).json({
      message: "Failed to generate explanation",
      error: error.message,
    });
  }
};

// ----------------------------------------------------------
// Export BOTH
// ----------------------------------------------------------
module.exports = { 
  generateInterviewQuestions, 
  generateConceptExplanation 
};
