export async function POST(request) {
  const { imageBase64, mediaType } = await request.json();

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 800,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              source: {
                type: "base64",
                media_type: mediaType,
                data: imageBase64,
              },
            },
            {
              type: "text",
              text: `この画像には日本語とその英訳が写っています。珍翻訳（おかしな英訳）を分析してください。

以下のJSON形式のみで回答してください：
{"original":"日本語の原文","badTranslation":"写真に写っている英訳","correctTranslation":"正しい英訳","explanation":"なぜ元の訳が間違い・おかしいか（日本語で簡潔に）","suggestedCategory":"メニュー/看板/トイレ/ホテル/温泉/コンビニ/駅・交通/その他 から1つ"}

もし珍翻訳が見つからない場合は：
{"error":"珍翻訳が見つかりませんでした。"}`,
            },
          ],
        },
      ],
    }),
  });

  const data = await response.json();
  return Response.json(data);
}
