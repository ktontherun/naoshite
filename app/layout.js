export const metadata = {
  title: "NaoshiTE - Lost in Translation",
  description: "Fix funny Japanese-to-English translations. 珍翻訳を正しい英語に。",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;600;700&family=DM+Sans:wght@400;500;600&family=DM+Serif+Display&family=Noto+Serif+JP:wght@400;500;700&family=Source+Sans+3:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
