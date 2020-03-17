import React, { Fragment } from "react"
import { Input, Button, Modal, Select } from "antd"
import Calendar from "./calendar"

const { Option } = Select;
class FromList extends React.Component {
    constructor() {
        super()
        this.state = {
            calendarTime: "20191116"
        }
    }
    render() {
        return (
            <Fragment>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span>采集日期</span>
                        <div
                            onClick={this.RLClickhandler.bind(this)}
                            style={{
                                width: '100px',
                                height: '32px',
                                backgroundColor: '#fff',
                                border: 'solid 1px rgb(217, 217, 217)',
                                display: 'inline-block',
                                borderRadius: '4px',
                                marginLeft: '10px',
                                marginRight: '10px',
                                lineHeight: '32px',
                                paddingLeft: '10px'
                            }}>{this.state.calendarTime}</div>
                        <Select defaultValue="lucy" style={{ width: 120 }} onChange={this.SelectChange.bind(this)}>
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                            <Option value="disabled" disabled>
                                Disabled
                            </Option>
                            <Option value="Yiminghe">yiminghe</Option>
                        </Select>
                        <Button type="primary">查询</Button>
                    </div>
                    <div>
                        <div>
                            <span>样本数量</span>
                            <Input placeholder="1" style={{ width: '120px', margin: '0 5px 0 5px' }} />
                            <Button type="primary">导出</Button>
                            <Button type="primary" style={{ marginLeft: '10px' }} >提交上报</Button>
                        </div>
                    </div>
                </div>
                <Modal
                    title="日历"
                    visible={this.state.visible}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                    className="Supervise"
                >
                    <Calendar calendarTime={this.CanlerTime.bind(this)}></Calendar>
                </Modal>
            </Fragment>
        )
    }
    componentDidMount(){
        this.HandlerValue()
    }
    // 初始化获取数据
    HandlerValue(){
        
    }
    SubmissionSB() {
        this.props.SubmissionSB()
    }
    // 日历按钮
    RLClickhandler() {
        this.setState({
            visible: true
        })
    }
    // 点击日期关闭弹窗
    CanlerTime(val) {
        let FromArr = {}
        FromArr.Time = val
        FromArr.sblc = ""
        console.log(FromArr, "FromArr")
        this.setState({
            visible: false,
            calendarTime: FromArr.Time
        })
    }
    // 点击确定关闭弹窗
    handleOk() {
        this.setState({
            visible: false
        })
    }
    // 点击取消关闭弹窗
    handleCancel() {
        this.setState({
            visible: false
        })
    }
    // SelectChange  下拉框
    SelectChange(value){
        console.log(value,"下拉框的")
    }
}
export default FromList