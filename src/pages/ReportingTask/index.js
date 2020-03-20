import React, { Fragment } from 'react'
import { Input, DatePicker, Button, Table, Divider,Pagination,message } from 'antd'
// import {queryApi,deleteIdApi} from '@api/Administration/ReportingTask'
class ReportingTask extends React.Component {
    constructor() {
        super()
        this.state = {
            taskNumber: '',
            DatePickerTime: '',
            page: 1,
            totalCount:10,
            data:[]
        }
    }
    render() {
        const columns = [
            {
                title: '任务号',
                dataIndex: 'taskNumber',
                key: 'taskNumber',
                ellipsis: true,
            },
            {
                title: '采集日期',
                dataIndex: 'cjrq',
                key: 'cjrq',
                ellipsis: true,
            },
            {
                title: '截止上报时间',
                dataIndex: 'upTodata',
                key: 'upTodata',
                ellipsis: true,
            },
            // {
            //     title: '银行机构',
            //     key: 'yhjgdm',
            //     dataIndex: 'yhjgdm',
            //     ellipsis: true,
            // },
            {
                title: '规则名称',
                key: 'ruleSeq',
                dataIndex: 'ruleSeq',
                ellipsis: true,
            },
            {
                title: '上报文件清单',
                key: 'bmCn',
                dataIndex: 'bmCn',
                ellipsis: true,
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <span>
                        <a>下发</a>
                        <Divider type="vertical" />
                        <a onClick={this.deleteIdClick.bind(this,text, record)}>删除</a>
                    </span>
                ),
            },
        ]
        return (
            <Fragment>
                <div style={{ height: '40px', backgroundColor: '#fff', lineHeight: '40px', paddingLeft: 10, fontSize: '14px', color: '#333' }}>
                    当前位置：首页-任务管理
                </div>
                <div style={{ padding: '10px' }} className='jindu'>
                <span >采集日期：<DatePicker onChange={this.DatePickerTime.bind(this)} /></span>
                    <span style={{ marginLeft: '10px' }}>任务号：<Input style={{ width: '150px'}} value={this.state.taskNumber}
                        onChange={this.taskNumberInput.bind(this)} /></span>
                   
                    <Button style={{ marginLeft: '10px' }} type='primary' onClick={this.queryDataClick.bind(this)}>查询</Button>
                    <Button style={{ marginLeft: '10px' }} onClick={this.CancelClick.bind(this)}>重置</Button>
                    <Button style={{ marginLeft: '10px' }}  onClick={this.NewNewReportingTask.bind(this)}>新增上报任务</Button>
                    
                </div>
                <div style={{ padding: '10px' }} className='jindu supervisorTableFY'>
                    <Table style={{backgroundColor:'#fff'}} columns={columns} dataSource={this.state.data} />
                    <Pagination style={{float:'right',marginTop:'10px'}} showQuickJumper 
                    current={this.state.page} total={this.state.totalCount} onChange={this.Pagination.bind(this)} />
                </div>
            </Fragment>
        )
    }
    componentDidMount(){
        // this.DafaultData()
    }
    // 跳转到新增上报任务页面
    NewNewReportingTask(){
        this.props.history.push('/NewReportingTask')
    }
    // 任务号
    taskNumberInput(e) {
        this.setState({
            taskNumber: e.target.value
        })
    }
    // 采集日期
    DatePickerTime(date, dateString) {
        let arr = dateString.split('-')
        let str = ''
        for( var i = 0 ; i<arr.length ; i++ ){
            str+=arr[i]
        }
        this.setState({
            DatePickerTime: str
        })
    }
    // 查询
    queryDataClick() {
        this.DafaultData()
    }
    // 重置
    CancelClick() {
        this.setState({
            DatePickerTime: '',
            taskNumber:'',
            page: 1
        }, () => {
            this.DafaultData()
        })
    }
    // 分页器
    Pagination(pageNumber){
        this.setState({
            page:pageNumber
        })
    }
    // 查询+分页+初始化数据=请求的接口函数
    async DafaultData() {
        let obj = {}
        obj.taskNumber = this.state.taskNumber
        obj.DatePickerTime = this.state.DatePickerTime
        obj.page = this.state.page
        console.log(obj)
        // let data = await queryApi(obj)
        // this.setState({
        //     data:data.data.page.list,
        //     totalCount:data.data.page.totalCount,
        //     page:data.data.page.currPage
        // })
    }
    // 删除
    async deleteIdClick(text, record){
        // let data = await deleteIdApi(record.id)
        // if(data.msg == '成功'){
        //     this.DafaultData()
        //     this.success('删除成功')
        // }else{
        //     this.error(data.msg)
        // }
        // console.log()
    }
    success = (val) => {
        message.success(val);
      }
      error = (val) => {
        message.error(val);
      }
}
export default ReportingTask