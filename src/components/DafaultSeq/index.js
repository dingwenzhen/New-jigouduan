import React, { Fragment } from "react";
import { Modal, Button, Table, Select, Pagination, Input } from 'antd';
import { SEQSELECT, QUERYDATALIST, DAFAULTVALUE } from "@api/ModifyData"
import { DAFAULTSEQTIME } from "@api/ClassfyList"
const { TextArea } = Input;
const { Option } = Select
class DafaultSeq extends React.Component {
    constructor() {
        super()
        this.state = {
            visible: false,
            confirmLoading: false,
            describe: '',//描述参数
            field_value: '',
            selectList: [],
            SelectValue: '',
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

        const { visible, confirmLoading, ModalText } = this.state;
        return (
            <Fragment>
                <Modal
                    title="选择规则版本"
                    visible={visible}
                    onOk={this.handleOk.bind(this)}
                    confirmLoading={confirmLoading}
                    onCancel={this.handleCancel.bind(this)}
                >
                    <div style={{ display: 'flex' }}>
                        <span style={{ display: 'inline-block', textAlign: 'right', marginRight: '10px', width: '100px' }}>默认规则版本：</span>
                        <Select
                            onChange={this.LevelhandleChange.bind(this)}
                            value={this.state.field_value}
                            style={{ display: 'inline-block', flex: '1' }}
                        >
                            {
                                this.state.selectList.map((item, index) => {
                                    return <Option value={item} key={index}>{item}</Option>
                                })
                            }
                        </Select>
                    </div>
                    <div style={{ display: 'flex', marginTop: '20px' }}>
                        <span style={{ display: 'inline-block', width: '130px', textAlign: 'right', marginRight: '10px' }}>参数描述：</span>
                        <TextArea rows={4} placeholder="请输入参数描述" value={this.state.describe} onChange={this.describeInput.bind(this)} />
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        <Button type="primary" style={{ marginRight: '20px' }} onClick={this.SumbitInput.bind(this)}>确定</Button>
                        <Button onClick={this.handleCancel.bind(this)}>取消</Button>
                    </div>

                </Modal>
            </Fragment>
        )
    }
    async componentDidMount() {
        let data = await DAFAULTSEQTIME()
        console.log(data, '132')

        if (data.data != '0') {
            console.log('不需要弹窗选择版本')
            this.setState({
                visible: false
            })
        } else {
            console.log('需要弹窗选择版本')
            this.setState({
                visible: true
            })
        }
        // 下拉选择的
        let SelectList = await SEQSELECT()
        console.log(SelectList, '1231213')
        let XZList = []
        for (var i = 0; i < SelectList.data.length; i++) {
            if (SelectList.data[i] != '废弃' && SelectList.data[i] != '空') {
                XZList.push(SelectList.data[i])
            }
        }
        this.setState({
            selectList: XZList,
            SelectValue: XZList[0],
            selectListBool: true,
            cacelBool: false,
        })
    }
    handleOk() {
        this.setState({
            visible: false
        })
    }
    handleCancel() {
        this.setState({
            visible: false
        })
    }
    // 下拉选择
    LevelhandleChange(value) {
        console.log(value)
        this.setState({
            field_value: value
        })
    }
    // describeInput
    describeInput(e) {
        this.setState({
            describe: e.target.value
        })
    }
    // 确定
    async SumbitInput() {
        let obj = {}
        obj.field_name = 'standardType'
        obj.field_value = this.state.field_value
        obj.describe = this.state.describe
        let FromList = this.state.data
        let data = await QUERYDATALIST(obj)
        console.log(data, '提交成功')
        this.props.dafaultValue(obj.field_value)
        this.setState({
            visible: false
        })
    }
}
export default DafaultSeq