import React from 'react';
import router from 'next/router';
import Link from 'next/link';

export default function Custom404() {
  return (
    <div className='errorContainer'>
      <h1 className='flex flex-col'>
        <span className='errorBase errorCode'>404</span>
        <span className='errorBase errorMessage'>Not Found</span>
      </h1>
      <p>ページが見つかりません</p>
      <p>お探しのページは存在しないか、移動した可能性があります。</p>
      <div className='flex'>
        <Link href="/" legacyBehavior>
          <a className='errorLink'>ホームに戻る</a>
        </Link>
        <button onClick={() => router.back()} className='errorLink'>前のページに戻る</button>
      </div>
    </div>
  );
}
