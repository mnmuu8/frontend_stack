import { Skill, IntrospectionProps } from "./types/types"

export type StackListProps = {
  id: number;
  title: string;
  minutes: number;
  skill: Skill;
  description: string;
  introspection?: IntrospectionProps[];
  stacked_at: string;
  created_at: string;
  updated_at: string;
}

export const stackList = [
  {
    id: 1,
    title: '【実務でもよく使う】SQS × Lamda × EventBridgeで実現する非同期&バッチ処理の基本1',
    minutes: 8,
    skill: { id: 1, name: 'Rails'},
    description: '【実務でもよく使う】SQS × Lamda × EventBridgeで実現する非同期&バッチ処理の基本',
    introspection: [
      {
        id: 1,
        stack_id: 1, 
        evaluation: 80,
        reason: 'Reactの学習時間を十分に取得できたのでこの点数です。',
        keep_contents: [
          {
            id: "1",
            content: 'Reactの学習をこのまま継続していく',
            created_at: '2023-01-01T00:00:00+09:00',
            updated_at: '2023-01-01T00:00:00+09:00',
          },
          {
            id: "2",
            content: '1日5時間の学習を確保してReactを定着させる',
            created_at: '2023-01-01T00:00:00+09:00',
            updated_at: '2023-01-01T00:00:00+09:00',
          },
        ],
        problem_contents: [
          {
            id: "1",
            content: 'NextJSの学習時間が少なかった',
            created_at: '2023-01-01T00:00:00+09:00',
            updated_at: '2023-01-01T00:00:00+09:00',
          },
          {
            id: "2",
            content: 'Reactの教材学習に時間をかけすぎてしまっている',
            created_at: '2023-01-01T00:00:00+09:00',
            updated_at: '2023-01-01T00:00:00+09:00',
          },
        ],
        try_contents: [
          {
            id: "1",
            content: 'NextJSの教材も来月2冊やる',
            created_at: '2023-01-01T00:00:00+09:00',
            updated_at: '2023-01-01T00:00:00+09:00',
          },
        ],
      },
      {
        id: 2,
        stack_id: 1, 
        evaluation: 80,
        reason: 'Railsの学習時間を十分に取得できたのでこの点数です。',
        keep_contents: [
          {
            id: "1",
            content: 'Railsの学習をこのまま継続していく',
            created_at: '2023-01-01T00:00:00+09:00',
            updated_at: '2023-01-01T00:00:00+09:00',
          },
          {
            id: "2",
            content: '1日5時間の学習を確保してRailsを定着させる',
            created_at: '2023-01-01T00:00:00+09:00',
            updated_at: '2023-01-01T00:00:00+09:00',
          },
        ],
        problem_contents: [
          {
            id: "1",
            content: 'TypeScriptの学習時間が少なかった',
            created_at: '2023-01-01T00:00:00+09:00',
            updated_at: '2023-01-01T00:00:00+09:00',
          },
          {
            id: "2",
            content: 'Railsの教材学習に時間をかけすぎてしまっている',
            created_at: '2023-01-01T00:00:00+09:00',
            updated_at: '2023-01-01T00:00:00+09:00',
          },
        ],
        try_contents: [
          {
            id: "1",
            content: 'TypeScriptの教材も来月2冊やる',
            created_at: '2023-01-01T00:00:00+09:00',
            updated_at: '2023-01-01T00:00:00+09:00',
          },
        ],
      }
    ],
    stacked_at: '2023-01-01T00:00:00+09:00',
    created_at: '2023-01-01T00:00:00+09:00',
    updated_at: '2023-01-01T00:00:00+09:00',
  },
  {
    id: 2,
    title: '【実務でもよく使う】SQS × Lamda × EventBridgeで実現する非同期&バッチ処理の基本2',
    minutes: 8,
    skill: { id: 1, name: 'Rails'},
    description: '【実務でもよく使う】SQS × Lamda × EventBridgeで実現する非同期&バッチ処理の基本',
    stacked_at: '2023-01-01T00:00:00+09:00',
    created_at: '2023-01-01T00:00:00+09:00',
    updated_at: '2023-01-01T00:00:00+09:00',
  },
  {
    id: 3,
    title: '【実務でもよく使う】SQS × Lamda × EventBridgeで実現する非同期&バッチ処理の基本3',
    minutes: 8,
    skill: { id: 1, name: 'Rails'},
    description: '【実務でもよく使う】SQS × Lamda × EventBridgeで実現する非同期&バッチ処理の基本',
    stacked_at: '2023-01-01T00:00:00+09:00',
    created_at: '2023-01-01T00:00:00+09:00',
    updated_at: '2023-01-01T00:00:00+09:00',
  },
  {
    id: 4,
    title: '【実務でもよく使う】SQS × Lamda × EventBridgeで実現する非同期&バッチ処理の基本4',
    minutes: 8,
    skill: { id: 1, name: 'Rails'},
    description: '【実務でもよく使う】SQS × Lamda × EventBridgeで実現する非同期&バッチ処理の基本',
    stacked_at: '2023-01-01T00:00:00+09:00',
    created_at: '2023-01-01T00:00:00+09:00',
    updated_at: '2023-01-01T00:00:00+09:00',
  },
  {
    id: 5,
    title: '【実務でもよく使う】SQS × Lamda × EventBridgeで実現する非同期&バッチ処理の基本5',
    minutes: 8,
    skill: { id: 1, name: 'Rails'},
    description: '【実務でもよく使う】SQS × Lamda × EventBridgeで実現する非同期&バッチ処理の基本',
    stacked_at: '2023-01-01T00:00:00+09:00',
    created_at: '2023-01-01T00:00:00+09:00',
    updated_at: '2023-01-01T00:00:00+09:00',
  },
  {
    id: 6,
    title: '【実務でもよく使う】SQS × Lamda × EventBridgeで実現する非同期&バッチ処理の基本6',
    minutes: 8,
    skill: { id: 1, name: 'Rails'},
    description: '【実務でもよく使う】SQS × Lamda × EventBridgeで実現する非同期&バッチ処理の基本',
    stacked_at: '2023-01-01T00:00:00+09:00',
    created_at: '2023-01-01T00:00:00+09:00',
    updated_at: '2023-01-01T00:00:00+09:00',
  },
  {
    id: 7,
    title: '【実務でもよく使う】SQS × Lamda × EventBridgeで実現する非同期&バッチ処理の基本7',
    minutes: 8,
    skill: { id: 1, name: 'Rails'},
    description: '【実務でもよく使う】SQS × Lamda × EventBridgeで実現する非同期&バッチ処理の基本',
    stacked_at: '2023-01-01T00:00:00+09:00',
    created_at: '2023-01-01T00:00:00+09:00',
    updated_at: '2023-01-01T00:00:00+09:00',
  },
  {
    id: 8,
    title: '【実務でもよく使う】SQS × Lamda × EventBridgeで実現する非同期&バッチ処理の基本8',
    minutes: 8,
    skill: { id: 1, name: 'Rails'},
    description: '【実務でもよく使う】SQS × Lamda × EventBridgeで実現する非同期&バッチ処理の基本',
    stacked_at: '2023-01-01T00:00:00+09:00',
    created_at: '2023-01-01T00:00:00+09:00',
    updated_at: '2023-01-01T00:00:00+09:00',
  },
  {
    id: 9,
    title: '【実務でもよく使う】SQS × Lamda × EventBridgeで実現する非同期&バッチ処理の基本9',
    minutes: 8,
    skill: { id: 1, name: 'Rails'},
    description: '【実務でもよく使う】SQS × Lamda × EventBridgeで実現する非同期&バッチ処理の基本',
    stacked_at: '2023-01-01T00:00:00+09:00',
    created_at: '2023-01-01T00:00:00+09:00',
    updated_at: '2023-01-01T00:00:00+09:00',
  },
  {
    id: 10,
    title: '【実務でもよく使う】SQS × Lamda × EventBridgeで実現する非同期&バッチ処理の基本10',
    minutes: 8,
    skill: { id: 1, name: 'Rails'},
    description: '【実務でもよく使う】SQS × Lamda × EventBridgeで実現する非同期&バッチ処理の基本',
    stacked_at: '2023-01-01T00:00:00+09:00',
    created_at: '2023-01-01T00:00:00+09:00',
    updated_at: '2023-01-01T00:00:00+09:00',
  },
]

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