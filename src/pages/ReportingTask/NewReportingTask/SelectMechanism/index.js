import React, { Fragment } from 'react'
import { Input, Select, Button, message } from 'antd'
import { ToltalExecutorApi, ZxrIdApi } from '@api/ReportingTask'
const { Option } = Select;
class SelectMechanism extends React.Component {
    constructor() {
        super()
        this.state = {
            mockData: [],
            InputData: '',
            data: [],
            selectedRowKeys: [],//选中的事哪个
            tableList: [],
            dataList: {},
            supervise: [],
            implement: []
        }
    }

    render() {
        const columns = [
            {
                title: '全选',
                dataIndex: 'name',
                width: 150,
            }
        ]

        const rowSelection = {
            onChange: this.TableOnchange.bind(this),
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User', // Column configuration not to be checked
                name: record.name,
            }),
        }
        return (
            <Fragment>
                <div style={{ position: 'absolute', right: '0', left: '0', margin: 'auto', width: '500px', top: '20px' }}>
                    {
                        this.state.tableList.map((item, index) => {
                            return <div className='NewSupervisor' key={index}>
                                <div style={{ marginTop: '20px' }}>
                                    <span style={{ width: '100px', display: 'inline-block' }}>执行人：</span>
                                    <Select
                                        mode="multiple"
                                        style={{ width: '320px', marginLeft: '10px' }}
                                        placeholder="请选择执行人"
                                        onChange={this.ChiefSupervisor.bind(this, index)}
                                    >
                                        {
                                            item.supervise.map(item => {
                                                return <Option key={item.zxrId} >{item.zxrName}</Option>
                                            })
                                        }
                                    </Select>

                                </div>
                                <div style={{ marginTop: '20px' }}>
                                    <span style={{ width: '100px', display: 'inline-block' }}>银行机构：</span>
                                    <Select
                                        mode="multiple"
                                        style={{ width: '320px', marginLeft: '10px' }}
                                        placeholder="请选择银行机构"
                                        onChange={this.handleChange.bind(this, index)}
                                        onFocus={this.onFocusChange.bind(this, index)}
                                    >
                                        {
                                            item.implement.map(item => {
                                                return <Option key={item.orgCode} >{item.orgName}</Option>
                                            })
                                        }
                                    </Select>
                                </div>
                            </div>
                        })
                    }
                    <div style={{ marginTop: '20px' }}>
                        <Button type="primary" onClick={this.NextStep.bind(this)}>下一步</Button>
                        <Button onClick={this.PreviousStep.bind(this)} style={{ marginLeft: '20px' }}>上一步</Button>
                    </div>
                </div>
            </Fragment>
        )
    }
    async componentDidMount() {
        let data = await ToltalExecutorApi()
        console.log(data)
        let tableList = this.state.tableList
        let dataList = this.state.dataList
        let obj = {}
        obj.supervise = data.data.zxList
        obj.implement = []
        tableList.push(obj)
        this.setState({
            tableList,
            supervise: data.data.zxList
        })
    }
    InputChange(value) {
        let data = this.state.data
        let ArrayData = []
        ArrayData = data.filter(function (t) {
            return t.name.indexOf(value) > -1;
        })
        this.setState({
            InputData: value,
            data: ArrayData
        })
    }
    // 请选择银行机构
    handleChange(index, value) {
        console.log(value, index)
        let tableList = this.state.tableList
        let dataList = this.state.dataList
        dataList.yhjgdm = value
        console.log(tableList, '请选择监管执行员')
        tableList[index].zxrIds = value
        console.log(index)
        this.setState({
            tableList
        })
    }
    // 请选择执行人
    async ChiefSupervisor(index, value) {
        console.log(value, index)
        let tableList = this.state.tableList
        let dataList = this.state.dataList
        dataList.taskExecutor = value
        this.setState({
            tableList,
            dataList
        })
    }
    // 聚焦的时候
    async onFocusChange(index) {
        let zxrId = this.state.dataList.taskExecutor
        let tableList = this.state.tableList
        let str = ''
        if (zxrId) {
            for (var i = 0; i < zxrId.length; i++) {
                if (i == zxrId.length - 1) {
                    str += `${zxrId[i]}`
                } else {
                    str += `${zxrId[i]},`
                }

            }
            let data = await ZxrIdApi(str)
            tableList[index].implement = data.data.yhjg
            this.setState({
                tableList
            })
        }



    }
    // 新增监管员+执行人
    NewSupervisor() {
        let tableList = this.state.tableList
        let dataList = this.state.dataList
        if (tableList.length > 2) {
            return
        }
        let obj = {}
        dataList.push({})
        obj.supervise = this.state.supervise
        obj.implement = []
        tableList.push(obj)
        this.setState({
            tableList, dataList
        })
    }
    // 减去数组中的第几项
    SubtractClick(index) {
        let tableList = this.state.tableList
        let dataList = this.state.dataList
        dataList.splice(index, 1)
        tableList.splice(index, 1)
        this.setState({
            tableList,
            dataList
        })
    }
    // 下一步
    NextStep() {
        if (!this.state.dataList.supervise || this.state.dataList.supervise == '') {
            this.error('请选择执行人')
        } else if (!this.state.dataList.taskExecutor[0]) {
            this.error('请选择银行机构')
        } else {
            console.log(this.state.dataList)
            this.props.TwoNextStep(this.state.dataList)
        }

    }
    // 上一步
    PreviousStep() {
        this.props.TwoPreviousStep()
    }
    TableOnchange = (selectedRowKeys, selectedRows) => {
        console.log(selectedRowKeys)
        this.setState({
            selectedRowKeys: selectedRowKeys
        })
    }
    error = (val) => {
        message.error(val);
    }

}
export default SelectMechanism