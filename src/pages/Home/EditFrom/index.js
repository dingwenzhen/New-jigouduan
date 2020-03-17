import React, { Component } from 'react'
import { Form, Input, Button, Checkbox, message } from "antd"
import {UpdaterulesApi} from "@api"

@Form.create()
class EditFrom extends Component {
    constructor(props) {
        super(props)
        this.state = {
            authorIcon: '',
            authorName: '',
            name: '',
            icon: '',
            bookTags: ''
        }
        this.cloumns=this.props
    }
    render() {
        console.log(this.props.EditFromList,"88")
        let { ruleSeq, ruleDesc, srcTabNameCn, srcTabNameEn, dataFieldCode,ruleImp ,standardType,ruleType} = this.props.EditFromList;
        const { getFieldDecorator } = this.props.form;
        return (
            <Form labelCol={{
                span: 4
            }}
                wrapperCol={{
                    span: 20
                }}
                onSubmit={this.handleSubmit.bind(this)}
            >

                <Form.Item label="规则号">
                    {
                        getFieldDecorator("ruleSeq", {
                            initialValue: ruleSeq,
                        })(
                            <Input
                                type="text"
                            />
                        )
                    }
                </Form.Item>
                <Form.Item label="规则描述">
                    {
                        getFieldDecorator("ruleDesc", {
                            initialValue: ruleDesc,
                        })(
                            <Input
                                type="text"
                            />
                        )
                    }
                </Form.Item>
                <Form.Item label="中文表名">
                    {
                        getFieldDecorator("srcTabNameCn", {
                            initialValue: srcTabNameCn,
                        })(
                            <Input
                                type="text"
                            />
                        )
                    }
                </Form.Item>
                <Form.Item label="英文表名">
                    {
                        getFieldDecorator("srcTabNameEn", {
                            initialValue: srcTabNameEn,
                        })(
                            <Input
                                type="text"
                            />
                        )
                    }
                </Form.Item>
                <Form.Item label="目标字段">
                    {
                        getFieldDecorator("dataFieldCode", {
                            initialValue: dataFieldCode,
                        })(
                            <Input
                                type="text"
                            />
                        )
                    }
                </Form.Item>
                <Form.Item label="规则类型">
                    {
                        getFieldDecorator("ruleType", {
                            initialValue: ruleType,
                        })(
                            <Input
                                type="text"
                            />
                        )
                    }
                </Form.Item>
                <Form.Item label="规则级别">
                    {
                        getFieldDecorator("ruleImp", {
                            initialValue: ruleImp,
                        })(
                            <Input
                                type="text"
                            />
                        )
                    }
                </Form.Item>
                <Form.Item label="标准类型">
                    {
                        getFieldDecorator("standardType", {
                            initialValue: standardType,
                        })(
                            <Input
                                type="text"
                            />
                        )
                    }
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit">修改</Button>
                </Form.Item>
            </Form>
        )
    }
    //修改数据
     handleSubmit(e) {
        e.preventDefault();
        
        //获取到所有表单的数据
        this.props.form.validateFields( async (err, values) => {
            if (!err) {
                let FromList = {}
               
                FromList.id=this.cloumns.EditFromList.id
                FromList.ruleSeq=values.ruleSeq
                FromList.ruleDesc=values.ruleDesc
                FromList.srcTabNameCn=values.srcTabNameCn
                FromList.srcTabNameEn=values.srcTabNameEn
                FromList.dataFieldCode=values.dataFieldCode
                FromList.ruleType=values.ruleType
                FromList.ruleImp=values.ruleImp
                FromList.standardType=values.standardType
                console.log(FromList,99)
                let UpdateFromList = await UpdaterulesApi(FromList)
                if(UpdateFromList.msg=="成功"){
                    this.props.EditHandler(FromList)
                }else{
                    message.error(UpdateFromList.msg)
                }
                
            }
        });
    }
}


export default EditFrom;
