import { Alert, Button, Divider } from 'antd'
import { AlertOutlined, PlayCircleOutlined, ReloadOutlined, RobotOutlined, SafetyCertificateOutlined } from '@ant-design/icons'
import { useDemo } from '../../store/DemoStore'

export function DemoControl({onNavigate}:{onNavigate:(path:string)=>void}) {
  const { resetDemo,startTaskDemo,triggerAlarm,setRobotState } = useDemo()
  return <div className="control-panel">
    <Alert type="info" showIcon message="面试演示快捷入口" description="所有操作仅改变本地 Mock 状态，不连接生产系统。"/>
    <Divider>任务流程</Divider>
    <Button block type="primary" icon={<PlayCircleOutlined/>} onClick={()=>{onNavigate('/demo/tasks');setTimeout(startTaskDemo,150)}}>启动任务演示</Button>
    <Divider>安全事件</Divider>
    <div className="control-grid">
      <Button icon={<SafetyCertificateOutlined/>} onClick={()=>{triggerAlarm('ENTER');onNavigate('/demo/geofence')}}>触发 ENTER</Button>
      <Button icon={<AlertOutlined/>} onClick={()=>{triggerAlarm('DWELL');onNavigate('/demo/alarms')}}>触发 DWELL</Button>
      <Button danger icon={<AlertOutlined/>} onClick={()=>{triggerAlarm('LOCK');onNavigate('/demo/alarms')}}>触发 LOCK</Button>
    </div>
    <Divider>设备状态</Divider>
    <div className="control-grid">
      <Button icon={<RobotOutlined/>} onClick={()=>setRobotState('XDY-070041','OFFLINE')}>机器人离线</Button>
      <Button onClick={()=>setRobotState('XDY-070041','POINT')}>恢复机器人</Button>
    </div>
    <Divider/>
    <Button block icon={<ReloadOutlined/>} onClick={resetDemo}>重置 Demo</Button>
  </div>
}
