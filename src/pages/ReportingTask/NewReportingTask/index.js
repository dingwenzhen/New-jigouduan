import React, { Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { Steps, Button, message } from 'antd';
import SelectTime from './SelectTime'
import SelectMechanism from './SelectMechanism'
import SelectFile from './SelectFile'
import { OKRuleApi } from '@api/ReportingTask'
const { Step } = Steps;
class NewReportingTask extends React.Component {
    constructor() {
        super()
        this.state = {
            current: 0,
            FirstData: { cjrq: '请选择日期', upTodata: '请选择截止日期' },
            TwoData: {}
        }
    }
    render() {
        const steps = [
            {
                title: '选择采集日期',
            },
            {
                title: '选择银行机构',
            },
            {
                title: '上报文件选择',
            },
        ]
        const { current } = this.state;
        return (
            <Fragment>
                <div style={{ height: '40px', backgroundColor: '#fff', lineHeight: '40px', paddingLeft: 10, fontSize: '14px', color: '#333' }}>
                    当前位置：首页-<span style={{ cursor: 'pointer' }} onClick={this.NewReportingTaskClick.bind(this)}>上报任务</span>-新增任务
                </div>
                <div style={{ padding: '10px' }}>
                    <Steps current={current}>
                        {steps.map(item => (
                            <Step key={item.title} title={item.title} />
                        ))}
                    </Steps>
                    <div className="steps-content" style={{ position: 'relative' }}>
                        {
                            this.state.current == 0 ? <SelectTime Time={this.state.FirstData}
                                TimeonChange={this.TimeonChange.bind(this)} /> : ''
                        }
                        {
                            this.state.current == 1 ? <SelectMechanism TwoNextStep={this.TwoNextStep.bind(this)}
                                TwoPreviousStep={this.prev.bind(this)} /> : ''
                        }
                        {
                            this.state.current == 2 ? <SelectFile TwoNextStep={this.ThreeNextStep.bind(this)} /> : ''
                        }
                    </div>

                </div>
            </Fragment>
        )
    }
    // 返回上报任务页面
    NewReportingTaskClick() {
        this.props.history.push('/ReportingTask')
    }
    // 下一步
    next() {
        const current = this.state.current + 1;
        this.setState({ current });
    }
    // 上一步
    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }
    // 选择采集日期
    TimeonChange(val) {
        this.setState({
            FirstData: val
        }, () => {
            console.log(this.state.FirstData)
            this.next()
        })
    }
    // TwoNextStep  第二的下一步
    TwoNextStep(val) {
        this.setState({
            TwoData: val
        }, () => {
            this.next()
        })
    }
    // 第三部的完成
    async ThreeNextStep(val) {
        let obj = { ...val, ...this.state.TwoData, ...this.state.FirstData }
        let data = await OKRuleApi(obj)
        if (data.msg == '成功') {
            this.success('添加成功')
            this.props.history.push('/Administration/ReportingTask')
        } else {
            this.error(data.msg)
        }
    }
    success = (val) => {
        message.success(val);
    }
    error = (val) => {
        message.error(val);
    }
}
export default withRouter(NewReportingTask)