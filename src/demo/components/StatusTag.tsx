import { Badge, Tag } from 'antd'
import type { AlarmState, RobotState, TaskStatus } from '../../types/demo'

const robotMap: Record<RobotState,{label:string;color:string}> = {
  PATROL:{label:'巡航中',color:'#1f9d6f'},CHARGE:{label:'充电中',color:'#ed8a00'},POINT:{label:'定点服务',color:'#14b8a6'},OFFLINE:{label:'离线',color:'#d04040'},LOCK:{label:'急停锁定',color:'#b91c1c'},NONE:{label:'未知',color:'#7a8da0'},
}
const taskMap: Record<TaskStatus,string> = {CREATED:'任务已创建',DISPATCHED:'已派发机器人',MOVING_TO_MEETING_POINT:'前往汇合点',WAITING_FOR_USER:'等待用户汇合',MATCH_SUCCESS:'自动汇合成功',LUGGAGE_CONFIRM:'行李确认',SERVING:'服务中',PAUSED:'已暂停',COMPLETED:'已完成',CANCELLED:'已取消',FAILED:'失败'}

export function RobotStatus({state,showCode=false}:{state:RobotState;showCode?:boolean}) { const m=robotMap[state];return <Tag color={m.color}>{showCode?`${state} · `:''}{m.label}</Tag> }
export function TaskStatusTag({status}:{status:TaskStatus}) { return <Tag color={status==='COMPLETED'?'success':status==='FAILED'||status==='CANCELLED'?'default':status==='PAUSED'?'warning':'blue'}>{taskMap[status]}</Tag> }
export function AlarmStatusTag({state}:{state:AlarmState}) { const map={ACTIVE:['error','ACTIVE 进行中'],RESOLVED:['success','RESOLVED 已恢复'],IGNORED:['default','IGNORED 误报'],ARCHIVED:['default','ARCHIVED 已归档']} as const;return <Badge status={map[state][0]} text={map[state][1]}/> }
export { robotMap,taskMap }
