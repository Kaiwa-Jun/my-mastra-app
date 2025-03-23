import { NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabase";

export async function GET() {
  console.log("API: カメラ設定データの取得を開始");

  try {
    const { data, error } = await supabase.from("camera_settings").select("*");

    if (error) {
      console.error("API エラー:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log(`API: ${data.length}件のカメラ設定データを取得しました`);
    return NextResponse.json({ data });
  } catch (error) {
    console.error("API 例外:", error);
    return NextResponse.json(
      { error: "カメラ設定データの取得に失敗しました" },
      { status: 500 }
    );
  }
}
