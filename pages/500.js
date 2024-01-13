import React from 'react';
import router from 'next/router';
import Link from 'next/link';

export default function Custom500() {
  return (
    <div className='errorContainer'>
      <h1 className='flex flex-col'>
        <span className='errorBase errorCode'>500</span>
        <span className='errorBase errorMessage'>Internal Server Error</span>
      </h1>
      <p>申し訳ありません。何らかの問題が発生しました。</p>
      <p>エラーが続く場合は、サイトの管理者に連絡して問題を報告してください。</p>
      <div className='flex'>
        <Link href="/" legacyBehavior>
        <a className='errorLink'>ホームに戻る</a>
        </Link>
        <button onClick={() => router.back()} className='errorLink'>前のページに戻る</button>
      </div>
    </div>
  );
}
