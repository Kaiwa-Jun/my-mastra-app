import { NextResponse } from "next/server";
import { authApi, storageApi, userUploadsApi } from "@/app/lib/supabase-utils";

const mockAnalyzeImage = async (imageUrl: string) => {
  console.log("画像分析の模擬処理を実行:", imageUrl);

  // シーンのリスト（実際にはAIが画像から判断）
  const scenes = ["landscape", "portrait", "night", "macro", "action"];

  const randomScene = scenes[Math.floor(Math.random() * scenes.length)];

  // 画像分析結果を模擬（実際にはAIによる分析結果）
  const analysis = {
    detectedScene: randomScene,
    confidence: Math.random() * 0.5 + 0.5, // 0.5-1.0の信頼度
    lightCondition: ["bright", "medium", "dark"][Math.floor(Math.random() * 3)],
    subjectDistance: ["close", "medium", "far"][Math.floor(Math.random() * 3)],
    movementDetected: Math.random() > 0.7,
    timestamp: new Date().toISOString(),
  };

  // 1-2秒の遅延を模擬（実際の分析にかかる時間）
  await new Promise((resolve) =>
    setTimeout(resolve, 1000 + Math.random() * 1000)
  );

  return {
    scene: randomScene,
    analysis,
  };
};

/**
 * 画像をアップロードして分析するAPI
 * POST /api/analyze-image
 */
export async function POST(request: Request) {
  console.log("API: 画像分析リクエスト受信");

  try {
    // 現在のユーザーを取得
    const user = await authApi.getCurrentUser();
    if (!user) {
      console.error("API: 未認証ユーザー");
      return NextResponse.json({ error: "認証が必要です" }, { status: 401 });
    }

    // フォームデータの解析
    const formData = await request.formData();
    const imageFile = formData.get("image") as File;

    if (!imageFile) {
      console.error("API: 画像ファイルが見つかりません");
      return NextResponse.json(
        { error: "画像ファイルが必要です" },
        { status: 400 }
      );
    }

    // 画像の形式をチェック
    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!validTypes.includes(imageFile.type)) {
      console.error("API: 無効な画像形式:", imageFile.type);
      return NextResponse.json(
        { error: "JPEG、PNG、またはWebP形式の画像のみ受け付けています" },
        { status: 400 }
      );
    }

    console.log("API: 画像をアップロード中...");
    // ストレージに画像をアップロード
    const { path, url } = await storageApi.uploadImage(user.id, imageFile);
    console.log("API: 画像アップロード完了:", path);

    // 画像分析（実際にはmastraエージェントを呼び出し）
    console.log("API: 画像分析開始");
    const { scene, analysis } = await mockAnalyzeImage(url);
    console.log(`API: 画像分析完了、シーン「${scene}」を検出`);

    // データベースにアップロード情報を保存
    const uploadRecord = await userUploadsApi.saveUpload(
      user.id,
      url,
      scene,
      analysis
    );
    console.log("API: アップロードレコード保存完了:", uploadRecord.id);

    // レスポンスを返す
    return NextResponse.json({
      success: true,
      data: {
        uploadId: uploadRecord.id,
        imageUrl: url,
        scene,
        analysis,
      },
    });
  } catch (error) {
    console.error("API エラー:", error);
    return NextResponse.json(
      { error: "画像の分析に失敗しました" },
      { status: 500 }
    );
  }
}
