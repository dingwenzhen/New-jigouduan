import React, { Fragment } from 'react'
import { EditUser, ModifyPersonalApi } from '@api'
import { Input, Button, message } from 'antd'
class EditInformation extends React.Component {
    constructor() {
        super()
        this.state = {
            id: '',
            username: '',//登录名
            name: '',//姓名
            phone: '',//电话
            email: '',//邮箱
            roleName: '',//身份
        }
    }
    render() {
        return (
            <Fragment>
                <div style={{ height: '40px', backgroundColor: '#fff', lineHeight: '40px', paddingLeft: 10, fontSize: '14px', color: '#333' }}>
                    当前位置：个人资料
                </div>
                <div style={{position:'relative',marginTop:'20px'}}>
                    <div style={{ padding: '20px',position:'absolute',width:'520px',left:'0',right:'0',margin:'auto' }}>
                        <span style={{ display: 'inline-block', width: '80px' }}>登录名：</span>
                        <Input disabled style={{ width: '400px' }} value={this.state.username} onChange={this.usernameInput.bind(this)} /><br />
                        <span style={{ display: 'inline-block', width: '80px', marginTop: '20px' }}>姓名：</span>
                        <Input style={{ width: '400px' }} value={this.state.name} onChange={this.nameInput.bind(this)} /><br />
                        <span style={{ display: 'inline-block', width: '80px', marginTop: '20px' }}>电话：</span>
                        <Input style={{ width: '400px' }} value={this.state.phone} onChange={this.phoneInput.bind(this)} /><br />
                        <span style={{ display: 'inline-block', width: '80px', marginTop: '20px' }}>邮箱：</span>
                        <Input style={{ width: '400px' }} value={this.state.email} onChange={this.emailInput.bind(this)} /><br />

                        <span style={{ display: 'inline-block', width: '80px', marginTop: '20px' }}>身份：</span>
                        <Input style={{ width: '400px' }} value={this.state.roleName} disabled /><br />
                        <Button type='primary' style={{ marginTop: '20px' }} onClick={this.EditClick.bind(this)}>修改</Button>
                        <Button style={{ marginLeft: '20px', marginTop: '20px' }}>取消</Button>
                    </div>
                </div>
            </Fragment>
        )
    }
    componentDidMount() {
        this.DafaultDataUser()
    }
    async DafaultDataUser() {
        let data = await EditUser()
        this.setState({
            id: data.data.id,
            username: data.data.username,//登录名
            name: data.data.name,//姓名
            phone: data.data.phone,//电话
            email: data.data.email,//邮箱
            roleName: data.data.roleName,//身份
        })
    }
    // 用户名
    usernameInput(e) {
        this.setState({
            username: e.target.value
        })
    }
    // 姓名
    nameInput(e) {
        this.setState({
            name: e.target.value
        })
    }
    // 电话
    phoneInput(e) {
        this.setState({
            phone: e.target.value
        })
    }
    // 邮箱
    emailInput(e) {
        this.setState({
            email: e.target.value
        })
    }
    // 密码
    passwordInput(e) {
        this.setState({
            password: e.target.value
        })
    }
    // 修改
    async EditClick() {
        let obj = this.state
        let data = await ModifyPersonalApi(obj)
        if (data.msg == '成功') {
            this.success('修改成功')
        } else {
            this.error(data.msg)
        }
    }
    success = (val) => {
        message.success(val);
    }
    error = (val) => {
        message.error(val);
    }
}
export default EditInformation