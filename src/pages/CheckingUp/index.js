import React, { Fragment } from "react";
import { Form, Table, Button, Input, Progress } from "antd"
// import WebSocket from "ws"
import { conditionApi } from "@api"
import connect from "./connect.js"
import { JHTZCK, JHIDSH } from "@api"
import { JHZTCX, SSZTCX } from "@api/CheckingUp"
import BackFirst from '@pages/BackFirst'
@connect
@Form.create()
class CheckingUp extends React.Component {
    constructor() {
        super()
        this.state = {
            FromListValue: [],
            data: [],
            sortedInfo: null,
            filteredInfo: null,
            currPage: 1,
            totalCount: 20,
            flag: false,
            arrId: [],
            visible: false,
            EditFromValue: {},
            NewlyAdded: false,
            visibleNew: false,
            ruleSeq: '',//规则号
            cid: '1',
            trueCount: 0,
            FromListStatus: [],//总数据
            Percentage: 0,//百分比
            ErrorValue: 0,//失败数
            TrueValue: 0,//成功数
            ChickTime: 0,
            queryTotalStatus: 0,
           
        }
    }
    render() {
        let { sortedInfo, filteredInfo } = this.state;
        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {};
        const columns = [
            {
                title: '规则号',
                dataIndex: 'ruleSeq',
                key: 'ruleSeq',
                width: "120px",
                align: 'center',
                sortOrder: sortedInfo.columnKey === 'ruleSeq' && sortedInfo.order,
                ellipsis: true,
            },
            {
                title: '规则描述',
                dataIndex: 'ruleDesc',
                key: 'ruleDesc',
                align: 'center',
                sortOrder: sortedInfo.columnKey === 'ruleDesc' && sortedInfo.order,
                ellipsis: true,
            },
            {
                title: '中文表名',
                dataIndex: 'srcTabNameCn',
                key: 'srcTabNameCn',
                align: 'center',
                sortOrder: sortedInfo.columnKey === 'srcTabNameCn' && sortedInfo.order,
                ellipsis: true,
            },
            {
                title: '英文表名',
                dataIndex: 'srcTabNameEn',
                key: 'srcTabNameEn',
                align: 'center',
                filteredValue: filteredInfo.address || null,
                sortOrder: sortedInfo.columnKey === 'srcTabNameEn' && sortedInfo.order,
                ellipsis: true,
            },
            {
                title: '目标字段',
                dataIndex: 'dataFieldCode',
                key: 'dataFieldCode',
                align: 'center',
                filteredValue: filteredInfo.address || null,
                sortOrder: sortedInfo.columnKey === 'dataFieldCode' && sortedInfo.order,
                ellipsis: true,
            },
            {
                title: '执行状态',
                dataIndex: 'statusType',
                key: 'statusType',
                align: 'center',
                sortOrder: sortedInfo.columnKey === 'statusType' && sortedInfo.order,
                ellipsis: true,
            }


        ];

        return (

            <Fragment>
                <div style={{ height: '40px', backgroundColor: '#fff', lineHeight: '40px', paddingLeft: 10, fontSize: '14px', color: '#333' }}>
                    当前位置：首页-检核状态
                </div>
                <div style={{ padding: '10px' }}>
                    <div>
                        <Button type="primary" onClick={this.BackHistory.bind(this)} style={{ marginRight: '10px' }}>返回</Button>
                        <Button type="primary" onClick={this.StatusSeeClick.bind(this)} style={{ margin: '0 0 6px 0' }}>查看结果</Button>
                        <div style={{ float: 'right' }}>
                            <Input placeholder="请输入规则号"
                                style={{ width: '140px', margin: '0 10px' }}
                                onChange={this.RuleSeqInput.bind(this)} />
                            <Button type="primary" onClick={this.QueryInputValue.bind(this)}>查询</Button>
                        </div>
                    </div>
                    <div style={{ margin: '10px 0' }} className="jindu">
                        <div style={{ float: 'left' }}>
                            <Progress percent={this.state.Percentage} status="active" style={{ width: '600px' }} />
                        </div>
                        <div style={{ float: 'right' }}>
                            <span>检核时间：{this.state.ChickTime}</span>
                            <span> 失败总数：{this.state.ErrorValue}</span>
                            <span> 成功总数：{this.state.TrueValue}</span>
                        </div>
                    </div>
                    <Table columns={columns}
                        dataSource={this.state.FromListStatus}
                        onChange={this.handleChange.bind(this)}
                        style={{ backgroundColor: '#fff' }
                        }
                    >
                    </Table>
                </div>

            </Fragment>
        )
    }
    //    查看结果
    StatusSeeClick() {
        this.props.history.push("/DataChecking/Historical")
    }
    componentDidMount() {
        this.setIntervalValue(true)
        let ReviewId = JSON.parse(localStorage.getItem('review'))
        console.log(ReviewId)
        if (ReviewId == 1) {
            this.setState({
                Percentage: 0,
                ErrorValue: 0,
                TrueValue: 0
            })
        }
    }
    
    setIntervalValue(val) {
        let _this = this
        let FromListStatus;
        let Time = setInterval(async function () {
            console.log(_this.state.queryTotalStatus,_this.state.queryTotalSeq)
            if (_this.state.queryTotalStatus == _this.state.queryTotalSeq) {
                localStorage.setItem('review', JSON.stringify(0))
                clearInterval(Time)
            }
            let Array = []
            let reviewData = await SSZTCX()
            FromListStatus = reviewData.data.execStatusList
            for (var i = 0; i < FromListStatus.length; i++) {
                if (FromListStatus[i].ruleSeq != "anumber") {
                    FromListStatus[i].statusType = '正在执行'
                    Array.push(FromListStatus[i])
                }
            }
            _this.setState({
                FromListStatus:Array
            })
            if (reviewData.data) {
                let sum = reviewData.data.queryStatusError + reviewData.data.queryStatusTrue
                if (sum == reviewData.data.queryTotalStatus) {
                    clearInterval()
                }
                for (var i = 0; i < Array.length; i++) {
                    for (var k = 0; k < reviewData.data.execStatusList.length; k++) {
                        if (Array[i].ruleSeq == reviewData.data.execStatusList[k].ruleSeq) {
                            if (reviewData.data.execStatusList[k].status == '1') {
                                Array[i].statusType = '执行成功'
                            } else if (reviewData.data.execStatusList[k].status == '2') {
                                Array[i].statusType = '执行失败'
                            }
                        }
                    }
                }
                _this.setState({
                    ChickTime: reviewData.data.checktime,
                    ErrorValue: reviewData.data.queryStatusError,
                    TrueValue: reviewData.data.queryStatusTrue,
                    Percentage: Math.ceil((reviewData.data.queryTotalStatus / reviewData.data.queryTotalSeq) * 100),
                    queryTotalStatus: reviewData.data.queryTotalStatus,
                    FromListStatus: Array,
                    queryTotalSeq: reviewData.data.queryTotalSeq
                })
                console.log(Array)
                let FromName = _this.$encryptionData('FromListStatus')
                let FromList = _this.$encryptionData(Array)
                // console.log(FromName)
                localStorage.setItem(FromName, JSON.stringify(FromList))
            }
        }, 2000)
        if(!val){
            clearInterval(Time)
        }
    }
    
    HandlerValue() {
        console.log(1)
    }
    async QueryFromList(val) {
        let QueryFromListValue = await conditionApi(val)
        console.log(QueryFromListValue)
    }
    RewviewFromList(val) {

    }
    p(s) {
        return s < 10 ? '0' + s : s
    }
    // 输入查询
    RuleSeqInput(e) {
        if (e.target.value == "") {
            let FromList = JSON.parse(localStorage.getItem(this.$encryptionData('FromListStatus')))
            let List = this.$decryptData(FromList)
            this.setState({
                FromListStatus: List
            })
        }
        this.setState({
            ruleSeq: e.target.value
        })
    }
    // 查询按钮
    async QueryInputValue() {
        console.log()
        let data = await JHZTCX(this.state.ruleSeq)
        let FromListStatus = data.data
        let Array = []
        console.log(data, "data")
        if (FromListStatus.status == 1) {
            FromListStatus.statusType = "执行成功"
        } else if (data.data.status == 2) {
            FromListStatus.statusType = "执行失败"
        }
        Array.push(FromListStatus)
        this.setState({
            FromListStatus: Array
        })
    }
    // 返回上一页
    BackHistory() {
        console.log(this)
        this.props.history.push('/DataChecking/ClassfyList')
    }
    handleChange() {

    }
    componentWillUnmount(){
        this.setIntervalValue(false)
    }
    
}

export default CheckingUp