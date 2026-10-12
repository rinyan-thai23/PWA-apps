const CACHE_NAME = 'wisper-rec-memo-v5';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png',
  './icons/favicon-32.png',
  './icons/favicon.ico'
];

// インストール時に静的アセットを事前キャッシュ
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// アクティベーション時に古いキャッシュを即座に削除
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// リクエスト取得処理: Stale-While-Revalidate 戦略 (爆速表示 + バックグラウンド更新)
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Groq APIなどの外部APIはService Workerを経由せず直接ネットワークへ
  if (url.origin !== self.location.origin) {
    return;
  }

  // POSTメソッド等の非GETリクエストはそのままネットワークへ
  if (event.request.method !== 'GET') {
    return;
  }

  // ナビゲーション（HTMLページ自体の読み込み/更新）の場合
  if (event.request.mode === 'navigate') {
    event.respondWith(
      caches.match('./index.html').then((cached) => {
        // バックグラウンドで最新のHTMLを取得してキャッシュ更新
        const fetchPromise = fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const clone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put('./index.html', clone));
          }
          return networkResponse;
        }).catch(() => null);

        // キャッシュがあれば待たずに即時返却！なければネットワークを待つ
        return cached || fetchPromise;
      })
    );
    return;
  }

  // その他の静的アセット（画像、マニフェスト等）: Stale-While-Revalidate
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // バックグラウンドでネットワークフェッチ＆キャッシュ更新
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => null);

      // キャッシュがあれば即時返却してリロードの待機時間をゼロにする
      return cachedResponse || fetchPromise;
    })
  );
});
