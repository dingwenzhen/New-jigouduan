import React from 'react'
import { Fragment } from 'react'
import { DatePicker, Button, message } from 'antd'

class SelectTime extends React.Component {
    constructor() {
        super()
        this.state = {
            cjrq: '',
            upTodata: ''
        }
    }
    render() {
        return (
            <Fragment>
                <div style={{ position: 'absolute', width: '400px', right: 0, left: 0, margin: 'auto', top: '20px' }}>
                    <div style={{ marginTop: '10px' }}>
                        <span>选择采集日期：<DatePicker placeholder={this.props.Time.cjrq}
                            onChange={this.acquisitionTimeRanges.bind(this)} /></span>
                    </div>
                    <div style={{ marginTop: '10px' }}>
                        <span>截止上报日期：<DatePicker showTime placeholder={this.props.Time.upTodata}
                            onChange={this.onChange.bind(this)} onOk={this.onOk.bind(this)} /></span>
                    </div>
                    <Button onClick={this.NewtClick.bind(this)} type='primary' style={{marginTop:'20px'}}>下一步</Button>
                </div>
            </Fragment>
        )
    }
    acquisitionTimeRanges(date, dateString) {
        this.setState({
            cjrq: dateString
        })

    }
    onChange(value, dateString) {
        this.setState({
            upTodata: dateString
        })
    }
    onOk(value) {
        console.log('onOk: ', value);
    }
    NewtClick() {
        let obj = {}
        if (this.state.cjrq == '') {
            this.error('开始时间不能为空')
        } else if (this.state.upTodata == '') {
            this.error('结束时间不能为空')
        } else {
            obj.cjrq = this.state.cjrq
            obj.upTodata = this.state.upTodata
            this.props.TimeonChange(obj)
        }
    }
    error = (val) => {
        message.error(val);
    };
}
export default SelectTime