import { Button, Checkbox, Form, Input, Modal, Select, Space, Table, Tag, Upload, message } from 'antd'
import { CloudUploadOutlined, SendOutlined, UploadOutlined } from '@ant-design/icons'
import { useState } from 'react'

type Material={id:string;name:string;type:'图片'|'视频'|'音频';size:string;status:string;devices:string[];updatedAt:string}
const initial:Material[]=[
  {id:'M-01',name:'春运安全提醒.mp3',type:'音频',size:'2.8 MB',status:'已发布',devices:['小东鸭1','小东鸭2'],updatedAt:'今天 09:30'},
  {id:'M-02',name:'杭州东站换乘指引.png',type:'图片',size:'1.2 MB',status:'已发布',devices:['小东鸭1'],updatedAt:'昨天 16:42'},
  {id:'M-03',name:'文明出行宣传片.mp4',type:'视频',size:'18.6 MB',status:'待下发',devices:[],updatedAt:'昨天 14:08'},
]
export function Materials(){
  const [items,setItems]=useState(initial),[uploadOpen,setUploadOpen]=useState(false),[dispatch,setDispatch]=useState<Material|null>(null),[selected,setSelected]=useState<string[]>([])
  const openDispatch=(m:Material)=>{setDispatch(m);setSelected(m.devices)}
  const submitDispatch=()=>{if(!dispatch)return;setItems(v=>v.map(x=>x.id===dispatch.id?{...x,devices:selected,status:'已发布',updatedAt:'刚刚'}:x));message.success(`素材已下发至 ${selected.length} 台设备，已存在设备未重复传输`);setDispatch(null)}
  const upload=()=>{setItems(v=>[{id:`M-${Date.now().toString().slice(-4)}`,name:'新上传作品集素材.png',type:'图片',size:'1.6 MB',status:'待下发',devices:[],updatedAt:'刚刚'},...v]);setUploadOpen(false);message.success('上传完成（前端模拟）')}
  return <div className="demo-page"><div className="page-heading"><div><h1>内容管理</h1><p>统一管理机器人图片、视频与音频素材</p></div><Button type="primary" icon={<UploadOutlined/>} onClick={()=>setUploadOpen(true)}>上传素材</Button></div>
    <div className="material-filters"><Space><Select defaultValue="全部类型" options={['全部类型','图片','视频','音频'].map(v=>({value:v}))}/><Input.Search placeholder="搜索素材名称" allowClear/></Space><Tag color="gold">上传和下发均为 Mock 模拟</Tag></div>
    <Table className="data-card" rowKey="id" dataSource={items} columns={[{title:'素材名称',dataIndex:'name',render:(v,r)=><div className={`file-icon file-icon--${r.type}`}>{r.type[0]}<span>{v}</span></div>},{title:'类型',dataIndex:'type',render:v=><Tag color={v==='图片'?'blue':v==='视频'?'purple':'cyan'}>{v}</Tag>},{title:'大小',dataIndex:'size'},{title:'状态',dataIndex:'status',render:v=><Tag color={v==='已发布'?'success':'warning'}>{v}</Tag>},{title:'已下发设备',dataIndex:'devices',render:v=>v.length?v.map((x:string)=><Tag key={x}>{x}</Tag>):'—'},{title:'更新时间',dataIndex:'updatedAt'},{title:'操作',render:(_,r)=><Button type="link" icon={<SendOutlined/>} onClick={()=>openDispatch(r)}>下发至设备</Button>}]}/>
    <Modal title="上传素材" open={uploadOpen} onCancel={()=>setUploadOpen(false)} onOk={upload} okText="模拟上传"><Form layout="vertical"><Form.Item label="选择文件"><Upload.Dragger beforeUpload={()=>false} maxCount={1}><p className="ant-upload-drag-icon"><CloudUploadOutlined/></p><p>点击或拖拽文件到此区域</p><p className="ant-upload-hint">支持 JPG / PNG / MP3 / WAV / MP4</p></Upload.Dragger></Form.Item></Form></Modal>
    <Modal title={`下发素材 · ${dispatch?.name||''}`} open={!!dispatch} onCancel={()=>setDispatch(null)} onOk={submitDispatch} okText="确认下发"><p className="modal-hint">已拥有该素材的设备默认勾选；系统将避免重复下发。</p><Checkbox.Group value={selected} onChange={v=>setSelected(v as string[])} className="device-checks"><Checkbox value="小东鸭1">小东鸭1 · 在线</Checkbox><Checkbox value="小东鸭2">小东鸭2 · 在线</Checkbox><Checkbox value="小东鸭3" disabled>小东鸭3 · 离线（不可选择）</Checkbox></Checkbox.Group></Modal>
  </div>
}
