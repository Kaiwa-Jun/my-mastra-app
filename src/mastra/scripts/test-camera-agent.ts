import { cameraSettingsAgent } from "../agents/cameraSettingsAgent";

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
    console.log("=== カメラ設定エージェントテスト完了 ===");
  } catch (error) {
    console.error(
      "カメラ設定エージェントテスト中にエラーが発生しました:",
      error
    );
  }
}

// テスト実行
testCameraAgent();
