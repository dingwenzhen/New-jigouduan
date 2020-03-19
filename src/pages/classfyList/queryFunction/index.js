import React, { Fragment } from "react";
import { Form, Input, Button, Select, Calendar, Table, Modal, Pagination,message } from "antd"
import moment from 'moment';
import connect from "./connect"
import { QueryFunctionStyle } from "./styled"
import { withRouter } from "react-router-dom"
import GoToState from "../GoToState"
import TimeValue from "@pages/ModifyData/TimeValue"
import { DAFAULTVALUE, QUERYDATALIST, QUERYVALUE } from "@api/ModifyData"
import { DAFAULTSEQTIME } from "@api/ClassfyList"
import { SEQSELECT } from "@api/ModifyData"
const { Option } = Select
const { TextArea } = Input;
@withRouter
@connect
@Form.create()
class queryFunction extends React.Component {
    constructor() {
        super()
        this.state = {
            Time: "",
            value: "",
            visible: false,
            ruleSeq: "",
            ruleType: "",
            level: "",
            srcTabNameCn: "",
            srcTabNameEn: "",
            ruleDesc: "",
            SelectValue: '请选择类型',
            beginDateValue: '请选择开始时间',
            endDateValue: '请选择结束时间',
            visibleEnd: false,
            stantTypeList: [],
            stantTypeValue: [],
            queryStantTypeBool: false,
            data: [],
            selectedRowKeys: [],
            loading: false,
            filteredInfo: null,
            sortedInfo: null,
            ModalText: 'Content of the modal',
            visibleupdata: false,
            confirmLoading: false,
            currPage: 1,
            totalCount: 10,
            field_name: '',
            field_value: '',
            describe: '',
            cacelBool: false,
            selectListBool: false,
            selectList: [],
            TimeBool: false,
            queryValue: '',
            id: 0
        }
    }
    render() {
        let { sortedInfo, filteredInfo } = this.state;
        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {};
        const { loading, selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const columns = [
            {
                id: 1,
                title: '参数名称',
                dataIndex: 'type',
                width: '200px',
                align: 'center',
                ellipsis: true
            },
            {
                id: 2,
                title: '参数值',
                dataIndex: 'fieldValue',
                width: '200px',
                align: 'center',
                ellipsis: true
            },
            {
                id: 3,
                title: '参数描述',
                dataIndex: 'describe',
                align: 'center',
                ellipsis: true
            },
            {
                title: '操作',
                dataIndex: 'operation',
                align: 'center',
                key: 'operation',
                width: "150px",
                ellipsis: true,
                render: (text, record) => {
                    if (record.type == '默认采集规则版本' || record.type == '默认采集日期') {
                        return <span>
                            <a onClick={this.EditHandlerValue.bind(this, text, record)}>修改</ a>
                        </span>
                    } else {
                        return <span>
                            <a onClick={this.EditHandlerValue.bind(this, text, record)}>查看</ a>
                        </span>
                    }

                },
            }
        ]
        const { visibleupdata, confirmLoading, ModalText } = this.state;
        return (
            <Fragment>
                <div >
                    <Form >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                            <div style={{flex:'1'}}>
                                <Input type="text"
                                    placeholder="请输入规则号"
                                    onChange={this.ruleSeqValue.bind(this)}
                                    value={this.state.ruleSeq}
                                    style={{ width: '120px', display: 'inline-block', }} />
                                <Select style={{ width: 120 }}
                                    onChange={this.LevelhandleChange.bind(this)}
                                    value={this.state.SelectValue}
                                    style={{ width: '120px', display: 'inline-block', margin: '0 10px', }}
                                >
                                    {
                                        this.props.ZYXValue.map((item, index) => {
                                            return <Option value={item} key={index}>{item}</Option>
                                        })
                                    }
                                </Select>
                                <Input type="text" placeholder="请填写中文表名"
                                    onChange={this.srcTabNameCnValue.bind(this)}
                                    value={this.state.srcTabNameCn}
                                    style={{ width: '120px', display: 'inline-block', margin: '0 10px', }} />

                                <Input type="text" placeholder="请输入英文表名"
                                    onChange={this.srcTabNameEnValue.bind(this)}
                                    value={this.state.srcTabNameEn}
                                    style={{ width: '120px', display: 'inline-block', margin: '0 10px', }} />
                                <Input type="text" placeholder="请填写规则描述"
                                    onChange={this.ruleDescValue.bind(this)}
                                    value={this.state.ruleDesc}
                                    style={{ width: '120px', display: 'inline-block', margin: '0 10px', }} />
                                <Select
                                    mode="multiple"
                                    onChange={this.stantTypeSelect.bind(this)}
                                    placeholder='请选择您的版本'
                                    value={this.state.stantTypeValue}
                                    style={{ minWidth: '120px',maxWidth:'200px', display: 'inline-block', margin: '0 10px', }}
                                >
                                    {
                                        this.state.stantTypeList.map((item, index) => {
                                            return <Option value={item} key={index}>{item}</Option>
                                        })
                                    }
                                </Select>
                            </div>
                            <div>
                                <div style={{
                                    width: '120px', height: '32px', borderRadius: '4px', display: 'inline-block',
                                    margin: '0px 10px', border: '1px solid #d9d9d9', backgroundColor: '#fff', color: 'rgba(0, 0, 0, 0.4)',
                                    padding: '4px 11px', cursor: 'pointer'
                                }}
                                    onClick={this.SearchValue.bind(this)}>{this.state.beginDateValue}</div>
                                <div style={{
                                    width: '120px', height: '32px', borderRadius: '4px', display: 'inline-block',
                                    margin: '0px 10px', border: '1px solid #d9d9d9', backgroundColor: '#fff', color: 'rgba(0, 0, 0, 0.4)',
                                    padding: '4px 11px', cursor: 'pointer',
                                }}
                                    onClick={this.Endcacel.bind(this)}
                                >{this.state.endDateValue}</div>
                            </div>
                        </div>



                        <QueryFunctionStyle >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                                    <Form.Item>
                                        <Button style={{ width: '75px', margin: '0 10px' }}
                                            type="primary"
                                            onClick={this.BackHistory.bind(this)}
                                        >返回</Button>
                                        <Button block type="primary"
                                            onClick={this.classfyListFilter.bind(this)}
                                            style={{ width: '75px', margin: '0 10px' }}
                                        >查询</Button>
                                        <Button block type="primary" style={{ width: '75px', margin: '0 10px' }}
                                            onClick={this.ResetClick.bind(this)}
                                        >重置</Button>
                                    </Form.Item>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                  
                                        <Button block type="primary"
                                            style={{ width: '75px', margin: '0 10px' }}
                                            onClick={this.ReviewFromList.bind(this)}
                                        >检核</Button>
                                        <div style={{ margin: '0 10px', position: 'relative' }}>
                                            <Button type="primary"
                                                onClick={this.BackTypeClick.bind(this)}
                                            >当前检核状态</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </QueryFunctionStyle>
                    </Form>
                </div>
                <Modal
                    title="时间"
                    visible={this.state.visible}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                >
                    <div>
                        <Calendar
                            onPanelChange={this.onPanelChange.bind(this)}
                            fullscreen={false}
                            onSelect={this.onSelect.bind(this)}
                        />
                    </div>
                </Modal>
                <Modal
                    title="时间"
                    visible={this.state.visibleEnd}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                >
                    <div>
                        <Calendar
                            onPanelChange={this.onPanelChange.bind(this)}
                            fullscreen={false}
                            onSelect={this.onSelectEnd.bind(this)}
                        />
                    </div>
                </Modal>
                <GoToState />
            </Fragment>
        )
    }
    async componentDidMount() {
        const d = new Date()
        const resDate = d.getFullYear() + '-' + this.p((d.getMonth() + 1)) + '-' + this.p(d.getDate())
        let data = await SEQSELECT()
        if(data.msg == '成功'){
            let Selectlist = data.data
            let Array = []
            // Array.push('请选择您的版本')
            for (var i = 0; i < Selectlist.length; i++) {
                if (Selectlist[i]) {
                    Array.push(Selectlist[i])
                }
            }
            this.setState({
                stantTypeValue:[],
                stantTypeList: Array,
                beginDateValue: resDate,
                endDateValue: resDate,
            })
        }else{
            message.error(data.msg)
        }
        // 获取后端的默认版本
        this.DafaulteType()
    }
    async DafaulteType(){
        let data = await DAFAULTSEQTIME()
        if(data.data){
            let array = []
            array.push(data.data)
            this.setState({
                stantTypeValue:array
            })
        }else{
            this.setState({
                stantTypeValue:[]
            })
        }
    }
    // 版本
    stantTypeSelect(value) {
        console.log(value)
        this.setState({
            stantTypeValue: value
        })
    }
    // 重置按钮
    ResetClick() {
        this.setState({
            ruleSeq: "",
            ruleType: "",
            level: "",
            srcTabNameCn: "",
            srcTabNameEn: "",
            SelectValue: "请选择类型",
            ruleDesc: "",
            stantTypeValue: []
        })
        this.props.NewDataList('')
    }
    // 请输入规则号
    ruleSeqValue(e) {
        this.setState({
            ruleSeq: e.target.value
        })
    }
    // 中文表名
    srcTabNameCnValue(e) {
        this.setState({
            srcTabNameCn: e.target.value
        })
    }
    // 英文表名
    srcTabNameEnValue(e) {
        this.setState({
            srcTabNameEn: e.target.value
        })
    }

    // 请填写规则描述
    ruleDescValue(e) {
        this.setState({
            ruleDesc: e.target.value
        })
    }
    handleOk() {
        this.setState({
            visible: false,
            visibleEnd: false,
            queryStantTypeBool: false
        })
    }
    handleCancel() {
        this.setState({
            visible: false,
            visibleEnd: false,
            queryStantTypeBool: false
        })
    }
    onSelect = value => {
        console.log(value, "999999")
        const d = new Date(value._d)
        const resDate = d.getFullYear() + '-' + this.p((d.getMonth() + 1)) + '-' + this.p(d.getDate())

        console.log(resDate)
        this.setState({
            Time: resDate,
            beginDateValue: resDate,
        }, () => {
            this.handleOk()
        });
    }
    onSelectEnd = value => {
        console.log(value, "999999")
        const d = new Date(value._d)
        const resDate = d.getFullYear() + '-' + this.p((d.getMonth() + 1)) + '-' + this.p(d.getDate())

        console.log(resDate)
        this.setState({
            Time: resDate,
            endDateValue: resDate,
        }, () => {
            this.handleOk()
        });
    };

    onPanelChange = value => {
        console.log(value, "8888")
        const d = new Date(value._d)
        const resDate = d.getFullYear() + '-' + this.p((d.getMonth() + 1)) + '-' + this.p(d.getDate())
        console.log(resDate, "777")
        this.setState({
            value: resDate
        });
    };
    
    p(s) {
        return s < 10 ? '0' + s : s
    }
    // 获取本地日期
    TimeLocal() {
        let TimeData = this.props.DetailTime
        let resDate = this.props.DetailTime
        console.log(resDate, "处理过的本地日期")
        this.setState({
            Time: resDate,
            value: TimeData
        })
    }
    p(s) {
        return s < 10 ? '0' + s : s
    }
    // 点击搜索
    SearchValue(value) {
        console.log(value)
        this.setState({
            visible: true
        })
    }
    // 点击查询按钮获取数据
    classfyListFilter() {
        let arr = {}
        if (this.state.SelectValue == '请选择类型') {
            arr.ruleType = ''
        } else {
            arr.ruleType = this.state.SelectValue

        }
        if (!this.state.stantTypeValue[0]&&this.state.stantTypeValue=='请选择您的版本' || this.state.stantTypeValue=='') {
            // let stantTypeList = this.state.stantTypeList
            
            arr.stantTypeValue = ''
        } else {
            let str = ''
            for( var i = 0 ; i<this.state.stantTypeValue.length ; i++ ){
                if(i==this.state.stantTypeValue.length-1){
                    str+=this.state.stantTypeValue[i]
                }else{
                    str+=this.state.stantTypeValue[i]+','
                }
               
            }
            arr.stantTypeValue = str

        }
        arr.ruleSeq = this.state.ruleSeq
        arr.srcTabNameCn = this.state.srcTabNameCn
        arr.srcTabNameEn = this.state.srcTabNameEn
        arr.ruleDesc = this.state.ruleDesc
        console.log(arr)
        this.props.queryfunction(arr)


    }
    // 点击检核检核数据
    ReviewFromList() {
        localStorage.setItem('ErrorValue', JSON.stringify(0))
        localStorage.setItem('TrueValue', JSON.stringify(0))
        localStorage.setItem('Percentage', JSON.stringify(0))
        localStorage.setItem('FromListStatus', JSON.stringify(0))
        let obj = {}
        obj.beginDate = ''
        obj.endDate = ''
        if (this.state.beginDateValue == '请选择开始时间') {
            obj.beginDate = ''
        } else if (this.state.endDateValue == '请选择结束时间') {
            obj.endDate = ''
        } else {
            obj.beginDate = this.state.beginDateValue
            obj.endDate = this.state.endDateValue
        }
        console.log(obj, 'obj')
        this.props.queryFromBool(obj)
    }
    // 重要性
    LevelhandleChange(value) {
        this.setState({
            SelectValue: value
        })
    }
    // 请填写检核类型
    TypehandleChange(value) {
        this.setState({
            ruleType: value
        })
    }
    // BackTypeClick 跳转到当前检核状态
    BackTypeClick() {
        console.log(this)
        this.props.history.push('/DataChecking/CheckingUp')
    }
    // 返回上一页
    BackHistory() {
        this.props.history.push('/UserChoice')
    }
    // Endcacel 结束时间
    Endcacel() {
        this.setState({
            visibleEnd: true
        })
    }

}
export default queryFunction