# Skill Climbing

## 1. 目次
[1.目次](#1-目次)
[2.改訂履歴](#2-改訂履歴)
[3.前提条件](#3-前提条件)
[4.環境構築手順](#4-環境構築手順)
[5.環境別URL](#5-環境別url)

## 2. 改訂履歴
- 1.0
  - 作成日時
    - 2023/09/04
  - 更新内容
    - 初版作成
  - 更新者
    - [@mnmuu8](https://github.com/mnmuu8)

## 3. 前提条件
### React version
18.2.0

### NextJS version
13.4.3

### TypeScript version
5.0.4

## 4. 環境構築手順
1. リポジトリをローカルにcloneする
  - 以下コマンドを実行する。
    - `git clone git@github.com:mnmuu8/frontend_stack.git`
2. Dockerイメージの作成
  - 以下コマンドを実行する。
    - `make build`
3. Dockerネットワークの作成
  - 以下コマンドを実行する。
    - `docker network create stack_shared_network`
4. パッケージ群をインストールする。
   - `npm install`
5. Dockerコンテナを立ち上げる。
  - 以下コマンドを実行する。
    - `make up`
6. NextJSが立ち上がっているか確認する
  - 以下にアクセスする。
    - http://localhost:9000

## 5. 環境別URL

|  環境  |  URL  |
| ---- | ---- |
|  開発環境  |  http://localhost:9000  |
|  STG環境  |  なし  |
|  本番環境  |  https://skill-climbing-frontend.vercel.app/  |
