import React, { Fragment } from 'react'
import { Table, Input, Button, Select } from 'antd';
import { FileListApi, queryRulesApi } from '@api/ReportingTask'
const { Option } = Select;
class SelectFile extends React.Component {
    constructor() {
        super()
        this.state = {
            mockData: [],
            InputData: '',
            data: [],
            selectedRowKeys: [],//选中的事哪个
            Toltal: [],
            SelectList: [],
            SelectId:[]
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
                <div style={{ position: 'absolute', width: '750px', right: 0, left: 0, margin: 'auto', top: '20px' }}>
                    <div className='jindu'>
                        <div style={{float:'left',marginTop: '20px'}}>
                            <span style={{ width: '100px', display: 'inline-block' }}>银行描述：</span>
                            <Select
                                mode="multiple"
                                style={{ width: '320px', marginLeft: '10px' }}
                                placeholder="请选择银行机构"
                                onChange={this.handleChange.bind(this)}
                            >
                                {
                                    this.state.SelectList.map(item => {
                                        return <Option key={item.id} >{item.ruleDesc}</Option>
                                    })
                                }
                            </Select>
                        </div>
                        <div style={{float:'right'}}>
                            <div style={{ width: '250px', marginTop: '20px' }} className='FileManagementTable'>
                                <Input value={this.state.InputData} onChange={this.InputChange.bind(this)} style={{ marginBottom: '10px' }} />

                                <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.data} 
                                pagination={{ pageSize: 50 }} scroll={{ y: 240 }} />
                            </div>
                        </div>
                    </div>
                    <div>
                        <Button type="primary" onClick={this.NextStep.bind(this)}>完成</Button>
                        <Button onClick={this.PreviousStep.bind(this)} style={{ marginLeft: '20px' }}>上一步</Button>
                    </div>
                </div>

            </Fragment>
        )
    }
    componentDidMount() {
        this.DafaultFile()// 默认的选取的文件
        this.DafaultSelect()// 默认的查询规则
    }
    // 默认的选取的文件
    async DafaultFile() {
        let datas = await FileListApi()
        console.log(datas)
        const data = [];
        for (let i = 0; i < datas.data.length; i++) {
            data.push({
                key: datas.data[i].id,
                name: datas.data[i].bmCn,
                bmEn: datas.data[i].fileNameEn
            });
        }
        this.setState({
            data: data,
            Toltal: data
        })
    }
    async DafaultSelect() {
        let data = await queryRulesApi()
        this.setState({
            SelectList: data.data
        })
        console.log(data)
    }
    // 输入的搜索
    InputChange(e) {
        let data = this.state.data
        let Toltal = this.state.Toltal
        let ArrayData = []
        if (e.target.value == '') {
            ArrayData = Toltal
        } else {
            ArrayData = Toltal.filter(function (t) {
                return t.name.indexOf(e.target.value) > -1;
            })
        }
        this.setState({
            InputData: e.target.value,
            data: ArrayData
        })
    }
    // 
    handleChange(value) {
        console.log(value)
        this.setState({
            SelectId:value
        })
    }
    // 下一步
    NextStep() {
        let Toltal = this.state.Toltal
        let selectedRowKeys = this.state.selectedRowKeys
        let RuleId = []
        for( var i = 0 ; i<selectedRowKeys.length ; i++ ){
            for( var j = 0 ; j<Toltal.length ; j++ ){
                if(selectedRowKeys[i] == j ){
                    RuleId.push(Toltal[j].bmEn)
                }
            }
        }
        let obj={ruleSeq:this.state.SelectId,bmCn:RuleId}
        this.props.TwoNextStep(obj)
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

}
export default SelectFile