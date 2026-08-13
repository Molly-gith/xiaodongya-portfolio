import { Button, Descriptions, Divider, Drawer, Empty, Progress, Table, Tabs, Timeline } from 'antd'
import { EyeOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { useDemo } from '../../store/DemoStore'
import type { Robot } from '../../types/demo'
import { RobotStatus } from '../components/StatusTag'

export function Robots() {
  const {robots}=useDemo();const [selected,setSelected]=useState<Robot|null>(null)
  return <div className="demo-page"><div className="page-heading"><div><h1>机器人管理</h1><p>统一查看设备资产、六态、任务和运行记录</p></div></div>
    <div className="state-legend">{(['PATROL','CHARGE','POINT','OFFLINE','LOCK','NONE'] as const).map(s=><RobotStatus key={s} state={s} showCode/>)}</div>
    <Table className="data-card" rowKey="id" dataSource={robots} scroll={{x:1100}} columns={[
      {title:'机器人名称',dataIndex:'name',fixed:'left'},{title:'机器人 ID',dataIndex:'id'},{title:'状态',dataIndex:'state',render:s=><RobotStatus state={s}/>},{title:'当前位置',dataIndex:'location'},{title:'电量',dataIndex:'battery',render:v=><div className="battery-cell"><Progress percent={v} size="small"/><span>{v}%</span></div>},{title:'网络',dataIndex:'network'},{title:'速度',dataIndex:'speed',render:v=>`${v} m/s`},{title:'当前任务',dataIndex:'task'},{title:'更新时间',dataIndex:'updatedAt'},{title:'操作',fixed:'right',render:(_,r)=><Button type="link" icon={<EyeOutlined/>} onClick={()=>setSelected(r)}>查看详情</Button>}
    ]}/>
    <Drawer width={560} title={selected?.name} open={!!selected} onClose={()=>setSelected(null)}>{selected&&<><Descriptions column={2} title="设备基础信息" items={[{key:'1',label:'设备 ID',children:selected.id},{key:'2',label:'部署场站',children:'杭州东站'},{key:'3',label:'设备型号',children:'服务机器人'},{key:'4',label:'网络',children:selected.network}]}/><Divider/><Descriptions column={2} title="当前状态" items={[{key:'1',label:'六态',children:<RobotStatus state={selected.state} showCode/>},{key:'2',label:'电量',children:`${selected.battery}%`},{key:'3',label:'实时位置',children:selected.location},{key:'4',label:'速度',children:`${selected.speed} m/s`},{key:'5',label:'当前任务',children:selected.task,span:2}]}/><Divider/><Tabs items={[{key:'tasks',label:'最近任务',children:<Timeline items={[{children:'路线引导 · 已完成'},{children:'巡航服务 · 已完成'},{children:'定点播报 · 已完成'}]}/>},{key:'errors',label:'最近异常',children:selected.state==='LOCK'?<Timeline items={[{color:'red',children:'急停锁定事件 · ACTIVE'}]}/>:<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="最近 7 天无设备异常"/>},{key:'logs',label:'运行日志',children:<Timeline items={[{children:`${selected.updatedAt} 状态上报 ${selected.state}`},{children:'定位心跳正常'},{children:'任务队列同步完成'}]}/>} ]}/></>}</Drawer>
  </div>
}
