// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,   // 開発速度を改善するために Strict Mode を無効化
  swcMinify: true,          // SWC による圧縮を有効化

  // Webpack Dev Middleware 設定
  webpackDevMiddleware: (config) => {
    config.watchOptions = {
      poll: 1000,           // 1秒ごとにファイル変更を確認
      aggregateTimeout: 300 // ファイル変更のチェックまでの遅延
    };
    return config;
  },
};

// ESモジュールの構文を使ってエクスポート
export default nextConfig;
