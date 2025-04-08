import { createTool } from "@mastra/core/tool";

/**
 * シーン検出ツール - 画像分析結果から撮影シーンを特定するツール
 */
export const sceneDetectorTool = createTool({
  name: "scene-detector",
  description: "画像分析結果から撮影シーンのタイプを特定します",
  parameters: {
    type: "object",
    properties: {
      analysisResult: {
        type: "object",
        description: "画像分析結果のオブジェクト",
      },
    },
    required: ["analysisResult"],
  },
  handler: async ({ analysisResult }, { metadata }) => {
    console.log("[SceneDetector] シーン検出を開始:", analysisResult);

    try {
      // 実際のシーン検出ロジックはここに実装予定
      // 現在はダミーデータを返すだけ
      const detectedScene = {
        type: "landscape",
        confidence: 0.87,
        subTypes: ["mountain", "sunset"],
        timeOfDay: "evening",
        lighting: "natural",
        weather: "clear",
      };

      console.log("[SceneDetector] シーン検出完了:", detectedScene);

      return {
        result: `シーンタイプ「${detectedScene.type}」を検出しました（信頼度: ${detectedScene.confidence}）`,
        metadata: {
          detectedScene,
          timestamp: new Date().toISOString(),
        },
      };
    } catch (error) {
      console.error(
        "[SceneDetector] シーン検出中にエラーが発生しました:",
        error
      );
      throw new Error(`シーン検出中にエラーが発生しました: ${error.message}`);
    }
  },
});
