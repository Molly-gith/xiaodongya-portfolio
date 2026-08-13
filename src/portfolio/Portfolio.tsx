import { useEffect, useState } from 'react'
import { Button, Drawer, Modal, Tag } from 'antd'
import {
  ArrowRightOutlined,
  CheckCircleFilled,
  CompassOutlined,
  MenuOutlined,
  PlayCircleOutlined,
  SafetyCertificateOutlined,
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { Logo } from '../components/Logo'
import { SectionTitle } from '../components/SectionTitle'

const nav = [
  ['overview', '项目概览'],
  ['architecture', '产品架构'],
  ['journey', '用户 Journey'],
  ['technology', '技术链路'],
  ['safety', '安全机制'],
  ['role', '我的工作'],
  ['reflection', '项目复盘'],
]

const visualCards = [
  {
    id: 'architecture', index: '02', eyebrow: 'SYSTEM ARCHITECTURE', title: '从用户入口到真实机器人执行',
    copy: '把小程序、AI 智能体、任务调度、机器人能力与运营后台组织为一条可观测、可干预的服务链路。',
    type: 'architecture', caption: '小东鸭整体产品架构图',
  },
  {
    id: 'journey', index: '03', eyebrow: 'USER JOURNEY', title: '用距离，而不是预约码，完成自然汇合',
    copy: '机器人与用户持续上报位置；双方距离 ≤ 10 米时自动判定汇合成功，并通过 TTS 发起行李确认。',
    type: 'journey', caption: '一键传唤用户 Journey / 状态流转图',
  },
  {
    id: 'technology', index: '04', eyebrow: 'AI × ROBOTICS', title: '理解、决策、执行与反馈形成闭环',
    copy: 'AI 负责理解与对话，空间定位和机器人控制负责把意图转换为真实世界中的移动与服务。',
    type: 'tech', caption: 'AI + 机器人技术链路图',
  },
  {
    id: 'safety', index: '05', eyebrow: 'SAFETY BY DESIGN', title: '把空间风险前置为产品规则',
    copy: 'ENTER 与 DWELL 覆盖区域风险；POINT 豁免停留告警；LOCK 独立于围栏，拥有全局最高优先级。',
    type: 'safety', caption: '电子围栏安全机制图',
  },
]

function ProductVisual({ type }: { type: string }) {
  if (type === 'architecture') return (
    <div className="product-visual architecture-visual">
      <div className="arch-node arch-node--source">杭小东小程序<br/><small>用户服务入口</small></div>
      <span className="flow-arrow">→</span>
      <div className="arch-node arch-node--ai">AI Agent<br/><small>意图理解 · 多轮对话</small></div>
      <span className="flow-arrow">→</span>
      <div className="arch-node arch-node--core">任务中枢<br/><small>校验 · 分配 · 状态机</small></div>
      <span className="flow-arrow">→</span>
      <div className="arch-node arch-node--robot">小东鸭机器人<br/><small>定位 · 导航 · TTS</small></div>
      <div className="arch-platform">运营管理平台 <span>监控</span><span>调度</span><span>素材</span><span>安全</span><span>告警</span></div>
    </div>
  )
  if (type === 'journey') return (
    <div className="product-visual journey-visual">
      {['发起传唤', '前往汇合点', '等待用户', '距离 ≤ 10m', '行李确认', '导航服务'].map((item, i) => (
        <div className={`journey-step ${i === 3 ? 'journey-step--active' : ''}`} key={item}>
          <span>{i + 1}</span><b>{item}</b>{i < 5 && <i />}
        </div>
      ))}
      <div className="distance-readout"><span>双方距离</span><b>25m</b><em>→</em><b>18m</b><em>→</em><b>12m</b><em>→</em><strong>8m</strong></div>
    </div>
  )
  if (type === 'tech') return (
    <div className="product-visual tech-visual">
      {[
        ['01', '语音交互', '唤醒 · ASR · TTS'], ['02', '智能决策', '意图 · 补全 · 兜底'],
        ['03', '空间感知', '定位 · 距离 · 围栏'], ['04', '机器人执行', '导航 · 暂停 · 完成'],
      ].map(([num, title, text]) => <div className="tech-cell" key={num}><span>{num}</span><b>{title}</b><small>{text}</small></div>)}
      <div className="tech-loop">实时状态回流</div>
    </div>
  )
  return (
    <div className="product-visual safety-visual">
      <div className="map-grid" />
      <div className="fence fence--low">LOW</div>
      <div className="fence fence--high">HIGH</div>
      <div className="safety-robot">鸭 <span>LOCK 全局事件</span></div>
      <div className="safety-rules"><b>ENTER</b><span>进入立即触发</span><b>DWELL</b><span>超时触发 · POINT 豁免</span></div>
    </div>
  )
}

export function Portfolio() {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [visual, setVisual] = useState<(typeof visualCards)[number] | null>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <div className="portfolio-shell">
      <nav className={`site-nav ${scrolled ? 'site-nav--scrolled' : ''}`}>
        <Logo />
        <div className="site-nav__links">
          {nav.map(([id, label]) => <button key={id} onClick={() => go(id)}>{label}</button>)}
        </div>
        <Button className="nav-demo" type="primary" onClick={() => navigate('/demo/dashboard')}>互动 Demo <ArrowRightOutlined /></Button>
        <Button className="nav-menu" icon={<MenuOutlined />} onClick={() => setMenuOpen(true)} aria-label="打开菜单" />
      </nav>

      <header className="hero" id="home">
        <div className="hero__orb hero__orb--one"/><div className="hero__orb hero__orb--two"/>
        <div className="hero__content">
          <div className="hero__badge"><span /> AI 产品经理 × 具身智能 × 机器人产品</div>
          <h1><span>小东鸭</span><small>杭州东站具身智能服务机器人</small></h1>
          <p>把“会回答问题”的 AI，<br/>延伸为“能在真实空间完成任务”的服务系统。</p>
          <div className="hero__actions">
            <Button type="primary" size="large" onClick={() => go('overview')}>查看完整 Case Study <ArrowRightOutlined /></Button>
            <Button size="large" icon={<PlayCircleOutlined />} onClick={() => navigate('/demo/dashboard')}>进入互动 Demo</Button>
          </div>
          <div className="hero__proof">
            <span><CheckCircleFilled /> 完整产品链路</span>
            <span><CheckCircleFilled /> 可交互运营 Demo</span>
            <span><CheckCircleFilled /> 全部数据已脱敏</span>
          </div>
        </div>
        <div className="hero__stage" aria-label="机器人服务系统示意">
          <div className="station-label">HANGZHOU EAST RAILWAY STATION <b>杭州东站</b></div>
          <div className="stage-grid" />
          <div className="route-line route-line--one"/><div className="route-line route-line--two"/>
          <div className="duck-bot">
            <div className="duck-bot__signal"><i/><i/><i/></div>
            <div className="duck-bot__head"><span/><b/></div>
            <div className="duck-bot__screen">服务中<small>路线引导</small></div>
            <div className="duck-bot__body"/>
          </div>
          <div className="stage-card stage-card--status"><span className="live-dot"/> XIAODONGYA 01<strong>在线 · 服务中</strong></div>
          <div className="stage-card stage-card--distance"><small>用户距离</small><strong>8.0 <i>m</i></strong><Tag color="blue">汇合成功</Tag></div>
          <div className="stage-card stage-card--task"><CompassOutlined /><span>当前任务<b>前往地铁入口</b></span></div>
        </div>
      </header>

      <main>
        <section className="overview section" id="overview">
          <SectionTitle index="01" eyebrow="PROJECT CONTEXT" title="当 AI 从屏幕走进真实空间" copy="在线智能体能够回答问题；但真实机器人要在拥挤、动态、不可预测的交通枢纽里，把一次对话变成一次可靠的服务。" />
          <div className="problem-grid">
            <div className="problem-lead"><span>核心挑战</span><h3>不是让机器人“更聪明”，<br/>而是让整个服务链路更可靠。</h3><p>大型交通枢纽中的机器人服务，同时受到用户、设备、网络和物理空间的约束。</p></div>
            <div className="reality-grid">{['位置', '状态', '任务', '用户', '硬件', '网络', '空间', '安全', '异常'].map((x, i) => <div key={x}><span>0{i + 1}</span>{x}</div>)}</div>
          </div>
          <div className="project-facts">
            <div><b>场景</b><span>大型交通枢纽</span></div><div><b>对象</b><span>旅客 · 机器人 · 运营人员</span></div><div><b>角色</b><span>AI 产品经理</span></div><div><b>交付</b><span>服务链路 + 运营安全系统</span></div>
          </div>
        </section>

        {visualCards.map((card, i) => (
          <section className={`case-section section ${i % 2 ? 'case-section--tint' : ''}`} id={card.id} key={card.id}>
            <SectionTitle index={card.index} eyebrow={card.eyebrow} title={card.title} copy={card.copy} />
            <button className="visual-frame" onClick={() => setVisual(card)} aria-label={`放大查看${card.caption}`}>
              <ProductVisual type={card.type} />
              <span className="visual-frame__caption"><b>{card.caption}</b><em>点击放大查看</em></span>
            </button>
            {card.type === 'journey' && <div className="rule-callout"><b>最新业务规则</b><span>持续获取机器人位置 + 用户位置</span><ArrowRightOutlined /><span>计算双方距离</span><ArrowRightOutlined /><strong>≤ 10m 自动汇合成功</strong><ArrowRightOutlined /><span>TTS 行李确认</span></div>}
          </section>
        ))}

        <section className="role-section section" id="role">
          <SectionTitle index="06" eyebrow="MY ROLE" title="我的角色：AI 产品经理" copy="从语音理解到空间执行，从用户流程到后台运营，负责让跨端、跨设备的服务体验成为一个完整产品。" />
          <div className="role-layout">
            <div className="role-core"><span>AI PRODUCT<br/>MANAGER</span><b>产品链路设计</b><b>跨团队协同</b><b>异常兜底策略</b></div>
            <div className="role-list">
              {[
                ['01', '语音交互流程', '唤醒 · ASR · 意图识别 · 多轮补全 · TTS · 打断 / 确认 / 兜底'],
                ['02', '杭小东一键传唤', '入口 · 状态校验 · 权限策略 · 汇合点 · 自动距离汇合 · 行李确认'],
                ['03', '机器人导航流程', '前往汇合点 · 汇合 · 导航 · 暂停 · 继续 · 提前结束 · 完成'],
                ['04', '异常兜底策略', '权限不足 · 位置异常 · 网络异常 · 繁忙 · 充电 · 离线 · 故障 · 失败'],
                ['05', '运营后台', '监控 · 调度 · 素材 · 电子围栏 · 告警日志 · 实时态势'],
              ].map(([n, title, copy]) => <div className="role-item" key={n}><span>{n}</span><div><b>{title}</b><p>{copy}</p></div></div>)}
            </div>
          </div>
        </section>

        <section className="demo-cta section">
          <div><Tag color="blue">INTERACTIVE DEMO</Tag><h2>不止浏览，亲手运行一次机器人服务</h2><p>进入运营后台，创建任务、观察机器人与用户距离缩短，并验证安全事件如何触发与恢复。</p></div>
          <Button type="primary" size="large" onClick={() => navigate('/demo/dashboard')}>进入互动 Demo <ArrowRightOutlined /></Button>
        </section>

        <section className="reflection section" id="reflection">
          <SectionTitle index="07" eyebrow="REFLECTION" title="真正的智能，发生在完整链路里" />
          <blockquote>具身智能产品的核心，并不是简单把大模型装进机器人，而是把语言理解、空间定位、设备状态、任务执行和安全机制组织成一条可靠的服务链路。</blockquote>
          <div className="reflection-grid"><div><span>01</span><b>AI 是链路的一部分</b><p>理解与对话必须与位置、设备和任务状态协同。</p></div><div><span>02</span><b>物理世界需要兜底</b><p>异常不是边缘情况，而是必须提前设计的主流程。</p></div><div><span>03</span><b>规模化依靠运营系统</b><p>多机器人运行离不开监控、调度与安全机制。</p></div></div>
        </section>
      </main>

      <footer><Logo inverse/><p>小东鸭｜具身智能服务机器人产品作品集</p><span>Sanitized & reconstructed · Mock data only</span></footer>

      <Drawer title="项目导航" open={menuOpen} onClose={() => setMenuOpen(false)} placement="right">
        <div className="mobile-nav">{nav.map(([id, label]) => <button key={id} onClick={() => go(id)}>{label}<ArrowRightOutlined /></button>)}</div>
      </Drawer>
      <Modal open={!!visual} footer={null} onCancel={() => setVisual(null)} width={1100} centered title={visual?.caption}>
        {visual && <div className="lightbox-content"><ProductVisual type={visual.type}/><p>{visual.copy}</p></div>}
      </Modal>
    </div>
  )
}
