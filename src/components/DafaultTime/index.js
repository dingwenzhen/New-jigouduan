import React, { Fragment } from "react";
import { Modal, Button, Input } from 'antd';
import TimeValue from "@pages/ModifyData/TimeValue"
import { DAFAULTTIME ,SENDTIME} from "@api/UserInterface"
const { TextArea } = Input;

class DafaultTime extends React.Component {
    constructor() {
        super()
        this.state = {
            visible: false,
            field_value: '',
            describe: '',
            TimeBool: false
        }
    }
    render() {
        return (
            <Fragment>
                <Modal
                    title="请选择规则时间"
                    visible={this.state.visible}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                >
                    <div style={{ display: 'flex', marginTop: '20px' }}>
                        <span style={{ display: 'block', textAlign: 'right', marginRight: '10px', width: '100px' }}>默认规则时间：</span>

                        <div style={{ flex: '1', height: '30px', border: '1px solid #d9d9d9 ', borderRadius: '4px', backgroundColor: '#fff', padding: '4px 11px', cursor: 'pointer' }}
                            onClick={this.CacelListValue.bind(this)}>
                            {this.state.field_value}</div>
                    </div>
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

            </Fragment>
        )
    }
    async componentDidMount() {
        let data = await DAFAULTTIME()
        console.log(data, '132')
        if (data.data) {
            this.setState({
                visible: false
            })
            this.props.dafaultData()
        } else {
            this.setState({
                visible: true
            })
        }
    }
    // 时间的关闭弹窗
    handleCancelTime() {
        this.setState({
            TimeBool: false
        })
    }
    handleOkTime() {
        this.setState({
            TimeBool: false
        })
    }
    handleOk() {
        this.setState({
            visible: false
        })
    }
    handleCancel() {
        this.setState({
            visible: false
        })
    }
    // 
    CacelListValue() {
        this.setState({
            TimeBool: true
        })
    }
    // 描述
    describeInput(e) {
        this.setState({
            describe: e.target.value
        })
    }
    // 确定提交
    async SumbitInput() {
        let obj = {}
        obj.field_value = this.state.field_value
        obj.describe = this.state.describe
        console.log(obj)
        let data = await SENDTIME(obj)
        console.log(data)
        if(data.msg == '成功'){
            this.setState({
                visible:false
            })
            this.props.dafaultData()
        }
    }
    // 日历时间
    TimeClose(val) {
        this.setState({
            field_value: val,
            TimeBool: false
        })
    }
}
export default DafaultTime