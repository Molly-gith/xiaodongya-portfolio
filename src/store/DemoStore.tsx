import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react'
import { message } from 'antd'
import type { Alarm, AlarmType, Fence, Robot, RobotState, Task, TaskStatus } from '../types/demo'

const now = () => new Date().toLocaleTimeString('zh-CN', { hour12: false })

const initialRobots: Robot[] = [
  { id: 'XDY-070030', name: '小东鸭1', state: 'PATROL', location: '出站大厅南侧', battery: 82, network: '良好', speed: .42, task: '巡航服务', updatedAt: now(), x: 30, y: 58 },
  { id: 'XDY-070041', name: '小东鸭2', state: 'POINT', location: '到达口北3', battery: 68, network: '良好', speed: 0, task: '定点咨询', updatedAt: now(), x: 59, y: 33 },
  { id: 'XDY-070058', name: '小东鸭3', state: 'CHARGE', location: '充电区 A', battery: 39, network: '一般', speed: 0, task: '—', updatedAt: now(), x: 77, y: 72 },
]

const initialTasks: Task[] = [
  { id: 'T-20260813-016', type: '路线引导', meetingPoint: '出站到达口南3', destination: '地铁入口', robot: '小东鸭2', status: 'COMPLETED', createdAt: '09:42' },
  { id: 'T-20260813-015', type: '定点播报', meetingPoint: '出站到达口北3', destination: '到达大厅', robot: '小东鸭2', status: 'COMPLETED', createdAt: '09:18' },
]

const initialAlarms: Alarm[] = [
  { id: 'A-0813-006', time: '09:16:42', fence: '警戒区 B · 西侧通道', robot: '小东鸭2', type: 'DWELL', state: 'RESOLVED', sms: '2 / 2 已送达', recipient: '现场运营组' },
  { id: 'A-0812-028', time: '昨日 17:38', fence: '— 全局安全事件', robot: '小东鸭3', type: 'LOCK', state: 'RESOLVED', sms: '2 / 2 已送达', recipient: '安全负责人' },
]

const initialFences: Fence[] = [
  { id: 'F-01', name: '危险区 A · 设备通道', severity: 'HIGH', trigger: 'ENTER', dwellSeconds: 0, status: 'ENABLED', runtime: 'IDLE', points: [{x:16,y:20},{x:40,y:17},{x:43,y:43},{x:20,y:47}] },
  { id: 'F-02', name: '警戒区 B · 西侧通道', severity: 'MID', trigger: 'DWELL', dwellSeconds: 30, status: 'ENABLED', runtime: 'IDLE', points: [{x:59,y:26},{x:82,y:24},{x:86,y:48},{x:63,y:52}] },
]

type ContextValue = {
  robots: Robot[]; tasks: Task[]; alarms: Alarm[]; fences: Fence[]; todayCompleted: number
  activeTask?: Task; demoRunning: boolean
  createTask: (input: Omit<Task, 'id'|'createdAt'|'status'>) => void
  startTaskDemo: () => void; chooseLuggage: (choice: boolean) => void; startNavigation: () => void
  taskAction: (action: 'pause'|'resume'|'end'|'complete') => void
  triggerAlarm: (type: AlarmType) => void; resolveAlarm: (id?: string) => void; ignoreAlarm: (id: string) => void
  addFence: (fence: Omit<Fence,'id'|'runtime'>) => void; toggleFence: (id: string) => void
  setRobotState: (id: string, state: RobotState) => void; resetDemo: () => void
}

const DemoContext = createContext<ContextValue | null>(null)

export function DemoProvider({ children }: { children: ReactNode }) {
  const [robots, setRobots] = useState(initialRobots)
  const [tasks, setTasks] = useState(initialTasks)
  const [alarms, setAlarms] = useState(initialAlarms)
  const [fences, setFences] = useState(initialFences)
  const [todayCompleted, setTodayCompleted] = useState(18)
  const [demoRunning, setDemoRunning] = useState(false)
  const activeTask = tasks.find(t => !['COMPLETED','CANCELLED','FAILED'].includes(t.status))

  useEffect(() => {
    const saved = localStorage.getItem('xiaodongya-demo')
    if (!saved) return
    try {
      const data = JSON.parse(saved)
      if (data.todayCompleted) setTodayCompleted(data.todayCompleted)
    } catch { /* ignore invalid local demo state */ }
  }, [])

  useEffect(() => {
    localStorage.setItem('xiaodongya-demo', JSON.stringify({ todayCompleted }))
  }, [todayCompleted])

  const patchTask = (status: TaskStatus, extra: Partial<Task> = {}) => setTasks(prev => prev.map((t, i) => i === 0 ? { ...t, status, ...extra } : t))

  const createTask: ContextValue['createTask'] = input => {
    const robot = input.robot === '自动分配' ? '小东鸭1' : input.robot
    const task: Task = { ...input, robot, id: `T-${Date.now().toString().slice(-8)}`, status: 'CREATED', createdAt: now() }
    setTasks(prev => [task, ...prev])
    message.success('任务已创建，等待派发')
  }

  const startTaskDemo = () => {
    if (demoRunning) return
    setDemoRunning(true)
    const task: Task = { id: `DEMO-${Date.now().toString().slice(-6)}`, type:'行李辅助', meetingPoint:'出站到达口南2', destination:'网约车候车区', robot:'小东鸭1', status:'CREATED', createdAt:now(), distance:25 }
    setTasks(prev => [task, ...prev.filter(t => t.status === 'COMPLETED')])
    setRobots(prev => prev.map(r => r.name === '小东鸭1' ? {...r, task:'行李辅助', state:'PATROL'} : r))
    const stages: Array<[number,TaskStatus,number?]> = [[700,'DISPATCHED',25],[1500,'MOVING_TO_MEETING_POINT',25],[2600,'WAITING_FOR_USER',18],[3800,'WAITING_FOR_USER',12],[5000,'MATCH_SUCCESS',8],[5700,'LUGGAGE_CONFIRM',8]]
    stages.forEach(([delay,status,distance]) => setTimeout(() => {
      patchTask(status, { distance })
      if (status === 'MATCH_SUCCESS') message.success('汇合成功：双方距离 8m，已自动触发')
      if (status === 'LUGGAGE_CONFIRM') setDemoRunning(false)
    }, delay))
  }

  const chooseLuggage = (choice: boolean) => { patchTask('LUGGAGE_CONFIRM', { luggage: choice }); message.info(choice ? '请将行李放置完成后开始服务' : '无需放置行李，可直接开始导航') }
  const startNavigation = () => { patchTask('SERVING'); message.success('导航服务已开始') }
  const taskAction: ContextValue['taskAction'] = action => {
    if (!activeTask) return
    if (action === 'pause') patchTask('PAUSED')
    if (action === 'resume') patchTask('SERVING')
    if (action === 'end') patchTask('CANCELLED')
    if (action === 'complete') {
      patchTask('COMPLETED'); setTodayCompleted(v => v + 1)
      setRobots(prev => prev.map(r => r.name === activeTask.robot ? {...r, task:'巡航服务', state:'PATROL'} : r))
      message.success('任务已完成，驾驶舱今日服务任务 +1')
    }
  }

  const triggerAlarm = (type: AlarmType) => {
    const isLock = type === 'LOCK'
    const alarm: Alarm = { id:`A-${Date.now().toString().slice(-7)}`, time:now(), fence:isLock?'— 全局安全事件': type === 'ENTER'?'危险区 A · 设备通道':'警戒区 B · 西侧通道', robot:'小东鸭2', type, state:'ACTIVE', sms:'2 / 2 已送达', recipient:isLock?'安全负责人':'现场运营组' }
    setAlarms(prev => [alarm, ...prev])
    if (!isLock) setFences(prev => prev.map(f => f.trigger === type ? {...f,runtime:'ALARMING'} : f))
    setRobots(prev => prev.map(r => r.name === '小东鸭2' ? {...r,state:isLock?'LOCK':r.state,x:type==='ENTER'?29:r.x,y:type==='ENTER'?31:r.y} : r))
    message.error(isLock ? 'LOCK 顶级安全事件：小东鸭2 已急停锁定' : `${type} 告警已触发，短信 2 / 2 已送达`)
  }

  const resolveAlarm = (id?: string) => {
    setAlarms(prev => prev.map(a => (id ? a.id === id : a.state === 'ACTIVE') ? {...a,state:'RESOLVED'} : a))
    setFences(prev => prev.map(f => ({...f,runtime:'IDLE'})))
    setRobots(prev => prev.map(r => r.name === '小东鸭2' ? {...r,state:'POINT',x:59,y:33} : r))
    message.success('机器人已离开风险区域，ACTIVE 已由系统自动转为 RESOLVED')
  }
  const ignoreAlarm = (id: string) => setAlarms(prev => prev.map(a => a.id === id ? {...a,state:'IGNORED'} : a))
  const addFence: ContextValue['addFence'] = fence => { setFences(prev => [...prev,{...fence,id:`F-${Date.now().toString().slice(-4)}`,runtime:'IDLE'}]); message.success('围栏已创建并进入规则引擎') }
  const toggleFence = (id:string) => setFences(prev => prev.map(f => f.id === id ? {...f,status:f.status==='ENABLED'?'DISABLED':'ENABLED',runtime:'IDLE'} : f))
  const setRobotState = (id:string,state:RobotState) => setRobots(prev => prev.map(r => r.id===id ? {...r,state,network:state==='OFFLINE'?'离线':'良好'} : r))
  const resetDemo = () => { setRobots(initialRobots);setTasks(initialTasks);setAlarms(initialAlarms);setFences(initialFences);setTodayCompleted(18);setDemoRunning(false);message.success('Demo 已重置') }

  const value = useMemo(() => ({ robots,tasks,alarms,fences,todayCompleted,activeTask,demoRunning,createTask,startTaskDemo,chooseLuggage,startNavigation,taskAction,triggerAlarm,resolveAlarm,ignoreAlarm,addFence,toggleFence,setRobotState,resetDemo }), [robots,tasks,alarms,fences,todayCompleted,activeTask,demoRunning])
  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>
}

export function useDemo() {
  const ctx = useContext(DemoContext)
  if (!ctx) throw new Error('useDemo must be used within DemoProvider')
  return ctx
}
