import React, { Fragment } from "react";
import { Form, Button, Checkbox, Select, Modal,Calendar  } from 'antd';
import {SELECTLIST,USERDATA} from "@api/UserChoice"
import connect from "./connect"

const { Option } = Select;
@connect
@Form.create()
class UserChoice extends React.Component {
    constructor() {
        super()
        this.state = {
            checkNick: false,
            visible: false,
            DataTime:'请选择日期',
            SelectValue:'1',
            SelectList:[]
        };
    }
    handleChange = e => {
        console.log(e.target.checked)
        this.setState(
            {
                checkNick: e.target.checked,
            },
        );
    };
    render() {
        let {SelectValue} = this.state
        return (
            <Fragment>
                <div style={{ backgroundColor: '#fff', padding: '30px 60px', width: '400px', height: '220px', position: 'absolute', top: '0', right: '0', bottom: '0', left: '0', margin: 'auto', borderRadius: '10px' }}>
                    <div>
                        <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span>请选择检核规则版本</span>
                            <Select value={SelectValue} style={{ width: 120 }} onChange={this.SelectChange.bind(this)}>
                                {
                                    this.state.SelectList.map((item,index)=>{
                                        return <Option value={item} key={index}>{item}</Option>
                                    })
                                }
                            </Select>
                        </label>
                    </div>
                    <div style={{ marginTop: '10px' }}>
                        <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span>请选择上报周期</span>
                            <div
                                style={{ width: '120px', height: '32px', backgroundColor: '#fff', border: 'solid 1px #d9d9d9', borderRadius: '4px' ,lineHeight:'32px',fontSize:'14px',paddingLeft:'10px'}}
                                onClick={this.CalendarClick.bind(this)}
                            >{this.state.DataTime}</div>
                        </label>
                    </div>
                    <div style={{ marginTop: '10px' }}>
                        <Checkbox checked={this.state.checkNick} onChange={this.handleChange}>
                            记住我的选择
                        </Checkbox>
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        <Button type="primary" onClick={this.SubmissionClick.bind(this)} style={{ marginRight: '20px' }}>
                            确定
                        </Button>
                        <Button onClick={this.check}>
                            取消
                        </Button>
                    </div>
                </div>
                <Modal
                    visible={this.state.visible}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                >
                <div >
                <Calendar 
                fullscreen={false} 
                onPanelChange={this.onPanelChange.bind(this)} 
                onSelect={this.RQSelect.bind(this)}
                />
              </div>
                </Modal>
            </Fragment>
        )
    }
    componentDidMount(){
        this.HandlerValue()
      
    }
    async HandlerValue(){
        let selectList = await SELECTLIST()
        // 如果是 typeName是1  就自己排序   
        console.log(selectList)
        if(selectList.data){
            if(selectList.data.typeName=='1'){
                let List = selectList.data.standardTypes
                let index = List.indexOf("")
                List.splice(index,1)
                console.log(List,'11')
                this.setState({
                    SelectValue:List[1],
                    SelectList:List
                })
            }
        }else{
            this.setState({
                SelectValue:'自有',
                SelectList:['自有']
            })
        }
        
    }
   
    SelectChange(value) {
        console.log(`selected ${value}`)
        this.setState({
            SelectValue:value
        })
    }
    CalendarClick() {
        this.setState({
            visible: true,
        })
    }
    // 关闭弹窗 ok
    handleOk() {
        this.setState({
            visible: false,
        });
    }
    // 关闭弹窗  取消
    handleCancel() {
        this.setState({
            visible: false,
        });
    }
    // 日历的回调
    onPanelChange(value, mode) {
        console.log(value, mode);
      }
    //   
    RQSelect(date,moment){
        const d = new Date(date)
        const resDate = d.getFullYear() + '-' + this.p((d.getMonth() + 1)) + '-' + this.p(d.getDate())
        console.log(resDate)
        this.setState({
            DataTime:resDate,
            visible:false
        })
    }
    p(s) {
        return s < 10 ? '0' + s : s
    }
    // 提交确定
    async SubmissionClick(){
        let _this = this
        let Submission = {}
        Submission.cjrq = this.state.DataTime
        Submission.booken = this.state.checkNick
        Submission.field_name = this.state.SelectValue
        if(Submission.booken){
            console.log(this,"this")
            this.props.VersionRuleHandler(Submission)
        }
        console.log(Submission)
        let data = await USERDATA(Submission)
        console.log(data)
        if(data.msg=='成功'){
            this.props.history.push("/DataChecking/FileManagement")
        }
        
    }
}
export default UserChoice