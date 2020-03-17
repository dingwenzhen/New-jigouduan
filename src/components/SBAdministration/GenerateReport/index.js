import React, { Fragment } from "react";
import { Button, Modal, Input, Select, Card, Col, Row, message, Table, Divider, Icon } from "antd"
import { CHECKVALUEPAI } from "@api"
import Calendar from "./calendar"
import ReverseChecking from "./ReverseChecking"
import { SCSHVALUE, AcquisitionState, HQLCLIST, LCTIME, ReUploadApi } from "@api/SHGL.js"

import Axios from "axios";
import Websocket from 'react-websocket';
import Cookies from "js-cookie";
const { Option } = Select;

class SBAdministration extends React.Component {
    constructor() {
        super()
        this.state = {
            data: [],
            visible: false,
            ReverseChecking: false,
            EditListValue: [],
            Rotation: "",
            calendarTime: "",
            calendarTime: "请选择时间",
            SelectArray: [],
            totalJCSJZL: '0',
            totalRuleSeq: '0',
            totalSFSJBL: '0',
            totalSFSJZL: '0',
            dcdatasum: '0',
            pagetitle: '',
            pageBool: false,
            TableList: [],
            page: 1,
            selectedRowKeys: []

        }
    }
    render() {
        const columns = [
            {
                title: '监管主题分类',
                dataIndex: 'jgztfl',
                width: 150,
                ellipsis: true,
            },
            {
                title: '监管主题分类编号',
                dataIndex: 'jgztflbm',
                width: 150,
                ellipsis: true,
            },
            {
                title: '检核表名',
                dataIndex: 'bmEn',
                ellipsis: true,
            },
            {
                title: '中文表名',
                dataIndex: 'bmCn',
                ellipsis: true,
            },
            {
                title: '文件名称',
                dataIndex: 'papersName',
                ellipsis: true,
            },
            {
                title: '检核时间',
                dataIndex: 'jhsj',
                ellipsis: true,
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => {
                    if (record.status == 1) {
                        return <span>
                            <span>重新上传 </span>
                            <Icon onClick={this.uploadClick.bind(this, record)} type="redo" />
                        </span>
                    } else if (record.status == 0) {
                        return <span>
                            <a onClick={this.uploadFailClick.bind(this, record)}>重新上传</a>
                            <Divider type="vertical" />
                            <a onClick={this.coverClick.bind(this, record)}>覆盖</a>
                        </span>
                    } else if (record.status == -1) {
                        return <span>
                            <a onClick={this.uploadClick.bind(this, record)}>上传</a>
                        </span>
                    }
                },
            },
            {
                title: '状态',
                ellipsis: true,
                render: (text, record) => {
                    if (record.status == 0) {
                        return <span>上传成功</span>
                    } else if (record.status == 1) {
                        return <span>上传失败</span>
                    } else if (record.status == -1) {
                        return <span>等待上传</span>
                    }
                }
            },
        ]
        const { loading, selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        return (
            <Fragment>
                <div style={{ height: '40px', backgroundColor: '#fff', lineHeight: '40px', paddingLeft: 10, fontSize: '14px', color: '#333' }}>
                    当前位置：首页-上报管理
                </div>
                <div style={{ padding: '10px', height: '100%' }} className="SHLSFX">
                    <div style={{ display: 'flex', justifyContent: "space-between" }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div
                                onClick={this.RLClickhandler.bind(this)}
                                style={{
                                    width: '100px',
                                    height: '32px',
                                    border: 'solid 1px #d9d9d9',
                                    borderRadius: '4px',
                                    backgroundColor: '#fff',
                                    display: 'inline-block',
                                    margin: '6px',
                                    color: '#666',
                                    lineHeight: '32px',
                                    paddingLeft: '5px',
                                    cursor: 'pointer'
                                }} >
                                {this.state.calendarTime}
                            </div>
                            <Select defaultValue="请选择轮次" style={{ width: 120 }} onChange={this.handleChange.bind(this)}>
                                {
                                    this.state.SelectArray.map(item => {
                                        return <Option value={item} key={item}>{item}</Option>
                                    })
                                }
                            </Select>
                            <Button type="primary" style={{ margin: '6px' }} onClick={this.QueryData.bind(this)}>生成报告</Button>
                            <Button type='primary' style={{ marginLeft: '20px' }} onClick={this.NewClickExcel.bind(this)}>导出excel</Button>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Input placeholder="请选择导出数量"
                                value={this.state.dcdatasum}
                                style={{ marginRight: '20px' }}
                                onChange={this.DCSumInput.bind(this)} />
                            <Button type="primary" onClick={this.DCExcel.bind(this)}>导出样本</Button>
                            <Button type="primary"
                                onClick={this.SCSBClickhandler.bind(this)}
                                style={{ margin: '6px' }}>上报</Button>
                        </div>
                    </div>
                    <div style={{ padding: '10px' }}>
                        <Row gutter={16}>
                            <Col span={6} style={{ textAlign: 'center' }}>
                                <Card title="检查规则数量" bordered={false} style={{ padding: '20px 0' }}>
                                    {this.state.totalRuleSeq}
                                </Card>
                            </Col>
                            <Col span={6} style={{ textAlign: 'center' }}>
                                <Card title="检查数据总量" bordered={false} style={{ padding: '20px 0' }}>
                                    {this.state.totalJCSJZL}
                                </Card>
                            </Col>
                            <Col span={6} style={{ textAlign: 'center' }}>
                                <Card title="失范数据总量" bordered={false} style={{ padding: '20px 0' }}>
                                    {this.state.totalSFSJZL}
                                </Card>
                            </Col>
                            <Col span={6} style={{ textAlign: 'center' }}>
                                <Card title="失范数据比例" bordered={false} style={{ padding: '20px 0' }}>
                                    {this.state.totalSFSJBL}
                                </Card>
                            </Col>
                        </Row>
                        <Button type='primary' onClick={this.uploadListClick.bind(this)}>上传</Button>
                        <Table columns={columns} dataSource={this.state.TableList}
                            rowSelection={rowSelection}
                            pagination={{ pageSize: 50 }} scroll={{ y: 240 }}
                            style={{ backgroundColor: '#fff', marginTop: '20px' }} />
                    </div>
                </div>
                }
                <Modal
                    title="日历"
                    visible={this.state.visible}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                    className="Supervise"
                >
                    <Calendar calendarTime={this.CanlerTime.bind(this)}></Calendar>
                </Modal>
                <Modal
                    title="数据反查"
                    visible={this.state.ReverseChecking}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                    className="ReverseChecking"

                >
                    <ReverseChecking
                        CloseClick={this.CloseClick.bind(this)}
                        val={this.state.EditListValue}
                    />
                </Modal>
                <Websocket url='ws://localhost:8888/live/product/12345/'
                    onMessage={this.handleData.bind(this)} />
            </Fragment>
        )
    }
    componentDidMount() {
        this.HandlerValue()
    }
    // webscoket
    handleData(data) {
        console.log(JSON.parse(data))
        // let result = JSON.parse(data);
        // this.setState({count: this.state.count + result.movement});
    }
    onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    }
    //   上传多个
    uploadListClick() {
        let data = this.state.selectedRowKeys
        let TableList = this.state.TableList
        let arr = []
        for (var i = 0; i < data.length; i++) {
            for (var j = 0; j < TableList.length; j++) {
                if (data[i] == j) {
                    arr.push(TableList[j].papersName)
                }
            }
        }
        let List = { arry: arr, bool: false }

        this.statusDafault(List)
    }

    // uploadFailClick 重新上传
    uploadFailClick(record) {
        let obj = {}
        let arr = []
        obj.ftpstatus = 2
        obj.papersName = record.papersName
        obj.bmEn = record.bmEn
        arr.push(record.papersName)
        let List = { arry: arr, bool: false }
        this.statusDafault(List)
    }
    // 上传
    uploadClick(record) {
        let obj = {}
        let arr = []
        obj.ftpstatus = -1
        obj.papersName = record.papersName
        obj.bmEn = record.bmEn
        arr.push(record.papersName)
        let List = { arry: arr, bool: true }
        this.statusDafault(List)
    }
    // coverClick 覆盖
    coverClick(record) {
        let obj = {}
        let arr = []
        obj.ftpstatus = 3
        obj.papersName = record.papersName
        obj.bmEn = record.bmEn
        arr.push(record.papersName)
        let List = { arry: arr, bool: false }
        this.statusDafault(List)
    }
    async statusDafault(obj) {
        let _this = this
        let TableList = this.state.TableList
        let stateusetTime = setInterval(async function () {
            let status = await AcquisitionState()
            let data = data.data
            let arry = Object.keys(data)
            let List = []
            for (var i = 0; i < arry.length; i++) {
                List.push(data.arry[i])
                for (var j = 0; j < TableList.length; j++) {
                    let toUpperCase = arry[i].toLowerCase()
                    if (toUpperCase == TableList[j]) {
                        TableList[j].status = data.arry[i]
                    }
                }
            }
            let bool = List.every(function (item, index, array) {
                return item != -1
            })
            if (bool) {
                clearInterval(stateusetTime)
            }
        }, 10000)
        // 点击上传的数据
        let data = await ReUploadApi(obj)
        if (data.code == -1) {
            clearInterval(stateusetTime)
        } else if (data.code != 200) {
            clearInterval(stateusetTime)
            message.error('连接服务器失败请联系管理员')
        }
    }
    // 轮次的下拉
    handleChange(value) {

        this.setState({
            SelectValue: value
        })
        console.log(`selected ${value}`);
    }
    // 请选择导出数量
    DCSumInput(e) {
        this.setState({
            dcdatasum: e.target.value
        })
    }
    // 双击弹窗
    async thatsOk(record) {
        let ListValueApi = await CHECKVALUEPAI(record.ruleSeq)
        if (ListValueApi.msg == '成功') {
            this.setState({
                ReverseChecking: true,
                EditListValue: ListValueApi.data
            })
        } else {
            message.error(ListValueApi.msg)
        }

    }

    p(s) {
        return s < 10 ? '0' + s : s
    }
    async HandlerValue() {
        let DQTime = {}
        const d = new Date()
        const resDate = d.getFullYear() + '-' + this.p((d.getMonth() + 1)) + '-' + this.p(d.getDate())
        let Array = resDate.split("-")
        let str = ""
        for (var i = 0; i < Array.length; i++) {
            str += Array[i]
        }
        DQTime.Time = str
        let data = await SCSHVALUE(DQTime)
        if (data.data) {
            this.setState({
                pageBool: true,
                data: data.data.page.list,
                currPage: data.data.page.currPage,
                totalCount: data.data.page.totalCount
            })
            console.log(data, "opopop")
        } else {
            this.setState({
                pageBool: false,
                pagetitle: data.msg
            })
        }
    }
    // onChange
    onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    }

    // 日历按钮
    RLClickhandler() {
        this.setState({
            visible: true
        })
    }
    // 点击日期关闭弹窗
    async CanlerTime(val) {
        let FromArr = {}
        let Array = val.split("-")
        console.log(Array)
        let str = ""
        for (var i = 0; i < Array.length; i++) {
            str += Array[i]
        }
        FromArr.Time = str
        FromArr.sblc = ""
        console.log(FromArr, "FromArr")

        this.TimeLC(FromArr)
        this.setState({
            visible: false,
            calendarTime: val
        })
    }
    // 根据时间获取轮次
    async TimeLC(FromArr) {
        let TimeData = await HQLCLIST(FromArr)
        if (TimeData.msg == "成功") {
            console.log(11)
            this.setState({
                SelectArray: TimeData.data
            }, () => {
                console.log(this.state.SelectArray, "Select")
            })
        }
    }

    // 生成上报
    SCSBClickhandler() {
        let _this = this
        console.log(this.state.calendarTime)
        console.log(this.state.SelectValue)
        if (this.state.calendarTime != '请选择时间' && this.state.SelectValue > 0) {
            let Array = this.state.calendarTime.split("-")
            let str = ""
            for (var i = 0; i < Array.length; i++) {
                str += Array[i]
            }
            console.log('生成上报')
            Axios({
                url: `${window.apiUrl}/review/Appear/exportOut`,
                method: 'get',
                responseType: 'blob',
                headers: {
                    'token': Cookies.get("67ae207794a5fa18fff94e9b62668e5c").split('"')[1]
                },
                params: {
                    'cjrq': str,
                    'jclc': _this.state.SelectValue
                }
            }).then(({ data }) => {
                console.log(data, '132')
                const blob = new Blob([data], { type: 'application/vnd.ms-excel;charset=utf-8' })
                var link = document.createElement('a')
                link.href = window.URL.createObjectURL(blob)
                link.download = _this.state.calendarTime + '.xls'
                link.click()
            })
        } else {
            this.error()
        }

    }
    error = () => {
        message.error('请您选择时间跟轮次');
    };
    // 点击确定关闭弹窗
    handleOk() {
        this.setState({
            visible: false,
            ReverseChecking: false
        })
    }
    // 点击取消关闭弹窗
    handleCancel() {
        this.setState({
            visible: false,
            ReverseChecking: false
        })
    }
    // 导出excel表格
    async DCExcel() {
        let TxTData = {}
        let Time = this.state.calendarTime
        let Array = Time.split("-")
        let str = ""
        for (var i = 0; i < Array.length; i++) {
            str += Array[i]
        }
        TxTData.cjrq = str
        TxTData.jclc = this.state.SelectValue
        TxTData.number = this.state.dcdatasum
        console.log(TxTData)
        if (TxTData.cjrq != '请选择时间' && TxTData.jclc && TxTData.number >= 0) {
            Axios({
                url: `${window.apiUrl}/review/Appear/inTheNewspapersLeadingOut`,
                method: 'get',
                responseType: 'blob',
                headers: {
                    'token': Cookies.get("67ae207794a5fa18fff94e9b62668e5c").split('"')[1]
                },
                params: {
                    'cjrq': TxTData.cjrq,
                    'jclc': TxTData.jclc,
                    'number': TxTData.number
                }
            }).then(({ data }) => {
                console.log(data, '132')
                const blob = new Blob([data], { type: 'application/vnd.ms-excel;charset=utf-8' })
                var link = document.createElement('a')
                link.href = window.URL.createObjectURL(blob)
                link.download = TxTData.cjrq + '.zip'
                link.click()
            })
        } else {
            this.error()
        }

    }
    // 关闭数据反查弹框
    CloseClick() {
        this.setState({
            ReverseChecking: false
        })
    }
    // 附加导出excel
    NewClickExcel() {
        let _this = this
        let queryData = {}
        let Time = this.state.calendarTime
        let Array = Time.split("-")
        console.log(Array)
        let str = ""
        for (var i = 0; i < Array.length; i++) {
            str += Array[i]
        }
        queryData.Time = str
        queryData.SelectValue = this.state.SelectValue
        Axios({
            url: `${window.apiUrl}/review/Appear/exportFileNameReport`,
            method: 'get',
            responseType: 'blob',
            headers: {
                'token': Cookies.get("67ae207794a5fa18fff94e9b62668e5c").split('"')[1]
            },
            params: {
                'cjrq': queryData.Time,
                'jclc': queryData.SelectValue
            }
        }).then(({ data }) => {
            console.log(data, '132')
            const blob = new Blob([data], { type: 'application/vnd.ms-excel;charset=utf-8' })
            var link = document.createElement('a')
            link.href = window.URL.createObjectURL(blob)
            link.download = queryData.Time + '.excel'
            link.click()
        })

    }
    // 点击生成报告，获取日历-轮次
    async QueryData() {
        let _this = this
        let queryData = {}
        let Time = this.state.calendarTime
        let Array = Time.split("-")
        console.log(Array)
        let str = ""
        for (var i = 0; i < Array.length; i++) {
            str += Array[i]
        }

        queryData.Time = str
        queryData.SelectValue = this.state.SelectValue
        let LCTime = await LCTIME(queryData)
        if (LCTime.msg == '成功') {
            this.setState({
                totalJCSJZL: _this.formatNum(LCTime.data[0].totalJCSJZL),
                totalRuleSeq: _this.formatNum(LCTime.data[0].totalRuleSeq),
                totalSFSJBL: LCTime.data[0].totalSFSJBL,
                totalSFSJZL: _this.formatNum(LCTime.data[0].totalSFSJZL),
                dcdatasum: LCTime.data[0].totalJCSJZL,
                TableList: LCTime.data[0].wjjhjlbs
            })
        } else {
            message.error(LCTime.msg)
        }

    }
    formatNum(num) {
        if (!/^(\+|-)?(\d+)(\.\d+)?$/.test(num)) { alert("wrong!"); return num; }
        var a = RegExp.$1, b = RegExp.$2, c = RegExp.$3;
        var re = new RegExp().compile("(\\d)(\\d{3})(,|$)");
        while (re.test(b)) b = b.replace(re, "$1,$2$3");
        return a + "" + b + "" + c;
    }
}
export default SBAdministration