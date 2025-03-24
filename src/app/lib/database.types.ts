/**
 * このファイルはSupabaseデータベースの型定義です。
 * supabase-jsクライアントで型安全なクエリを実行するために使用します。
 */
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      camera_settings: {
        Row: {
          id: number;
          scene: string;
          iso: number;
          aperture: number;
          shutter_speed: string;
          description: string;
          tips: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          scene: string;
          iso: number;
          aperture: number;
          shutter_speed: string;
          description: string;
          tips?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          scene?: string;
          iso?: number;
          aperture?: number;
          shutter_speed?: string;
          description?: string;
          tips?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      user_uploads: {
        Row: {
          id: number;
          user_id: string;
          image_url: string;
          detected_scene: string | null;
          analysis: Json | null;
          created_at: string;
        };
        Insert: {
          id?: number;
          user_id: string;
          image_url: string;
          detected_scene?: string | null;
          analysis?: Json | null;
          created_at?: string;
        };
        Update: {
          id?: number;
          user_id?: string;
          image_url?: string;
          detected_scene?: string | null;
          analysis?: Json | null;
          created_at?: string;
        };
      };
      user_feedback: {
        Row: {
          id: number;
          user_id: string;
          upload_id: number;
          was_helpful: boolean;
          comments: string | null;
          created_at: string;
        };
        Insert: {
          id?: number;
          user_id: string;
          upload_id: number;
          was_helpful: boolean;
          comments?: string | null;
          created_at?: string;
        };
        Update: {
          id?: number;
          user_id?: string;
          upload_id?: number;
          was_helpful?: boolean;
          comments?: string | null;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

// テーブル名からそのテーブルの型を取得するヘルパー型
export type TableRow<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];

export type InsertRow<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Insert"];

export type UpdateRow<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Update"];

// 使用例:
// type CameraSettings = TableRow<'camera_settings'>;
// type NewUpload = InsertRow<'user_uploads'>;
