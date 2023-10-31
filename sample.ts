export type Tabs = {
  id: string;
  label: string;
};

export type TabInfoProps = {
  [tab: string]: {
    label: string;
    tabs: Tabs[];
  };
};

export const tabInfo: TabInfoProps = {
  'all': {
    label: '積み上げ',
    tabs: [
      { id: 'allStack', label: '全ての積み上げ' },
      { id: 'thisMonthStack', label: '今月の積み上げ' },
      { id: 'thisWeekStack', label: '今週の積み上げ' },
    ],
  },
  'bkm': {
    label: 'ブクマ',
    tabs: [
      { id: 'bkmStack', label: 'ブクマした積み上げ' },
      { id: 'bkmQanda', label: 'ブクマした質問' },
      { id: 'bkmComment', label: 'ブクマしたコメント' },
    ],
  },
  'like': {
    label: 'いいね',
    tabs: [
      { id: 'likeStack', label: 'いいねした積み上げ' },
      { id: 'likeQanda', label: 'いいねした質問' },
      { id: 'likeComment', label: 'いいねしたコメント' },
    ],
  },
};

export type SkillData = {
  skill: string;
  value: number
}

export type SkillDataProps = {
  label: string,
  data: SkillData[]
}

export const skillData: SkillDataProps[] = [
  {
    label: '積み上げスキル',
    data: [
      { skill: 'React', value: 60 },
      { skill: 'NextJS', value: 18 },
      { skill: 'Ruby on Rails', value: 2 },
      { skill: 'Vercel', value: 2 },
      { skill: 'TypeScript', value: 18 },
    ]
  },
  {
    label: '積み上げ時間',
    data: [
      { skill: 'React', value: 48 },
      { skill: 'NextJS', value: 12 },
      { skill: 'Ruby on Rails', value: 0.5 },
      { skill: 'Vercel', value: 0.5 },
      { skill: 'TypeScript', value: 12 },
    ]
  },
]