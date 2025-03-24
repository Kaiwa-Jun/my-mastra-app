import { NextResponse } from "next/server";
import { cameraSettingsApi } from "@/app/lib/supabase-utils";

/**
 * すべてのカメラ設定を取得するAPI
 * GET /api/get-settings
 */
export async function GET(request: Request) {
  try {
    console.log("API: カメラ設定取得リクエスト受信");

    // クエリパラメータがある場合はシーンで絞り込み
    const { searchParams } = new URL(request.url);
    const scene = searchParams.get("scene");

    let data;
    if (scene) {
      console.log(`API: シーン「${scene}」の設定を取得中`);
      data = await cameraSettingsApi.getSettingByScene(scene);
    } else {
      console.log("API: すべてのカメラ設定を取得中");
      data = await cameraSettingsApi.getAllSettings();
    }

    console.log(
      `API: ${Array.isArray(data) ? data.length : 1}件のカメラ設定を返却`
    );
    return NextResponse.json({ data });
  } catch (error) {
    console.error("API エラー:", error);
    return NextResponse.json(
      { error: "カメラ設定の取得に失敗しました" },
      { status: 500 }
    );
  }
}
