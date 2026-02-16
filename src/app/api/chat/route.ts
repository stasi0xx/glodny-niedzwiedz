
import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { tools, checkDelivery, recommendDiet, getAllDiets } from '@/lib/chatLogic';
import { faq } from '@/data/faq';
import { kubaKnowledge } from '@/data/kubaKnowledge';

// Initialize OpenAI client
// NOTE: Make sure OPENAI_API_KEY is allowed in your environment
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `
Jesteś Kuba, wirtualny asystent cateringu dietetycznego "Głodny Niedźwiedź".
Twoim celem jest pomoc użytkownikom w doborze diety, sprawdzaniu dostaw i odpowiadaniu na pytania (FAQ).

ZASADY:
1. Bądź pomocny, uprzejmy i energiczny (używaj emoji 🐻🥗).
2. Odpowiadaj krótko i konkretnie (2-3 zdania).
3. Jeśli użytkownik pyta o dowóz, użyj narzędzia 'check_delivery'.
4. Jeśli użytkownik chce dobrać dietę, zadaj pytania o cel (schudnąć/masa/zdrowie), aktywność i wykluczenia. Gdy zbierzesz te dane, użyj narzędzia 'recommend_diet'.
5. Jeśli brakuje Ci wiedzy, powiedz "Nie jestem pewien, ale mogę połączyć Cię z biurem obsługi".
6. Nie zmyślaj faktów medycznych.
7. FAQ i Wiedza:
   - Częste pytania: ${JSON.stringify(faq.map(f => ({ q: f.question, a: f.answer })))}
   - O nas: ${JSON.stringify(kubaKnowledge.responses)}

FORMATOWANIE:
- Używaj pogrubienia dla ważnych info.
`;

export async function POST(request: Request) {
    if (!process.env.OPENAI_API_KEY) {
        return NextResponse.json({
            messages: [{ id: 'err', role: 'assistant', content: "Brak klucza OpenAI API. Skonfiguruj .env.local." }],
            newState: {}
        });
    }

    try {
        const body = await request.json();
        const { message, currentState } = body;

        // Initial messages array with system prompt
        const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
            { role: 'system', content: SYSTEM_PROMPT },
            // Add history logic here if needed, simplified for MVP to just use last few user messages or passed history
            ...(currentState?.history?.slice(-4).map((m: any) => ({ role: m.role, content: m.content })) || []),
            { role: 'user', content: message }
        ];

        // 1. First Call to OpenAI
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo", // or gpt-4o-mini
            messages: messages,
            tools: tools as any,
            tool_choice: "auto",
        });

        const responseMessage = completion.choices[0].message;
        let finalContent = responseMessage.content;
        let productCard = null;
        let checkoutLink = null;

        // 2. Handle Tool Calls
        if (responseMessage.tool_calls) {
            messages.push(responseMessage); // Add the tool call request to history

            for (const toolCall of responseMessage.tool_calls) {
                const fnName = toolCall.function.name;
                const args = JSON.parse(toolCall.function.arguments);
                let toolResult: any;

                if (fnName === 'check_delivery') {
                    toolResult = checkDelivery(args.location);
                } else if (fnName === 'recommend_diet') {
                    toolResult = recommendDiet(args);
                    if (toolResult.productCard) productCard = toolResult.productCard;
                    if (toolResult.checkoutLink) checkoutLink = toolResult.checkoutLink;
                } else if (fnName === 'get_diet_list') {
                    toolResult = getAllDiets();
                }

                messages.push({
                    tool_call_id: toolCall.id,
                    role: 'tool',
                    content: JSON.stringify(toolResult)
                });
            }

            // 3. Second Call (with tool outputs)
            const secondResponse = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: messages,
            });

            finalContent = secondResponse.choices[0].message.content;
        }

        // Return structured response for frontend
        return NextResponse.json({
            messages: [{
                id: Date.now().toString(),
                role: 'assistant',
                content: finalContent, // Markdown supported
                productCard, // Attach if available
                checkoutLink
            }],
            newState: {
                ...currentState, // Carry over state if needed
                history: [
                    ...(currentState?.history || []),
                    { role: 'user', content: message },
                    { role: 'assistant', content: finalContent }
                ]
            }
        });

    } catch (error) {
        console.error('OpenAI Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
