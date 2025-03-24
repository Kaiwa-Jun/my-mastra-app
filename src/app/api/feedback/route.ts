import { NextResponse } from "next/server";
import { authApi, userFeedbackApi } from "@/app/lib/supabase-utils";

/**
 * ユーザーフィードバックを保存するAPI
 * POST /api/feedback
 */
export async function POST(request: Request) {
  console.log("API: フィードバック保存リクエスト受信");

  try {
    // 現在のユーザーを取得
    const user = await authApi.getCurrentUser();
    if (!user) {
      console.error("API: 未認証ユーザー");
      return NextResponse.json({ error: "認証が必要です" }, { status: 401 });
    }

    // リクエストボディを解析
    const body = await request.json();
    const { uploadId, wasHelpful, comments } = body;

    // バリデーション
    if (uploadId === undefined || wasHelpful === undefined) {
      console.error("API: 必須パラメータが欠けています", body);
      return NextResponse.json(
        { error: "uploadIdとwasHelpfulは必須です" },
        { status: 400 }
      );
    }

    // フィードバックをデータベースに保存
    console.log(`API: ユーザー${user.id}のフィードバックを保存中`);
    const feedback = await userFeedbackApi.saveFeedback(
      user.id,
      uploadId,
      wasHelpful,
      comments
    );

    console.log("API: フィードバック保存完了:", feedback.id);
    return NextResponse.json({
      success: true,
      data: feedback,
    });
  } catch (error) {
    console.error("API エラー:", error);
    return NextResponse.json(
      { error: "フィードバックの保存に失敗しました" },
      { status: 500 }
    );
  }
}

/**
 * 特定のアップロードに対するフィードバックを取得するAPI
 * GET /api/feedback?uploadId=123
 */
export async function GET(request: Request) {
  console.log("API: フィードバック取得リクエスト受信");

  try {
    // クエリパラメータの解析
    const { searchParams } = new URL(request.url);
    const uploadId = searchParams.get("uploadId");

    if (!uploadId) {
      console.error("API: uploadIdパラメータが欠けています");
      return NextResponse.json(
        { error: "uploadIdは必須です" },
        { status: 400 }
      );
    }

    // フィードバックデータを取得
    console.log(`API: アップロードID ${uploadId} のフィードバックを取得中`);
    const feedback = await userFeedbackApi.getFeedbackForUpload(
      Number(uploadId)
    );

    console.log(`API: ${feedback.length}件のフィードバックを返却`);
    return NextResponse.json({
      success: true,
      data: feedback,
    });
  } catch (error) {
    console.error("API エラー:", error);
    return NextResponse.json(
      { error: "フィードバックの取得に失敗しました" },
      { status: 500 }
    );
  }
}
