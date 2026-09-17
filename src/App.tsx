import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Portfolio } from './portfolio/Portfolio'
import { HangxiaodongStory } from './portfolio/HangxiaodongStory'

const Hangxiaodong = lazy(() => import('./portfolio/Hangxiaodong').then(module => ({ default: module.Hangxiaodong })))
const DemoRoute = lazy(() => import('./demo/DemoRoute'))

export default function App() {
  return (
    <Suspense fallback={<p className="portfolio-route-loading" role="status">正在打开页面…</p>}><Routes>
      <Route path="/" element={<Portfolio />} />
      <Route path="/hangxiaodong" element={<HangxiaodongStory />} />
      <Route path="/hangxiaodong/technical" element={<Hangxiaodong />} />
      <Route path="/demo/*" element={<DemoRoute />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes></Suspense>
  )
}
