import React, { Component } from "react"
import { LoginWrapper } from "./styled"
import { Form, Input, Button, message } from 'antd';
import connect from "./connect";
import { LOGINHOME } from "@api/Home"
import Cookies from "js-cookie";
@connect
@Form.create()
class Login extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: ''
        }
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <LoginWrapper>
                <div className="loginContainer">
                    <div className="logo">

                    </div>
                    <Input type="text" placeholder="请输入用户名"
                        style={{ marginBottom: '20px' }}
                        value={this.state.username}
                        onChange={this.UserName.bind(this)} />

                    <Input type="password" placeholder="请输入密码"
                        style={{ marginBottom: '20px' }}
                        value={this.state.password}
                        onChange={this.passwordInput.bind(this)}
                    />
                    <div>
                        <Button block type="primary" style={{ backgroundColor: 'orange' }}
                            onClick={this.Submit.bind(this)}
                        >登录</Button>

                    </div>

                </div>
            </LoginWrapper>
        )
    }
    componentDidMount() {
        console.log(window, 1111)
    }
    UserName(e) {
        this.setState({
            username: e.target.value
        })
    }
    passwordInput(e) {
        this.setState({
            password: e.target.value
        })
    }
    async Submit() {
        let arr = {}
        arr.username = this.state.username
        arr.password = this.state.password
        console.log(arr)
        let Login = await LOGINHOME(arr)
        console.log(Login, 88989)
        if (Login.msg == '成功') {
            Cookies.set(`${Login.data.token}`, JSON.stringify(Login.data.value), { expires: 0.1 })
            this.props.history.push("/DataChecking/UserInterface")
        } else {
            this.error(Login.msg)
        }
    }
    error = (val) => {
        message.error(val)
    }
}

export default Login;