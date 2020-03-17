import React,{Component} from "react"
import {LoginWrapper} from "./styled"
import { Form, Input, Button } from 'antd';
import connect from "./connect";

@connect
@Form.create()
class Sign extends Component{
  
    render(){
        const { getFieldDecorator } = this.props.form;
        return (
            <LoginWrapper>
                <div className="loginContainer">
                    <div className="logo">
                       
                    </div>
                    <Form onSubmit={this.props.handleLogin.bind(this)}>
                        <Form.Item>
                            {
                                getFieldDecorator("userId",{
                                    rules:[{pattern:/^\w{5,10}$/,message:"请正确填写用户名"}]
                                })(
                                    <Input type="text" placeholder="请输入用户名"/>
                                )
                            }
                           
                        </Form.Item>
                        <Form.Item>
                            {
                                getFieldDecorator("password",{
                                    rules:[{pattern:/^\w{5,10}$/,message:"请正确填写密码"}]
                                })(
                                    <Input type="password" placeholder="请输入密码"/>
                                )
                            }
                            
                        </Form.Item>
                        <span className="signAccount" onClick={this.props.ClickSignValue.bind(this)}>注册账号</span>
                        <Form.Item>
                           <Button block type="primary" htmlType="submit" style={{backgroundColor:'orange'}}>注册</Button>
                        </Form.Item>
                    </Form>
                </div>
            </LoginWrapper>
        )
    }
}

export default Sign;