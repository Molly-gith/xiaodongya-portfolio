import { Alert, Button, Card, Col, Form, Input, InputNumber, Modal, Radio, Row, Select, Space, Switch, Tag } from 'antd'
import { AimOutlined, CloseOutlined, PlusOutlined, SafetyCertificateOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { useDemo } from '../../store/DemoStore'
import { StationMap } from '../components/StationMap'

export function Geofence(){
  const demo=useDemo();const [drawing,setDrawing]=useState(false),[points,setPoints]=useState<Array<{x:number;y:number}>>([]),[modal,setModal]=useState(false),[form]=Form.useForm()
  const addPoint=(x:number,y:number)=>{if(!drawing)return;setPoints(v=>[...v,{x,y}])}
  const finish=()=>{if(points.length<3)return;setDrawing(false);setModal(true)}
  const save=()=>form.validateFields().then(v=>{demo.addFence({...v,points,status:v.status?'ENABLED':'DISABLED'});setModal(false);setPoints([]);form.resetFields()})
  const active=demo.alarms.some(a=>a.state==='ACTIVE'&&a.type!=='LOCK')
  return <div className="demo-page"><div className="page-heading"><div><h1>空间安全</h1><p>用可配置规则管理机器人在真实空间中的运行风险</p></div><Space>{active&&<Button danger onClick={()=>demo.resolveAlarm()}>机器人离开围栏</Button>}<Button type="primary" icon={<SafetyCertificateOutlined/>} onClick={()=>demo.triggerAlarm('ENTER')}>模拟安全事件</Button></Space></div>
    {active&&<Alert className="alarm-banner" type="error" showIcon message="危险区 A 正在告警" description="小东鸭2 已进入围栏 · ENTER · ACTIVE · 短信 2 / 2 已送达；机器人离开后系统将自动 RESOLVED。"/>}
    <Row gutter={[16,16]}><Col xs={24} xl={16}><Card title="站内地图" extra={<Space>{drawing&&<Tag color="processing">已添加 {points.length} 个顶点</Tag>}<Button icon={<AimOutlined/>} onClick={()=>{setDrawing(true);setPoints([])}}>新建围栏</Button>{drawing&&<Button type="primary" disabled={points.length<3} onClick={finish}>闭合多边形</Button>}{drawing&&<Button icon={<CloseOutlined/>} onClick={()=>{setDrawing(false);setPoints([])}}/>}</Space>}>
      {drawing&&<Alert banner type="info" message="正在绘制围栏 — 点击地图添加顶点，至少 3 点后点击“闭合多边形”"/>}<div className="fence-map-wrap"><StationMap interactive={drawing} onMapClick={addPoint}/>{points.map((p,i)=><span className="draft-point" key={i} style={{left:`${p.x}%`,top:`${p.y}%`}}>{i+1}</span>)}</div>
    </Card></Col><Col xs={24} xl={8}><Card title="围栏列表" extra={<Tag>{demo.fences.length} 个</Tag>}><div className="fence-list">{demo.fences.map(f=><div className={`fence-item ${f.runtime==='ALARMING'?'is-alarming':''}`} key={f.id}><div><i className={`severity-dot severity-dot--${f.severity.toLowerCase()}`}/><b>{f.name}</b><Tag color={f.runtime==='ALARMING'?'red':'default'}>{f.runtime}</Tag></div><p>{f.severity} · {f.trigger}{f.trigger==='DWELL'?` ${f.dwellSeconds}s`:''}</p><span>{f.status}</span><Switch size="small" checked={f.status==='ENABLED'} onChange={()=>demo.toggleFence(f.id)}/></div>)}</div></Card>
      <Card className="rule-card" title="规则说明"><p><Tag color="red">ENTER</Tag>进入围栏立即触发</p><p><Tag color="orange">DWELL</Tag>停留超过阈值触发</p><p><Tag color="cyan">POINT</Tag>豁免 DWELL，但 ENTER 仍触发</p><p><Tag>OFFLINE / NONE</Tag>不参与判定</p><p><Tag color="red">LOCK</Tag>全局顶级事件，与围栏无关</p></Card></Col></Row>
    <Modal title="新建围栏" open={modal} onCancel={()=>setModal(false)} onOk={save}><Form form={form} layout="vertical" initialValues={{severity:'MID',trigger:'ENTER',dwellSeconds:30,status:true}}><Form.Item name="name" label="名称" rules={[{required:true}]}><Input placeholder="例如：警戒区 C · 设备检修区"/></Form.Item><Form.Item name="severity" label="危险等级"><Radio.Group optionType="button" options={['HIGH','MID','LOW']}/></Form.Item><Form.Item name="trigger" label="触发规则"><Radio.Group options={[{value:'ENTER',label:'ENTER · 进入立即触发'},{value:'DWELL',label:'DWELL · 驻留超时触发'}]}/></Form.Item><Form.Item noStyle shouldUpdate={(a,b)=>a.trigger!==b.trigger}>{({getFieldValue})=>getFieldValue('trigger')==='DWELL'&&<Form.Item name="dwellSeconds" label="DWELL 秒数"><InputNumber min={5} max={300} addonAfter="秒"/></Form.Item>}</Form.Item><Form.Item name="status" label="创建即启用" valuePropName="checked"><Switch/></Form.Item></Form></Modal>
  </div>
}
