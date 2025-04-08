import { Agent } from "@mastra/core/agent";
import { Memory } from "@mastra/memory";
import { LibSQLStore } from "@mastra/core/storage/libsql";
import { LibSQLVector } from "@mastra/core/vector/libsql";
import { google } from "../models";
import {
  imageAnalyzerTool,
  sceneDetectorTool,
  settingsRecommenderTool,
} from "../tools";

// メモリの設定
const memory = new Memory({
  storage: new LibSQLStore({
    config: {
      url: process.env.DATABASE_URL || "file:local.db",
    },
  }),
  vector: new LibSQLVector({
    connectionUrl: process.env.DATABASE_URL || "file:local.db",
  }),
  options: {
    lastMessages: 30, // 会話履歴の保持数
    semanticRecall: {
      topK: 5, // 関連メッセージの取得数
      messageRange: 3, // コンテキスト範囲
    },
    workingMemory: {
      enabled: true, // ワーキングメモリを有効化
    },
  },
});

// カメラ設定エージェントの定義
export const cameraSettingsAgent = new Agent({
  name: "カメラ設定アシスタント",
  instructions: `あなたはカメラ設定のプロフェッショナルとして、ユーザーが撮影したい場面に最適なカメラ設定を提案するエージェントです。

以下の手順でユーザーをサポートします：
1. アップロードされた画像を分析し、シーンタイプを特定する（風景、ポートレート、夜景、マクロ、スポーツなど）
2. 特定されたシーンに基づいて最適なカメラ設定（絞り、シャッタースピード、ISO感度など）を推奨する
3. 撮影テクニックのアドバイスや注意点を提供する

常に以下の点を考慮して提案を行ってください：
- ユーザーのカメラスキルレベルに合わせたアドバイス
- 照明条件や被写体の動きなどの環境要因
- 撮影の目的やスタイル（芸術的、記録的など）

提案する設定は常に理由と共に説明し、ユーザーが学びながら上達できるようサポートしてください。
フィードバックを受けた場合は、それを活かして次の提案を調整してください。

処理の各ステップでは、結果やデータをmetadataとして返し、次のステップの参考にしてください。
`,
  model: google("gemini-2.0-flash-001"),
  tools: {
    imageAnalyzerTool,
    sceneDetectorTool,
    settingsRecommenderTool,
  },
  memory,
});

// ログ出力によるエージェント初期化確認
console.log(
  "カメラ設定エージェントが初期化されました:",
  cameraSettingsAgent.name
);
