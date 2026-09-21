const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';
const callOpenRouter = async (messages, {
  jsonMode = false,
  temperature = 0.2
} = {}) => {
  const response = await fetch(OPENROUTER_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      'HTTP-Referer': 'http://localhost:5173',
      'X-Title': 'FoodLog'
    },
    body: JSON.stringify({
      model: process.env.OPENROUTER_MODEL || 'openai/gpt-4o-mini',
      messages,
      temperature,
      ...(jsonMode ? {
        response_format: {
          type: 'json_object'
        }
      } : {})
    })
  });
  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`OpenRouter request failed: ${response.status} ${errText}`);
  }
  const data = await response.json();
  return data.choices?.[0]?.message?.content || '';
};
const REFERENCE_TABLE = `
Use these as calibration anchors for standard Indian home-cooking portions (adjust proportionally for different quantities, but stay close to these ratios for similar foods):
- Roti/chapati (1 medium, ~35-40g): ~80-90 kcal, 3g protein, 18g carbs, 1g fat
- Butter roti/naan-style roti (1 medium): ~110-130 kcal, 3g protein, 18g carbs, 4-5g fat
- Plain rice (1 katori/bowl, ~150g cooked): ~180-200 kcal, 4g protein, 40-44g carbs, 0.5g fat
- Arhar/toor dal (1 katori, ~150ml, thin-medium consistency): ~150-180 kcal, 9-10g protein, 20-24g carbs, 4-5g fat
- Dal makhani (1 katori, richer/creamier): ~250-290 kcal, 9-10g protein, 22-25g carbs, 15-17g fat
- Paneer butter masala / paneer makhani (1 katori, ~150g with gravy): ~320-360 kcal, 12-14g protein, 10-13g carbs, 24-28g fat
- Mixed vegetable sabji (1 katori, lightly cooked): ~100-130 kcal, 3g protein, 12-15g carbs, 5-7g fat
- Chai with milk and sugar (1 cup, ~150ml): ~55-65 kcal, 2g protein, 7-9g carbs, 2g fat
- Curd/dahi (1 katori, ~150g, plain): ~90-110 kcal, 5-6g protein, 7-9g carbs, 4-5g fat
- Banana (1 medium): ~100-110 kcal, 1g protein, 25-27g carbs, 0.3g fat

For foods not listed above, reason from your knowledge of similar dishes' typical ingredients, cooking method (fried/dry/gravy-based), and standard serving sizes.
`;
const parseMealText = async text => {
  const systemPrompt = `You are a precise nutrition estimation expert for an Indian food-tracking app. Your estimates are used directly by real users tracking their daily intake, so accuracy matters — avoid lazy or suspiciously round numbers, and reason carefully about ingredients and cooking method (e.g. ghee/oil content, gravy vs dry preparation) before estimating.

The input may be phrased in several ways, all of which describe the SAME thing — a meal to analyze:
- A direct statement: "2 aloo parathe khaye"
- A hypothetical/conditional: "Agar main 2 paneer parathe khaun?"
- A yes/no capability question: "Kya main ek pizza kha sakta hu?" or "Can I eat a pizza?"
- Just naming a food with no verb: "pizza", "2 samosa"

In ALL of these cases, extract the food item(s) and quantities being asked about or described — the phrasing style (statement, question, hypothetical) is irrelevant to what food is being referenced. Only return an empty items array if there is truly no food or dish name anywhere in the text.

${REFERENCE_TABLE}

Respond ONLY with valid JSON in this exact format, no other text:
{
  "items": [
    {
      "name": "food name in simple English",
      "quantity": number,
      "unit": "piece" | "bowl" | "cup" | "glass" | "100g",
      "calories": number,
      "protein": number,
      "carbs": number,
      "fat": number
    }
  ],
  "notes": "string or null — mention here if any item's quantity or identity was ambiguous"
}

Rules:
- calories/protein/carbs/fat values are for the TOTAL of that item's quantity (e.g. quantity 4 roti = combined total for all 4, not per single roti).
- If quantity isn't mentioned, default to 1.
- "Small size", "medium size", "large size" affects the serving size — estimate accordingly (e.g. a small pizza is roughly a personal 6-8 inch pizza, not a large sharing pizza).
- If nothing resembling food is found anywhere in the text, return {"items": [], "notes": "No food items detected."}
- Think through ingredient composition and preparation style before settling on numbers — don't just default to generic estimates.`;
  const raw = await callOpenRouter([{
    role: 'system',
    content: systemPrompt
  }, {
    role: 'user',
    content: text
  }], {
    jsonMode: true,
    temperature: 0.1
  });
  try {
    const parsed = JSON.parse(raw);
    return {
      items: Array.isArray(parsed.items) ? parsed.items : [],
      notes: parsed.notes || null
    };
  } catch (err) {
    throw new Error('Failed to parse AI response as JSON');
  }
};
const generateSuggestion = async ({
  totals,
  goals,
  remaining
}) => {
  const systemPrompt = `You are a friendly, concise nutrition assistant for an Indian meal-tracking app that only recommends vegetarian food.
Given a user's nutrition totals so far today, their goals, and what's remaining, write ONE short, actionable, encouraging sentence (max 25 words) suggesting what they should eat or focus on next.
ONLY suggest vegetarian foods — never meat, fish, or eggs. Be specific with Indian vegetarian food suggestions where relevant (e.g. paneer, curd, dal, sprouts, tofu, milk for protein). Do not repeat the numbers back verbatim — give practical advice.`;
  const userPrompt = `Totals so far: ${JSON.stringify(totals)}
Daily goals: ${JSON.stringify(goals)}
Remaining: ${JSON.stringify(remaining)}`;
  const suggestion = await callOpenRouter([{
    role: 'system',
    content: systemPrompt
  }, {
    role: 'user',
    content: userPrompt
  }], {
    temperature: 0.4
  });
  return suggestion.trim();
};
const generateMultipleSuggestions = async ({
  totals,
  goals,
  remaining,
  recentMeals
}) => {
  const systemPrompt = `You are a friendly, practical nutrition assistant for an Indian meal-tracking app that only recommends vegetarian food.
Given the user's nutrition data for today, generate 4 distinct, actionable suggestions covering different angles: one about remaining calories/macros, one about specific Indian vegetarian food choices, one about meal timing or habits, and one general encouragement or tip.

Respond ONLY with valid JSON in this format, no other text:
{
  "suggestions": [
    { "category": "Macros" | "Food Choice" | "Habit" | "Encouragement", "text": "short suggestion, max 25 words" }
  ]
}

ONLY suggest vegetarian foods — never meat, fish, or eggs. Reference actual Indian vegetarian foods where relevant (paneer, dal, curd, sprouts, roti, tofu, etc). Do not just repeat the raw numbers back.`;
  const userPrompt = `Totals so far today: ${JSON.stringify(totals)}
Daily goals: ${JSON.stringify(goals)}
Remaining: ${JSON.stringify(remaining)}
Recent meals logged: ${JSON.stringify(recentMeals || [])}`;
  const raw = await callOpenRouter([{
    role: 'system',
    content: systemPrompt
  }, {
    role: 'user',
    content: userPrompt
  }], {
    jsonMode: true,
    temperature: 0.5
  });
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed.suggestions) ? parsed.suggestions : [];
  } catch (err) {
    throw new Error('Failed to parse AI suggestions response as JSON');
  }
};
const generateWhatIfAdvice = async ({
  mealDescription,
  mealTotals,
  currentTotals,
  goals,
  remaining,
  todaysMeals
}) => {
  const loggedMealTypes = (todaysMeals || []).map(m => m.mealType);
  const remainingMealSlots = ['breakfast', 'lunch', 'snack', 'dinner'].filter(t => !loggedMealTypes.includes(t));
  const projectedCalories = currentTotals.calories + mealTotals.calories;
  const overBy = projectedCalories - goals.calories;
  const overPercent = overBy / goals.calories * 100;
  let toneInstruction;
  if (overPercent > 15) {
    toneInstruction = `TONE: BRUTAL AND BLUNT. This meal would push them significantly over their daily limit (${Math.round(overPercent)}% over). Do NOT be nice or soften this. Call it out directly and honestly — say clearly that this is a bad idea given where they already stand today, that they're already over or close to their limit, and that eating this is going against their own goals. Be direct like a friend who won't sugarcoat it: no excessive politeness, no "but if you really want to" softening. You can still offer ONE real alternative at the end, but the overall tone must be firm and no-nonsense, not encouraging.`;
  } else if (overPercent > 0) {
    toneInstruction = `TONE: FIRM BUT FAIR. This meal would push them slightly over their limit (${Math.round(overPercent)}% over). Be honest that it's not ideal and explain why, without being harsh — but don't be overly sweet or encouraging either. State the trade-off plainly and let them make an informed call.`;
  } else if (remaining.calories - mealTotals.calories < goals.calories * 0.1) {
    toneInstruction = `TONE: CAUTIONARY. This meal fits, but just barely — it would use up almost all their remaining budget for the day. Be encouraging but realistic, gently flagging that there won't be much room left for anything else today.`;
  } else {
    toneInstruction = `TONE: WARM AND SUPPORTIVE. This meal fits comfortably within their remaining budget. Be genuinely warm, encouraging, and positive like a supportive friend — no need for caution here.`;
  }
  const systemPrompt = `You are a real, honest Indian nutrition buddy who talks in natural Hinglish (a mix of Hindi and English, written in Roman/English script). You are NOT a people-pleaser — your tone changes based on the actual situation, the way a real friend's would.

${toneInstruction}

Given a meal someone is considering eating (for a SPECIFIC meal slot they mention, e.g. breakfast/lunch/snack/dinner — pay close attention to which one), their current nutrition totals for today, which meals they've ALREADY logged today, their daily goals, and what's remaining, write a short response (3-5 sentences) that:
1. Matches the TONE instruction above exactly — this is the most important rule. Do not default to being nice if the tone instruction says to be firm or brutal.
2. States clearly whether this meal fits, and explains the trade-off in plain terms.
3. Gives ONE practical suggestion that is logically consistent with which meals are already eaten vs still upcoming:
   - If the meal in question is their LAST meal slot of the day (e.g. dinner, or all other slots already logged), do NOT suggest eating it lighter later or reducing a future meal — there is no future meal left. Instead suggest either a smaller portion now, balancing tomorrow, or (if the tone is brutal) just skipping it.
   - Only suggest "reduce calories in your next meal" if there genuinely IS an unlogged meal slot still ahead in the day.
   - Only suggest "keep today's meal light" if the meal being asked about is itself NOT that same meal.

Do NOT use bullet points or headers — write it as natural flowing conversational text in Hinglish. Do not just restate the raw numbers robotically; weave them naturally into the sentences where relevant.`;
  const userPrompt = `Meal being considered: "${mealDescription}"
This meal's nutrition: ${JSON.stringify(mealTotals)}
Already consumed today: ${JSON.stringify(currentTotals)}
Meal slots already logged today: ${loggedMealTypes.length ? loggedMealTypes.join(', ') : 'none yet'}
Meal slots still remaining today (not yet logged): ${remainingMealSlots.length ? remainingMealSlots.join(', ') : 'none — this would be the last meal of the day'}
Daily goals: ${JSON.stringify(goals)}
Remaining before this meal: ${JSON.stringify(remaining)}
Projected total if eaten: ${projectedCalories} kcal (goal: ${goals.calories} kcal)`;
  const advice = await callOpenRouter([{
    role: 'system',
    content: systemPrompt
  }, {
    role: 'user',
    content: userPrompt
  }], {
    temperature: 0.6
  });
  return advice.trim();
};
module.exports = {
  parseMealText,
  generateSuggestion,
  generateMultipleSuggestions,
  generateWhatIfAdvice
};