import React, { Fragment } from "react"
import { Select, Input, Button } from 'antd';
const { Option } = Select;
class ModifyData extends React.Component {
    constructor(props) {
        super(props)
        this.state = this.props.ModifyData
    }
    render() {
        let ModifyData = this.props.ModifyData
        console.log(this.props.DafaultListModify, 'DafaultListModify')
        let Array = []
        if (ModifyData.chickRoleList) {
            for (var i = 0; i < ModifyData.chickRoleList.length; i++) {
                Array.push(ModifyData.chickRoleList[i].name)
            }
        }
        return (
            <Fragment>
                <label style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }} >
                    <span>角色</span>
                    <Select
                        mode="multiple"
                        style={{ width: '400px' }}
                        placeholder="请选择角色权限"
                        defaultValue={this.props.DafaultListModify}
                        onChange={this.ModifyDataRoleInput.bind(this)}
                    >
                        {
                            ModifyData.roleList.map((item) => {
                                return <Option key={item.id}>{item.name}</Option>
                            })
                        }
                    </Select>
                </label>
                <br></br>
                <label style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }} >
                    <span>账号</span>
                    <Input type="text"
                        required="required"
                        value={ModifyData.username}
                        style={{ width: '400px', height: '45px' }}
                        onChange={this.ModifyDataUserInput.bind(this)} />
                </label>
                <br></br>
                <label style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }} >
                    <span>姓名</span>
                    <Input type="text"
                        value={ModifyData.name}
                        style={{ width: '400px', height: '45px' }}
                        onChange={this.ModifyDataUserNameInput.bind(this)} />
                </label>
                <br></br>
                <label style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }} >
                    <span>邮箱</span>
                    <Input type="text"
                        value={ModifyData.email}
                        style={{ width: '400px', height: '45px' }}
                        onChange={this.ModifyDataEmailInput.bind(this)} />
                </label>
                <br></br>
                <label style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }} >
                    <span>电话</span>
                    <Input type="text"
                        value={ModifyData.phone}
                        style={{ width: '400px', height: '45px' }}
                        onChange={this.ModifyDataTelephoneInput.bind(this)} />
                </label>
                <br></br>
                <div>
                    <Button type="primary" onClick={this.ModifyDataDetermineClick.bind(this)}>确定</Button>
                    <Button style={{ marginLeft: '20px' }} onClick={this.CancelClick.bind(this)}>取消</Button>
                </div>
            </Fragment>
        )
    }
    ModifyDataRoleInput(val) {
        this.setState({
            RoleList: val
        })
    }
    // 取消按钮
    CancelClick() {
        this.props.CancelClick()
    }
    // 确定
    ModifyDataDetermineClick() {
        let FromData = {}
        let RoleList = this.state.RoleList
        let MaxList = this.state.roleList
        console.log(RoleList,'RoleList')
        console.log(MaxList,'MaxList')
        let Array = []
        if (RoleList && MaxList) {
            for (var i = 0; i < MaxList.length; i++) {
                for (var k = 0; k < RoleList.length; k++) {
                    if (RoleList[k] == MaxList[i].id || RoleList[k] == MaxList[i].name) {
                        Array.push(MaxList[i].id)
                    }
                }
            }
        } else if (!this.state.chickRoleList) {
            console.log('走这里了')
            Array = []
        } else {
            let idList = this.state.chickRoleList
            for (var i = 0; i < idList.length; i++) {
                Array.push(idList[i].id)
            }
        }
        FromData.id = this.state.id
        FromData.roleIds = Array
        FromData.username = this.state.username
        FromData.name = this.state.name
        FromData.email = this.state.email
        FromData.phone = this.state.phone
        this.props.DetermineClick(FromData)
        console.log(FromData)

    }
    // 账号
    ModifyDataUserInput(e) {
        this.setState({
            username: e.target.value
        })
    }
    // 姓名
    ModifyDataUserNameInput(e) {
        this.setState({
            name: e.target.value
        })
    }
    // 邮箱
    ModifyDataEmailInput(e) {
        this.setState({
            email: e.target.value
        })
    }
    // 电话
    ModifyDataTelephoneInput(e) {
        this.setState({
            phone: e.target.value
        })
    }
}
export default ModifyData