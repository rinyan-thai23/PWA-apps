const CACHE_NAME = 'wisper-rec-memo-v7';

// 即時アクティベート
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

// 古いキャッシュをすべて削除してクリーンアップ
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(keys.map((key) => caches.delete(key)));
    }).then(() => self.clients.claim())
  );
});

// 通信を一切ブロック・待機させず、ブラウザ標準のネットワークに安全に任せる
// （PWAインストール要件としてのfetchリスナーは満たしつつ、通信ハングを完全に防止）
self.addEventListener('fetch', (event) => {
  // 外部APIや通常通信をブロックしない
  return;
});
