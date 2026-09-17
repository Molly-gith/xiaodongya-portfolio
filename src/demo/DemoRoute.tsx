import { DemoApp } from './DemoApp'
import { DemoProvider } from '../store/DemoStore'

export default function DemoRoute() {
  return <DemoProvider><DemoApp /></DemoProvider>
}
