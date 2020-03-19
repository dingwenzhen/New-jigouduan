import React, { Fragment } from "react";
import { Form, Table, Radio, message } from "antd"
import QueryFunction from "./queryFunction"
import { conditionApi, JHKSLBZS, JHCHLIST, ceshidata } from "@api"
import { SJJHZYX, DAFAULTSEQTIME } from "@api/ClassfyList"
import connect from "./connect"
import { withRouter } from "react-router-dom"
import DafaultSeq from "@components/DafaultSeq"
import BackFirst from '@pages/BackFirst'
@withRouter
@connect
@Form.create()
class classfyList extends React.Component {
    constructor() {
        super()
        this.state = {
            FromListValue: [],
            data: [
            ],
            sortedInfo: null,
            filteredInfo: null,
            currPage: 1,
            totalCount: 20,
            flag: false,
            arrId: [],
            visible: false,
            EditFromValue: {},
            NewlyAdded: false,
            visibleNew: false,
            selectedRowKeys: [],
            SJJHZYX: [],//重要性的数组
            selectedRowKeys: [],
            dafaultValueBool: true,//规则的
            reviewTime: {},//开始结束时间
            ClickBool: false,
            CheckingDataValue: {},
            standardTypeValue: '',
            EditUserName: ''
        }
    }
    onSelectChange = selectedRowKeys => {
        console.log('点击前面的选框 ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };
    render() {
        let { sortedInfo, filteredInfo } = this.state;
        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {};
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            selectedRowKeys,
        };
        const columns = [
            {
                title: '选择',
                dataIndex: 'operation',
                key: 'Choice',
                width: "70px",
                align: 'center',
                ellipsis: true,
                filters: [{ text: '全选', value: '1' }, { text: '取消', value: '0' }],
                filterMultiple: false,
                filteredValue: filteredInfo.address || null,
                onFilter: this.TagsHandlerFilter.bind(this),
                render: (text, record) => (
                    <span>
                        <Radio checked={record.bool} onClick={this.RadioClick.bind(this, record)}></Radio>
                    </span>
                ),
            },
            {
                title: '规则号',
                dataIndex: 'ruleSeq',
                key: 'ruleSeq',
                align: 'center',
                sortOrder: sortedInfo.columnKey === 'ruleSeq' && sortedInfo.order,
                ellipsis: true,
            },
            {
                title: '规则描述',
                dataIndex: 'ruleDesc',
                key: 'ruleDesc',
                align: 'center',
                sortOrder: sortedInfo.columnKey === 'ruleDesc' && sortedInfo.order,
                ellipsis: true,
            },
            {
                title: '中文表名',
                dataIndex: 'srcTabNameCn',
                key: 'srcTabNameCn',
                align: 'center',
                sortOrder: sortedInfo.columnKey === 'srcTabNameCn' && sortedInfo.order,
                ellipsis: true,
            },
            {
                title: '英文表名',
                dataIndex: 'srcTabNameEn',
                key: 'srcTabNameEn',
                align: 'center',
                filteredValue: filteredInfo.address || null,
                sortOrder: sortedInfo.columnKey === 'srcTabNameEn' && sortedInfo.order,
                ellipsis: true,
            },
            {
                title: '目标字段',
                dataIndex: 'dataFieldCode',
                key: 'dataFieldCode',
                align: 'center',

                filteredValue: filteredInfo.address || null,
                sortOrder: sortedInfo.columnKey === 'dataFieldCode' && sortedInfo.order,
                ellipsis: true,
            },
            {
                title: '重要性',
                dataIndex: 'ruleType',
                key: 'ruleType',
                align: 'center',
                sortOrder: sortedInfo.columnKey === 'ruleType' && sortedInfo.order,
                ellipsis: true,
            },
            {
                title: '标准类型',
                dataIndex: 'standardType',
                key: 'standardType',
                align: 'center',
                sortOrder: sortedInfo.columnKey === 'standardType' && sortedInfo.order,
                ellipsis: true,
            },
            {
                title: '版本',
                dataIndex: 'gzVersion',
                key: 'gzVersion',
                align: 'center',
                sortOrder: sortedInfo.columnKey === 'gzVersion' && sortedInfo.order,
                ellipsis: true,
            }
        ];
        return (
            <Fragment>
                <div style={{ height: '40px', backgroundColor: '#fff', lineHeight: '40px', paddingLeft: 10, fontSize: '14px', color: '#333' }}>
                    当前位置：首页-数据检核
                </div>
                <div>
                    
                    <div style={{ padding: '10px' }}>
                        <QueryFunction
                            queryfunction={this.QueryFromList.bind(this)}
                            rewviewFromList={this.RewviewFromList.bind(this)}
                            queryFromBool={this.QueryFromListBool.bind(this)}
                            ResetClick={this.ResetClick.bind(this)}
                            NewDataList={this.NewDataList.bind(this)}
                            ZYXValue={this.state.SJJHZYX}
                        ></QueryFunction>

                        <Table columns={columns}
                            dataSource={this.state.data}
                            onChange={this.handleChange.bind(this)}
                            style={{ backgroundColor: '#fff' }}
                        >
                        </Table>
                    </div>
                </div>
            </Fragment>
        )
    }
    async componentDidMount() {
        // this.HandlerValue()
        this.standType()
        let data = await DAFAULTSEQTIME()
        if (data.data != '0') {
            this.setState({
                dafaultValueBool: false,
                standardTypeValue: data.data
            }, () => {
                this.HandlerValue(data.data)
            })
        } else {
            this.setState({
                dafaultValueBool: true
            })
        }
    }
    // 获取重要性的
    async standType() {
        let ZYX = await SJJHZYX()
        let XZList = []
        for (var i = 0; i < ZYX.data.length; i++) {
            if (ZYX.data[i] != '废弃' && ZYX.data[i] != '空') {
                XZList.push(ZYX.data[i])
            }
        }
        this.setState({
            SJJHZYX: XZList
        })
    }
    // dafaultHandler 弹窗点击确定的时候进行数据重新的请求
    dafaultHandler(val) {
        this.HandlerValue(val)
    }
    // 重置按钮-重新获取数据
    NewDataList(val) {
        this.HandlerValue(val)
    }

    async HandlerValue(value) {
        console.log(value,'[[')
        let val = {}
        val.diySql = ''
        val.level = ''
        val.ruleDesc = ''
        val.ruleSeq = ''
        val.ruleType = ''
        val.srcTabNameCn = ''
        val.srcTabNameEn = ''
        val.standardType = value

        let data = await JHKSLBZS(val)
        console.log(data, 'classfyList')
        if (data.data) {
            let ArrayListValue = []
            for (var i = 0; i < data.data.length; i++) {
                data.data[i].bool = true
                if (data.data[i].status != 2) {
                    ArrayListValue.push(data.data[i])
                }
            }
            this.setState({
                data: ArrayListValue,
                currPage: data.data.currPage,
                totalCount: data.data.totalCount,

            })
        } else {
            this.setState({
                EditUserName: data.msg,

            })
        }
        // 获取重要性

    }
    // 重置按钮
    ResetClick() {
        this.HandlerValue()
    }

    // 触发了检核数据的操作
    async QueryFromListBool(val) {
        localStorage.setItem('review', JSON.stringify(1))
        this.props.history.push("/DataChecking/CheckingUp")
        let Aggregate = {}
        let BoolArray = []
        let FromList = []
        let FromListBool = this.state.data

        for (var i = 0; i < FromListBool.length; i++) {
            if (FromListBool[i].bool) {
                BoolArray.push(FromListBool[i].id)
                FromList.push(FromListBool[i])
            }
        }
        Aggregate.beginDate = this.TimeList(val.beginDate)
        Aggregate.endDate = this.TimeList(val.endDate)
        Aggregate.ids = BoolArray
        console.log(Aggregate, '请求之前')
        ceshidata(Aggregate)

    }
    TimeList(val){
        let str = ''
        let List = val.split('-')
        for( var i = 0 ; i<List.length ; i++ ){
            str+=List[i]
        }
        return str
    }
    // 进行数据检核的函数
    async CheckingData(val) {

    }
    // 规则级别筛选
    TagsHandlerFilter(record, text) {
        let Array = this.state.data
        let arr = this.state.arrId
        for (var i = 0; i < Array.length; i++) {
            if (record == 1) {
                Array[i].bool = true
                arr.push(Array[i].id)
            } else if (record == 0) {
                Array[i].bool = false
            }
        }
        this.setState({
            data: Array,
            arrId: arr
        })
    }
    // 标准类型筛选
    TypeHandlerFilter(text, record) {
        console.log(record, "标准类型")
    }
    // 版本筛选
    StandardHandlerFilter(text, record) {
        console.log("版本筛选", record)
    }
    // 是否自有
    HaveHandlerFilter(text, record) {
        console.log(record, "是否自有")
    }
    // 规则类型筛选
    LevelHandlerFilter(text, record) {
        console.log(record, "规则类型筛选")
    }

    // 筛选传过来的数据
    async FromListValue(val) {
        let data = await conditionApi(val)
        console.log(data)
    }
    // 按钮
    RadioClick(record) {
        let recordBool = record.bool
        let bool = recordBool = !recordBool
        let array = this.state.data;
        for (var i = 0; i < array.length; i++) {
            if (array[i].id == record.id) {
                array[i].bool = bool
            }
        }
        this.setState({
            data: array
        })

    }
    handleChange = (pagination, filters, sorter) => {

    };
    // 查询按钮
    async QueryFromList(val) {
        if (val.stantTypeValue == '') {
            this.error()
        } else {
            let QueryFromListValue = await JHCHLIST(val)

            let ArrayListValue = []
            for (var i = 0; i < QueryFromListValue.data.length; i++) {
                QueryFromListValue.data[i].bool = true

                if (QueryFromListValue.data[i].ruleType != '废弃') {

                    ArrayListValue.push(QueryFromListValue.data[i])
                }
            }
            this.setState({
                data: ArrayListValue
            })
        }

    }
    error = () => {
        message.error('请选择您的版本');
    }
    RewviewFromList(val) {

    }

}
export default classfyList