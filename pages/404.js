import React from 'react';
import Link from 'next/link';
import styles from '../common/styles/Error.module.css';

export default function Custom404() {
  return (
    <div className={styles.container}>
      <h1 className={`${styles.error} ${styles.errorCode}`}>404</h1>
      <h1 className={`${styles.error} ${styles.errorMessage}`}>Not Found</h1>
      <p>ページが見つかりません</p>
      <p>お探しのページは存在しないか、移動した可能性があります。</p>
      <div className='flex'>
        <Link href="/" legacyBehavior>
          <a className={styles.link}>ホームに戻る</a>
        </Link>
        <a onClick={() => window.history.back()} className={styles.link}>前のページに戻る</a>
      </div>
    </div>
  );
}
