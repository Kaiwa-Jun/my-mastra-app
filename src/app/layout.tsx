import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "カメラ初心者サポートアプリ",
  description: "AIがあなたの写真に最適なカメラ設定を提案します",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
