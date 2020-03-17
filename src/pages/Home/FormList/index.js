import React from "react";
import { Table, Button, Divider, Form, Input } from 'antd';
import { FromListStyle } from "./styled"
@Form.create()
class FromList extends React.Component {
    constructor() {
        super()
        this.state = {
            ruleSeq: "",
            ruleDesc: "",
            srcTabNameCn: "",
            srcTabNameEn: "",
            dataFieldCode: "",
            ruleImp: ""
        }
    }
   
      clearInput=()=>{
        this.setState({ruleDesc:''})
        this.myInput.focus()
      }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleLogin.bind(this)} className="FromInput">
              
                            <Input type="text" placeholder="请输入规则号"
                                value={this.state.ruleSeq}
                                onChange={this.ruleSeqValue.bind(this)}
                                style={{ width: '150px', display: 'inline-block', margin: '0 10px' }} />
        
                            <Input type="text" placeholder="请填写规则描述"
                                value={this.state.ruleDesc}
                                onChange={this.ruleDescValue.bind(this)} 
                                style={{ width: '150px', display: 'inline-block', margin: '0 10px' }} />
                        
              
                  
                            <Input type="text" placeholder="请填写中文表名"
                                value={this.state.srcTabNameCn}
                                onChange={this.srcTabNameCnValue.bind(this)}
                                style={{ width: '150px', display: 'inline-block', margin: '0 10px' }} 
                            />
                      
                            <Input type="text" placeholder="请填写英文表名"
                                value={this.state.srcTabNameEn}
                                onChange={this.srcTabNameEnValue.bind(this)}
                                style={{ width: '150px', display: 'inline-block', margin: '0 10px' }} 
                            />
                
               
                            <Input type="text" placeholder="请填写目标字段"
                                value={this.state.dataFieldCode}
                                onChange={this.dataFieldCodeValue.bind(this)} 
                                style={{ width: '150px', display: 'inline-block', margin: '0 10px' }} />
                        
                
                            <Input type="text" placeholder="请填写规则级别"
                                value={this.state.ruleImp}
                                onChange={this.ruleImpValue.bind(this)} 
                                style={{ width: '150px', display: 'inline-block', margin: '0 10px' }} />
                        
                <FromListStyle  style={{padding:'10px 0 0 10px'}}>
                    <Form.Item className="FromDetermine">
                        <Button block type="primary"
                            htmlType="submit"
                            style={{ width: '100px', display: 'inline-block' }}
                        >查询</Button>

                    </Form.Item>
                    <div>
                        <Button block type="primary"
                            style={{ width: '100px', margin: '0 10px' }}
                            onClick={this.clearClickValue.bind(this)}
                        >清除</Button>
                        <Button block type="primary"
                            style={{ width: '100px', margin: '0 10px', display: 'inline-block' }}
                            onClick={this.NewFromListOne.bind(this)}
                        >新增一条</Button>
                        <Button type="primary"
                            onClick={this.ArrayDelete.bind(this)}
                            style={{ width: '100px', display: 'inline-block' }}
                        >删除</Button>
                    </div>

                </FromListStyle>
            </Form>
        )
    }
    handleLogin(e) {
        e.preventDefault()
        // let FromObj = {}
        // FromObj.ruleSeq = this.state.ruleSeq,
        // FromObj.ruleDesc = this.state.ruleDesc
        // FromObj.srcTabNameCn = this.state.srcTabNameCn
        // FromObj.srcTabNameEn = this.state.srcTabNameEn
        // FromObj.dataFieldCode = this.state.dataFieldCode
        // FromObj.ruleImp = this.state.ruleImp
        this.props.form.validateFields(async (err, values) => {
            console.log(this.state)
            this.props.HandleFromList(this.state)

        })
    }
    // 新增多条
    NewlyAddedFromList() {
        this.props.NewlyAddedFromList()
    }
    // 新增一条
    NewFromListOne() {
        this.props.NewFromListOne()
    }
    // 删除
    ArrayDelete() {
        this.props.ArrayDelete()
    }
    // 请输入规则号
    ruleSeqValue(e) {
        this.setState({
            ruleSeq: e.target.value
        })
    }
    // 请输入机构描述
    ruleDescValue(e) {
        this.setState({
            ruleDesc: e.target.value
        })
    }
    // 请输入中文表名
    srcTabNameCnValue(e) {
        this.setState({
            srcTabNameCn: e.target.value
        })
    }
    // 请输入英文表名
    srcTabNameEnValue(e) {
        this.setState({
            srcTabNameEn: e.target.value
        })
    }
    // 清除
    clearClickValue() {
        this.setState({
            ruleSeq: "",
            ruleDesc: "",
            srcTabNameCn: "",
            srcTabNameEn: "",
            dataFieldCode: "",
            ruleImp: ""
        },()=>{
            this.props.clearClickValue(this.state)
        })
        
    }
    // 请填写目标字段
    dataFieldCodeValue(e) {
        this.setState({
            dataFieldCode: e.target.value
        })
    }
    // 请填写规则级别
    ruleImpValue(e) {
        this.setState({
            ruleImp: e.target.value
        })
    }


}

export default FromList