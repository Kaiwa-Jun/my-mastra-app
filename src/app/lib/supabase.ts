import { createClient } from "@supabase/supabase-js";

// Supabaseクライアントの作成（ブラウザ用）
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

// 管理者権限のクライアント（サーバーサイドのみで使用）
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_ROLE_KEY || ""
);

// 初期接続テスト用関数
export const testConnection = async () => {
  try {
    const { data, error } = await supabase
      .from("camera_settings")
      .select("count()", { count: "exact" });
    if (error) throw error;
    console.log("Supabase接続成功:", data);
    return { success: true, data };
  } catch (error) {
    console.error("Supabase接続エラー:", error);
    return { success: false, error };
  }
};
