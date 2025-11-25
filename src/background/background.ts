chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
    if (msg.action === "AI_SUMMARISER") {
        summariseWithAI(msg.text).then(summary=> sendResponse({summary})).catch(
            () => sendResponse({summary: "AI error, Try again"})
        );
        return true
    }
});


async function summariseWithAI(text: string): Promise<string> {
    const OPENROUTER_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
    const prompt = `Summarize the following webpage text into 5 bullet points:\n\n${text}`;

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${OPENROUTER_KEY}`,
            "Content-Type": `application/json`
        },
        body: JSON.stringify({
            model: "gpt-4o-mini",
            messages : [
                {role:"system", content: "you are a very precise summariser."},
                {role: "user", content: prompt}
            ]
        })
    });
    const data = await res.json();
    return data.choices?.[0]?.message?.content || "no summary gen";
}