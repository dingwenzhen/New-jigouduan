import React, { Fragment } from "react";
import { Select, Input, Button } from 'antd';
import { SELECTLIST, NEWLYADDED } from "@api/Administration"
import { DAFAULTVALUE, ADDLISTDATA } from "@api/Role"
const { Option } = Select;
const { TextArea } = Input;
class Fromlist extends React.Component {
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
            JurisdictionChange: []
        }
    }
    render() {
        return (
            <Fragment>
                <label style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }} >
                    <span>角色</span>
                    <Input type="text"
                        value={this.state.Name}
                        placeholder="请输入角色名称"
                        style={{ width: '400px', height: '40px' }}
                        onChange={this.UserNameInput.bind(this)} />
                </label>

                <br></br>
                <label style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }} >
                    <span>权限</span>
                    <Select
                        mode="multiple"
                        placeholder="请选择用户权限"
                        style={{ width: 400, height: 45 }} onChange={this.JurisdictionChange.bind(this)}
                    >
                        {
                            this.state.Jurisdiction.map((item, index) => {
                                return <Option key={index}>{item}</Option>
                            })
                        }
                    </Select>
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
        let data = await SELECTLIST()
        let selectList = await DAFAULTVALUE()
        console.log(selectList, 'selectList')
        let Jurisdiction = []
        for (var i = 0; i < selectList.data.length; i++) {
            Jurisdiction.push(selectList.data[i].name)
        }

        let Array = []
        for (var i = 0; i < data.data.length; i++) {
            Array.push(data.data[i].name)
        }
        console.log(Array)
        this.setState({
            dafaultInput: Array[0],
            selectList: Array,
            selectDataId: data.data,
            Jurisdiction: Jurisdiction,
            JurisdictionList: selectList.data
        })
        console.log(data)
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
    JurisdictionChange(value) {
        this.setState({
            JurisdictionChange: value
        }, () => {
            console.log(this.state.JurisdictionChange)
        })
    }
    // 取消按钮
    CancelClick() {
        this.props.CancelClick()
        this.setState({
            Change: "",
            User: "",
            Name: "",
            department: "",
            Email: "",
            Telephone: "",
            dafaultInput: '',
        })
    }
    // 确定
    async DetermineClick() {
        // 这是角色管理的
        console.log(this.state)
        let List = this.state.Change
        let ChangeList = this.state.selectDataId
        let RoleList = []
        for (var i = 0; i < ChangeList.length; i++) {
            for (var j = 0; j < List.length; j++) {
                if (i == List[j]) {
                    RoleList.push(ChangeList[i].id)
                }
            }
        }
        // 这是权限的
        let JurisdictionChange = this.state.JurisdictionChange
        let JurisdictionList = this.state.JurisdictionList
        let Jurisd = []
        for (var k = 0; k < JurisdictionList.length; k++) {
            for (var m = 0; m < JurisdictionChange.length; m++) {
                if (k == JurisdictionChange[m]) {
                    Jurisd.push(JurisdictionList[k].id)
                }
            }
        }
        console.log(Jurisd)
        let obj = {}
        // obj.username = this.state.Name
        obj.name = this.state.Name
        obj.permissionName = Jurisd
        obj.description = this.state.TextAreaValue
        console.log(obj)
        let data = await ADDLISTDATA(obj)
        if (data.msg) {
            this.props.DetermineClick(data.msg)
        }
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
export default Fromlist