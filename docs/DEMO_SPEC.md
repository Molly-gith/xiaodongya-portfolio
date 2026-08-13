# 互动 Demo 规格

## 主要路由

- `#/demo/dashboard` 运营驾驶舱
- `#/demo/robots` 机器人管理
- `#/demo/tasks` 任务调度中心
- `#/demo/materials` 内容管理
- `#/demo/geofence` 空间安全
- `#/demo/alarms` 告警中心
- `#/demo/showcase` 实时态势大屏

## 任务状态机

`CREATED → DISPATCHED → MOVING_TO_MEETING_POINT → WAITING_FOR_USER → MATCH_SUCCESS → LUGGAGE_CONFIRM → SERVING → COMPLETED`

额外状态：`PAUSED`、`CANCELLED`、`FAILED`。

## 安全演示

支持触发 ENTER、DWELL 与 LOCK；围栏事件在机器人离开后自动从 ACTIVE 转为 RESOLVED。
