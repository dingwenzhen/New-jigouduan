import React from "react";
import { Table, Button, Divider, Form, Input, Select, Modal ,message} from 'antd';
import { NewAddedApi } from "@api"
const { Option } = Select
@Form.create()
class FromOneList extends React.Component {
    constructor() {
        super()
        this.state = {
            ruleSeq: "",
            ruleType: "有效性",
            ruleImp: "关键",
            srcTabNameCn: "",
            srcTabNameEn: "",
            gzVersion: "",
            diySql: "",
            ruleDesc: "",
            visibleData: false
        }
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form >
                <div style={{ display: 'flex', width: "100%", justifyContent: 'space-between', marginBottom: '5px' }}>
                    <label>
                        <span style={{ marginBottom: '5px', display: 'inline-block' }}>请输入规则号</span>
                        <Input type="text"
                            placeholder="请输入规则号"
                            style={{ width: '200px' }}
                            value={this.state.ruleSeq}
                            onChange={this.ruleSeqInput.bind(this)} />
                    </label>
                    <label>
                        <span style={{ marginBottom: '5px', display: 'inline-block' }}>选择类型</span>
                        <Select defaultValue={this.state.ruleType} style={{ width: 200 }} onChange={this.TypehandleChange.bind(this)}>
                            <Option value="有效性">有效性</Option>
                            <Option value="完整性">完整性</Option>
                            <Option value="唯一性">唯一性</Option>
                        </Select>
                    </label>
                </div>
                <div style={{ display: 'flex', width: "100%", justifyContent: 'space-between', marginBottom: '5px' }}>

                    <label>
                        <span style={{ marginBottom: '5px', display: 'inline-block' }}>请选择重要性</span>
                        <Select defaultValue={this.state.ruleImp}
                            style={{ width: 200 }}
                            onChange={this.LevelhandleChange.bind(this)}>
                            <Option value="关键">关键</Option>
                            <Option value="可选">可选</Option>
                            <Option value="一般">一般</Option>
                        </Select>
                    </label>

                    <label>
                        <span style={{ marginBottom: '5px', display: 'inline-block' }}>中文表名</span>
                        <Input type="text"
                            placeholder="请填写中文表名"
                            style={{ width: '200px' }}
                            value={this.state.srcTabNameCn}
                            onChange={this.srcTabNameCnInput.bind(this)} />
                    </label>
                </div>
                <div style={{ display: 'flex', width: "100%", justifyContent: 'space-between', marginBottom: '5px' }}>
                    <label>
                        <span style={{ marginBottom: '5px', display: 'inline-block' }}>请输入英文表名</span>
                        <Input type="text"
                            placeholder="请输入英文表名"
                            style={{ width: '200px' }}
                            value={this.state.srcTabNameEn}
                            onChange={this.srcTabNameEnInput.bind(this)} />
                    </label>

                    <label>
                        <span style={{ marginBottom: '5px', display: 'inline-block' }}>请输入版本</span>
                        <Input type="text"
                            placeholder="请输入版本"
                            style={{ width: '200px' }}
                            value={this.state.gzVersion}
                            onChange={this.gzVersionInput.bind(this)} />
                    </label>
                </div>

                <div style={{ display: 'flex', width: "100%", justifyContent: 'space-between', marginBottom: '5px' }}>
                    <label>
                        <span style={{ marginBottom: '5px', display: 'inline-block' }}>查询SQL</span>
                        <Input type="text"
                            placeholder="查询SQL"
                            style={{ width: '200px' }}
                            value={this.state.diySql}
                            onChange={this.diySqlInput.bind(this)} />
                    </label>
                    <label>
                        <span style={{ marginBottom: '5px', display: 'inline-block' }}>规则描述</span>
                        <Input type="text"
                            placeholder="请填写规则描述"
                            style={{ width: '200px' }}
                            value={this.state.ruleDesc}
                            onChange={this.ruleDescInput.bind(this)} />
                    </label>

                </div>
                <div>
                    <Button block type="primary"
                        onClick={this.FromListOne.bind(this)}
                        style={{ width: '150px', margin: '20px 10px' }}
                    >确定</Button>
                    <Button block style={{ width: '150px', margin: '0 10px' }}
                        onClick={this.EliminateValue.bind(this)}
                    >清除</Button>
                </div>
                <Modal
                    title="提示"
                    visible={this.state.visibleData}
                    onOk={this.handleOkdata.bind(this)}
                    onCancel={this.handleCanceldata.bind(this)}
                >
                    <p>对不起，您填写的信息不能为空！请您填写完整再提交。</p>
                    <div style={{ marginTop: '20px' }}>
                        <Button type="primary" onClick={this.handleOkdata.bind(this)} style={{ marginRight: '20px' }}>确定</Button>
                        <Button onClick={this.handleOkdata.bind(this)}>取消</Button>
                    </div>
                </Modal>
            </Form>
        )
    }
    handleOkdata() {
        this.setState({
            visibleData: false
        })
    }
    handleCanceldata() {
        this.setState({
            visibleData: false
        })
    }
    async FromListOne() {
        let FromListValue = {}
        FromListValue.ruleSeq = this.state.ruleSeq
        FromListValue.ruleType = this.state.ruleType
        FromListValue.ruleImp = this.state.ruleImp
        FromListValue.srcTabNameCn = this.state.srcTabNameCn
        FromListValue.srcTabNameEn = this.state.srcTabNameEn
        FromListValue.gzVersion = this.state.gzVersion
        FromListValue.diySql = this.state.diySql
        FromListValue.ruleDesc = this.state.ruleDesc
        console.log(FromListValue, "from")
        if (FromListValue.ruleSeq.length == 0 && FromListValue.srcTabNameCn.length == 0 && FromListValue.srcTabNameEn.length == 0 && FromListValue.gzVersion.length == 0 && FromListValue.diySql.length == 0 && FromListValue.ruleDesc.length == 0) {
            this.setState({
                visibleData: true
            })
        } else {
            let data = await NewAddedApi(FromListValue)
            if (data.msg == "成功") {
                this.setState({
                    ruleSeq: "",
                    ruleType: "",
                    ruleImp: "关键",
                    srcTabNameCn: "",
                    srcTabNameEn: "",
                    gzVersion: "",
                    diySql: "",
                    ruleDesc: ""
                })
                this.props.DetermineClick()
            }else{
                message.error(data.msg)
            }
        }


    }
    // 清除
    EliminateValue() {
        this.setState({
            ruleSeq: "",
            ruleType: "",
            ruleImp: "关键",
            srcTabNameCn: "",
            srcTabNameEn: "",
            gzVersion: "",
            diySql: "",
            ruleDesc: ""
        })
    }
    // 检核类型
    TypehandleChange(value) {
        this.setState({
            ruleType: value
        })
    }
    // 重要性
    LevelhandleChange(value) {
        this.setState({
            ruleImp: value
        })
    }
    // 请输入规则号
    ruleSeqInput(e) {
        this.setState({
            ruleSeq: e.target.value
        })
    }
    // 请填写中文表名
    srcTabNameCnInput(e) {
        this.setState({
            srcTabNameCn: e.target.value
        })
    }
    // 请输入英文表名
    srcTabNameEnInput(e) {
        this.setState({
            srcTabNameEn: e.target.value
        })
    }
    // 请输入版本
    gzVersionInput(e) {
        this.setState({
            gzVersion: e.target.value
        })
    }
    // 查询 sql
    diySqlInput(e) {
        this.setState({
            diySql: e.target.value
        })
    }
    ruleDescInput(e) {
        this.setState({
            ruleDesc: e.target.value
        })
    }

}

export default FromOneList