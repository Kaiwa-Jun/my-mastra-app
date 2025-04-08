import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold mb-6">カメラ初心者サポートアプリ</h1>
      <p className="text-lg mb-8">AIがあなたに最適なカメラ設定を提案します</p>
      <Link
        href="/camera-assistant"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        カメラアシスタントを使う
      </Link>
    </main>
  );
}
