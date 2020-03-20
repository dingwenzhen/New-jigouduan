import React, { Fragment } from 'react'
import { Table, Divider, Input, Button, Pagination, message, Modal, success, error } from 'antd'
import Fromlist from "./Fromlist"
import { TotalDataApi, DeleteApi, AddDataApi, ModifyDataApi, ModifyDataFinishApi } from '@api/BankInformation'

class BankInformation extends React.Component {
    constructor() {
        super()
        this.state = {
            page: 1,
            data: [],
            yxjgmc: "",
            id: "",
            EditData: {
                id: "",
                nbjgh: "",
                yxjgdm: "",
                jrxkzh: "",
                yxbgdz: "",
                yxtxdz: "",
                lxrxm: "",
                lxrdh: "",
                lxrdzyx: "",
                zjgy: "",
                zjgydh: "",
                jgzxr: "",
                jgzxrdh: "",
                yxjgmc: ""
            },
            totalCount: 10,  //数据的总数
            visible: false,
            edit: false,

        }
    }
    render() {
        const columns = [
            {
                title: '内部机构号',
                dataIndex: 'nbjgh',
                key: 'nbjgh',
                ellipsis: true,

            },
            {
                title: '银行机构代码',
                dataIndex: 'yhjgdm',
                key: 'yhjgdm',
                ellipsis: true,

            },
            {
                title: '金融许可证号',
                dataIndex: 'jrxkzh',
                key: 'jrxkzh',
                ellipsis: true
            },
            {
                title: '银行机构名称',
                dataIndex: 'yxjgmc',
                key: 'yxjgmc',
                ellipsis: true
            },
            {
                title: '银行办公地址',
                dataIndex: 'yhbgdz',
                key: 'yhbgdz',
                ellipsis: true
            },
            {
                title: '银行通信地址',
                dataIndex: 'yhtxdz',
                key: 'yhtxdz',
                ellipsis: true
            },
            {
                title: '联系人姓名',
                dataIndex: 'lxrxm',
                key: 'lxrxm',
                ellipsis: true
            },
            {
                title: '联系人电话',
                dataIndex: 'lxrdh',
                key: 'lxrdh',
                ellipsis: true
            },
            {
                title: '联系人电子邮箱',
                dataIndex: 'lxrdzyx',
                key: 'lxrdzyx',
                ellipsis: true
            },
            {
                title: '主监管员',
                dataIndex: 'zjgy',
                key: 'zjgy',
                ellipsis: true
            },
            {
                title: '主监管员电话',
                dataIndex: 'zjgydh',
                key: 'zjgydh',
                ellipsis: true
            },
            {
                title: '监管执行人',
                dataIndex: 'jgzxr',
                key: 'jgzxr',
                ellipsis: true
            },
            {
                title: '监管执行人电话',
                dataIndex: 'jgzxrdh',
                key: 'jgzxrdh',
                ellipsis: true
            },
            {
                title: '操作',
                key: 'action',
                textAlign: 'center',
                render: (text, record) => (
                    <span>
                        <a onClick={this.EditHandlerValue.bind(this, text, record)}>修改</a>
                        <Divider type="vertical" />
                        <a onClick={this.DeleteHandlerValue.bind(this, record)}>删除</a>
                    </span>
                ),
            },
        ];
        return (
            <Fragment>
                <div style={{ height: '40px', backgroundColor: '#fff', lineHeight: '40px', paddingLeft: 10, fontSize: '14px', color: '#333' }}>
                    当前位置：首页-系统管理-银行信息
                </div>
                <div style={{ padding: '10px' }}>
                    <span>银行机构名称：</span>
                    <Input style={{ width: '200px' }} value={this.state.yxjgmc} onChange={this.yxjgmcInput.bind(this)} />
                    <Button type='primary' style={{ marginLeft: '20px' }} onClick={this.ToltalDafault.bind(this)}>查询</Button>
                    <Button type='primary' style={{ marginLeft: '20px' }} onClick={this.AddDataClick.bind(this)}>新增</Button>
                    <Button style={{ marginLeft: '20px' }} onClick={this.clanerClick.bind(this)}>重置</Button>
                </div>
                <div>
                    <Modal
                        title="新增银行信息"
                        visible={this.state.visible}
                        // onOk={this.handleOk.bind(this)}
                        // confirmLoading={this.state.confirmLoading}
                        onCancel={this.handleCancel.bind(this)}
                    >
                        <Fromlist
                            CancelClick={this.CancelClick.bind(this)}
                            DetermineClick={this.ClearFromList.bind(this)}
                            queryDafault={this.queryDafault.bind(this)}
                        ></Fromlist>
                    </Modal>

                    <Modal
                        title="修改银行信息"
                        visible={this.state.edit}
                        onCancel={this.handleCancel.bind(this)}
                    >
                        <div
                            data={this.state.data}
                        >
                            <div style={{ display: 'flex', width: "100%", justifyContent: 'space-between', marginBottom: '5px' }}>
                                <label>
                                    <span style={{ marginBottom: '5px', display: 'inline-block' }}>银行机构代码</span>
                                    <Input type="text"
                                        value={this.state.EditData.yxjgdm}
                                        placeholder="请输入银行机构代码"
                                        style={{ width: '200px', height: '40px' }}
                                        onChange={this.YxjgdmInput.bind(this)} />
                                </label>
                                <label>
                                    <span style={{ marginBottom: '5px', display: 'inline-block' }}>金融许可证号</span>
                                    <Input type="text"
                                        value={this.state.EditData.jrxkzh}
                                        placeholder="请输入金融许可证号"
                                        style={{ width: '200px', height: '40px' }}
                                        onChange={this.JrxkzhInput.bind(this)} />
                                </label>
                            </div>

                            <div style={{ display: 'flex', width: "100%", justifyContent: 'space-between', marginBottom: '5px' }}>
                                <label>
                                    <span style={{ marginBottom: '5px', display: 'inline-block' }}>银行机构名称</span>
                                    <Input type="text"
                                        value={this.state.EditData.yxjgmc}
                                        placeholder="请输入银行机构名称"
                                        style={{ width: '200px', height: '40px' }}
                                        onChange={this.YxjgmcInput.bind(this)} />
                                </label>

                                <label>
                                    <span style={{ marginBottom: '5px', display: 'inline-block' }}>银行办公地址</span>
                                    <Input type="text"
                                        value={this.state.EditData.yxbgdz}
                                        placeholder="请输入银行办公地址"
                                        style={{ width: '200px', height: '40px' }}
                                        onChange={this.YxbgdzInput.bind(this)} />
                                </label>
                            </div>

                            <div style={{ display: 'flex', width: "100%", justifyContent: 'space-between', marginBottom: '5px' }}>
                                <label style={{ width: '270px' }}>
                                    <span style={{ marginBottom: '5px', display: 'inline-block' }}>银行通信地址</span>
                                    <Input type="text"
                                        value={this.state.EditData.yxtxdz}
                                        placeholder="请输入银行通信地址"
                                        style={{ width: '200px', height: '40px' }}
                                        onChange={this.YxtxdzInput.bind(this)} />
                                </label>
                                <label>
                                    <span style={{ marginBottom: '5px', display: 'inline-block' }}>联系人姓名</span>
                                    <Input type="text"
                                        value={this.state.EditData.lxrxm}
                                        placeholder="请输入联系人姓名"
                                        style={{ width: '200px', height: '40px' }}
                                        onChange={this.LxrxmInput.bind(this)} />
                                </label>
                            </div>

                            <div style={{ display: 'flex', width: "100%", justifyContent: 'space-between', marginBottom: '5px' }}>
                                <label style={{ width: '298px' }}>
                                    <span style={{ marginBottom: '5px', display: 'inline-block' }}>联系人电话</span>
                                    <Input type="text"
                                        value={this.state.EditData.lxrdh}
                                        placeholder="请输入联系人电话"
                                        style={{ width: '200px', height: '40px' }}
                                        onChange={this.LxrdhInput.bind(this)} />
                                </label>

                                <label>
                                    <span style={{ marginBottom: '5px', display: 'inline-block' }}>联系人电子邮箱</span>
                                    <Input type="text"
                                        value={this.state.EditData.lxrdzyx}
                                        placeholder="请输入联系人电子邮箱"
                                        style={{ width: '200px', height: '40px' }}
                                        onChange={this.LxrdzyxInput.bind(this)} />
                                </label>
                            </div>

                            <div style={{ display: 'flex', width: "100%", justifyContent: 'space-between', marginBottom: '5px' }}>
                                <label style={{ width: '284px' }}>
                                    <span style={{ marginBottom: '5px', display: 'inline-block' }}>主监管员</span>
                                    <Input type="text"
                                        value={this.state.EditData.zjgy}
                                        placeholder="请输入主监管员"
                                        style={{ width: '200px', height: '40px' }}
                                        onChange={this.ZjgyInput.bind(this)} />
                                </label>

                                <label>
                                    <span style={{ marginBottom: '5px', display: 'inline-block' }}>主监管员电话</span>
                                    <Input type="text"
                                        value={this.state.EditData.zjgydh}
                                        placeholder="请输入主监管员电话"
                                        style={{ width: '200px', height: '40px' }}
                                        onChange={this.ZjgydhInput.bind(this)} />
                                </label>
                            </div>

                            <div style={{ display: 'flex', width: "100%", justifyContent: 'space-between', marginBottom: '5px' }}>
                                <label style={{ width: '298px' }}>
                                    <span style={{ marginBottom: '5px', display: 'inline-block' }}>监管执行人</span>
                                    <Input type="text"
                                        value={this.state.EditData.jgzxr}
                                        placeholder="请输入监管执行人"
                                        style={{ width: '200px', height: '40px' }}
                                        onChange={this.JgzxrInput.bind(this)} />
                                </label>

                                <label>
                                    <span style={{ marginBottom: '5px', display: 'inline-block' }}>监管执行人电话</span>
                                    <Input type="text"
                                        value={this.state.EditData.jgzxrdh}
                                        placeholder="请输入监管执行人电话"
                                        style={{ width: '200px', height: '40px' }}
                                        onChange={this.JgzxrdhInput.bind(this)} />
                                </label>
                            </div>


                            <div>
                                <label style={{ textAlign: "left" }}>
                                    <span style={{ marginBottom: '5px', display: 'inline-block' }}>内部机构号</span>
                                    <br></br>
                                    <Input type="text"
                                        value={this.state.EditData.nbjgh}
                                        placeholder="请输入内部机构号"
                                        style={{ width: '200px', height: '40px' }}
                                        onChange={this.NbjghInput.bind(this)} />
                                </label>
                            </div>

                            <div style={{ marginTop: '20px' }}>
                                <Button type="primary" onClick={this.ModifyFinishClick.bind(this)}>确定修改</Button>
                                <Button style={{ marginLeft: '20px' }} onClick={this.ModifyCancelClick.bind(this)}>取消</Button>
                            </div>

                        </div>
                    </Modal>
                </div>
                <div style={{ padding: '10px' }}>
                    <Table
                        className='AdministrationStyle'
                        style={{ backgroundColor: '#fff' }}
                        columns={columns}
                        dataSource={this.state.data}
                    />
                </div>
                <div>
                    <Pagination showQuickJumper current={this.state.page} total={this.state.totalCount} onChange={this.PaginationClick.bind(this)} />
                </div>
            </Fragment>
        )
    }
    componentDidMount() {
        this.ToltalDafault()
    }
    yxjgmcInput(e) {
        this.setState({
            yxjgmc: e.target.value
        })
    }

    // **************************** 修改 ********************************************
    // 修改(打开修改弹窗)
    async EditHandlerValue(val) {
        console.log(val)
        let data = await ModifyDataApi(val)
        console.log(data)
        if (data.msg == '成功') {
            this.setState({
                EditData: { ...data.data },
                edit: true
            })
        }

    }

    // 确定修改
    async ModifyFinishClick() {
        let obj = this.state.EditData
        console.log(obj)
        let data = await ModifyDataFinishApi(obj)
        console.log(data, "修改完成")
        if (data.msg == '成功') {
            // console.log(this.state.page,'io')
            this.setState({
                edit: false,
            })
            this.ToltalDafault()
        }
    }

    // 取消按钮
    ModifyCancelClick() {
        this.CancelClick()
    }

    // **************************** 修改完成 ********************************************



    // 删除
    async DeleteHandlerValue(record) {
        console.log(record)
        let data = await DeleteApi(record)
        console.log(data)
        if (data.msg == '成功') {
            this.success('删除成功')
            this.ToltalDafault()
        } else {
            this.error(data.msg)
        }
    }
    // 分页器
    PaginationClick(pageNumber) {
        this.setState({
            page: pageNumber
        }, () => {
            this.ToltalDafault()
        })
    }
    // 分页器+查询+初始=获取数据
    async ToltalDafault() {
        // console.log(this.state.page,'page')
        let obj = { yxjgmc: this.state.yxjgmc, page: this.state.page }
        console.log(obj)
        let data = await TotalDataApi(obj)
        console.log(data.data, 'list')
        this.setState({
            data: data.data.list,
            page: data.data.currPage,
            totalCount: data.data.totalCount
        })
    }


    // **********************新增********************************************
    // 新增(打开新增弹窗)
    AddDataClick() {
        this.setState({
            visible: true
        })
    }
    // 取消添加并关闭弹窗(表单底部)
    CancelClick() {
        this.setState({
            visible: false,
            edit: false

        })
    }
    // 确认添加
    ClearFromList(val) {
        if (val == '成功') {
            this.setState({
                visible: true,
                edit: true
            }, () => {
                this.success('添加成功')
            })
        } else {
            this.error(val)
        }
    }

    //关闭弹窗(表单右上角-X)
    handleCancel() {
        this.setState({
            visible: false,
            ModifyBool: false,
            DeleteBool: false,
            edit: false
        });
    }
    // ***************************新增完成************************************************8


    // 重置
    clanerClick() {
        this.setState({
            yxjgmc: ''
        }, () => {
            this.ToltalDafault()
        })
    }
    success = (val) => {
        message.success(val);
    }
    error = (val) => {
        message.error(val);
    }
    // 新增数据-添加成功 关闭弹窗-重新获取数据
    queryDafault() {
        this.ToltalDafault()
        this.setState({
            visible: false,
            edit: false
        })

    }

    // 内部机构号
    NbjghInput(e) {
        let EditData = this.state.EditData
        EditData.nbjgh = e.target.value
        this.setState({
            EditData
        })
    }
    // 银行机构代码
    YxjgdmInput(e) {
        let EditData = this.state.EditData
        EditData.yxjgdm = e.target.value
        this.setState({
            EditData
        })
    }
    // 金融许可证号
    JrxkzhInput(e) {
        let EditData = this.state.EditData
        EditData.jrxkzh = e.target.value
        this.setState({
            EditData
        })
    }
    // 银行机构名称
    YxjgmcInput(e) {
        let EditData = this.state.EditData
        EditData.yxjgmc = e.target.value
        this.setState({
            EditData
        })
    }

    // 银行办公地址
    YxbgdzInput(e) {
        let EditData = this.state.EditData
        EditData.yxbgdz = e.target.value
        this.setState({
            EditData
        })
    }

    // 银行通信地址
    YxtxdzInput(e) {
        let EditData = this.state.EditData
        EditData.yxtxdz = e.target.value
        this.setState({
            EditData
        })
    }

    // 联系人姓名
    LxrxmInput(e) {
        let EditData = this.state.EditData
        EditData.lxrxm = e.target.value
        this.setState({
            EditData
        })
    }

    // 联系人电话
    LxrdhInput(e) {
        let EditData = this.state.EditData
        EditData.lxrdh = e.target.value
        this.setState({
            EditData
        })
    }

    // 联系人电子邮箱
    LxrdzyxInput(e) {
        let EditData = this.state.EditData
        EditData.lxrdzyx = e.target.value
        this.setState({
            EditData
        })
    }

    // 主监管员
    ZjgyInput(e) {
        let EditData = this.state.EditData
        EditData.zjgy = e.target.value
        this.setState({
            EditData
        })
    }

    // 主监管员电话
    ZjgydhInput(e) {
        let EditData = this.state.EditData
        EditData.zjgydh = e.target.value
        this.setState({
            EditData
        })
    }

    // 监管执行人
    JgzxrInput(e) {
        let EditData = this.state.EditData
        EditData.jgzxr = e.target.value
        this.setState({
            EditData
        })
    }

    // 监管执行人电话
    JgzxrdhInput(e) {
        let EditData = this.state.EditData
        EditData.jgzxrdh = e.target.value
        this.setState({
            EditData
        })
    }
}
export default BankInformation