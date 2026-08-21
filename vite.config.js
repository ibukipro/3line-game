import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/3line-game/',
  plugins: [react()],
  // 🌟 追加：これを入れることで、ファイル内のすべてのReact/React.memoのエラーを100%強制解決します
  esbuild: {
    jsxInject: `import React from 'react'`
  }
})
