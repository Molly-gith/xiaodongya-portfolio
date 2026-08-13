import { Button, Tag } from 'antd'
import { ArrowLeftOutlined, RightOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { Logo } from '../components/Logo'

export function DemoPreview() {
  const navigate = useNavigate()
  return (
    <main className="demo-preview">
      <div className="demo-preview__top">
        <Logo />
        <Tag color="blue">第 2 轮交付</Tag>
      </div>
      <section className="demo-preview__card">
        <div className="demo-preview__visual">
          <span className="radar radar--one" />
          <span className="radar radar--two" />
          <span className="robot-dot robot-dot--one">1</span>
          <span className="robot-dot robot-dot--two">2</span>
          <span className="robot-dot robot-dot--three">3</span>
        </div>
        <div>
          <span className="eyebrow">INTERACTIVE OPERATIONS DEMO</span>
          <h1>互动运营后台正在下一轮接入</h1>
          <p>任务状态机、10 米自动汇合、安全告警与多机器人联动将在第 2/3 轮完整实现。</p>
          <div className="button-row">
            <Button icon={<ArrowLeftOutlined />} onClick={() => navigate('/')}>返回作品集</Button>
            <Button type="primary" disabled>运营驾驶舱 <RightOutlined /></Button>
          </div>
        </div>
      </section>
    </main>
  )
}
