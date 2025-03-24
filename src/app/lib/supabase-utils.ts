import { supabase, supabaseAdmin } from "./supabase";
import type { TableRow, InsertRow, UpdateRow } from "./database.types";

/**
 * カメラ設定に関する操作
 */
export const cameraSettingsApi = {
  // すべてのカメラ設定を取得
  getAllSettings: async () => {
    const { data, error } = await supabase
      .from("camera_settings")
      .select("*")
      .order("id");

    if (error) {
      console.error("カメラ設定取得エラー:", error);
      throw error;
    }

    return data;
  },

  // 特定のシーンのカメラ設定を取得
  getSettingByScene: async (scene: string) => {
    const { data, error } = await supabase
      .from("camera_settings")
      .select("*")
      .eq("scene", scene)
      .single();

    if (error) {
      console.error(`シーン「${scene}」の設定取得エラー:`, error);
      throw error;
    }

    return data;
  },
};

/**
 * ユーザーアップロードに関する操作
 */
export const userUploadsApi = {
  // 画像アップロードの記録を保存
  saveUpload: async (
    userId: string,
    imageUrl: string,
    detectedScene?: string,
    analysis?: any
  ) => {
    const { data, error } = await supabase
      .from("user_uploads")
      .insert({
        user_id: userId,
        image_url: imageUrl,
        detected_scene: detectedScene,
        analysis: analysis ? JSON.stringify(analysis) : null,
      })
      .select()
      .single();

    if (error) {
      console.error("アップロード保存エラー:", error);
      throw error;
    }

    return data;
  },

  // ユーザーの過去のアップロードを取得
  getUserUploads: async (userId: string) => {
    const { data, error } = await supabase
      .from("user_uploads")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("ユーザーのアップロード取得エラー:", error);
      throw error;
    }

    return data;
  },

  // アップロードのシーン検出結果を更新
  updateDetectedScene: async (uploadId: number, scene: string) => {
    const { data, error } = await supabase
      .from("user_uploads")
      .update({ detected_scene: scene })
      .eq("id", uploadId)
      .select()
      .single();

    if (error) {
      console.error("シーン検出結果更新エラー:", error);
      throw error;
    }

    return data;
  },
};

/**
 * ユーザーフィードバックに関する操作
 */
export const userFeedbackApi = {
  // フィードバックを保存
  saveFeedback: async (
    userId: string,
    uploadId: number,
    wasHelpful: boolean,
    comments?: string
  ) => {
    const { data, error } = await supabase
      .from("user_feedback")
      .insert({
        user_id: userId,
        upload_id: uploadId,
        was_helpful: wasHelpful,
        comments: comments || null,
      })
      .select()
      .single();

    if (error) {
      console.error("フィードバック保存エラー:", error);
      throw error;
    }

    return data;
  },

  // 特定のアップロードに対するフィードバックを取得
  getFeedbackForUpload: async (uploadId: number) => {
    const { data, error } = await supabase
      .from("user_feedback")
      .select("*")
      .eq("upload_id", uploadId);

    if (error) {
      console.error("フィードバック取得エラー:", error);
      throw error;
    }

    return data;
  },
};

/**
 * ストレージ操作に関する関数
 */
export const storageApi = {
  // 画像をアップロード
  uploadImage: async (userId: string, file: File) => {
    // ユニークなファイル名を生成（タイムスタンプを含める）
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `${userId}/${fileName}`;

    // ファイルをアップロード
    const { data, error } = await supabase.storage
      .from("camera-images")
      .upload(filePath, file);

    if (error) {
      console.error("画像アップロードエラー:", error);
      throw error;
    }

    // 公開URLを取得
    const { data: urlData } = await supabase.storage
      .from("camera-images")
      .getPublicUrl(filePath);

    return {
      path: data.path,
      url: urlData.publicUrl,
    };
  },

  // 画像を削除
  deleteImage: async (path: string) => {
    const { error } = await supabase.storage
      .from("camera-images")
      .remove([path]);

    if (error) {
      console.error("画像削除エラー:", error);
      throw error;
    }

    return { success: true };
  },
};

/**
 * 認証に関する操作
 */
export const authApi = {
  // 現在のユーザーを取得
  getCurrentUser: async () => {
    const { data, error } = await supabase.auth.getUser();

    if (error) {
      console.error("ユーザー取得エラー:", error);
      return null;
    }

    return data.user;
  },

  // メールアドレスでサインアップ
  signUpWithEmail: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error("サインアップエラー:", error);
      throw error;
    }

    return data;
  },

  // メールアドレスでログイン
  signInWithEmail: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("ログインエラー:", error);
      throw error;
    }

    return data;
  },

  // ログアウト
  signOut: async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("ログアウトエラー:", error);
      throw error;
    }

    return { success: true };
  },
};
