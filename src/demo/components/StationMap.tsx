import { Popover } from 'antd'
import { useDemo } from '../../store/DemoStore'
import { RobotStatus,robotMap } from './StatusTag'

export function StationMap({showFences=true,interactive=false,onMapClick}:{showFences?:boolean;interactive?:boolean;onMapClick?:(x:number,y:number)=>void}) {
  const {robots,fences} = useDemo()
  return <div className={`station-map ${interactive?'station-map--interactive':''}`} onClick={e=>{if(!onMapClick)return;const r=e.currentTarget.getBoundingClientRect();onMapClick(Math.round((e.clientX-r.left)/r.width*100),Math.round((e.clientY-r.top)/r.height*100))}}>
    <div className="station-map__header"><b>杭州东站 · 到达层</b><span>模拟地图 / 非真实坐标</span></div>
    <div className="station-road road-a">到达大厅</div><div className="station-road road-b">南侧通道</div><div className="station-road road-c">北侧通道</div>
    {[20,37,54,71].map((x,i)=><div className="beacon" key={x} style={{left:`${x}%`,top:`${18+(i%2)*56}%`}}><i/>B-{120+i}</div>)}
    {showFences&&fences.map(f=><div key={f.id} className={`map-fence map-fence--${f.severity.toLowerCase()} ${f.runtime==='ALARMING'?'is-alarming':''} ${f.status==='DISABLED'?'is-disabled':''}`} style={{clipPath:`polygon(${f.points.map(p=>`${p.x}% ${p.y}%`).join(',')})`}}><span>{f.name.split(' · ')[0]}</span></div>)}
    {robots.map(r=><Popover trigger="click" key={r.id} content={<div className="robot-pop"><b>{r.name}</b><RobotStatus state={r.state}/><p>电量：{r.battery}%</p><p>任务：{r.task}</p><p>速度：{r.speed} m/s</p></div>}><button className={`map-robot map-robot--${r.state.toLowerCase()}`} style={{left:`${r.x}%`,top:`${r.y}%`,background:robotMap[r.state].color}} onClick={e=>e.stopPropagation()}><span>鸭</span><b>{r.name}</b></button></Popover>)}
  </div>
}
