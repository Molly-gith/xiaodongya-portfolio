import { Navigate, Route, Routes } from 'react-router-dom'
import { Portfolio } from './portfolio/Portfolio'
import { DemoPreview } from './demo/DemoPreview'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Portfolio />} />
      <Route path="/demo/dashboard" element={<DemoPreview />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
