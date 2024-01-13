import React from 'react';
import router from 'next/router';
import Link from 'next/link';
import styles from '../common/styles/Error.module.css';

export default function Custom404() {
  return (
    <div className={styles.container}>
      <h1 className='flex flex-col'>
        <span className={`${styles.error} ${styles.errorCode}`}>404</span>
        <span className={`${styles.error} ${styles.errorMessage}`}>Not Found</span>
      </h1>
      <p>ページが見つかりません</p>
      <p>お探しのページは存在しないか、移動した可能性があります。</p>
      <div className='flex'>
        <Link href="/" legacyBehavior>
          <a className={styles.link}>ホームに戻る</a>
        </Link>
        <button onClick={() => router.back()} className={styles.link}>前のページに戻る</button>
      </div>
    </div>
  );
}
