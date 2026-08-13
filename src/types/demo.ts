export type RobotState = 'PATROL' | 'CHARGE' | 'POINT' | 'OFFLINE' | 'LOCK' | 'NONE'
export type TaskStatus = 'CREATED' | 'DISPATCHED' | 'MOVING_TO_MEETING_POINT' | 'WAITING_FOR_USER' | 'MATCH_SUCCESS' | 'LUGGAGE_CONFIRM' | 'SERVING' | 'PAUSED' | 'COMPLETED' | 'CANCELLED' | 'FAILED'
export type AlarmType = 'ENTER' | 'DWELL' | 'LOCK'
export type AlarmState = 'ACTIVE' | 'RESOLVED' | 'IGNORED' | 'ARCHIVED'

export interface Robot {
  id: string
  name: string
  state: RobotState
  location: string
  battery: number
  network: '良好' | '一般' | '离线'
  speed: number
  task: string
  updatedAt: string
  x: number
  y: number
}

export interface Task {
  id: string
  type: string
  meetingPoint: string
  destination: string
  robot: string
  status: TaskStatus
  createdAt: string
  distance?: number
  luggage?: boolean
}

export interface Alarm {
  id: string
  time: string
  fence: string
  robot: string
  type: AlarmType
  state: AlarmState
  sms: string
  recipient: string
}

export interface Fence {
  id: string
  name: string
  severity: 'HIGH' | 'MID' | 'LOW'
  trigger: 'ENTER' | 'DWELL'
  dwellSeconds: number
  status: 'ENABLED' | 'DISABLED'
  runtime: 'IDLE' | 'ALARMING'
  points: Array<{ x: number; y: number }>
}
