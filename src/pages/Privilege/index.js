import React from 'react'
import { Fragment } from 'react'
import { Input, Button } from 'antd';
import { TableDivider, Modal, Pagination, Divider, Table, Select, message } from 'antd';
import NewlyAdd from './NewlyAdd'
import SeePages from "./SeePages"
import DeleteData from './deleteData'
import { WHOLEDATALIST, DELETEID, IDOBTAINDATA, UPDATADTAAPI } from '@api/Privilege'
import BackFirst from '@pages/BackFirst'
const { Option } = Select;
const { TextArea } = Input;
class Privilege extends React.Component {
    constructor() {
        super()
        this.state = {
            Jurisdiction: '',
            Explain: '',
            data: [],
            selectedRowKeys: [],
            NewlyBool: false,
            SeeBool: false,
            DeleteBool: false,
            SeeData: {},
            name: [],
            description: '',
            page: 1,
            totalCount: 10,
            deleteData: {},
            ModifyData: { rolelist: [] },
            RoleList: [],
            dafaultdata: [],
            pageBool: false,
            pagetitle: ''
        }
    }
    onSelectChange = selectedRowKeys => {
        console.log('点击前面的选框 ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };
    render() {
        const { loading, selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            onSelect: (record, selected, selectedRows) => {
                console.log(record, selected, selectedRows);
            },
            onSelectAll: (selected, selectedRows, changeRows) => {
                console.log(selected, selectedRows, changeRows);
            },
        };
        const hasSelected = selectedRowKeys.length > 0;
        const columns = [
            {
                id: 2,
                title: '权限名称',
                dataIndex: 'name',
                align: 'left',
                ellipsis: true,
            },
            {
                id: 4,
                title: '描述',
                dataIndex: 'description',
                align: 'left',
                ellipsis: true,
            },
            {
                id: 5,
                title: '创建时间',
                dataIndex: 'createTime',
                align: 'left',
                ellipsis: true,
                width: '150px'
            },
            {
                title: '操作',
                dataIndex: 'operation',
                align: 'left',
                key: 'operation',
                width: "150px",
                ellipsis: true,
                render: (text, record) => {
                    return <span>
                        <a onClick={this.EditHandlerValue.bind(this, text, record)}>编辑</ a>
                        <Divider type="vertical" />
                        <a onClick={this.SeeHandlerValue.bind(this, text, record)}>查看</ a>
                        <Divider type="vertical" />
                        <a onClick={this.DeleteHandlerValue.bind(this, record)}>删除</ a>
                    </span>

                },
            }
        ];
        let ModifyData = this.state.ModifyData
        if (!ModifyData.chaickRoleName) {
            ModifyData.chaickRoleName = []
        }
        console.log(ModifyData.chaickRoleName, 'ModifyData')
        return (
            <Fragment>
                <div style={{ height: '40px', backgroundColor: '#fff', lineHeight: '40px', paddingLeft: 10, fontSize: '14px', color: '#333' }}>
                    当前位置：首页-系统管理-权限管理
                </div>
                <div>
                        <div className='jindu'>
                            <div style={{ marginBottom: '12px', padding: '10px', display: 'inline-block', float: 'left' }}>
                                <Input placeholder="请输入权限名称" value={this.state.Jurisdiction} style={{ width: 150, marginLeft: '12px' }} onChange={this.JurisdictionInput.bind(this)} />
                                <Input placeholder="请输入描述" value={this.state.Explain} style={{ width: 150, marginLeft: '12px' }} onChange={this.ExplainInput.bind(this)} />
                                <Button type="primary" style={{ margin: ' 0 6px' }} onClick={this.QueryClick.bind(this)}>查询</Button>
                                <Button type="primary" style={{ margin: ' 0 6px' }} onClick={this.ResetClick.bind(this)}>重置</Button>
                            </div>
                            <div style={{ float: 'right', marginTop: '16px' }}>
                                <Button type="primary" style={{ margin: ' 0 6px' }} onClick={this.NewlyClick.bind(this)}>新增</Button>
                            </div>
                        </div>
                        <div style={{ backgroundColor: "#FFFFFF", padding: "10px" }} className='AdministrationStyle'>

                            <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.data} onChange={this.onChange.bind(this)} />
                        </div>

                        <Modal
                            title="新增权限"
                            visible={this.state.NewlyBool}
                            onOk={this.handleOk.bind(this)}
                            onCancel={this.handleCancel.bind(this)}
                        >
                            <NewlyAdd CancelClick={this.handleOk.bind(this)} 
                            DetermineClick={this.clearNewly.bind(this)}
                            dafaultData={this.state.data} callfunction={this.DefaultHandler.bind(this)} />
                        </Modal>
                        <Modal
                            title="查看权限"
                            visible={this.state.SeeBool}
                            onOk={this.handleOk.bind(this)}
                            onCancel={this.handleCancel.bind(this)}
                        >
                            <SeePages ModifyData={this.state.SeeData}
                                DetermineClick={this.handleOk.bind(this)}
                                CancelClick={this.handleOk.bind(this)} />
                        </Modal>
                        <Modal
                            title="删除权限"
                            visible={this.state.DeleteBool}
                            onOk={this.handleOk.bind(this)}
                            onCancel={this.handleCancel.bind(this)}
                        >
                            <DeleteData ModifyData={this.state.deleteData}
                                DetermineClick={this.deleteClick.bind(this)}
                                CancelClick={this.handleOk.bind(this)} />
                        </Modal>
                        <Modal
                            title="修改用户资料"
                            visible={this.state.ModifyBool}
                            onOk={this.handleOk.bind(this)}
                            onCancel={this.handleCancel.bind(this)}
                        >
                            <label style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }} >
                                <span>权限</span>
                                <Input type="text"
                                    value={this.state.name}
                                    style={{ width: '400px', height: '45px' }}
                                    onChange={this.nameInput.bind(this)} />

                            </label>
                            <br></br>

                            <label style={{ display: 'flex', justifyContent: 'space-around' }} >
                                <span>说明</span>
                                <TextArea mode="multiple"
                                    placeholder="请选择用户权限"
                                    value={this.state.description}
                                    style={{ width: 400, height: 100 }} onChange={this.UserNameInputs.bind(this)} />
                            </label>
                            <br></br>

                            <br></br>
                            <div>
                                <Button type="primary" onClick={this.DetermineClick.bind(this)}>确定</Button>
                                <Button style={{ marginLeft: '20px' }} onClick={this.handleOk.bind(this)}>取消</Button>
                            </div>
                        </Modal>
                    </div>
            </Fragment>
        )
    }
    clearNewly() {
        this.handleOk()
    }
    handleOk() {
        this.setState({
            NewlyBool: false,
            SeeBool: false,
            DeleteBool: false,
            ModifyBool: false,
            RoleList: []
        })
    }
    handleCancel() {
        this.setState({
            NewlyBool: false,
            SeeBool: false,
            DeleteBool: false,
            ModifyBool: false,
            RoleList: []
        })
    }
    componentDidMount() {
        this.DefaultHandler()
    }
    // 这个函数既可以做初始化数据，又可以做后期数据分页的使用以及查询
    DefaultHandler() {
        let obj = {}
        obj.name = this.state.Jurisdiction
        obj.page = this.state.page
        obj.description = this.state.Explain
        this.DafaultData(obj)
    }
    // 获取数据
    async DafaultData(obj) {
        let data = await WHOLEDATALIST(obj)
        let List = data.data
        let array = []
        let bool = List.find(function (value) {
            if (value.type == 0) {
                return '存在一级'
            }if (value.type == 1) {
                return '存在二级'
            }if (value.type == 2) {
                return '存在二级'
            }
        })
        if (bool.type == 0) {
            for (var i = 0; i < List.length; i++) {
                if (List[i].type == 0) {
                    List[i].children = []
                    List[i].key = List[i].id
                    array.push(List[i])
                    continue
                }
            }
        }else if(bool.type == 1){
            for (var i = 0; i < List.length; i++) {
                if (List[i].type == 1) {
                    List[i].children = []
                    List[i].key = List[i].id
                    array.push(List[i])
                    continue
                }
            }
        }else if(bool.type == 2){
            for (var i = 0; i < List.length; i++) {
                if (List[i].type == 2) {
                    List[i].children = []
                    List[i].key = List[i].id
                    array.push(List[i])
                    continue
                }
            }
        }
        console.log(bool, '898989ni')

        for (var j = 0; j < array.length; j++) {
            for (var k = 0; k < List.length; k++) {
                if (array[j].id == List[k].parentId) {
                    List[k].children = []
                    List[k].key = List[k].id
                    array[j].children.push(List[k])
                }
                if (array[j].children) {
                    for (var t = 0; t < array[j].children.length; t++) {
                        if (array[j].children[t].id == List[k].parentId) {
                            array[j].children[t].key = array[j].children[t].id
                            List[k].key = List[k].id
                            array[j].children[t].children.push(List[k])
                        }
                    }
                }
            }
        }
        console.log(array, 'ceshi')
        if (data.data) {
            this.setState({
                pageBool: true,
                data: array
            })
        } else {
            this.setState({
                pageBool: false,
                pagetitle: data.msg
            })
        }
    }
    onChange() {

    }
    // 请输入权限名称
    JurisdictionInput(e) {
        console.log(e.target.value)
        this.setState({
            Jurisdiction: e.target.value
        })
    }
    // 请输入说明
    ExplainInput(e) {
        this.setState({
            Explain: e.target.value
        })
    }
    // 查询
    QueryClick() {
        this.DefaultHandler()
    }
    // 重置
    ResetClick() {
        this.setState({
            Jurisdiction: '',
            Explain: '',
            page: 1
        }, () => {
            this.DefaultHandler()
        })
    }
    // 新增
    NewlyClick() {
        this.setState({
            NewlyBool: true
        })
    }
    // 编辑
    async EditHandlerValue(text, record) {
        let data = await IDOBTAINDATA(record.id)
        console.log(data)
        if (data.msg == '成功') {
            let dafaultValue = []
            if (data.data.chaickRoleList) {
                for (var i = 0; i < data.data.chaickRoleList.length; i++) {
                    dafaultValue.push(data.data.chaickRoleList[i])
                }
            }
            console.log(dafaultValue, 'dafaultValue')
            this.setState({
                ModifyBool: true,
                ModifyData: data.data,
                name: data.data.name,
                description: data.data.description,
                dafaultdata: dafaultValue,
                dafaultName:data.data.name
            })
        } else {
            this.error(data.msg)
        }
    }
    error = (val) => {
        message.error(val);
    };
    // 查看
    SeeHandlerValue(text, record) {
        this.setState({
            SeeData: arguments[1],
            SeeBool: true
        })
    }
    // 删除
    DeleteHandlerValue(record) {
        console.log(record)
        this.setState({
            DeleteBool: true,
            deleteData: record
        })
    }
    // 分页
    Pagination(pageNumber) {
        console.log(pageNumber, '分页')
        this.setState({
            page: pageNumber
        }, () => {
            this.DefaultHandler()
        })
    }
    // 组件触发的删除单条数据
    async deleteClick(val) {
        console.log(val, 'pp')
        let data = await DELETEID(val.id)
        if (data.msg == '成功') {
            this.success('删除成功')
            this.handleOk()
            this.DefaultHandler()
        } else {
            this.error(data.msg)
        }
    }

    // 区分  xiugai
    RoleInput(val) {
        this.setState({
            RoleList: val
        }, () => {
            console.log(this.state.RoleList, 'RoleList')
        })
    }
    nameInput(e) {
        this.setState({
            name: e.target.value
        })
    }
    // 取消按钮
    CancelClick() {
        this.handleOk()
    }
    // 确定
    async DetermineClick() {
        // 选择权限的
        let FromData = {}
        let JurisdictionArray = []
        if (this.state.RoleList.length > 0) {
            let Jurisdiction = this.state.RoleList
            let JurisdictionList = this.state.ModifyData.rolelist
            for (var j = 0; j < JurisdictionList.length; j++) {
                for (var g = 0; g < Jurisdiction.length; g++) {
                    if (Jurisdiction[g] == j || Jurisdiction[g] == JurisdictionList[j].name) {
                        JurisdictionArray.push(JurisdictionList[j].id)
                    }
                }
            }
            console.log(Jurisdiction, 'Jurisdiction')
        } else {
            let chickPermissionList = this.state.ModifyData.chaickRoleName
            let wholeList = this.state.ModifyData.rolelist
            console.log(chickPermissionList)
            for (var j = 0; j < chickPermissionList.length; j++) {
                for (var i = 0; i < wholeList.length; i++) {
                    if (chickPermissionList[j] == wholeList[i].id || chickPermissionList[j] == wholeList[i].name) {
                        JurisdictionArray.push(wholeList[i].id)
                    }
                }
            }
        }
        FromData.id = this.state.ModifyData.id
        FromData.name = this.state.name
        FromData.roleIds = JurisdictionArray
        FromData.description = this.state.description
        console.log(FromData, 'FromData')
        let data = await UPDATADTAAPI(FromData)
        // this.ModifyData(FromData)
        if (data.msg == '成功') {
            console.log(this.state.dafaultName,'this.state.dafaultName')
            let OriginalName = this.state.dafaultName
            document.querySelector(`#${OriginalName}`).innerText=FromData.name
            document.querySelector(`#${OriginalName}`).id=FromData.name
        
            this.handleOk()
            this.DefaultHandler()
        }else{
            message.error(data.msg)
        }

    }
    // 姓名
    UserNameInputs(e) {
        this.setState({
            description: e.target.value
        })
    }
    success = (val) => {
        message.success(val);
    }
    error = (val) => {
        message.error(val);
    }
}
export default Privilege