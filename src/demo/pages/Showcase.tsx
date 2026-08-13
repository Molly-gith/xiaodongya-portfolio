import { Button, Tag } from 'antd'
import { ArrowLeftOutlined, FullscreenOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useDemo } from '../../store/DemoStore'
import { StationMap } from '../components/StationMap'
import { RobotStatus } from '../components/StatusTag'

export function Showcase({embedded=true}:{embedded?:boolean}){
  const {robots}=useDemo();const navigate=useNavigate();const online=robots.filter(r=>r.state!=='OFFLINE').length
  return <div className={`showcase ${embedded?'':'showcase--fullscreen'}`}><header><div><b>小东鸭 · 杭州东站</b><span>LIVE ROBOT SITUATION</span></div><Tag color="gold">演示数据 / Mock Data</Tag><Button icon={<ArrowLeftOutlined/>} onClick={()=>navigate('/demo/dashboard')}>返回运营平台</Button></header><main><StationMap showFences={false}/><div className="showcase-kpis"><div><span>在线机器人</span><strong>{online} / {robots.length}</strong></div><div><span>实时最高速度</span><strong>{Math.max(...robots.map(r=>r.speed)).toFixed(2)} <small>m/s</small></strong></div><div><span>室内定位基础设施</span><strong>1205 <small>Mock 点位</small></strong></div><div><span>巡航点位</span><strong>10</strong></div></div><div className="showcase-roster"><b>机器人六态</b>{robots.map(r=><div key={r.id}><span>{r.name}</span><RobotStatus state={r.state}/><small>{r.speed} m/s · {r.battery}%</small></div>)}</div><div className="showcase-tip"><FullscreenOutlined/> 点击地图中的机器人查看状态、任务、速度与电量</div></main></div>
}
