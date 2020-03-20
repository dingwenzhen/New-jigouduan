import React, { Fragment } from "react"
import { Card, Col, Row, Button, Modal, Input, Pagination } from 'antd';
import ChartsOne from "./ChartsOne"
import ChartsTwo from "./ChartsTwo"
import connect from "./connect"
import { CHECKVALUEPAI } from "@api"
import { withRouter } from "react-router-dom"
import { DJCKJG } from "@api/CheckingUp"
import BackFirst from '@pages/BackFirst'
@withRouter
@connect
class Historical extends React.Component {
    constructor() {
        super()
        this.state = {
            totleRuleCount: 0,
            JCSJZLSum: 0,
            SFSJZLSum: 0,
            bili: 0,
            TrueList: [],
            ReverseChecking: false,//反查的布尔值
            ReversePage: 20,//分页器的总数
            ReversePageID: 1,
            TableAllData: [],//table反查全部的数据
            TableDisplayData: [],//table展示的数据
            selectedRowKeys: [],
            thdata: [],
            tddata: [],
            topdata: {},
            disabledBool: true,
            List: [],
            rightHashMapsList: [],
            pageBool: true,
            EditUserName: ''
        }
    }
    render() {
        const { selectedRowKeys, topdata, tddata } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        return (
            <Fragment>
                {
                    this.state.pageBool ? <div>
                        <div style={{ background: 'rgb(244, 244, 244)', padding: '10px' }}>
                            <Row gutter={16}>
                                <Col span={6} style={{ textAlign: 'center' }}>
                                    <Card title="检核规则总数" bordered={false}>
                                        {this.state.totleRuleCount}
                                    </Card>
                                </Col>
                                <Col span={6} style={{ textAlign: 'center' }}>
                                    <Card title="失范总数" bordered={false}>
                                        {this.state.SFSJZLSum}
                                    </Card>
                                </Col>
                                <Col span={6} style={{ textAlign: 'center' }}>
                                    <Card title="检核数据总量" bordered={false}>
                                        {this.state.JCSJZLSum}
                                    </Card>
                                </Col>
                                <Col span={6} style={{ textAlign: 'center' }}>
                                    <Card title="数据质量" bordered={false}>
                                        {this.state.bili}
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                        <div>
                            <div style={{ padding: '10px 30px', marginBottom: '10px' }}>
                                <Button type="primary" style={{ marginRight: '30px' }} onClick={this.DetailHandler.bind(this)}>查看详情</Button>
                                <Button type="primary" style={{ marginRight: '30px' }} onClick={this.PresentationClick.bind(this)}>生成报告</Button>
                                <Button type="primary" onClick={this.ViewingHistory.bind(this)}>查看历史</Button>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 10px' }}>
                                <div style={{ backgroundColor: '#fff', padding: '20px', flex: '1', marginRight: '15px', border: '1px solid #e8e8e8' }}>
                                    <p style={{ textAlign: 'left', fontSize: '20px', marginBottom: '20px' }}>TOP 10规则</p>
                                    <div style={{ display: 'flex', height: '500px', justifyContent: 'space-between' }}>
                                        <div
                                            style={{ width: '114px', height: '430px', marginTop: '17px', display: 'flex', justifyContent: 'space-around', flexDirection: 'column' }}>
                                            {
                                                this.state.List.map(item => {
                                                    return <p key={item.value} style={{ margin: 0 }} >
                                                        <span className={'class' + item.value}>{item.value}</span>
                                                        <span>{item.text}</span>
                                                    </p>
                                                })
                                            }
                                        </div>
                                        <div style={{ flex: '1', minWidth: '300px' }}>
                                            <ChartsOne val={this.state.TrueList} TableChartsOne={this.TableChartsOne.bind(this)}></ChartsOne>
                                        </div>
                                    </div>

                                </div>
                                <div style={{ backgroundColor: '#fff', padding: '20px', flex: '1', border: '1px solid #e8e8e8' }}>
                                    <p style={{ textAlign: 'left', fontSize: '20px', marginBottom: '20px' }}>未满足规范</p>
                                    <div style={{ display: 'flex', height: '500px', justifyContent: 'space-between' }}>
                                        <div
                                            style={{ width: '114px', height: '430px', marginTop: '17px', display: 'flex', justifyContent: 'space-around', flexDirection: 'column' }}>
                                            {
                                                this.state.rightHashMapsList.map(item => {
                                                    return <p key={item.value} style={{ margin: 0 }} >
                                                        <span className={'class' + item.value}>{item.value}</span>
                                                        <span>{item.text}</span>
                                                    </p>
                                                })
                                            }
                                        </div>
                                        <div style={{ flex: '1', minWidth: '300px' }}>
                                            <ChartsTwo TableChartsTwo={this.TableChartsTwo.bind(this)}></ChartsTwo>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Modal
                            title="数据反查"
                            visible={this.state.ReverseChecking}
                            onOk={this.handleOk.bind(this)}
                            onCancel={this.handleCancel.bind(this)}
                            className="ReverseChecking">
                            <div className="SuperviseTable">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                    <span>表名：{topdata.srcTabNameEn}</span>
                                    <span>规则描述：{topdata.ruleDesc}</span>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span>导出数量(行)</span>
                                        <Input type="text" style={{ marginRight: '10px' }} defaultValue={tddata.length} />
                                        <Button type="primary" onClick={this.ExportExcel.bind(this)}>导出</Button>
                                    </div>
                                </div>
                                <div style={{ height: 'max-280px', overflow: 'auto' }}>
                                    <table width="100%" style={{ fontSize: "12px" }}>
                                        <tr style={{ backgroundColor: "#f4f4f4", borderBottom: "1px solid #e8e8e8", textAlign: 'center' }}>
                                            {
                                                this.state.thdata.map(item => {
                                                    return <th key={item.id} style={{
                                                        padding: "5px 0 5px 10px", borderBottom: "1px solid #e8e8e8"
                                                    }}>{item.fieldNameEn}</th>

                                                })
                                            }
                                        </tr>
                                        {
                                            this.state.tddata.map((item, index) => {
                                                if (item) {
                                                    let ArrayTH = []
                                                    for (var i = 0; i < this.state.thdata.length; i++) {
                                                        ArrayTH.push(this.state.thdata[i].fieldNameEn)
                                                    }
                                                    return <tr style={{ borderBottom: "1px solid #e8e8e8", textAlign: 'center' }} key={index}>
                                                        {
                                                            ArrayTH.map((itm, idx) => {
                                                                if (idx == 0) {
                                                                    return <td style={{ margin: '10px 0 10px 0', display: 'block' }} key={idx}>{item[itm]}</td>
                                                                } else {
                                                                    return <td style={{ margin: '10px 0 10px 0' }} key={idx}>{item[itm]}</td>
                                                                }

                                                            })

                                                        }
                                                    </tr>
                                                }
                                            })
                                        }
                                    </table>
                                </div>
                                <Pagination
                                    showQuickJumper
                                    onChange={this.ReversePageSearch.bind(this)}
                                    current={this.state.ReversePageID}
                                    total={this.state.ReversePage}
                                    style={{ marginTop: '10px' }}
                                    disabled={this.state.disabledBool ? true : false}
                                />
                                <div>
                                    <Button type="primary" style={{ marginTop: '10px' }}
                                        onClick={() => this.CloseClick(this.state.tddata, '表单')}>关闭</Button>
                                </div>
                            </div>
                        </Modal>
                    </div> : <BackFirst title={this.state.EditUserName} />
                }
            </Fragment>
        )
    }
    async componentDidMount() {
        let _this = this
        // let Time = setInterval(async function () {
        let data = await DJCKJG()
        if (data.data) {
            let leftHashMaps = data.data.jhjglsList[0].leftHashMaps
            let rightHashMaps = data.data.jhjglsList[0].rightHashMaps
            let FromList = data.data.jhjglsList[0].leftHashMaps
            let leftHashMapsList = []
            let rightHashMapsList = []
            if (!data.data) {
                _this.setState({
                    totleRuleCount: 0,
                    JCSJZLSum: 0,
                    SFSJZLSum: 0,
                    bili: 0,
                    TrueList: []
                }, () => {
                    // clearInterval(Time)
                })
            } else {
                let Array = []
                for (var i = 1; i < FromList.length; i++) {
                    Array.push(FromList[i])
                }
                if (leftHashMaps.length == 0) {
                    for (var v = 0; v < 10; v++) {
                        let obj = {}
                        if (v < 9) {
                            obj.value = '0' + (v + 1)
                            obj.text = '最新失范规则'
                        } else if (v == 9) {
                            obj.value = v + 1
                            obj.text = '最新失范规则'
                        }
                        leftHashMaps.push(obj)
                    }
                } else {
                    for (var m = 0; m < leftHashMaps.length; m++) {
                        let obj = {}
                        if (m < 9) {
                            obj.value = '0' + (m + 1)
                            obj.text = '最新TOP规则'
                        } else if (m == 9) {
                            obj.value = m + 1
                            obj.text = '最新TOP规则'
                        }
                        leftHashMapsList.push(obj)
                    }
                }
                if (rightHashMaps.length == 0) {
                    for (var v = 0; v < 10; v++) {
                        let obj = {}
                        if (v < 9) {
                            obj.value = '0' + (v + 1)
                            obj.text = '最新失范规则'
                        } else if (v == 9) {
                            obj.value = v + 1
                            obj.text = '最新失范规则'
                        }
                        rightHashMapsList.push(obj)
                    }
                } else {
                    for (var k = 0; k < rightHashMaps.length; k++) {
                        if (rightHashMaps[0]) {
                            let obj = {}
                            if (k < 9) {
                                obj.value = '0' + (k + 1)
                                obj.text = '最新失范规则'
                            } else if (k == 9) {
                                obj.value = k + 1
                                obj.text = '最新失范规则'
                            }
                            rightHashMapsList.push(obj)
                        }

                    }
                }
                let totleRuleCount = _this.formatNum(data.data.jhjglsList[0].TotalCount)
                let JCSJZLSum = _this.formatNum(data.data.jhjglsList[0].JCSJZLSum)
                let SFSJZLSum = _this.formatNum(data.data.jhjglsList[0].SFSJZLSum)
                let bili = Math.ceil(((data.data.jhjglsList[0].bili) * 100).toFixed(2)) + '%'
                _this.setState({
                    totleRuleCount: totleRuleCount,
                    JCSJZLSum: JCSJZLSum,
                    SFSJZLSum: SFSJZLSum,
                    bili: bili,
                    TrueList: Array,
                    List: leftHashMapsList,
                    rightHashMapsList: rightHashMapsList,
                    pageBool: true
                }, () => {
                    // clearInterval(Time)
                })
            }
        } else {
            _this.setState({
                pageBool: false,
                EditUserName: data.msg
            }, () => {
                // clearInterval(Time)
            })
        }
        // }, 2000)

    }
    formatNum(num) {
        if (!/^(\+|-)?(\d+)(\.\d+)?$/.test(num)) { alert("wrong!"); return num; }
        var a = RegExp.$1, b = RegExp.$2, c = RegExp.$3;
        var re = new RegExp().compile("(\\d)(\\d{3})(,|$)");
        while (re.test(b)) b = b.replace(re, "$1,$2$3");
        return a + "" + b + "" + c;
    }
    // 第一个图的反查
    TableChartsOne(val) {
        this.HandlerTableValue(val.type)
    }
    // 第二个图的反查
    TableChartsTwo(val) {
        this.HandlerTableValue(val.type)
    }
    handleOk() {
        this.setState({
            ReverseChecking: false
        })
    }
    CloseClick() {
        this.setState({
            ReverseChecking: false
        })
    }
    handleCancel() {
        this.setState({
            ReverseChecking: false
        })
    }
    // 反查表格中的数据
    async HandlerTableValue(val) {
        let ListValueApi = await CHECKVALUEPAI(val)
        let TableList = ListValueApi.data[0].td
        let TableDsplayData = []
        for (var i = 0; i < 10; i++) {
            if (!TableList[i]) continue
            TableDsplayData.push(TableList[i])
            this.setState({
                disabledBool: false
            })
        }
        if (!TableDsplayData[0]) {
            let obj = {}
            for (var i = 0; i < ListValueApi.data[0].th.length; i++) {
                obj[ListValueApi.data[0].th[i].fieldNameEn] = '暂无数据'
            }
            TableDsplayData.push(obj)
            this.setState({
                disabledBool: true
            })
        }
        this.setState({
            ReverseChecking: true,
            thdata: ListValueApi.data[0].th,
            tddata: TableDsplayData,
            topdata: ListValueApi.data[0].topdate,
            TableAllData: ListValueApi.data[0].td,
            ReversePage: ListValueApi.data[0].td.length
        })
    }

    // 导出表格
    ExportExcel(e) {

    }
    // 数据反查的分页器
    ReversePageSearch(pageNumber) {
        let TableAllData = this.state.TableAllData
        let num = (pageNumber - 1) * 10
        let sum = pageNumber * 10 + 10
        if (sum - TableAllData.length > 10) return
        let max = num + 10
        let TableDsplayData = []
        for (var i = num; i < max; i++) {
            TableDsplayData.push(TableAllData[i])
        }
        this.setState({
            tddata: TableDsplayData,
        })
    }
    // 查看历史
    ViewingHistory() {
        this.props.history.push('/DataChecking/UserInterface')
    }
    // 生成报告
    PresentationClick() {
        this.props.history.push('/SBAdministration')
    }
    // 查看详情
    DetailHandler() {
        this.props.history.push('/DataChecking/JHLSFX')
    }

}
export default Historical