import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const HAND_ANALYSIS_PROMPT = `You are Andrew, an expert poker hand analyzer at AI Poker School. A player is describing a hand they played or want advice on. Your job:

1. Parse the hand details: position, hole cards, action at each street, stack sizes, pot size
2. Analyze each decision point against GTO (Game Theory Optimal) play
3. Provide a clear score (0-100) for how close to GTO they played
4. Identify specific mistakes with actionable corrections
5. Use pot odds math when relevant: "You need X% equity to call. With Y outs, you have Z%..."

Format your response with clear street-by-street analysis:
- **Preflop**: Position, action, GTO recommendation
- **Flop**: Board texture, action, sizing analysis
- **Turn**: Updated ranges, action analysis
- **River**: Final decision, value/bluff analysis

Always end with:
- **GTO Score**: X/100
- **Key Takeaway**: One sentence they should remember
- **Drill This**: A specific exercise to improve

Keep it practical and encouraging. Use poker slang naturally.`;

export async function POST(request: NextRequest) {
  try {
    const { handDescription, variant, gameType } = await request.json();

    if (!handDescription) {
      return NextResponse.json(
        { error: 'Hand description is required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json({
        analysis: {
          summary: "I can't analyze hands without my API connection. Once the site owner configures the API key, I'll break down every street for you!",
          gtoScore: 0,
          mistakes: [],
          keyTakeaway: 'Check back soon — hand analysis is coming!',
        },
      });
    }

    const anthropic = new Anthropic({ apiKey });

    const contextMessage = `Game: ${variant || 'No-Limit Hold\'em'} ${gameType || 'Cash Game'}\n\nHand Description:\n${handDescription}`;

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1500,
      system: HAND_ANALYSIS_PROMPT,
      messages: [{ role: 'user', content: contextMessage }],
    });

    const textBlock = response.content.find((block) => block.type === 'text');
    const analysisText = textBlock?.text || 'Unable to analyze this hand.';

    const scoreMatch = analysisText.match(/GTO Score[:\s]*(\d+)/i);
    const gtoScore = scoreMatch ? parseInt(scoreMatch[1], 10) : 50;

    return NextResponse.json({
      analysis: {
        summary: analysisText,
        gtoScore,
        keyTakeaway: '',
      },
    });
  } catch (error) {
    console.error('Hand analysis error:', error);
    return NextResponse.json(
      { error: 'Analysis failed. Please try again.' },
      { status: 500 }
    );
  }
}
