import React, { Fragment } from 'react'
import { Table, Divider, Input, Button, Pagination, message } from 'antd'
import { TotalDataApi, DeleteApi } from '@api/BankInformation'
class BankInformation extends React.Component {
    constructor() {
        super()
        this.state = {
            data: [],
            yhjgmc: '',
            page: 1
        }
    }
    render() {
        const columns = [
            {
                title: '银行机构代码',
                dataIndex: 'yhjgdm',
                key: 'yhjgdm',
                ellipsis: true
            },
            {
                title: '金融许可证号',
                dataIndex: 'jrxkzh',
                key: 'jrxkzh',
                ellipsis: true
            },
            {
                title: '银行机构名称',
                dataIndex: 'yhjgmc',
                key: 'yhjgmc',
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
                        <a onClick={this.EditHandlerValue.bind(this, text, record)}>编辑</ a>
                        <Divider type="vertical" />
                        <a onClick={this.SeeHandlerValue.bind(this, text, record)}>查看</ a>
                        <Divider type="vertical" />
                        <a onClick={this.DeleteHandlerValue.bind(this, record)}>删除</ a>
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
                    <Input style={{ width: '200px' }} value={this.state.yhjgmc} onChange={this.yhjgmcInput.bind(this)} />
                    <Button type='primary' style={{ marginLeft: '20px' }} onClick={this.ToltalDafault.bind(this)}>查询</Button>
                    <Button style={{ marginLeft: '20px' }} onClick={this.clanerClick.bind(this)}>重置</Button>
                </div>
                <div style={{ padding: '10px' }}>
                    <Table className='AdministrationStyle' style={{ backgroundColor: '#fff' }} columns={columns} dataSource={this.state.data} />
                </div>
                <div>
                    <Pagination showQuickJumper defaultCurrent={this.state.page} total={500} onChange={this.PaginationClick.bind(this)} />
                </div>
            </Fragment>
        )
    }
    componentDidMount(){
        this.ToltalDafault()
    }
    yhjgmcInput(e) {
        this.setState({
            yhjgmc: e.target.value
        })
    }
    // 编辑
    EditHandlerValue() {

    }
    // 查看
    SeeHandlerValue() {

    }
    // 删除
    async DeleteHandlerValue(record) {
        let data = await DeleteApi(record.id)
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
        let obj = { yhjgmc: this.state.yhjgmc, page: this.state.page }
        console.log(obj)
        let data = await TotalDataApi(obj)
        console.log(data,'list')
        // this.setState({
        //     data: data.data.list,
        //     page: data.data.currPage
        // })
    }
    // 重置
    clanerClick() {
        this.setState({
            yhjgmc: ''
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
}
export default BankInformation