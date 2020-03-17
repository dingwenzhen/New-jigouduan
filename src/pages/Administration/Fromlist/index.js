import React, { Fragment } from "react";
import { Select, Input, Button } from 'antd';
import { SELECTLIST, NEWLYADDED } from "@api/Administration"
const { Option } = Select;

class Fromlist extends React.Component {
    constructor() {
        super()
        this.state = {
            Change: "",
            User: "",
            Name: "",
            department: "",
            Email: "",
            Telephone: "",
            dafaultInput: '',
            selectList: [],
            password:''
        }
    }
    render() {
        return (
            <Fragment>
                <label style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }} >
                    <span>角色</span>

                    <Select
                        mode="multiple"
                        placeholder="请选择用户角色"
                        style={{ width: 400, height: 45 }} onChange={this.handleChange.bind(this)}
                    >
                        {
                            this.state.selectList.map((item, index) => {
                                return <Option key={index}>{item}</Option>
                            })
                        }
                    </Select>
                </label>
                <br></br>
                <label style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }} >
                    <span>姓名</span>
                    <Input type="text"
                        value={this.state.Name}
                        style={{ width: '400px', height: '40px' }}
                        onChange={this.UserNameInput.bind(this)} />
                </label>
                <br></br>
                <label style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }} >
                    <span>账号</span>
                    <Input type="text"
                        required="required"
                        value={this.state.User}
                        style={{ width: '400px', height: '40px' }}
                        onChange={this.UserInput.bind(this)} />
                </label>
                <br></br>
                
                <label style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }} >
                    <span>密码</span>
                    <Input type="text"
                        value={this.state.password}
                        style={{ width: '400px', height: '40px' }}
                        onChange={this.PassWordInput.bind(this)} />
                </label>
                <br></br>
                <label style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }} >
                    <span>邮箱</span>
                    <Input type="text"
                        value={this.state.Email}
                        style={{ width: '400px', height: '40px' }}
                        onChange={this.EmailInput.bind(this)} />
                </label>
                <br></br>
                <label style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }} >
                    <span>电话</span>
                    <Input type="text"
                        value={this.state.Telephone}
                        style={{ width: '400px', height: '40px' }}
                        onChange={this.TelephoneInput.bind(this)} />
                </label>
                <br></br>
                <div>
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

        let Array = []
        for (var i = 0; i < data.data.length; i++) {
            Array.push(data.data[i].name)
        }
        console.log(Array)
        this.setState({
            dafaultInput: Array[0],
            selectList: Array,
            selectDataId: data.data
        })
        console.log(data)
    }
    // select
    handleChange(value) {
        console.log(`selected ${value}`)
        this.setState({
            Change: value
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
        let arr = []
        let Array = []
        let List = this.state.Change//只有下标的
        let DataList = this.state.selectList
        for (var q = 0; q < List.length; q++) {
            arr.push(DataList[List[q]])
        }
        let selectDataId = this.state.selectDataId//数据是全的
        for (var k = 0; k < selectDataId.length; k++) {
            for (var f = 0; f < arr.length; f++) {
                if (selectDataId[k].name == arr[f]) {
                    Array.push(selectDataId[k].id)
                }
            }
        }
        let FromData = {}
        FromData.roleIds = Array
        FromData.username = this.state.User
        FromData.name = this.state.Name
        FromData.email = this.state.Email
        FromData.phone = this.state.Telephone
        FromData.password = this.state.password
        console.log(FromData)
        let data = await NEWLYADDED(FromData)
        console.log(data, '添加')
        if (data.msg == '成功') {
            this.setState({
                Change: "",
                User: "",
                Name: "",
                department: "",
                Email: "",
                Telephone: "",
                dafaultInput: '',
            })
            this.props.DetermineClick(data.msg)
            
        }
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
    // 密码
    PassWordInput(e){
        this.setState({
            password:e.target.value
        })
    }
}
export default Fromlist