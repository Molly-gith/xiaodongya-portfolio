import { useEffect, type ReactNode } from 'react'
import { Image } from 'antd'
import { PortfolioImage, thumbnail } from './PortfolioImage'
import { usePortfolioReveal } from './usePortfolioReveal'
import { Link, useLocation } from 'react-router-dom'
import { ArrowLeftOutlined, ArrowRightOutlined, EnvironmentOutlined } from '@ant-design/icons'
import './hangxiaodong-editorial.css'

const asset = (name: string) => `${import.meta.env.BASE_URL}assets/hangxiaodong/${name}`
const aliases: Record<string, string> = { product: 'overview', problem: 'scenarios', background: 'scenarios', users: 'scenarios', journey: 'scenarios', role: 'overview', 'my-role': 'overview', contribution: 'overview', analysis: 'scenarios', solution: 'scenarios', actions: 'screens', decisions: 'ai', technology: 'ai', architecture: 'ai', iteration: 'evaluation', outcome: 'results', reflection: 'learning' }
const screens = [
  ['home.png', '提问或直达服务', '保留对话与常用入口。需求明确时直接点击，描述不清时自然语言提问。'],
  ['city-services.png', '按需求组织商业服务', '餐饮、便利店、住宿与寄存分类呈现，让旅客先找到需要的服务类型。'],
  ['robot-map.png', '先看状态，再召唤', '地图同时显示位置与可用状态，帮助旅客判断能否发起机器人服务。'],
  ['tourism-routes.png', '先选路线，再伴游', '用时长、里程和景点信息支持行程选择，再衔接 AI 伴游入口。'],
]
function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return <section id={id} tabIndex={-1} className="hh-section"><h2>{title}</h2>{children}</section>
}
function Cards({ items }: { items: string[][] }) {
  return <div className="hh-cards">{items.map(([title, copy]) => <div className="hh-card" key={title}><h3>{title}</h3><p>{copy}</p></div>)}</div>
}
export function HangxiaodongStory() {
  const location = useLocation()
  usePortfolioReveal()
  useEffect(() => { const old = document.title; document.title = '杭小东｜AI 产品经理作品集'; return () => { document.title = old } }, [])
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const hash = location.hash.slice(1)
      if (!hash) { window.scrollTo({ top: 0, behavior: 'instant' }); return }
      const target = document.getElementById(aliases[hash] || hash)
      target?.scrollIntoView({ behavior: 'instant' }); target?.focus({ preventScroll: true })
    })
    return () => cancelAnimationFrame(frame)
  }, [location.hash, location.key])
  return <div className="hh-page">
    <Link className="hh-skip" to="/hangxiaodong#scenarios">跳到案例正文</Link>
    <header className="hh-header"><div className="hh-container"><Link className="hh-brand" to="/">产品作品集</Link><nav aria-label="作品集导航"><Link to="/">小东鸭</Link><Link to="/hangxiaodong" aria-current="page">杭小东</Link><Link to="/hangxiaodong/technical">技术详情</Link></nav></div></header>
    <main>
      <div className="hh-container hh-intro">
        <Link className="hh-back" to="/"><ArrowLeftOutlined /> 返回项目列表</Link>
        <div className="hh-cover">
          <div className="hh-cover-grid" />
          <div className="hh-cover-brand"><span><EnvironmentOutlined /></span><b>杭小东</b></div>
          <div className="hh-cover-shade" />
          <div className="hh-cover-phones"><img decoding="async" src={thumbnail(asset('home.png'))} alt="杭小东首页" width="1206" height="2622" fetchPriority="high" /><img decoding="async" src={thumbnail(asset('tourism-routes.png'))} alt="杭小忆路线推荐" width="1206" height="2622" /></div>
          <span className="hh-cover-label">AI 服务 · 微信 / 支付宝小程序 · 已上线</span>
        </div>
        <section id="overview" tabIndex={-1} className="hh-identity">
          <p className="hh-label">杭小东 · AI 产品经理</p>
          <h1>杭州东站 AI 智能服务助手</h1>
          <p className="hh-meta">主导业务场景拓展与产品迭代 · 多智能体服务</p>
          <p className="hh-summary">帮助旅客找设施、选商户、乘车、呼叫机器人与安排杭州行程。我负责需求范围、业务机制、交互与测试验收，协同研发、算法和设计推进上线。</p>
          <ul className="hh-tags" aria-label="项目标签">{['AI Agent', '交通枢纽', '小程序', '产品迭代', '已上线'].map(tag => <li key={tag}>{tag}</li>)}</ul>
          <div className="hh-links"><Link to="/hangxiaodong#experience">体验杭小东 <ArrowRightOutlined /></Link><Link to="/hangxiaodong#screens">查看产品界面 <ArrowRightOutlined /></Link></div>
        </section>
      </div>
      <article className="hh-article">
        <section id="results" tabIndex={-1} className="hh-constraints hh-results" aria-label="项目成果">
          <p className="hh-label">项目成果 · OUTCOMES</p>
          <div>{[['3万+', '月去重访问人数'], ['约94.8%', '意图识别测试集准确率'], ['9,300+', '首周有效问询'], ['综合服务', '设施问询 → 商业、机器人与文旅']].map(([title,copy]) => <div key={title}><strong>{title}</strong><p>{copy}</p></div>)}</div>
          <details className="hh-evidence"><summary>查看指标口径</summary><p>识别准确率基于约 1,000 条测试集；访问人数与问询次数是独立的线上使用指标，不代表任务完成率，也不直接归因于某个新增功能。月访问数来自项目经历陈述，统计月份及跨平台去重方式尚待核对。</p></details>
        </section>
        <Section id="scenarios" title="用户问题与产品范围">
          <p>原有杭小东主要基于站内设施知识库回答问题。我主导本轮迭代，保留基础问询与导航，将服务拓展到商业、交通、机器人和文旅。</p>
          <div className="hh-table"><table><caption className="hh-sr">旅客问题与本轮服务范围</caption><thead><tr><th scope="col">旅客的问题</th><th scope="col">杭小东提供的服务</th></tr></thead><tbody>{[
            ['卫生间、饮水处在哪里，怎么过去？', '设施查询与站内导航。'],
            ['附近哪里有咖啡店、餐饮或便利店？', '按距离由近到远返回商户信息，每个商户旁提供导航前往按钮。'],
            ['去哪坐网约车，我叫的车到了吗？', '区分上车点查询与指定车辆查询，分别返回候车信息或车辆状态。'],
            ['怎么找到并使用小东鸭机器人？', '在地图上查看机器人位置、可用状态并发起召唤。'],
            ['到杭州以后怎么玩，路线怎么安排？', '对接杭小忆，提供游玩路线与伴游入口。'],
          ].map(([name,why]) => <tr key={name}><th scope="row">{name}</th><td>{why}</td></tr>)}</tbody></table></div>
          <p className="hh-note">文旅 A2A 对接与小东鸭一键传唤，是我在整体迭代中从 0 到 1 主导并上线的两项工作。</p>
        </Section>
        <Section id="screens" title="让服务出现在用户需要的地方">
          <p className="hh-screen-intro">四张真实界面，分别承接进入、选择与操作。点击可查看完整原图。</p>
          <Image.PreviewGroup><div className="hh-screens">{screens.map(([file,title,copy]) => <figure key={file}><div className="hh-screen"><PortfolioImage variant="480" src={asset(file)} alt={title} width="100%" loading="lazy" preview={{mask:'查看原图'}} /></div><figcaption><h3>{title}</h3><p>{copy}</p></figcaption></figure>)}</div></Image.PreviewGroup>
        </Section>
        <Section id="recommendation" title="赶时间的旅客，需要一次给足信息">
          <p>枢纽里的旅客行色匆忙。问“附近哪里有咖啡店？”时，我们尽量在一次回复中给出可选商户、距离排序和导航入口，减少为了获取这些信息而反复追问。</p>
          <div className="hh-validation">
            <div><h3>先定位，再选择查询来源</h3><p>获取到室内音频定位时，查询站内商户；未获取到音频定位时，走高德 API 推荐，根据可用定位查找附近商户。</p></div>
            <div><h3>结构化商户数据，直接支持选择与行动</h3><p>将商户信息整理为结构化数据并存入数据库，用于后续查询。结果按距离由近到远展示，每个商户旁提供“导航前往”按钮。</p></div>
          </div>
        </Section>
        <Section id="ai-work" title="我如何用 AI 推进产品工作">
          <p>从问卷、原型到方案文档，我用 AI 先形成可讨论的初稿，再根据业务范围与验收要求完善。</p>
          <div className="hh-table hh-work-table"><table><caption className="hh-sr">AI 辅助工作的产出与产品判断</caption><thead><tr><th scope="col">工作与工具</th><th scope="col">产出，以及我的判断</th></tr></thead><tbody>{[
            ['问卷准备 · AI 辅助', '生成问卷初稿；确认调查目标，检查问题是否有效、是否存在诱导性。'],
            ['原型设计 · Figma AI', '快速生成首版 MVP 原型；明确功能范围、操作顺序与交互细节。'],
            ['方案整理 · Codex', '辅助生成产品方案与文档；核对业务规则、需求完整性和验收要求。'],
            ['效果验证 · 百宝箱', '在测试版杭小东中验证模型与提示词；分析错误表现，推动调整与回归。'],
          ].map(([work,output]) => <tr key={work}><th scope="row">{work}</th><td>{output}</td></tr>)}</tbody></table></div>
        </Section>
        <Section id="ai" title="从测试验证，到正式产品">
          <p>百宝箱中分别保留测试版与正式版杭小东：测试版用于模型、提示词和业务场景验证，正式版用于对外提供服务。</p>
          <div className="hh-validation hh-architecture">
            <div><h3>React · 旅客使用的 H5 界面</h3><p>呈现对话、服务卡片、地图与操作入口。</p></div>
            <div><h3>LangGraph · 多智能体业务流程</h3><p>编排不同业务的 Agent 与能力调用。商业、机器人和文旅分别维护知识与流程，定位、导航等公共能力复用。</p></div>
            <div><h3>百宝箱与 A2A · 连接其他智能体</h3><p>杭小东在百宝箱中提供服务，并通过 A2A 调用杭小忆的文旅能力。</p></div>
          </div>
          <Link className="hh-inline-link" to="/hangxiaodong/technical">展开 Agent 机制与技术详情 <ArrowRightOutlined /></Link>
        </Section>
        <Section id="evaluation" title="我如何定义验收，并推动优化">
          <p>我负责定义业务测试场景与验收标准，参与测试集、错误分析及回归验证。重点覆盖下面五类情况，检查系统能否正确理解需求并承接服务。</p>
          <div className="hh-table hh-test-table"><table><caption className="hh-sr">五类验收场景、测试原因与通过标准</caption><thead><tr><th scope="col">测什么 / 为什么测</th><th scope="col">例子与通过标准</th></tr></thead><tbody>{[
            ['业务边界与意图识别', '“去哪坐网约车？”查询上车点；“我的网约车到哪了？”查询指定车辆。换成口语或同义表达，仍应进入正确流程。', '同一个业务词，可能对应不同任务。'],
            ['多轮对话', '“我的网约车到哪了？”→询问缺少的车牌→用户提供车牌。应接着查询该车辆；首句已有完整车牌时，不再重复询问。', '只在缺少必要信息时补问，并保留当前任务。'],
            ['多意图', '“找个吃饭的地方，再查去西湖的路线。”两个需求都要处理，不遗漏、不混用结果。', '避免只回答其中一个需求。'],
            ['澄清', '“帮我看看网约车。”且上下文不明确时，确认是找上车点还是查车辆；任务已明确时直接处理。', '分不清任务才澄清；缺车牌属于补充查询参数。'],
            ['人工服务兜底', '用户要求人工帮助或问题超出能力时，提供可用的人工服务路径，不虚假承诺已经转接。', '超出能力范围后，用户仍需获得帮助。'],
          ].map(([name,criterion,reason]) => <tr key={name}><th scope="row"><strong>{name}</strong><span>{reason}</span></th><td>{criterion}</td></tr>)}</tbody></table></div>
          <p className="hh-note">意图识别以准确率衡量；其余场景按预先定义的标准记录用例是否通过，可分别统计通过率。当前已确认的量化结果仅为首屏的意图识别准确率，不代表五类测试的整体通过率。</p>
          <div className="hh-example">
            <h3>网约车：找上车点，与查我的车，是两个任务</h3>
            <p className="hh-note">以下真实界面展示两种任务，来自不同查询。规则与回归检查用于说明验收方法，不代表已完成某次修复。</p>
            <Image.PreviewGroup><div className="hh-ride-screens">{[
              ['ride-pickup.png', '去哪坐网约车？', '返回上车点、排队信息与地图，帮助旅客选择候车位置。'],
              ['ride-status.png', '我的网约车到哪了？', '按车牌查询，返回车辆状态、停车区域与车位信息。'],
            ].map(([file,title,copy]) => <figure key={file}><div className="hh-screen"><PortfolioImage variant="480" src={asset(file)} alt={title} width="100%" loading="lazy" preview={{mask:'查看原图'}} /></div><figcaption><h3>{title}</h3><p>{copy}</p></figcaption></figure>)}</div></Image.PreviewGroup>
            <dl>
              <div><dt>易错点</dt><dd>只按“网约车”关键词返回统一答案，会把“找上车点”和“查车辆”混在一起。</dd></div>
              <div><dt>规则调整</dt><dd>询问乘车位置，进入上车点查询；询问自己叫的车，进入车辆查询，仅在缺少车牌时补问。</dd></div>
              <div><dt>回归检查</dt><dd>覆盖两种问法、有无车牌和补充车牌后的连续查询；核对未进场、已进场、已停入、已驶离等状态下的回复与卡片是否一致。</dd></div>
              <div><dt>具体检查</dt><dd>检查状态、停车区域、车位与进入时间的展示是否一致。例如“已停入车位”时，不能同时显示“进入时间：未进入”。</dd></div>
            </dl>
          </div>
        </Section>
        <Section id="learning" title="我学到的">
          <Cards items={[
            ['AI 加快产出，产品判断仍需自己负责', '问卷、原型和文档可以更快形成，但是否解决了真实问题、规则是否完整、怎样才算通过验收，都需要产品经理判断。'],
            ['减少对话轮次，让旅客更快行动', '能够一次返回的信息就给足，只有缺关键参数或任务存在歧义时才追问。验收既看任务是否理解正确，也看返回的数据、状态和操作入口是否一致。'],
          ]} />
        </Section>
        <section id="experience" tabIndex={-1} className="hh-cta"><div><h2>体验杭小东</h2><p>在微信 / 支付宝小程序搜索「杭小东」。</p></div><Link to="/">小东鸭案例 <ArrowRightOutlined /></Link></section>
      </article>
    </main>
    <footer className="hh-footer">杭小东 · AI 产品经理作品集</footer>
  </div>
}
