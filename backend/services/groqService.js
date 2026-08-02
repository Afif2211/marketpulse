const Groq = require("groq-sdk");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const generatePortfolioInsights = async ({
    holdings,
    totalAccountValue,
    totalProfitLoss,
    totalProfitLossPercentage,
}) => {

    if (!holdings || holdings.length === 0) {

        return {
            summary: "You don't have any holdings yet. Buy your first stock or cryptocurrency to get personalized insights.",
            insights: [],
        };

    }

    const holdingsSummary = holdings
        .slice(0, 6)
        .map((h) => {
            return `Symbol: ${h.symbol}, Company: ${h.companyName}, Type: ${h.assetType}, Shares: ${h.shares}, Avg buy price: $${h.averageBuyPrice.toFixed(2)}, Current price: $${h.currentPrice.toFixed(2)}, Profit/Loss: $${h.profitLoss.toFixed(2)}`;
        })
        .join("\n");

    const prompt = `You are a portfolio analysis assistant for an educational paper-trading app. Base your analysis ONLY on the numeric data provided below. Do not use any outside knowledge about these companies, recent news, or real-world prospects, since your training data may be outdated or inaccurate for current markets.

Portfolio summary:
- Total account value: $${totalAccountValue.toFixed(2)}
- Total profit/loss: $${totalProfitLoss.toFixed(2)} (${totalProfitLossPercentage}%)

Holdings:
${holdingsSummary}

Respond with ONLY valid JSON in this exact shape, no other text before or after:
{
  "summary": "one short paragraph (2-3 sentences) summarizing overall portfolio performance and diversification, based only on the numbers above",
  "insights": [
    {
      "symbol": "copy exactly from the data above",
      "companyName": "copy exactly from the data above",
      "recommendation": "BUY" or "HOLD" or "SELL",
      "confidence": "Low" or "Medium" or "High",
      "score": a number from 0 to 100,
      "description": "one short sentence explaining the reasoning, based only on the price and performance data given"
    }
  ]
}

Include exactly one insight object per holding listed above, in the same order. Base the recommendation only on the performance trend shown in the numbers (for example, a large unrealized loss might suggest HOLD or watching closely; strong gains might suggest taking profit or holding). Do not fabricate any information that isn't present in the data above.`;

    const completion = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
            { role: "user", content: prompt },
        ],
        temperature: 0.4,
        response_format: { type: "json_object" },
    });

    const raw = completion.choices[0].message.content;

    return JSON.parse(raw);

};

module.exports = { generatePortfolioInsights };