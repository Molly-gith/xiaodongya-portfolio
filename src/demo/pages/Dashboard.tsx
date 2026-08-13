import { Card, Col, Progress, Row, Table, Tag } from 'antd'
import { AlertOutlined, CheckCircleOutlined, RobotOutlined, ScheduleOutlined, WifiOutlined } from '@ant-design/icons'
import ReactECharts from 'echarts-for-react'
import { useDemo } from '../../store/DemoStore'
import { AlarmStatusTag, RobotStatus, TaskStatusTag } from '../components/StatusTag'
import { StationMap } from '../components/StationMap'

export function Dashboard() {
  const {robots,tasks,alarms,todayCompleted} = useDemo()
  const online=robots.filter(r=>r.state!=='OFFLINE').length, activeAlarms=alarms.filter(a=>a.state==='ACTIVE').length
  const kpis=[['机器人总数',robots.length,<RobotOutlined/>,null],['在线机器人',online,<WifiOutlined/>,`${online}/${robots.length}`],['今日服务任务',todayCompleted,<ScheduleOutlined/>,'Mock'],['任务完成率','94.7%',<CheckCircleOutlined/>,'Mock'],['当前告警',activeAlarms,<AlertOutlined/>,activeAlarms?'需关注':'正常']]
  const taskOption={tooltip:{trigger:'axis'},grid:{left:35,right:18,top:30,bottom:28},xAxis:{type:'category',data:['08:00','09:00','10:00','11:00','12:00','13:00'],axisLine:{lineStyle:{color:'#d8e1ee'}}},yAxis:{type:'value',splitLine:{lineStyle:{color:'#edf1f7'}}},series:[{type:'line',smooth:true,data:[2,4,3,7,5,8],areaStyle:{color:'rgba(23,105,255,.1)'},lineStyle:{color:'#1769ff'},symbolSize:7}]}
  const alarmOption={tooltip:{trigger:'axis'},grid:{left:35,right:18,top:30,bottom:28},xAxis:{type:'category',data:['08:00','09:00','10:00','11:00','12:00','13:00']},yAxis:{type:'value',splitLine:{lineStyle:{color:'#edf1f7'}}},series:[{type:'bar',data:[0,1,0,2,1,activeAlarms],itemStyle:{color:'#f05b63',borderRadius:[5,5,0,0]}}]}
  return <div className="demo-page">
    <div className="page-heading"><div><h1>运营驾驶舱</h1><p>多机器人实时运行、任务与安全态势概览</p></div><Tag color="gold">以下运营指标均为 Mock 演示数据</Tag></div>
    <Row gutter={[16,16]}>{kpis.map(([label,value,icon,note])=><Col flex="1" key={String(label)}><Card className="kpi-card"><div className="kpi-icon">{icon}</div><div><span>{label}</span><strong>{value}</strong>{note&&<small>{note}</small>}</div></Card></Col>)}</Row>
    <Row gutter={[16,16]} className="dashboard-row"><Col xs={24} xl={15}><Card title="杭州东站实时位置模拟" extra={<Tag color="blue">1-2 Hz 模拟刷新</Tag>}><StationMap/></Card></Col><Col xs={24} xl={9}><Card title="机器人运行状态"><Table size="small" pagination={false} rowKey="id" dataSource={robots} columns={[{title:'机器人',dataIndex:'name'},{title:'位置',dataIndex:'location',ellipsis:true},{title:'状态',dataIndex:'state',render:s=><RobotStatus state={s}/>},{title:'电量',dataIndex:'battery',render:v=><Progress percent={v} size="small" showInfo={false}/>},{title:'当前任务',dataIndex:'task',ellipsis:true}]}/></Card></Col></Row>
    <Row gutter={[16,16]} className="dashboard-row"><Col xs={24} xl={12}><Card title="今日任务趋势"><ReactECharts option={taskOption} style={{height:230}}/></Card></Col><Col xs={24} xl={12}><Card title="告警趋势"><ReactECharts option={alarmOption} style={{height:230}}/></Card></Col></Row>
    <Row gutter={[16,16]} className="dashboard-row"><Col xs={24} xl={13}><Card title="最近任务"><Table size="small" pagination={false} rowKey="id" dataSource={tasks.slice(0,4)} columns={[{title:'任务',dataIndex:'id'},{title:'类型',dataIndex:'type'},{title:'机器人',dataIndex:'robot'},{title:'状态',dataIndex:'status',render:s=><TaskStatusTag status={s}/>} ]}/></Card></Col><Col xs={24} xl={11}><Card title="实时告警"><Table size="small" pagination={false} rowKey="id" dataSource={alarms.slice(0,4)} columns={[{title:'事件',dataIndex:'type',render:v=><Tag color={v==='LOCK'?'red':'orange'}>{v}</Tag>},{title:'机器人',dataIndex:'robot'},{title:'状态',dataIndex:'state',render:s=><AlarmStatusTag state={s}/>} ]}/></Card></Col></Row>
  </div>
}
