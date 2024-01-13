import React from 'react';
import Link from 'next/link';
import styles from '../common/styles/Error.module.css';

export default function Custom500() {
  return (
    <div className={styles.container}>
      <h1 className={`${styles.error} ${styles.errorCode}`}>500</h1>
      <h1 className={`${styles.error} ${styles.errorMessage}`}>Internal Server Error</h1>
      <p>申し訳ありません。何らかの問題が発生しました。</p>
      <p>エラーが続く場合は、サイトの管理者に連絡して問題を報告してください。</p>
      <div className='flex'>
        <Link href="/" legacyBehavior>
          <a className={styles.link}>ホームに戻る</a>
        </Link>
        <a onClick={() => window.history.back()} className={styles.link}>前のページに戻る</a>
      </div>
    </div>
  );
}
