import React, { Fragment } from "react";
import { Card, Col, Row, Button } from 'antd'
import ChartsOne from "./ChartsOne"
import ChartsTwo from "./ChartsTwo"
import ChartsThree from "./ChartsThree"
import { CHARTSLISTVALUE } from "@api/UserInterface"
import { UserInterfaceStyle } from "./styled"
import DafaultTime from "@components/DafaultTime"
class UserInterface extends React.Component {
    constructor() {
        super()
        this.state = {
            totleCheckingTimes: '0',
            totleJCSJZL: '0',
            totleSFSJZL: '0',
            totlebili: '0',
            List: [],
            LeftArray: [],
        }
    }
    render() {
        return (
            <UserInterfaceStyle>
                <div style={{ height: '40px', backgroundColor: '#fff', lineHeight: '40px', paddingLeft: 10, fontSize: '14px', color: '#333' }}>
                    当前位置：首页-检核历史
                </div>
                <div style={{ padding: '20px 10px 15px' }}>
                    <Row gutter={16} >
                        <Col span={6} style={{ textAlign: 'center' }}>
                            <Card style={{ height: '120px', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }} hoverable={true}>
                                <div style={{ display: 'flex' }}>
                                    <div className='FrequencyIcon'> </div>
                                    <div style={{ marginLeft: '20px' }}>
                                        <p style={{ textAlign: 'left', marginBottom: 0 }}>数据检核次数</p>
                                        <p style={{ textAlign: 'left', marginBottom: 0 }}>{this.state.totleCheckingTimes}</p>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                        <Col span={6} >
                            <Card style={{ height: '120px', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }} hoverable={true}>
                                <div style={{ display: 'flex' }}>
                                    <div className='ShibaiIcon'> </div>
                                    <div style={{ marginLeft: '20px' }}>
                                        <p style={{ textAlign: 'left', marginBottom: 0 }}>数据失范总数</p>
                                        <p style={{ textAlign: 'left', marginBottom: 0 }}>{this.state.totleSFSJZL}</p>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                        <Col span={6} style={{ textAlign: 'center' }}>
                            <Card style={{ height: '120px', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }} hoverable={true}>
                                <div style={{ display: 'flex' }}>
                                    <div className='DeletedIcon'> </div>
                                    <div style={{ marginLeft: '20px' }}>
                                        <p style={{ textAlign: 'left', marginBottom: 0 }}>检核数据总量</p>
                                        <p style={{ textAlign: 'left', marginBottom: 0 }}> {this.state.totleJCSJZL}</p>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                        <Col span={6} style={{ textAlign: 'center' }}>
                            <Card style={{ height: '120px', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }} hoverable={true}>
                                <div style={{ display: 'flex' }}>
                                    <div className='qualityIcon'> </div>
                                    <div style={{ marginLeft: '20px' }}>
                                        <p style={{ textAlign: 'left', marginBottom: 0 }}>数据质量</p>
                                        <p style={{ textAlign: 'left', marginBottom: 0 }}> {this.state.totlebili}</p>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-around', padding: '0 10px' }}>
                    <div style={{ backgroundColor: '#fff', border: '1px solid #e8e8e8', padding: ' 10px 10px 0 20px', flex: '1', marginRight: '15px' }}>
                        <p style={{ textAlign: 'left', margin: '10px 0 0', fontSize: '18px', fontWeight: '500' }}>本期检核规则失范 &nbsp; TOP 10</p>
                        <div style={{ display: 'flex', height: '500px', justifyContent: 'space-between' }}>
                            <div
                                style={{ width: '114px', height: '430px', marginTop: '17px', display: 'flex', justifyContent: 'space-around', flexDirection: 'column' }}>
                                {
                                    this.state.LeftArray.map(item => {
                                        return <p key={item.value} style={{ margin: 0 }}>
                                            <span className={'class' + item.value}>{item.value}</span>
                                            <span>{item.text}</span>
                                        </p>
                                    })
                                }
                            </div>
                            <div style={{ flex: '1', minWidth: '280px' }}>
                                <ChartsOne ></ChartsOne>
                            </div>
                        </div>
                    </div>
                    <div style={{ backgroundColor: '#fff', padding: ' 10px 10px 0px 20px', flex: '1', border: '1px solid #e8e8e8' }}>
                        <p style={{ textAlign: 'left', margin: '10px 0 0', fontSize: '18px', fontWeight: '500' }}>历史检核规则失范 &nbsp; TOP 10</p>
                        <div style={{ display: 'flex', height: '500px', justifyContent: 'space-between' }}>
                            <div
                                style={{ width: '114px', height: '430px', marginTop: '17px', display: 'flex', justifyContent: 'space-around', flexDirection: 'column' }}>
                                {
                                    this.state.List.map(item => {
                                        return <p key={item.value} style={{ margin: 0 }}>
                                            <span className={'class' + item.value}>{item.value}</span>
                                            <span>{item.text}</span>
                                        </p>
                                    })
                                }
                            </div>
                            <div style={{ flex: '1', minWidth: '280px' }}>
                                <ChartsTwo ></ChartsTwo>
                            </div>

                        </div>
                    </div>
                </div>
                <div style={{ padding: '5px 10px 20px', marginTop: '10px' }}>
                    <div style={{ backgroundColor: '#fff', padding: '5px 30px 20px', border: '1px solid #e8e8e8' }}>
                        <p style={{ textAlign: 'left', margin: '10px 0 0', fontSize: '20px', fontWeight: '500' }}>数据失范趋势图</p>
                        <ChartsThree></ChartsThree>
                    </div>
                </div>
                <DafaultTime dafaultData = {this.HandlerValue.bind(this)} />
                <Button type="primary" onClick={this.HistoryDetail.bind(this)}>历史检核详情</Button>
            </UserInterfaceStyle>
        )
    }
    componentDidMount() {
        // this.HandlerValue()
    }
    async HandlerValue() {
        let data = await CHARTSLISTVALUE()
        console.log(data, "buzhid")

        let Array = []
        let LeftArray = []
        if (data.msg == '失败') {
            for (var i = 0; i < 10; i++) {
                let obj = {}
                if (i < 9) {
                    obj.value = '0' + (i + 1)
                    obj.text = '最新失范规则'
                } else if (i == 9) {
                    obj.value = i + 1
                    obj.text = '最新失范规则'
                }
                Array.push(obj)
                LeftArray.push(obj)
            }
            this.setState({
                LeftArray: Array,
                List: LeftArray
            })
        } else {
            if (data.data && data.data.length != 0) {
                for (var i = 0; i < data.data[0].checkTimesHistory.length; i++) {
                    let obj = {}
                    if (i < 9) {
                        obj.value = '0' + (i + 1)
                        obj.text = '最新失范规则'
                    } else if (i == 9) {
                        obj.value = i + 1
                        obj.text = '最新失范规则'
                    }
                    Array.push(obj)
                }
                for (var i = 0; i < data.data[0].checkTimesSFSJBLNumbers.length; i++) {
                    let arr = {}
                    if (i < 9) {
                        arr.value = '0' + (i + 1)
                        arr.text = '最新失范规则'
                    } else if (i == 9) {
                        arr.value = i + 1
                        arr.text = '最新失范规则'
                    }
                    LeftArray.push(arr)
                }
                let _this = this
                this.setState({
                    totleCheckingTimes: _this.formatNum(data.data[0].TotalCheckingTimes),
                    totleJCSJZL: _this.formatNum(data.data[0].TotalJCSJZL),
                    totleSFSJZL: _this.formatNum(data.data[0].TotalSFSJZL),
                    totlebili: data.data[0].Totalbili,
                    List: Array,
                    LeftArray: LeftArray
                })
            }
            if (data.data[0].checkTimesSFSJBLNumbers.length == 0) {
                for (var i = 0; i < 10; i++) {
                    let obj = {}
                    if (i < 9) {
                        obj.value = '0' + (i + 1)
                        obj.text = '最新失范规则'
                    } else if (i == 9) {
                        obj.value = i + 1
                        obj.text = '最新失范规则'
                    }
                    LeftArray.push(obj)
                }
                this.setState({
                    LeftArray: LeftArray
                })
            }
            if (data.data[0].checkTimesHistory.length == 0) {
                for (var i = 0; i < 10; i++) {
                    let obj = {}
                    if (i < 9) {
                        obj.value = '0' + (i + 1)
                        obj.text = '最新失范规则'
                    } else if (i == 9) {
                        obj.value = i + 1
                        obj.text = '最新失范规则'
                    }
                    Array.push(obj)
                }
                this.setState({
                    LeftArray: Array
                })
            }
        }
    }
    // 跳转到历史检核详情
    HistoryDetail() {
        this.props.history.push('/DataChecking/JHLSFX')
    }
      formatNum(num) {
                if (!/^(\+|-)?(\d+)(\.\d+)?$/.test(num)) { alert("wrong!"); return num; }
                var a = RegExp.$1, b = RegExp.$2, c = RegExp.$3;
                var re = new RegExp().compile("(\\d)(\\d{3})(,|$)");
                while (re.test(b)) b = b.replace(re, "$1,$2$3");
                return a + "" + b + "" + c;
            }

}
export default UserInterface