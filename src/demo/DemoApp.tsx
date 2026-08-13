import { useEffect, useState } from 'react'
import { Badge, Button, Drawer, Layout, Menu, Tag, Tooltip } from 'antd'
import {
  AlertOutlined, AppstoreOutlined, ControlOutlined, DashboardOutlined, DesktopOutlined,
  EnvironmentOutlined, HomeOutlined, MenuFoldOutlined, MenuUnfoldOutlined, RobotOutlined,
  SafetyCertificateOutlined, ScheduleOutlined,
} from '@ant-design/icons'
import { useLocation, useNavigate } from 'react-router-dom'
import { Dashboard } from './pages/Dashboard'
import { Robots } from './pages/Robots'
import { Tasks } from './pages/Tasks'
import { Materials } from './pages/Materials'
import { Geofence } from './pages/Geofence'
import { Alarms } from './pages/Alarms'
import { Showcase } from './pages/Showcase'
import { DemoControl } from './components/DemoControl'

const { Header, Sider, Content } = Layout
const items = [
  { key: '/demo/dashboard', icon:<DashboardOutlined/>, label:'运营驾驶舱' },
  { key: '/demo/robots', icon:<RobotOutlined/>, label:'机器人管理' },
  { key: '/demo/tasks', icon:<ScheduleOutlined/>, label:'任务调度中心' },
  { key: '/demo/materials', icon:<AppstoreOutlined/>, label:'内容管理' },
  { key: '/demo/geofence', icon:<SafetyCertificateOutlined/>, label:'空间安全' },
  { key: '/demo/alarms', icon:<AlertOutlined/>, label:'告警中心' },
  { key: '/demo/showcase', icon:<DesktopOutlined/>, label:'实时态势大屏' },
]

export function DemoApp() {
  const [collapsed,setCollapsed] = useState(false)
  const [controlOpen,setControlOpen] = useState(false)
  const [time,setTime] = useState(new Date())
  const navigate = useNavigate()
  const location = useLocation()
  useEffect(() => { const timer=setInterval(()=>setTime(new Date()),1000);return()=>clearInterval(timer) },[])
  const current = location.pathname === '/demo' ? '/demo/dashboard' : location.pathname
  useEffect(()=>{ if(location.pathname === '/demo') navigate('/demo/dashboard',{replace:true}) },[location.pathname,navigate])

  const page = current.endsWith('/robots')?<Robots/>:current.endsWith('/tasks')?<Tasks/>:current.endsWith('/materials')?<Materials/>:current.endsWith('/geofence')?<Geofence/>:current.endsWith('/alarms')?<Alarms/>:current.endsWith('/showcase')?<Showcase/>:<Dashboard/>
  const title = items.find(x=>x.key===current)?.label || '运营驾驶舱'

  if(current.endsWith('/showcase')) return <Showcase embedded={false}/>
  return (
    <Layout className="demo-app">
      <Sider width={224} collapsedWidth={76} collapsed={collapsed} className="demo-sider">
        <div className="demo-brand"><span className="demo-brand__duck">鸭</span>{!collapsed&&<div><b>小东鸭</b><small>ROBOT OPS</small></div>}</div>
        <Menu theme="dark" mode="inline" selectedKeys={[current]} items={items} onClick={({key})=>navigate(key)} />
        <button className="demo-back" onClick={()=>navigate('/')}><HomeOutlined/>{!collapsed&&'返回作品集'}</button>
      </Sider>
      <Layout>
        <Header className="demo-header">
          <div className="demo-header__left">
            <Button type="text" icon={collapsed?<MenuUnfoldOutlined/>:<MenuFoldOutlined/>} onClick={()=>setCollapsed(v=>!v)}/>
            <span className="demo-page-title">{title}</span>
            <span className="demo-location"><EnvironmentOutlined/> 杭州东站</span>
          </div>
          <div className="demo-header__right">
            <Tag color="blue">Demo 模式</Tag><Tag color="gold">演示数据 / Mock Data</Tag>
            <span className="demo-clock">{time.toLocaleTimeString('zh-CN',{hour12:false})}</span>
            <Tooltip title="面试演示快捷操作"><Badge dot><Button icon={<ControlOutlined/>} onClick={()=>setControlOpen(true)}>Demo 控制</Button></Badge></Tooltip>
            <span className="admin-avatar">管</span><span className="admin-label">管理员</span>
          </div>
        </Header>
        <Content className="demo-content">{page}</Content>
      </Layout>
      <Drawer title="Demo 控制中心" width={390} open={controlOpen} onClose={()=>setControlOpen(false)}><DemoControl onNavigate={(path)=>{navigate(path);setControlOpen(false)}}/></Drawer>
    </Layout>
  )
}
