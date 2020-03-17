import React, { Fragment } from 'react'
import { Input, Button, message } from 'antd'
import {ChangePasswordApi} from '@api'
class NewPassword extends React.Component {
    constructor() {
        super()
        this.state = {
            oldPassword: "",//老密码
            newPassword: "",//新密码
            confirmNewPassword: ""//确认密码
        }
    }
    render() {
        return (
            <Fragment>
                <span style={{ display: 'inline-block', width: '80px' }}>原密码：</span>
                <Input style={{ width: '250px' }} value={this.state.oldPassword} onChange={this.oldPasswordInput.bind(this)} /><br />
                <span style={{ display: 'inline-block', width: '80px',marginTop:'20px' }}>新密码：</span>
                <Input style={{ width: '250px' }} value={this.state.newPassword} onChange={this.newPasswordInput.bind(this)} /><br />
                <span style={{ display: 'inline-block', width: '80px',marginTop:'20px' }}>确认密码：</span>
                <Input style={{ width: '250px' }} value={this.state.confirmNewPassword} onChange={this.confirmNewPasswordInput.bind(this)} /><br />
                <Button type='primary' style={{ marginTop: '20px' }} onClick={this.DetermineClick.bind(this)}>确定</Button>
                <Button style={{ marginLeft: '20px' }} onClick={this.cancelClick.bind(this)}>取消</Button>
            </Fragment>
        )
    }
    // 原密码
    oldPasswordInput(e) {
        this.setState({
            oldPassword: e.target.value
        })
    }
    // 新密码
    newPasswordInput(e) {
        this.setState({
            newPassword: e.target.value
        })
    }
    // 再次输入密码
    confirmNewPasswordInput(e) {
        this.setState({
            confirmNewPassword: e.target.value
        })
    }
    // 确定
    async DetermineClick() {
        let obj = this.state
        if (obj.oldPassword == '' || obj.newPassword == '' || obj.confirmNewPassword == '') {
            this.error('请输入密码')
        }else if(obj.newPassword != obj.confirmNewPassword){
            this.error('前后输入的密码不一致')
        }else{
            let data = await ChangePasswordApi(obj)
            if(data.msg == '密码修改成功'){
                this.success('密码修改成功')
                this.props.CloseClick()
            }else{
                this.error(data.msg)
            }
        }
    }
    cancelClick(){
        this.props.CloseClick()
    }
    success = (val) => {
        message.success(val);
    }
    error = (val) => {
        message.error(val);
    }
}
export default NewPassword