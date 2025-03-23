import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["あなたのプロジェクトID.supabase.co"], // Supabaseのドメインに置き換え
  },
  experimental: {
    serverActions: true,
  },
};

export default nextConfig;
