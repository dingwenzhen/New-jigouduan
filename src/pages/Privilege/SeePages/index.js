import React, { Fragment } from "react";
import { Select, Input, Button } from 'antd';
const { TextArea } = Input;
class SeePages extends React.Component {
    constructor(props) {
        super(props)
        this.state = this.props.ModifyData
    }
    render() {
        let ModifyData = this.props.ModifyData
        console.log(this.props.ModifyData,'58585858')
        return (
            <Fragment>
                
                <label style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }} >
                    <span>角色</span>
                    <Input type="text"
                        required="required"
                        value={ModifyData.roleName}
                        disabled={true}
                        style={{ width: '400px', height: '45px' }}
                        onChange={this.UserInput.bind(this)} />
                </label>
                <br></br>
                <label style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }} >
                    <span>权限</span>
                    <Input type="text"
                        value={ModifyData.name}
                        disabled={true}
                        style={{ width: '400px', height: '45px' }}
                        onChange={this.EmailInput.bind(this)} />
                </label>
                <br></br>
                
                <label style={{ display: 'flex', justifyContent: 'space-around' }} >
                    <span>介绍</span>
                        <TextArea mode="multiple"
                        disabled={true}
                    value={ModifyData.description}
                    style={{ width: 400, height: 100 }}  />
                </label>
                <br></br>
                <div>
                    <Button type="primary" onClick={this.DetermineClick.bind(this)}>确定</Button>
                    <Button style={{ marginLeft: '20px' }} onClick={this.CancelClick.bind(this)}>取消</Button>
                </div>
            </Fragment>
        )
    }
    RoleInput(e) {
        this.setState({
            userName: e.target.value
        })
    }
    // 取消按钮
    CancelClick() {
        this.props.CancelClick()
    }
    // 确定
    DetermineClick() {
        let FromData = {}
        FromData.id = this.props.ModifyData.id
        this.props.DetermineClick(FromData)
    }
    // 账号
    UserInput(e) {
        this.setState({
            user: e.target.value
        })
    }
    // 姓名
    UserNameInput(e) {
        this.setState({
            userName: e.target.value
        })
    }
    // 部门
    departmentInput(e) {
        this.setState({
            department: e.target.value
        })
    }
    // 邮箱
    EmailInput(e) {
        this.setState({
            email: e.target.value
        })
    }
    // 电话
    TelephoneInput(e) {
        this.setState({
            Telephone: e.target.value
        })
    }
}
export default SeePages