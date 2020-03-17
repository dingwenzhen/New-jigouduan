import React, { Fragment } from "react"
import { Table, Select, Modal, Pagination, Input, Button, message, Divider } from 'antd';
import { DAFAULTVALUE, QUERYDATALIST, QUERYVALUE, PageApi } from "@api/ModifyData"
import { SEQSELECT } from "@api/ModifyData"
import TimeValue from "../TimeValue"
import { withRouter } from "react-router-dom"
import BackFirst from '@pages/BackFirst'
import SeeLook from './SeeLook'
const { TextArea } = Input;
const { Option } = Select
@withRouter
class TableList extends React.Component {
    constructor() {
        super()
        this.state = {
            data: [],
            selectedRowKeys: [],
            loading: false,
            filteredInfo: null,
            sortedInfo: null,
            ModalText: 'Content of the modal',
            visible: false,
            confirmLoading: false,
            currPage: 1,
            totalCount: 10,
            field_name: '',
            field_value: '',
            describe: '',
            cacelBool: false,
            selectListBool: false,
            selectList: [],
            SelectValue: '12',
            TimeBool: false,
            queryValue: '',
            id: 0,
            RouteBool: false,
            RouteValue: '',
            AreaCodeBool: false,//区域代码
            DataBaseBool: false,//数据库的布尔值
            pagetitle: '',
            pageBool: true,
            SeeBool: false,
            SeeData:{}
        }

    }

    render() {
        let { sortedInfo, filteredInfo } = this.state;
        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {};
        const { loading, selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const columns = [
            {
                id: 1,
                title: '参数名称',
                dataIndex: 'fieldNameCn',
                width: '200px',
                align: 'center',
                ellipsis: true
            },
            {
                id: 2,
                title: '参数值',
                dataIndex: 'fieldValue',
                width: '200px',
                align: 'center',
                ellipsis: true
            },
            {
                id: 3,
                title: '参数描述',
                dataIndex: 'describe',
                align: 'center',
                ellipsis: true
            },
            {
                title: '操作',
                dataIndex: 'operation',
                align: 'center',
                key: 'operation',
                width: "150px",
                ellipsis: true,
                render: (text, record) => {
                    // if (record.type == '默认采集规则版本' || record.type == '默认采集日期' || record.type == '文件路径' || record.type == '业务数据库名称' || record.type == '区域代码') {
                    return <span>
                        <a onClick={this.EditHandlerValue.bind(this, text, record)}>参数管理</ a>
                        <Divider type='vertical' />
                        <a onClick={this.SeeLookValue.bind(this, text, record)}>查看</ a>
                    </span>
                    // } else {
                    //     return <span>
                    //         
                    //     </span>
                    // }

                },
            }
        ]
        const { visible, confirmLoading, ModalText } = this.state;
        return (
            <Fragment>
                {
                    this.state.pageBool ? <div>
                        <div className="TableList" style={{ backgroundColor: "#FFFFFF", padding: "10px" }}>
                            <Table columns={columns} dataSource={this.state.data} onChange={this.onChange.bind(this)} />
                        </div>
                        <div>
                            <Pagination showQuickJumper
                                defaultCurrent={this.state.currPage} total={this.state.totalCount}
                                onChange={this.PaginationonChange.bind(this)} />
                        </div>
                        <Modal
                            title="修改参数"
                            visible={visible}
                            onOk={this.handleOk.bind(this)}
                            confirmLoading={confirmLoading}
                            onCancel={this.handleCancel.bind(this)}
                        >
                            {
                                this.state.selectListBool ? <div style={{ display: 'flex', marginTop: '20px' }}>
                                    <span style={{ display: 'inline-block', textAlign: 'right', marginRight: '10px', width: '100px' }}>默认规则版本：</span>
                                    <Select
                                        onChange={this.LevelhandleChange.bind(this)}
                                        value={this.state.field_value}
                                        style={{ display: 'inline-block', flex: '1' }}
                                    >
                                        {
                                            this.state.selectList.map((item, index) => {
                                                return <Option value={item} key={index}>{item}</Option>
                                            })
                                        }
                                    </Select>  </div> : ''
                            }
                            {
                                this.state.cacelBool ? <div style={{ display: 'flex', marginTop: '20px' }}>
                                    <span style={{ display: 'inline-block', textAlign: 'right', marginRight: '10px', width: '100px' }}>默认规则版本：</span>

                                    <div style={{ flex: '1', height: '30px', border: '1px solid #d9d9d9 ', borderRadius: '4px', backgroundColor: '#fff', padding: '4px 11px', cursor: 'pointer' }}
                                        onClick={this.CacelListValue.bind(this)}>
                                        {this.state.field_value}</div>
                                </div> : ''
                            }
                            {
                                this.state.RouteBool ? <div style={{ display: 'flex', marginTop: '20px' }}>
                                    <span style={{ display: 'inline-block', textAlign: 'right', marginRight: '10px', width: '100px' }}>默认路径：</span>
                                    <Input
                                        onChange={this.RouteChange.bind(this)}
                                        style={{ display: 'inline-block', flex: '1' }}
                                        value={this.state.field_value}
                                    >
                                    </Input>  </div> : ''
                            }
                            {
                                this.state.AreaCodeBool ? <div style={{ display: 'flex', marginTop: '20px' }}>
                                    <span style={{ display: 'inline-block', textAlign: 'right', marginRight: '10px', width: '100px' }}>区域代码:</span>
                                    <Input
                                        onChange={this.AreaCodeChange.bind(this)}
                                        style={{ display: 'inline-block', flex: '1' }}
                                        value={this.state.field_value}
                                    >
                                    </Input>  </div> : ''
                            }
                            {
                                this.state.DataBaseBool ? <div style={{ display: 'flex', marginTop: '20px' }}>
                                    <span style={{ display: 'inline-block', textAlign: 'right', marginRight: '10px', width: '100px' }}>业务数据库：</span>
                                    <Input
                                        onChange={this.DataBaseChange.bind(this)}
                                        style={{ display: 'inline-block', flex: '1' }}
                                        value={this.state.field_value}
                                    >
                                    </Input>  </div> : ''
                            }
                            <div style={{ display: 'flex', marginTop: '20px' }}>
                                <span style={{ display: 'inline-block', width: '130px', textAlign: 'right', marginRight: '10px' }}>参数描述：</span>
                                <TextArea rows={4} placeholder="请输入参数描述" value={this.state.describe} onChange={this.describeInput.bind(this)} />
                            </div>
                            <div style={{ marginTop: '20px' }}>
                                <Button type="primary" style={{ marginRight: '20px' }} onClick={this.SumbitInput.bind(this)}>确定</Button>
                                <Button onClick={this.handleCancel.bind(this)}>取消</Button>
                            </div>
                        </Modal>
                        <Modal
                            title="请选择时间"
                            visible={this.state.TimeBool}
                            onOk={this.handleOkTime.bind(this)}
                            onCancel={this.handleCancelTime.bind(this)}
                        >
                            <TimeValue
                                TimeClose={this.TimeClose.bind(this)}

                            />
                        </Modal>
                    </div> : <BackFirst title={this.state.pagetitle} />
                }
                <Modal
                    title="查看信息"
                    visible={this.state.SeeBool}
                    onOk={this.handleOkTime.bind(this)}
                    onCancel={this.handleCancelTime.bind(this)}
                >
                    <SeeLook SeeData={this.state.SeeData} CancelClick={this.handleOkTime.bind(this)} />
                </Modal>
            </Fragment >
        )
    }
    // 查看
    SeeLookValue(text, record) {
        console.log(record)
        this.setState({
            SeeBool:true,
            SeeData:record
        })
    }
    componentDidMount() {
        this.TableListValue()
    }
    handleOkTime() {
        this.setState({
            TimeBool: false,
            SeeBool:false
        })
    }
    handleCancelTime() {
        this.setState({
            TimeBool: false,
            SeeBool:false
        })
    }
    async TableListValue() {
        let data = await DAFAULTVALUE()
        console.log(data, 'morenshuju')
        if(data.msg == '成功'){
            if (data.data) {
                this.setState({
                    data: data.data.list,
                    pageBool: true,
                    currPage: data.data.currPage,
                    totalCount: data.data.totalCount
                })
            } else {
                this.setState({
                    pageBool: false,
                    pagetitle: data.msg
                })
            }
        }else{
            message.error(data.msg)
        }
        
    }
    onChange() {

    }
    // 修改
    async EditHandlerValue(text, record) {
        this.setState({
            visible: true,
            field_name: record.fieldName,
            field_value: record.fieldValue,
            describe: record.describe,
            id: record.id
        })
        console.log(record)
        if (record.fieldName == 'standardType') {
            let SelectList = await SEQSELECT()
            let XZList = []
            for (var i = 0; i < SelectList.data.length; i++) {
                if (SelectList.data[i] != '废弃' && SelectList.data[i] != '空') {
                    XZList.push(SelectList.data[i])
                }
            }
            this.setState({
                selectList: XZList,
                SelectValue: XZList[0],
                selectListBool: true,
                cacelBool: false,
                RouteBool: false,
                AreaCodeBool: false,//区域代码
                DataBaseBool: false,//数据库的布尔值
            })
        } else if (record.fieldName == 'exceptionRatio') {
            this.props.history.push('/XTGLPage/DafaultProportioies')
        } else if (record.fieldName == 'cjrq') {
            this.setState({
                selectListBool: false,
                cacelBool: true,
                RouteBool: false,
                AreaCodeBool: false,//区域代码
                DataBaseBool: false,//数据库的布尔值
            })
            console.log('拥有日历的')
        } else if (record.fieldName == 'filepath') {
            console.log(record, '选择路径')
            this.setState({
                field_value: record.fieldValue,
                selectListBool: false,
                cacelBool: false,
                RouteBool: true,
                AreaCodeBool: false,//区域代码
                DataBaseBool: false,//数据库的布尔值
            })
        } else if (record.fieldName == 'locid') {
            console.log('区域代码')
            this.setState({
                field_value: record.fieldValue,
                selectListBool: false,
                cacelBool: false,
                RouteBool: false,
                AreaCodeBool: true,//区域代码
                DataBaseBool: false,//数据库的布尔值
            })
        } else if (record.fieldName == 'biz_dbname') {
            console.log('业务数据库名称')
            this.setState({
                field_value: record.fieldValue,
                selectListBool: false,
                cacelBool: false,
                RouteBool: false,
                AreaCodeBool: false,//区域代码
                DataBaseBool: true,//数据库的布尔值
            })
        }

    }
    // 判断
    // field_name
    FieldNameInput(e) {
        this.setState({
            field_name: e.target.value
        })
    }
    // 字段描述
    describeInput(e) {
        this.setState({
            describe: e.target.value
        })
    }
    // 提交 拥有下拉的
    async SumbitInput() {
        let obj = {}
        obj.field_name = this.state.field_name
        obj.field_value = this.state.field_value
        obj.describe = this.state.describe
        let FromList = this.state.data
        let id = this.state.id
        console.log(obj)
        let data = await QUERYDATALIST(obj)
        console.log(data)
        if (data.data) {
            for (var i = 0; i < FromList.length; i++) {
                if (FromList[i].id == id) {
                    FromList[i].fieldName = obj.field_name
                    FromList[i].fieldValue = obj.field_value
                    FromList[i].describe = obj.describe
                }
            }
            this.setState({
                data: FromList,
                visible: false
            })
            if (data.msg == '成功') {
                this.success('修改成功')
            } else {
                this.error(data.msg)
            }
        }

    }


    onSelectChange = selectedRowKeys => {
        console.log('点击前面的选框 ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = () => {
        this.setState({
            ModalText: 'The modal will be closed after two seconds',
            visible: false,
            confirmLoading: false,
        })

    }
    handleCancel = () => {
        this.setState({
            visible: false,
        });
    }
    // 分页器
    async PaginationonChange(pageNumber) {
        this.setState({
            currPage: pageNumber
        });
        let data = await PageApi(pageNumber)
        this.setState({
            data: data.data.list,
            pageBool: true,
            currPage: data.data.currPage,
            totalCount: data.data.totalCount
        })
        console.log(pageNumber, 'pageNumber')
    }
    // LevelhandleChange 下拉选择版本
    LevelhandleChange(value) {
        this.setState({
            field_value: value
        })
    }
    RouteChange(e) {
        this.setState({
            field_value: e.target.value
        })
    }
    getObjectUrl(file) {
        let url = null;
        if (window.createObjectURL != undefined) {
            // basic
            url = window.createObjectURL(file);
        } else if (window.webkitURL != undefined) {
            // webkit or chrome
            url = window.webkitURL.createObjectURL(file);
        } else if (window.URL != undefined) {
            // mozilla(firefox)
            url = window.URL.createObjectURL(file);
        }
        return url;
    }
    // 点击日历的
    CacelListValue() {
        this.setState({
            TimeBool: true
        })
    }
    // 
    TimeClose(val) {
        this.setState({
            field_value: val,
            TimeBool: false
        })
    }
    // queryInputValue 查询的输入框
    queryInputValue(e) {
        if (e.target.value == '') {
            this.TableListValue()
        } else {
            this.setState({
                queryValue: e.target.value
            })
        }

    }
    // queryClick 查询按钮
    async queryClick() {
        let Value = ''
        if (this.state.queryValue == '默认采集规则版本') {
            console.log('默认采集规则版本')
            Value = 'standardType'
        } else if (this.state.queryValue == '默认采集日期') {
            console.log('默认采集日期')
            Value = 'cjrq'
        } else {
            Value = this.state.queryValue
        }
        let data = await QUERYVALUE(Value)
        console.log(data, 'data65465')
    }
    // 区域代码
    AreaCodeChange(e) {
        this.setState({
            field_value: e.target.value
        })
    }
    // 业务数据库
    DataBaseChange(e) {
        this.setState({
            field_value: e.target.value
        })
    }
    // 正确的全局提示
    success = (val) => {
        message.success(val);
    }
    // 失败的全局提示
    error = (val) => {
        message.error(val);
    }
}
export default TableList