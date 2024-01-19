import { TooltipItem } from "chart.js";

const RankingIndex = (minutes: number) => {
  if (minutes <= 10000) return 'ブロンズ';
  if (minutes > 10000 && minutes <= 30000) return 'シルバー';
  if (minutes > 30000 && minutes <= 60000) return 'ゴールド';
  if (minutes > 60000 && minutes <= 100000) return 'プラチナ';
  if (minutes > 100000 && minutes <= 300000) return 'ダイヤモンド';
  if (minutes > 300000 && minutes <= 600000) return 'マスター';
  if (minutes > 600000) return 'レジェンド';
};

export const getSkillRankChartOption = (text: string, data: number[]) => {
  const maxDataValue = Math.max(...data);
  const scaledMax = maxDataValue * 1.2;

  const chartOption = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: text,
      },
      tooltip: {
        callbacks: {
          label: function (context: TooltipItem<'bar'>) {
            const minutes = context.parsed.y;
            const rank = RankingIndex(minutes);
            return `時間: ${minutes}  ランク: ${rank}`;
          },
        },
      },
      annotation: {
        annotations: {
          legendLine: {
            type: 'line',
            yMin: 600000,
            yMax: 600000,
            borderColor: 'rgba(224, 17, 95, 0.5)',
            borderWidth: 2,
          },
          masterLine: {
            type: 'line',
            yMin: 300000,
            yMax: 300000,
            borderColor: 'rgba(75, 0, 130, 0.5)',
            borderWidth: 2,
          },
          diamondLine: {
            type: 'line',
            yMin: 100000,
            yMax: 100000,
            borderColor: 'rgba(173, 216, 230, 0.5)',
            borderWidth: 2,
          },
          platinumLine: {
            type: 'line',
            yMin: 60000,
            yMax: 60000,
            borderColor: 'rgba(192, 192, 224, 0.5)',
            borderWidth: 2,
          },
          goldLine: {
            type: 'line',
            yMin: 30000,
            yMax: 30000,
            borderColor: 'rgba(255, 215, 0, 0.5)',
            borderWidth: 2,
          },
          silverLine: {
            type: 'line',
            yMin: 10000,
            yMax: 10000,
            borderColor: 'rgba(192, 192, 192, 0.5)',
            borderWidth: 2,
          },
        },
      },
    },
    scales: {
      y: {
        suggestedMax: scaledMax,
        title: {
          display: true,
          text: '積み上げ時間（分）'
        }
      },
      x: {
        title: {
          display: true,
          text: 'スキル名'
        }
      }
    },
  };

  return chartOption;
}
