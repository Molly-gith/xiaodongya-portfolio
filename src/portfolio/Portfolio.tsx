import { useEffect, type ReactNode } from 'react'
import { Image } from 'antd'
import { ArrowLeftOutlined, ArrowRightOutlined, RobotOutlined } from '@ant-design/icons'
import { Link, useLocation } from 'react-router-dom'
import './hangxiaodong-editorial.css'
import './xiaodongya-editorial.css'

const asset = (folder: string, name: string) => `${import.meta.env.BASE_URL}assets/${folder}/${name}`
const dailyReport = 'https://hznews.hangzhou.com.cn/chengshi/content/2026-04/30/content_9214811.htm'
const toutiaoReport = 'https://www.toutiao.com/article/7652359359606948378/'
const chapters = [
  ['overview', '项目背景'], ['architecture', '产品架构'], ['journey', '一键传唤'],
  ['technology', '语音与执行'], ['safety', '安全机制'], ['role', '我的工作'], ['coverage', '上线与报道'], ['reflection', '我学到的'],
]

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return <section id={id} tabIndex={-1} className="hh-section"><h2>{title}</h2>{children}</section>
}

function Diagram({ file, title }: { file: string; title: string }) {
  return <figure className="xd-diagram">
    <Image src={asset('portfolio', file)} alt={title} width="100%" loading="lazy" preview={{ mask: '放大查看' }} />
    <figcaption><span>{title}</span><span>点击查看完整图</span></figcaption>
  </figure>
}

export function Portfolio() {
  const location = useLocation()
  useEffect(() => {
    const oldTitle = document.title
    document.title = '小东鸭｜AI 产品经理作品集'
    return () => { document.title = oldTitle }
  }, [])
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const id = location.hash.slice(1)
      if (!id) { window.scrollTo({ top: 0, behavior: 'instant' }); return }
      const target = document.getElementById(id)
      target?.scrollIntoView({ behavior: 'instant' })
      target?.focus({ preventScroll: true })
    })
    return () => cancelAnimationFrame(frame)
  }, [location.hash, location.key])

  return <div className="hh-page xd-page">
    <Link className="hh-skip" to="/#overview">跳到案例正文</Link>
    <header className="hh-header"><div className="hh-container">
      <Link className="hh-brand" to="/">产品作品集</Link>
      <nav aria-label="作品集导航"><Link to="/" aria-current="page">小东鸭</Link><Link to="/hangxiaodong">杭小东</Link><Link to="/demo/dashboard">管理后台演示</Link></nav>
    </div></header>
    <main>
      <div className="hh-container hh-intro" id="home">
        <Link className="hh-back" to="/hangxiaodong"><ArrowLeftOutlined /> 杭小东案例</Link>
        <div className="hh-cover">
          <div className="hh-cover-grid" />
          <div className="hh-cover-brand"><span><RobotOutlined /></span><b>小东鸭</b></div>
          <div className="hh-cover-shade" />
          <div className="hh-cover-phones">
            <img src={asset('xiaodongya', 'robot-onsite.png')} alt="杭州东站内的小东鸭机器人实拍" width="720" height="960" fetchPriority="high" />
            <img src={asset('hangxiaodong', 'robot-map.png')} alt="小东鸭位置、可用状态与召唤界面" width="1206" height="2622" />
          </div>
          <span className="hh-cover-label">已上线 · 现场对话 · 一键传唤</span>
        </div>
        <section className="hh-identity" aria-label="项目介绍">
          <p className="hh-label">小东鸭 · AI 产品经理</p>
          <h1>杭州东站具身智能服务机器人</h1>
          <p className="hh-meta">2026 年 5 月 1 日上线 · 跨端服务设计 · 机器人联动</p>
          <p className="hh-summary">在杭州东站，旅客可以直接与小东鸭对话，也可以通过杭小东小程序一键传唤，获得路线引导与行李辅助。我负责语音交互、传唤与导航流程、异常兜底和运营后台的产品设计。</p>
          <ul className="hh-tags" aria-label="项目标签">{['AI 产品', '具身智能', '交通枢纽', '一键传唤', '已上线'].map(tag => <li key={tag}>{tag}</li>)}</ul>
          <div className="hh-links"><Link to="/#experience">到站如何体验 <ArrowRightOutlined /></Link><a href={dailyReport} target="_blank" rel="noreferrer">阅读杭州日报报道 <ArrowRightOutlined /></a></div>
        </section>
      </div>

      <article className="hh-article">
        <section className="hh-constraints xd-deliverables" aria-label="上线进展">
          <p className="hh-label">上线进展 · IN SERVICE</p>
          <div>{[
            ['5 月 1 日', '2026 年正式上线'], ['2 台', '杭州东站已投入服务'],
            ['至少 6 台', '未来计划总规模'], ['媒体报道', '杭州日报等公开报道'],
          ].map(([title,copy]) => <div key={title}><strong>{title}</strong><p>{copy}</p></div>)}</div>
          <p className="hh-note xd-progress-note">截至 2026 年 9 月，已上线 2 台；至少 6 台为后续规划，尚未全部投用。</p>
        </section>
        <nav className="xd-chapters" aria-label="案例章节">{chapters.map(([id,label]) => <Link key={id} to={`/#${id}`}>{label}</Link>)}</nav>

        <Section id="overview" title="让旅客问完路，也有人带着走">
          <p>在杭州东站，旅客可能一边找上车点，一边拖着行李。小东鸭将问询、带路和行李辅助放在同一次服务中，连接手机上的服务入口与站内的真实机器人。</p>
          <figure className="xd-photo"><Image src={asset('xiaodongya', 'station-service.jpg')} alt="杭州东站杭小东服务展示区前的小东鸭机器人" width="100%" loading="lazy" preview={{ mask: '查看现场原图' }} /><figcaption>杭州东站现场：杭小东服务入口与小东鸭机器人。</figcaption></figure>
          <h3>现场直接对话，也能从手机发起传唤</h3>
          <p>旅客在站内遇见小东鸭时，可以直接开口问路、请求带路；需要机器人过来时，则通过杭小东小程序一键传唤。两种入口分别承接现场即时需求与主动呼叫需求。</p>
          <div className="hh-table"><table><caption className="hh-sr">参与对象与产品要解决的问题</caption><thead><tr><th scope="col">服务对象</th><th scope="col">产品要解决的问题</th></tr></thead><tbody>
            <tr><th scope="row">旅客</th><td>从哪里呼叫机器人、在哪里汇合，以及如何开始或结束服务。</td></tr>
            <tr><th scope="row">机器人</th><td>当前能否接单、下一步去哪里，以及遇到异常时如何反馈。</td></tr>
            <tr><th scope="row">运营人员</th><td>查看运行状态、调度任务，并处理空间安全和设备告警。</td></tr>
          </tbody></table></div>
          <Image.PreviewGroup><div className="hh-screens xd-product-screens">{[
            ['home.png', '从杭小东进入服务', '旅客通过小程序入口找到机器人服务。'],
            ['robot-map.png', '查看状态，发起召唤', '地图呈现机器人位置与可用状态，提供召唤入口。'],
          ].map(([file,title,copy]) => <figure key={file}><div className="hh-screen"><Image src={asset('hangxiaodong',file)} alt={title} width="100%" loading="lazy" preview={{mask:'查看原图'}} /></div><figcaption><h3>{title}</h3><p>{copy}</p></figcaption></figure>)}</div></Image.PreviewGroup>
          <p className="hh-note">以上为现场照片与真实产品界面；下方流程图为作品集整理。</p>
        </Section>

        <Section id="architecture" title="从用户入口到机器人执行">
          <p>用户从杭小东小程序或机器人现场对话发起请求，AI 负责理解与对话，任务中枢完成校验、分配与状态流转，机器人执行移动和服务。运营后台让这条链路可查看、可调度、可干预。</p>
          <Diagram file="architecture.png" title="小东鸭整体产品架构" />
        </Section>

        <Section id="journey" title="一键传唤后，如何与旅客汇合">
          <p>系统按产品规则安排汇合点，并告知旅客前往，无需手动选择。汇合后，机器人确认行李需求，再开始带路服务。</p>
          <Diagram file="journey-simple-v3.png" title="一键传唤流程与状态流转" />
        </Section>

        <Section id="technology" title="说出目的地，衔接带路与行李辅助">
          <p>旅客问“6 号网约车上客区怎么走”，机器人回应带路，并确认是否需要搬运行李。产品把地点问询衔接到下一步服务，同时在屏幕上呈现聆听状态与打断方式。</p>
          <Image.PreviewGroup><div className="xd-voice-screens">{[
            ['voice-navigation.png', '中文问路与行李确认', '识别目的地后衔接带路，并确认行李需求。'],
            ['voice-english.jpg', '英文问询与信息返回', '实拍界面展示上车点距离、排队人数与预计等待时间。'],
          ].map(([file,title,copy]) => <figure className="xd-photo" key={file}><Image src={asset('xiaodongya',file)} alt={title} width="100%" loading="lazy" preview={{mask:'查看对话原图'}} /><figcaption><h3>{title}</h3><p>{copy}</p></figcaption></figure>)}</div></Image.PreviewGroup>
          <p className="hh-note">截图展示的是当时小东鸭机器人屏幕的对话内容与状态。</p>
          <Diagram file="tech-chain-inputs-v3.png" title="AI 与机器人技术链路" />
        </Section>

        <Section id="safety" title="将空间风险落实为产品规则">
          <p>通过电子围栏、停留超时告警与全局锁定，让运营人员及时发现空间风险并介入处理。</p>
          <Diagram file="geofence-safety.png" title="电子围栏与安全机制" />
        </Section>

        <Section id="role" title="我负责的产品工作">
          <p>我负责语音交互、一键传唤与导航、异常处理和运营后台的产品设计，并协同研发推进联调与验收。</p>
          <Diagram file="my-role.png" title="我的工作与职责范围" />
        </Section>

        <Section id="coverage" title="从正式上线，到被看见的站内服务">
          <p>从五一前的试运行，到记者实地探访与旅客使用反馈，公开报道记录了小东鸭在杭州东站的落地过程。</p>
          <div className="xd-press-links">
            <a href={dailyReport} target="_blank" rel="noreferrer"><span>杭州日报 · 2026.04.30</span><strong>五一前试运行与投用计划 <ArrowRightOutlined /></strong></a>
            <a href={toutiaoReport} target="_blank" rel="noreferrer"><span>今日头条</span><strong>小东鸭相关报道 <ArrowRightOutlined /></strong></a>
          </div>
          <Image.PreviewGroup><div className="xd-press-screens">{[
            ['press-dushi.png', '都市快报 · 橙柿互动', '2026.07.25 · 旅客使用与记者实地探访'],
            ['press-chengtou.png', '杭州城投资产集团', '2026.08.25 · 项目落地故事'],
          ].map(([file,title,copy]) => <figure key={file}><Image src={asset('xiaodongya',file)} alt={`${title}报道截图`} width="100%" loading="lazy" preview={{mask:'查看报道截图'}} /><figcaption><h3>{title}</h3><p>{copy}</p></figcaption></figure>)}</div></Image.PreviewGroup>
        </Section>

        <Section id="reflection" title="我学到的">
          <div className="hh-cards">{[
            ['AI 要与位置、设备和任务状态协同', '理解用户只是服务的起点。语言理解、空间定位、设备状态、任务执行和反馈需要共同支撑完整体验。'],
            ['物理空间里的服务，需要提前设计兜底', '将权限、定位、网络与设备异常纳入流程，明确每种状态下用户能做什么、运营如何介入。'],
            ['持续运行需要运营系统支撑', '多机器人服务需要监控、调度与安全机制，才能让一线人员掌握运行情况并处理问题。'],
          ].map(([title,copy]) => <div className="hh-card" key={title}><h3>{title}</h3><p>{copy}</p></div>)}</div>
        </Section>

        <section id="experience" tabIndex={-1} className="hh-cta xd-experience"><div><h2>下次到杭州东站，体验小东鸭</h2><p>在站内遇见小东鸭时，可直接说“小东小东”，告诉它你想去哪里；也可以打开杭小东小程序，进入“呼叫机器人”，查看可用状态并发起一键传唤。</p><p>机器人带路与行李辅助需在杭州东站现场体验，以当时的设备状态和服务范围为准。</p></div><Link to="/#journey">查看一键传唤流程 <ArrowRightOutlined /></Link></section>
        <aside id="demo" className="xd-admin-note"><h3>管理后台演示</h3><p>展示运营人员如何查看设备、调度任务与处理告警，使用演示数据。</p><Link to="/demo/dashboard">查看管理后台演示 <ArrowRightOutlined /></Link></aside>
        <Link className="hh-inline-link xd-next" to="/hangxiaodong">继续查看杭小东案例 <ArrowRightOutlined /></Link>
      </article>
    </main>
    <footer className="hh-footer">小东鸭 · AI 产品经理作品集</footer>
  </div>
}
