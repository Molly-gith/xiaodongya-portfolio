import { Navigate, Route, Routes } from 'react-router-dom'
import { Portfolio } from './portfolio/Portfolio'
import { Hangxiaodong } from './portfolio/Hangxiaodong'
import { HangxiaodongStory } from './portfolio/HangxiaodongStory'
import { DemoApp } from './demo/DemoApp'
import { DemoProvider } from './store/DemoStore'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Portfolio />} />
      <Route path="/hangxiaodong" element={<HangxiaodongStory />} />
      <Route path="/hangxiaodong/technical" element={<Hangxiaodong />} />
      <Route path="/demo/*" element={<DemoProvider><DemoApp /></DemoProvider>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
