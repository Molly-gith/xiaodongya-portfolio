import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { Drawer, Tooltip } from 'antd'
import { ArrowDownOutlined, ArrowLeftOutlined, ArrowRightOutlined, AimOutlined, CheckCircleFilled, ClockCircleOutlined, ExpandAltOutlined, InfoCircleOutlined, NodeIndexOutlined, PlusOutlined } from '@ant-design/icons'
import { Link, useLocation } from 'react-router-dom'
import { nodes, mainFlow, slotRows, pmResponsibilities, engineeringResponsibilities, type Detail } from './hangxiaodong-data'
import './hangxiaodong.css'

const navigation = [['overview', 'Overview'], ['architecture', 'Architecture'], ['routing', 'Routing'], ['context', 'Context'], ['slot', 'Slot'], ['knowledge', 'Knowledge & Tools'], ['model', 'Model'], ['evaluation', 'Evaluation'], ['my-role', 'My Role']]
const reconstruction = 'Architecture Reconstruction / 合理架构补全'
export function Fact({ reconstructed = false }: { reconstructed?: boolean }) { return <span className={`hxd-fact ${reconstructed ? 'hxd-fact--reconstructed' : ''}`}>{reconstructed ? <InfoCircleOutlined /> : <CheckCircleFilled />}{reconstructed ? reconstruction : '项目已确认'}</span> }

export const DetailContext = createContext<(detail: Detail) => void>(() => {})
export function Node({ id, compact = false, label }: { id: string; compact?: boolean; label?: string }) {
    const setSelected = useContext(DetailContext)
    const n = nodes[id]
    return <Tooltip placement="top" mouseEnterDelay={0.35} title={<div className="hxd-tooltip"><b>{n.title}</b><p>解决问题：{n.why}</p><p>产品负责：{n.pm}</p><p>研发负责：{n.engineering}</p>{n.reconstructed && <p>{reconstruction}</p>}</div>}><button className={`hxd-node ${compact ? 'hxd-node--compact' : ''} ${id === 'routing' ? 'hxd-node--key' : ''}`} onClick={() => setSelected(n)} aria-label={`查看 ${n.title} 设计详情`}><span className="hxd-node-title">{label || n.title}<ExpandAltOutlined /></span>{!compact && <span className="hxd-node-purpose">{n.purpose}</span>}{n.reconstructed && <span className="hxd-node-status">合理架构补全</span>}</button></Tooltip>
  }
  function Flow({ ids, vertical = false }: { ids: string[]; vertical?: boolean }) { return <div className={`hxd-flow ${vertical ? 'hxd-flow--vertical' : ''}`}>{ids.map((id, i) => <div className="hxd-flow-item" key={`${id}-${i}`}><Node id={id} />{i < ids.length - 1 && <ArrowDownOutlined className="hxd-flow-arrow" />}</div>)}</div> }
  function Section({ id, title, en, intro, detail, children }: { id: string; title: string; en: string; intro: string; detail?: string; children: ReactNode }) {
    const setSelected = useContext(DetailContext)
    return <section className="hxd-section" id={id} tabIndex={-1}><div className="hxd-section-heading"><div><h2>{title}</h2><span>{en}</span></div>{detail && <button className="hxd-detail-link" onClick={() => setSelected(nodes[detail])}>设计说明 <PlusOutlined /></button>}</div><p className="hxd-intro">{intro}</p>{children}</section>
  }

export function Hangxiaodong() {
  const [selected, setSelected] = useState<Detail | null>(null)
  const [active, setActive] = useState('overview')
  const [water, setWater] = useState<'free' | 'buy'>('free')
  const [contextExample, setContextExample] = useState<'continue' | 'switch' | 'resume'>('continue')
  const location = useLocation()
  useEffect(() => {
    const old = document.title
    document.title = '杭小东｜杭州东站 AI Agent 智能服务 · Case Study'
    return () => { document.title = old }
  }, [])
  useEffect(() => {
    const id = location.hash.slice(1) || 'overview'
    const frame = requestAnimationFrame(() => {
      const target = document.getElementById(id)
      target?.scrollIntoView({ behavior: 'instant' })
      target?.focus({ preventScroll: true })
    })
    return () => cancelAnimationFrame(frame)
  }, [location.hash, location.key])
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting)
      if (visible.length) setActive(visible[0].target.id)
    }, { rootMargin: '-100px 0px -65% 0px', threshold: 0 })
    navigation.forEach(([id]) => { const element = document.getElementById(id); if (element) observer.observe(element) })
    return () => observer.disconnect()
  }, [])
  const contextChoices = {
    continue: { query: '“这家怎么走？”', active: '商业推荐 · Continue', slots: '已选咖啡店 + 当前室内位置', result: '保留已选商户，调用 Navigation', history: '无关历史不进入 Context' },
    switch: { query: '“先帮我找一下母婴室。”', active: '设施查询 · Switch', slots: '设施类型：母婴室 + 当前室内位置', result: '新任务不带入咖啡偏好', history: '原商业任务按恢复策略保留在 Session' },
    resume: { query: '“回到刚才那家咖啡店。”', active: '商业推荐 · Resume', slots: '恢复已选商户；检查位置是否仍有效', result: '取回相关 Key Result', history: '仅恢复被本轮 Query 引用的历史任务' },
  }[contextExample]
  return <DetailContext.Provider value={setSelected}><div className="hxd-page">
    <Link to="/hangxiaodong/technical#architecture" className="hxd-skip">跳到架构正文</Link>
    <header className="hxd-topbar"><Link to="/hangxiaodong" className="hxd-back"><ArrowLeftOutlined /> 返回案例概览</Link><span className="hxd-top-title">杭小东 <span>/ AI Agent Case Study</span></span><span className="hxd-top-meta">PRODUCT DESIGN</span></header>
    <nav className="hxd-nav" aria-label="案例章节导航">{navigation.map(([id, label]) => <Link key={id} to={`/hangxiaodong/technical${id === 'overview' ? '' : `#${id}`}`} className={active === id ? 'is-active' : ''} aria-current={active === id ? 'location' : undefined}>{label}</Link>)}</nav>
    <main className="hxd-main">
      <section id="overview" className="hxd-hero" tabIndex={-1}>
        <div className="hxd-hero-main"><div className="hxd-badges"><span><CheckCircleFilled /> 真实项目</span><span>AI 产品经理</span></div><h1>杭小东<span>杭州东站 AI Agent 智能服务</span></h1><p className="hxd-subtitle">面向大型交通枢纽的多 Agent 智能服务系统</p><p className="hxd-hero-thesis">让一次问询，走向下一步行动。<br/>从意图理解到任务执行，设计有上下文、有边界、可评测的智能服务。</p><div className="hxd-tags">{['Multi-Agent', 'LangGraph', 'RAG', 'Tool Calling', 'Indoor Location', 'Context Engineering', 'Harness Engineering'].map(tag => <span key={tag}>{tag}</span>)}</div><div className="hxd-ownership"><span>产品经理负责业务方案与 Agent 机制设计</span><span>底层代码由研发实现</span></div></div>
        <aside className="hxd-hero-system" aria-label="核心产品机制"><div className="hxd-system-title"><NodeIndexOutlined /><b>一次问询如何成为一次服务</b></div><div className="hxd-query-quote">“附近有什么咖啡店？”</div><div className="hxd-context-pair"><span><ClockCircleOutlined /> Time · 时间</span><span><AimOutlined /> Location · 位置</span></div><ArrowDownOutlined className="hxd-center-arrow" /><Node id="routing" /><ArrowDownOutlined className="hxd-center-arrow" /><div className="hxd-hero-capabilities"><Node id="commercial" compact /><PlusOutlined /><Node id="navigation" compact /></div><div className="hxd-result-strip"><CheckCircleFilled /><span>商户列表 · 距离 · 营业状态 · 导航按钮</span></div><small>机制示意，非实时服务</small></aside>
      </section>
      <div className="hxd-metrics"><div><strong>94.8<span>%</span></strong><b>意图识别测试集准确率 · 约</b><p>基于约 1000 条测试集</p></div><div><strong>9,300<span>+</span></strong><b>首周有效问询</b><p>独立使用规模指标，非准确率分母</p></div><div className="hxd-evolution"><span>能力演进</span><b>问询与导航 <ArrowRightOutlined /> 综合服务</b><p>设施 · 商业 · 交通 · 文旅</p></div></div>
      <div className="hxd-evidence-note"><InfoCircleOutlined /><p>事实边界：项目事实与指标依据项目经历陈述；标有「合理架构补全」的内容用于解释设计思路，不作为已核验生产配置。具体节点图均为概念表达。</p></div>

      <Section id="project-context" title="场站服务的两个核心上下文" en="Project Context" intro="站内空间复杂、重复问询多、人工高峰覆盖不足，加上 GPS 室内定位不稳定，旅客需要的不只是答案，更是能立即执行的下一步。">
        <div className="hxd-context-principle"><div className="hxd-two-variables"><div><ClockCircleOutlined /><h3>Time <span>时间</span></h3><p>还有多少时间，决定服务建议是否可行。</p></div><div><AimOutlined /><h3>Location <span>位置</span></h3><p>身处哪里，决定“附近”与“怎么过去”。</p></div></div><blockquote>“尽量在一次交互中给足用户完成决策和下一步操作所需要的信息。”</blockquote></div>
        <div className="hxd-example-line"><b>“附近有什么咖啡店？”</b><ArrowRightOutlined /><span>商户列表</span><span>距离</span><span>营业状态</span><span>位置</span><span>导航按钮</span></div>
      </Section>

      <Section id="architecture" title="一条可控的 Agent 服务链路" en="AI Agent Overall Architecture" intro="用状态连接理解、执行和反馈。路由管理任务归属，业务 Agent 管理完成过程，共享能力承接数据与行动。" detail="harness">
        <div className="hxd-diagram-caption"><span><span className="hxd-dot" /> 概念架构 · 按序阅读</span><span>悬停查看职责 · 点击展开设计说明</span></div>
        <div className="hxd-architecture">{[['理解与分流', mainFlow.slice(0, 5)], ['任务与执行', mainFlow.slice(5, 9)], ['呈现与反馈', mainFlow.slice(9)]].map(([title, ids]) => <div className="hxd-architecture-lane" key={title as string}><h3>{title as string}</h3><Flow ids={ids as string[]} vertical /></div>)}</div><div className="hxd-loop-return"><ArrowLeftOutlined /> Bad Case 回流至数据、规则与评测，驱动下一轮迭代</div><p className="hxd-caption">跨列顺序：Routing → Business Agent；Result Processing → Text + Card + Action。LangGraph 已确认使用；具体节点和条件边实现属于合理架构补全。</p>
      </Section>

      <Section id="agent-map" title="按业务目标划分 Agent" en="Business Agent Map" intro="Agent 按照“业务目标 + 数据边界 + 执行流程”划分，而不是每一种用户问法都拆一个 Agent。" detail="business">
        <div className="hxd-agent-map">{[['facility', '卫生间 / 免费饮水 / 母婴室 / 服务台'], ['commercial', '餐饮 / 咖啡 / 购物 / 酒店与商业服务'], ['tourism', '景点 / 行程规划 / 高德 POI 与路线 / 杭小忆 A2A'], ['transport', '网约车 / 动态交通 / 车次 / 交通衔接']].map(([id, text]) => <div key={id}><Node id={id} /><p>{text}</p></div>)}</div><div className="hxd-shared"><div><h3>Shared Capabilities</h3><p>导航是共享能力，不是一级业务 Agent。</p></div><div className="hxd-shared-nodes">{['location', 'navigation', 'rag', 'structured', 'tool', 'session'].map(id => <Node key={id} id={id} compact label={id === 'session' ? 'Session / Context' : undefined} />)}</div></div>
      </Section>

      <Section id="routing" title="先判断任务，再决定交给谁" en="Routing Decision Node" intro="Routing 判断“这是什么任务、和已有任务什么关系、交给谁”。业务 Agent 再判断参数齐不齐、具体怎么执行。" detail="routing">
        <div className="hxd-routing-input"><Node id="query" compact label="Current Query" /><PlusOutlined /><Node id="session" compact /></div><ArrowDownOutlined className="hxd-center-arrow" /><div className="hxd-routing-core"><Node id="context" /><ArrowDownOutlined className="hxd-center-arrow" /><Node id="routing" /></div><ArrowDownOutlined className="hxd-center-arrow" /><div className="hxd-grid-four">{['intent', 'relation', 'target', 'multi'].map(id => <Node key={id} id={id} />)}</div><div className="hxd-relation-list"><b>Task Relation</b>{['Continue · 继续', 'New · 新建', 'Switch · 切换', 'Resume · 恢复', 'Cancel · 取消'].map(item => <span key={item}>{item}</span>)}</div><ArrowDownOutlined className="hxd-center-arrow" /><div className="hxd-routing-core"><Node id="langgraph" /></div><ArrowDownOutlined className="hxd-center-arrow" /><div className="hxd-grid-four">{['business', 'multi', 'clarify', 'fallback'].map(id => <Node id={id} key={id} compact />)}</div>
      </Section>

      <Section id="context" title="记住什么，与给模型看什么" en="Session & Context Management" intro="Session 是系统在一次连续服务中记住什么；Context 是这一轮真正给模型看什么。Context 不是完整聊天记录。" detail="context">
        <div className="hxd-session-diagram"><div><Node id="session" /><div className="hxd-state-children"><Node id="log" /><Node id="task" /><code>task_id · intent · target_agent · status<br/>slots / entities · key_result</code><Fact reconstructed /></div></div><div className="hxd-context-selection"><Node id="context" /><ul>{['Active Task → 必带', 'Current Agent → 优先', 'Slots / Entities → 必带', 'Key Result → 必要时带', '近期相关原文 → 保留', '历史 Task → 当前 Query 引用时恢复', '完全无关 / 已失效 → 不进入 Context'].map(x => <li key={x}>{x}</li>)}</ul><Node id="summary" compact /><p>较早 + 有价值 + 内容较长 → Conversation Summary</p><ArrowDownOutlined className="hxd-center-arrow" /><Node id="routing" compact /></div></div>
        <div className="hxd-reconstruction-panel"><Fact reconstructed /><p>以下均为架构合理补全 / 非已核验生产参数。</p><div className="hxd-parameter-grid">{[['约 4 轮', '近期相关原文'], ['约 20 分钟', '无交互 Session 失效'], ['最多 2 个', '可恢复历史 Task'], ['目标约 6K', '单轮 Input Token Budget']].map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div></div>
        <div className="hxd-context-demo"><div className="hxd-demo-title"><h3>同一句上下文，三种任务关系</h3><span>交互示意 · 非生产日志</span></div><div className="hxd-segmented" role="group" aria-label="上下文场景">{[['continue', '继续任务'], ['switch', '切换任务'], ['resume', '恢复任务']].map(([id, label]) => <button key={id} aria-pressed={contextExample === id} onClick={() => setContextExample(id as typeof contextExample)}>{label}</button>)}</div><div className="hxd-context-demo-output" aria-live="polite"><blockquote>{contextChoices.query}</blockquote><dl><dt>Active Task</dt><dd>{contextChoices.active}</dd><dt>Slots / Entities</dt><dd>{contextChoices.slots}</dd><dt>本轮操作</dt><dd>{contextChoices.result}</dd><dt>历史处理</dt><dd>{contextChoices.history}</dd></dl></div></div>
      </Section>

      <Section id="slot" title="能自动获取的，不重复问用户" en="Slot Filling & Task State" intro="补槽是完成任务的条件检查。优先复用已知信息，只有缺少必要参数时才向用户追问。" detail="slots">
        <div className="hxd-slot-sources">{['Query', 'Session', 'Location / Tool', '用户点击 / 选择'].map((item, i) => <span key={item}><b>{i + 1}</b>{item}</span>)}</div><div className="hxd-table-scroll" tabIndex={0} role="region" aria-label="场景补槽与兜底策略表，可横向滚动"><table><thead><tr>{['场景', 'Required Slot', '获取方式', '缺失处理', 'Fallback'].map(h => <th key={h} scope="col">{h}</th>)}</tr></thead><tbody>{slotRows.map(row => <tr key={row[0]}>{row.map((cell, i) => i === 0 ? <th scope="row" key={i}>{cell}</th> : <td key={i}>{cell}</td>)}</tr>)}</tbody></table></div>
      </Section>

      <Section id="rewrite" title="从真实问法，回到能力边界" en="Query Rewrite + Intent Optimization" intro="优化意图识别不等于不断加长 Prompt。先判断错误来自表达、规则、能力边界，还是上下文缺失。" detail="rewrite">
        <div className="hxd-mini-flow"><Node id="feedback" compact label="真实 Query / Bad Case" /><ArrowRightOutlined /><Node id="rootcause" compact label="问题分类" /></div><div className="hxd-optimization-list">{[['评测数据', '补真实 Query、口语、同义表达和边界 Case。'], ['Prompt', '修改 Intent Definition、判断与边界规则；选少量典型 Case 作 Few-shot。'], ['意图体系', '按实际业务能力重新划分边界，不按表面问法拆 Agent。'], ['Query Rewrite', '补省略、解指代、规范口语，不创造用户新需求。']].map(([name, text]) => <div key={name}><h3>{name}</h3><p>{text}</p><button className="hxd-detail-link" onClick={() => setSelected(nodes[name === 'Query Rewrite' ? 'rewrite' : 'optimization'])}>设计目的 <ArrowRightOutlined /></button></div>)}</div><div className="hxd-mini-flow"><Node id="regression" compact /><ArrowRightOutlined /><Node id="feedback" compact label="Bad Case 再次回流" /></div><p className="hxd-callout">餐厅查询、咖啡店查询、餐厅推荐，都属于商业推荐能力。</p><div className="hxd-asr"><b>语音场景</b><p>ASR 先负责方言泛化 + 杭州东站场站热词；Query Rewrite 处理转写后的上下文补全和语义规范。</p></div>
      </Section>

      <Section id="knowledge" title="让不同的事实，走不同的数据通道" en="RAG / Structured Data / Tool" intro="知识是否稳定、实体是否结构化、业务是否实时，是选择数据通道的三个关键判断。" detail="sources">
        <div className="hxd-data-columns">{[['Stable Knowledge', '稳定 FAQ / 规则', 'rag'], ['Structured Entity', '设施 / 商户', 'structured'], ['Real-time Business Data', '网约车 / 动态交通', 'tool']].map(([name, text, id]) => <div key={id}><h3>{name}</h3><p>{text}</p><Node id={id} /></div>)}</div><h3 className="hxd-subheading">RAG：先找到依据，再组织答案</h3><Flow ids={['query', 'embedding', 'vector', 'topk', 'rerank', 'context', 'generate']} /><p className="hxd-callout"><b>Qwen-Embedding 只负责检索，不负责生成答案。</b></p><div className="hxd-tool-output"><div><h3>给 LLM「最小充分信息」</h3><p>程序已经筛选出 5 家咖啡店并按距离排序，不再把完整商户 JSON 全部塞进模型。</p><p>仅生成概括时，模型可只接收品类、数量和排序口径；如需解释具体商户，则补充有依据的必要字段。</p></div><div><span className="hxd-output-label">LLM · 简短语言概括</span><code>category = 咖啡店<br/>count = 5<br/>sort = distance</code><span className="hxd-output-label">前端卡片 · 完整实体字段</span><p>商户名称 / 距离 / 营业状态 / 位置 / 导航动作</p><Fact reconstructed /><small>数据传递示意，非生产 JSON / State Schema。</small></div></div>
      </Section>

      <Section id="model" title="把模型能力用在需要它的地方" en="Model Routing" intro="模型路由不是 Agent 自由选模型，而是产品定义场景和策略，研发通过 LangGraph 条件分支实现。" detail="reasoning">
        <div className="hxd-model-layers">{[['deterministic', '确定性任务', '距离排序 / 营业状态过滤 / 参数校验 / API 执行'], ['light', '轻语义任务', 'Query Rewrite / Intent Classification / Slot Extraction'], ['reasoning', '复杂推理', '复杂问询 / 多条件判断 / 多 Agent 任务 / 文旅规划 / 多 Tool 结果综合']].map(([id, title, examples]) => <div key={id}><div><h3>{title}</h3><p>{examples}</p></div><Node id={id} /></div>)}</div><div className="hxd-model-facts"><span>DeepSeek-R1 <Fact /></span><span>Qwen-Embedding <Fact /></span><span>Qwen2.5 / Qwen3 轻量模型 <Fact reconstructed /></span></div>
      </Section>

      <Section id="harness" title="模型之外，产品如何约束系统行为" en="Harness Engineering" intro="回头看，这套架构天然体现了类似 Harness Engineering 的思想。这里是对实践的复盘视角，不声称项目当时按这一方法论命名搭建。" detail="harness">
        <div className="hxd-harness"><div className="hxd-harness-model"><Node id="reasoning" compact label="Model" /><PlusOutlined /><Node id="harness" compact label="Harness" /></div><div className="hxd-harness-grid">{[['context', 'Context'], ['task', 'State'], ['routing', 'Routing'], ['tool', 'Tools'], ['rag', 'Knowledge'], ['rules', 'Business Rules'], ['fallback', 'Guardrails'], ['session', 'Persistence'], ['feedback', 'Observability'], ['evaluation', 'Evaluation'], ['regression', 'Feedback Loop']].map(([id, label]) => <Node key={label} id={id} label={label} compact />)}</div></div><div className="hxd-responsibility-summary"><div><h3>产品定义业务 Harness</h3><p>Agent 边界、Routing 规则、Session 生命周期、Task State、Slot、Context 策略、Business Rule、Fallback、验收标准。</p></div><div><h3>研发实现运行骨架</h3><p>LangGraph 提供状态、节点、条件分支、持久化等骨架，研发把业务规则工程化。</p></div></div>
      </Section>

      <Section id="business-rule" title="“哪里有水？”背后的产品判断" en="Business Rule Case" intro="语义相近，不代表服务优先级相同。杭州东站的业务规则是：免费公共服务优先。" detail="rules">
        <div className="hxd-rule-case"><div className="hxd-segmented" role="group" aria-label="饮水需求示例"><button aria-pressed={water === 'free'} onClick={() => setWater('free')}>哪里有水？</button><button aria-pressed={water === 'buy'} onClick={() => setWater('buy')}>哪里可以买水？</button></div><div className="hxd-rule-result" aria-live="polite"><div><span>用户需求</span><h3>{water === 'free' ? '未明确购买意图' : '明确购买需求'}</h3><p>{water === 'free' ? '设施服务与商业服务都有可能满足。业务规则决定先提供免费公共服务。' : '尊重明确的消费意图，进入商业推荐，同时可以提示站内也有免费饮水设施。'}</p></div><ArrowRightOutlined /><div><Node id={water === 'free' ? 'facility' : 'commercial'} /><b>{water === 'free' ? '优先免费饮水设施' : '优先可购买饮水的商户'}</b></div></div><p className="hxd-caption">业务规则演示，非实时查询。</p></div>
      </Section>

      <Section id="multi-agent" title="独立任务拆分，共同约束下聚合" en="Multi-Agent Case" intro="多 Agent 的价值来自业务协同。多个动作不一定意味着多个 Agent，关键是是否存在独立业务目标。" detail="multi">
        <blockquote className="hxd-multi-query">“我朋友明天上午到杭州，有半天时间，帮我规划一下西湖怎么玩，同时看看我明天上午返程的高铁来不来得及。”</blockquote><div className="hxd-routing-core"><Node id="routing" /><ArrowDownOutlined className="hxd-center-arrow" /><Node id="multi" compact /></div><div className="hxd-multi-branches"><div><span>Task A · 文旅规划</span><Node id="tourism" /><p>景点、路线与可用游玩时间</p></div><div><span>Task B · 返程交通</span><Node id="transport" /><p>补齐必要车次、时间与出发信息</p></div></div><div className="hxd-cross-constraint"><ArrowLeftOutlined /> 必要时，交通结果反向约束文旅方案</div><div className="hxd-routing-core"><Node id="aggregate" /><ArrowDownOutlined className="hxd-center-arrow" /><Node id="response" compact label="统一返回" /></div><p className="hxd-caption">协作机制示意。朋友与用户是不同主体；需确认是否共同行动，不能直接将朋友的游玩时间绑定为用户的返程时间。</p><div className="hxd-navigation-example"><b>“找一家咖啡店，然后告诉我怎么过去”</b><div><Node id="commercial" compact /><PlusOutlined /><Node id="navigation" compact /></div><p>一个商业目标，复用导航能力；不拆成两个 Agent。</p></div>
      </Section>

      <Section id="evaluation" title="让每一次错误，都能被定位和验证" en="Evaluation & Bad Case" intro="评测既检验意图识别，也为迭代提供共同语言。先归因，再改动，最后回归；上线后继续接收真实 Bad Case。" detail="evaluation">
        <Flow ids={['testset', 'evaluation', 'feedback', 'rootcause', 'optimization', 'regression', 'production', 'feedback']} /><div className="hxd-evaluation-evidence"><div><span>离线评测</span><strong>约 1000 条测试集 <ArrowRightOutlined /> 约 94.8%</strong><p>指标：意图识别准确率</p></div><div><span>线上使用</span><strong>首周有效问询 9300+</strong><p>指标：有效问询规模</p></div></div><p className="hxd-callout">两项指标口径独立，不把 9300+ 作为 94.8% 的统计分母，也不将意图准确率等同于任务完成率。</p>
      </Section>

      <Section id="my-role" title="我负责机制设计，也负责把它推进落地" en="My Role" intro="我的核心贡献，是把用户需求变成可讨论、可执行、可验收的 Agent 产品规则，与研发、算法和设计协作完成交付。">
        <div className="hxd-role-grid"><div className="hxd-role-pm"><h3>我 · AI 产品经理</h3><p>业务方案与 Agent 机制设计</p><ul>{pmResponsibilities.map(x => <li key={x}><CheckCircleFilled />{x}</li>)}</ul></div><div><h3>研发团队</h3><p>工程实现与生产运行</p><ul>{engineeringResponsibilities.map(x => <li key={x}><span className="hxd-dot" />{x}</li>)}</ul></div></div><div className="hxd-final-statement"><NodeIndexOutlined /><p>产品经理定义系统应该如何理解、决策和服务。<br/><b>研发将这些规则实现为可运行的生产系统。</b></p></div>
      </Section>
      <div className="hxd-footer"><Link to="/"><ArrowLeftOutlined /> 返回作品集</Link><span>杭小东 · AI Agent Case Study</span><Link to="/hangxiaodong/technical">回到顶部 <ArrowRightOutlined /></Link></div>
    </main>
    <Drawer open={!!selected} onClose={() => setSelected(null)} title={selected?.title} placement="right" size={520} rootClassName="hxd-drawer" styles={{ wrapper: { maxWidth: '100vw' } }}>{selected && <><div className="hxd-drawer-purpose"><span>产品设计目的</span><p>{selected.purpose}</p></div>{selected.reconstructed && <Fact reconstructed />}{[['What', '它是什么', selected.what], ['Why', '为什么杭小东需要它', selected.why], ['How', '在项目里怎么工作', selected.how], ['PM Role', '产品经理负责什么', selected.pm], ['Engineering', '研发负责什么', selected.engineering]].map(([en, title, text]) => <section className="hxd-drawer-section" key={en}><span>{en}</span><h3>{title}</h3><p>{text}</p></section>)}<p className="hxd-drawer-footnote">此处展示产品机制与职责解释。具体 State Schema、JSON 结构及 LangGraph 节点实现属于架构合理补全，不代表已核验生产代码。</p></>}</Drawer>
  </div></DetailContext.Provider>
}
