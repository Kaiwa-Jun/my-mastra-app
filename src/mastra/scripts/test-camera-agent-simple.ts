// import { cameraSettingsAgent } from "../agents/cameraSettingsAgent";

// スタブの実装
const cameraSettingsAgent = {
  name: "カメラ設定アシスタント",
  memory: {
    options: {
      lastMessages: 30,
      semanticRecall: {
        topK: 5,
        messageRange: 3,
      },
      workingMemory: {
        enabled: true,
      },
    },
  },
  model: {
    name: "gemini-2.0-flash-001",
  },
  tools: {
    imageAnalyzerTool: { name: "image-analyzer" },
    sceneDetectorTool: { name: "scene-detector" },
    settingsRecommenderTool: { name: "settings-recommender" },
  },
};

async function testCameraAgent() {
  try {
    console.log("=== カメラ設定エージェントテスト開始 ===");
    console.log(`エージェント名: ${cameraSettingsAgent.name}`);
    console.log("メモリ設定:", {
      lastMessages: cameraSettingsAgent.memory?.options?.lastMessages,
      semanticRecall: cameraSettingsAgent.memory?.options?.semanticRecall,
      workingMemory:
        cameraSettingsAgent.memory?.options?.workingMemory?.enabled,
    });
    console.log("モデル:", cameraSettingsAgent.model?.name);
    console.log(
      "ツール数:",
      Object.keys(cameraSettingsAgent.tools || {}).length
    );
    console.log(
      "ツール名:",
      Object.values(cameraSettingsAgent.tools || {})
        .map((tool: any) => tool.name)
        .join(", ")
    );
    console.log("=== カメラ設定エージェントテスト完了 ===");
  } catch (error) {
    console.error(
      "カメラ設定エージェントテスト中にエラーが発生しました:",
      error
    );
  }
}

// テスト実行
console.log(
  "カメラ設定エージェントが初期化されました:",
  cameraSettingsAgent.name
);
testCameraAgent();
