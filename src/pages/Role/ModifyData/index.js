import React, { Fragment } from "react"
import { Select, Input, Button } from 'antd';
const { Option } = Select;
const { TextArea } = Input;
class ModifyData extends React.Component {
    constructor(props) {
        super(props)
        this.state = this.props.ModifyData
    }
    render() {
        let ModifyData = this.state
        console.log(ModifyData, 'ModifyData')
        let Array = []
        if (ModifyData.chickPermissionList) {
            for (var i = 0; i < ModifyData.chickPermissionList.length; i++) {
                Array.push(ModifyData.chickPermissionList[i].name)
            }
        }
        console.log(Array)
        return (
            <Fragment>
                <label style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }} >
                    <span>角色</span>
                    <Input type="text"
                    value={this.state.name}
                    style={{ width: '400px', height: '45px' }}
                    onChange={this.nameInput.bind(this)} />
                    
                </label>
                <br></br>
                <label style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }} >
                    <span>权限</span>
                    <Select
                        mode="multiple"
                        style={{ width: '400px' }}
                        placeholder="请选择角色权限"
                        defaultValue={Array}
                        onChange={this.RoleInput.bind(this)}
                    >
                        {
                            ModifyData.permissionList.map((item,index) => {
                                return <Option key={index}>{item.name}</Option>
                            })
                        }
                    </Select>
                </label>
                <br></br>
                <label style={{ display: 'flex', justifyContent: 'space-around' }} >
                    <span>说明</span>
                    <TextArea mode="multiple"
                        placeholder="请选择用户权限"
                        value={ModifyData.description}
                        style={{ width: 400, height: 100 }} onChange={this.UserNameInput.bind(this)} />
                </label>
                <br></br>

                <br></br>
                <div>
                    <Button type="primary" onClick={this.DetermineClick.bind(this)}>确定</Button>
                    <Button style={{ marginLeft: '20px' }} onClick={this.CancelClick.bind(this)}>取消</Button>
                </div>
            </Fragment>
        )
    }
    RoleInput(val) {
        this.setState({
            RoleList: val
        })
    }
    nameInput(e) {
        this.setState({
            name: e.target.value
        })
    }
    // 取消按钮
    CancelClick() {
        this.props.CancelClick()
    }
    // 确定
    DetermineClick() {
        // 选择权限的
        let FromData = {}
        let JurisdictionArray = []
        if(this.state.RoleList){
            let Jurisdiction=this.state.RoleList
            let JurisdictionList = this.state.permissionList
            for( var j = 0 ; j<JurisdictionList.length ; j++ ){
                for( var g = 0 ; g<Jurisdiction.length ; g++ ){
                    if(Jurisdiction[g] == JurisdictionList[j].id || Jurisdiction[g] == JurisdictionList[j].name){
                        JurisdictionArray.push(JurisdictionList[j].id)
                    }
                }
            }
        }else{
            let chickPermissionList = this.state.chickPermissionList
            for(var j = 0 ; j<chickPermissionList.length ; j++ ){
                JurisdictionArray.push(chickPermissionList[j].id)
            }
        }
        FromData.id = this.state.id
        FromData.name = this.state.name
        FromData.permissionids = JurisdictionArray
        FromData.description = this.state.description
        this.props.DetermineClick(FromData)

    }
    // 姓名
    UserNameInput(e) {
        this.setState({
            description: e.target.value
        })
    }

}
export default ModifyData