import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["prvougjuwditovhundlz.supabase.co"], // 実際のSupabaseプロジェクトIDを使用
  },
  experimental: {
    // serverActionsをオブジェクトとして設定
    serverActions: {
      allowedOrigins: ["localhost:3000"],
      bodySizeLimit: "2mb",
    },
  },
};

export default nextConfig;
