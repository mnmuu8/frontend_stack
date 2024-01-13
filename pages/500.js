import React from 'react';
import router from 'next/router';
import Link from 'next/link';
import styles from '../common/styles/Error.module.css';

export default function Custom500() {
  return (
    <div className={styles.container}>
      <h1 className='flex flex-col'>
        <span className={`${styles.error} ${styles.errorCode}`}>500</span>
        <span className={`${styles.error} ${styles.errorMessage}`}>Internal Server Error</span>
      </h1>
      <p>申し訳ありません。何らかの問題が発生しました。</p>
      <p>エラーが続く場合は、サイトの管理者に連絡して問題を報告してください。</p>
      <div className='flex'>
        <Link href="/" legacyBehavior>
          <a className={styles.link}>ホームに戻る</a>
        </Link>
        <button onClick={() => router.back()} className={styles.link}>前のページに戻る</button>
      </div>
    </div>
  );
}
