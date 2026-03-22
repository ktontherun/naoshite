export async function POST(request) {
  const { japanese, scene } = await request.json();

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      messages: [
        {
          role: "user",
          content: `あなたは日本語から英語への翻訳の専門家です。看板、メニュー、案内表示などの公共翻訳を正確かつ自然な英語に翻訳してください。

以下のJSON形式のみで回答してください。それ以外のテキストは含めないでください：
{"translation":"英訳","notes":"翻訳のポイントや注意点（日本語で）","alternatives":["代替表現1","代替表現2"],"badExample":"よくある間違い訳","badReason":"なぜその訳が不適切か（日本語で）"}

場面: ${scene}
日本語テキスト: ${japanese}`,
        },
      ],
    }),
  });

  const data = await response.json();
  return Response.json(data);
}
