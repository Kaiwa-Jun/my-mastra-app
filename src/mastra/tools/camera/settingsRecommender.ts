import { createTool } from "@mastra/core/tool";

/**
 * 設定推奨ツール - 検出されたシーンに基づいてカメラ設定を推奨するツール
 */
export const settingsRecommenderTool = createTool({
  name: "settings-recommender",
  description: "検出されたシーンタイプに基づいて最適なカメラ設定を推奨します",
  parameters: {
    type: "object",
    properties: {
      sceneType: {
        type: "string",
        description: "検出されたシーンタイプ",
      },
      subTypes: {
        type: "array",
        items: {
          type: "string",
        },
        description: "シーンのサブタイプ（オプション）",
      },
      userSkillLevel: {
        type: "string",
        enum: ["beginner", "intermediate", "advanced"],
        description: "ユーザーのスキルレベル（オプション）",
      },
    },
    required: ["sceneType"],
  },
  handler: async (
    { sceneType, subTypes, userSkillLevel = "intermediate" },
    { metadata }
  ) => {
    console.log(
      `[SettingsRecommender] 設定推奨を開始: シーン「${sceneType}」、スキルレベル「${userSkillLevel}」`
    );

    try {
      // 実際の設定推奨ロジックはここに実装予定
      // 現在はダミーデータを返すだけ
      const recommendedSettings = {
        aperture: "f/8",
        shutterSpeed: "1/125",
        iso: "100",
        whiteBalance: "daylight",
        focusMode: "single-point AF",
        shootingMode: "aperture priority",
        additionalTips: [
          "三脚の使用を検討してください",
          "風景の奥行きを出すために広角レンズが効果的です",
          "朝夕の光を活かすとより印象的な写真になります",
        ],
      };

      console.log("[SettingsRecommender] 設定推奨完了:", recommendedSettings);

      return {
        result: `シーン「${sceneType}」に最適な設定を推奨します`,
        metadata: {
          recommendedSettings,
          sceneType,
          subTypes,
          userSkillLevel,
          timestamp: new Date().toISOString(),
        },
      };
    } catch (error) {
      console.error(
        "[SettingsRecommender] 設定推奨中にエラーが発生しました:",
        error
      );
      throw new Error(`設定推奨中にエラーが発生しました: ${error.message}`);
    }
  },
});
