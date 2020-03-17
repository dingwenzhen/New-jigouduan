import React, { Fragment } from "react";
import { Select, Input, Button } from 'antd';
import { SELECTLIST, NEWLYADDED } from "@api/Administration"
import { DAFAULTVALUE, ADDTODATA } from "@api/Role"
import { DAFAULTROLE } from '@api/Privilege'
const { Option } = Select;
const { TextArea } = Input;
class Catalog extends React.Component {
    constructor() {
        super()
        this.state = {
            Change: "",
            Name: "",
            department: "",
            Email: "",
            Telephone: "",
            dafaultInput: '',
            selectList: [],
            Jurisdiction: [],//权限展示给用户选择的
            JurisdictionList: [],//后端权限的数组
            TextAreaValue: '',//文本框的
            JurisdictionChange: [],
            RoleValue: [],
            RoleId: []
        }
    }
    render() {
        return (
            <Fragment>
                <label style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }} >
                    <span>角色</span>
                    <Select
                        mode="multiple"
                        placeholder="请选择用户权限"
                        value={this.state.RoleId}
                        style={{ width: 400, height: 45 }} onChange={this.RoleChange.bind(this)}
                    >
                        {
                            this.state.RoleValue.map((item, index) => {
                                return <Option key={index}>{item.name}</Option>
                            })
                        }
                    </Select>
                </label>

                <br></br>
                <label style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }} >
                    <span>权限</span>
                    <Input
                        value={this.state.JurisdictionChange}
                        style={{ width: 400, height: 45 }} onChange={this.JurisdictionChange.bind(this)}>
                    </Input>

                </label>
                <br></br>
                <label style={{ display: 'flex', justifyContent: 'space-around' }} >
                    <span>说明</span>
                    <TextArea mode="multiple"
                        placeholder="请选择用户权限"
                        value={this.state.TextAreaValue}
                        style={{ width: 400, height: 100 }} onChange={this.TextAreaInput.bind(this)} />

                </label>
                <div style={{ marginTop: '20px' }}>
                    <Button type="primary" onClick={this.DetermineClick.bind(this)}>确定</Button>
                    <Button style={{ marginLeft: '20px' }} onClick={this.CancelClick.bind(this)}>取消</Button>
                </div>
            </Fragment>
        )
    }
    componentDidMount() {
        this.selectHandler()
    }
    async selectHandler() {
        let RoleList = await DAFAULTROLE()
        let data = await SELECTLIST()
        let selectList = await DAFAULTVALUE()
        let Jurisdiction = []
        for (var i = 0; i < selectList.data.length; i++) {
            Jurisdiction.push(selectList.data[i].name)
        }

        let Array = []
        for (var i = 0; i < data.data.length; i++) {
            Array.push(data.data[i].name)
        }
        this.setState({
            dafaultInput: Array[0],
            selectList: Array,
            selectDataId: data.data,
            Jurisdiction: Jurisdiction,
            JurisdictionList: selectList.data,
            RoleValue: RoleList.data
        })
    }
    // 角色
    RoleChange(value) {
        console.log(value)
        this.setState({
            RoleId: value
        })
    }
    // 文本框
    TextAreaInput(e) {
        console.log(e)
        this.setState({
            TextAreaValue: e.target.value
        })
    }
    // select
    handleChange(value) {
        this.setState({
            Change: value
        })
    }
    // 权限下拉
    JurisdictionChange(e) {
        this.setState({
            JurisdictionChange: e.target.value
        }, () => {
            console.log(this.state.JurisdictionChange)
        })
    }
    // 取消按钮
    CancelClick() {

        this.setState({
            Change: "",
            User: "",
            Name: "",
            department: "",
            Email: "",
            Telephone: "",
            dafaultInput: '',
        }, () => {
            this.props.CancelClick()
        })
    }
    // 确定
    async DetermineClick() {
        // 这是角色管理的
        let List = this.state.RoleId
        let ChangeList = this.state.RoleValue
        let RoleList = []
        for (var i = 0; i < ChangeList.length; i++) {
            for (var j = 0; j < List.length; j++) {
                if (i == List[j]) {
                    RoleList.push(ChangeList[i].id)
                }
            }
        }
        let obj = {}
        obj.name = RoleList
        obj.permissionName = this.state.JurisdictionChange
        obj.description = this.state.TextAreaValue
        let data = await ADDTODATA(obj)
        this.props.DetermineClick(data.msg)
        this.setState({
            RoleId: [],
            TextAreaValue: '',
            JurisdictionChange: ''
        })
    }
    // 账号
    UserInput(e) {
        this.setState({
            User: e.target.value
        })
    }
    // 姓名
    UserNameInput(e) {
        this.setState({
            Name: e.target.value
        })
    }
    // 邮箱
    EmailInput(e) {
        this.setState({
            Email: e.target.value
        })
    }
    // 电话
    TelephoneInput(e) {
        this.setState({
            Telephone: e.target.value
        })
    }
}
export default Catalog