import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

// 環境変数から必要な値を取得
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

// Supabaseクライアントのオプション
const options = {
  auth: {
    persistSession: true, // セッション情報をlocal storageに保存
    autoRefreshToken: true, // トークンの自動リフレッシュを有効化
  },
};

// ブラウザとサーバーサイドの両方で使えるクライアント
// 匿名キーを使うため、RLSポリシーに従った制限付きアクセス
export const supabase = createClient<Database>(
  supabaseUrl,
  supabaseAnonKey,
  options
);

// サーバーサイドでのみ使用する管理者権限クライアント
// サービスロールキーを使うため、RLSをバイパスして完全アクセス権を持つ
// 注意: このクライアントはサーバーサイドのみで使用する（APIルートやサーバーコンポーネント）
export const supabaseAdmin = createClient<Database>(
  supabaseUrl,
  supabaseServiceKey,
  options
);

// Supabaseへの接続をテストする関数
export const testSupabaseConnection = async () => {
  try {
    // camera_settingsテーブルの行数をカウント
    const { count, error } = await supabase
      .from("camera_settings")
      .select("*", { count: "exact", head: true });

    if (error) throw error;

    console.log(
      `Supabase接続成功: camera_settingsテーブルには${count}行あります`
    );
    return { success: true, count };
  } catch (error) {
    console.error("Supabase接続エラー:", error);
    return { success: false, error };
  }
};

/**
 * Supabaseクライアントの主な使用方法
 *
 * 1. データベースアクセス
 * ```
 * // データ取得
 * const { data, error } = await supabase
 *   .from('camera_settings')
 *   .select('*')
 *   .eq('scene', 'landscape');
 *
 * // データ挿入
 * const { data, error } = await supabase
 *   .from('user_uploads')
 *   .insert({ user_id: userId, image_url: url, detected_scene: 'portrait' });
 *
 * // データ更新
 * const { data, error } = await supabase
 *   .from('user_uploads')
 *   .update({ detected_scene: 'night' })
 *   .eq('id', uploadId);
 *
 * // データ削除
 * const { error } = await supabase
 *   .from('user_feedback')
 *   .delete()
 *   .eq('id', feedbackId);
 * ```
 *
 * 2. ストレージ操作
 * ```
 * // ファイルのアップロード
 * const { data, error } = await supabase.storage
 *   .from('camera-images')
 *   .upload(`${userId}/${fileName}`, fileData);
 *
 * // ファイルのダウンロードURL取得
 * const { data } = await supabase.storage
 *   .from('camera-images')
 *   .getPublicUrl(`${userId}/${fileName}`);
 *
 * // ファイルの削除
 * const { error } = await supabase.storage
 *   .from('camera-images')
 *   .remove([`${userId}/${fileName}`]);
 * ```
 *
 * 3. 認証機能
 * ```
 * // メール/パスワードでサインアップ
 * const { data, error } = await supabase.auth.signUp({
 *   email: 'example@example.com',
 *   password: 'password123'
 * });
 *
 * // メール/パスワードでログイン
 * const { data, error } = await supabase.auth.signInWithPassword({
 *   email: 'example@example.com',
 *   password: 'password123'
 * });
 *
 * // ログアウト
 * const { error } = await supabase.auth.signOut();
 *
 * // 現在のユーザー情報を取得
 * const { data: { user } } = await supabase.auth.getUser();
 * ```
 */
