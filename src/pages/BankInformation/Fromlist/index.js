import React, { Fragment } from "react";
import { Input, Button, message } from 'antd';
import { AddDataApi} from "@api/BankInformation"
// import { DAFAULTVALUE, ADDLISTDATA } from "@api/Role"

class Fromlist extends React.Component {
    constructor() {
        super()
        this.state = {
            Change: "",
            dafaultInput: '',
            JurisdictionChange: [],
            nbjgh:"",
            yxjgdm: "",
            jrxkzh: "",
            yxjgmc: "",
            yxbgdz: "",
            yxtxdz: "",
            lxrxm: "",
            lxrdh: "",
            lxrdzyx: "",
            zjgy: "",
            zjgydh: "",
            jgzxr: "",
            jgzxrdh: "",
            id:""
        }
    }
    render() {
        return (
            <Fragment>
                <div style={{ display: 'flex', width: "100%", justifyContent: 'space-between', marginBottom: '5px' }}>
                    <label>
                        <span style={{ marginBottom: '5px', display: 'inline-block' }}>银行机构代码</span>
                        <Input type="text"
                            value={this.state.yxjgdm}
                            placeholder="请输入银行机构代码"
                            style={{ width: '200px', height: '40px' }}
                            onChange={this.YxjgdmInput.bind(this)} />
                    </label>                  
                    <label>
                        <span style={{ marginBottom: '5px', display: 'inline-block' }}>金融许可证号</span>
                        <Input type="text"
                            value={this.state.jrxkzh}
                            placeholder="请输入金融许可证号"
                            style={{ width: '200px', height: '40px' }}
                            onChange={this.JrxkzhInput.bind(this)} />
                    </label>
                </div>
                
                <div style={{ display: 'flex', width: "100%", justifyContent: 'space-between', marginBottom: '5px' }}>
                    <label>
                        <span style={{ marginBottom: '5px', display: 'inline-block' }}>银行机构名称</span>
                        <Input type="text"
                            value={this.state.yxjgmc}
                            placeholder="请输入银行机构名称"
                            style={{ width: '200px', height: '40px' }}
                            onChange={this.YxjgmcInput.bind(this)} />
                    </label>
                
                    <label>
                        <span style={{ marginBottom: '5px', display: 'inline-block' }}>银行办公地址</span>
                        <Input type="text"
                            value={this.state.yxbgdz}
                            placeholder="请输入银行办公地址"
                            style={{ width: '200px', height: '40px' }}
                            onChange={this.YxbgdzInput.bind(this)} />
                    </label>
                </div>
           
                <div style={{ display: 'flex', width: "100%", justifyContent: 'space-between', marginBottom: '5px' }}>
                    <label style={{width:'270px'}}>
                        <span style={{ marginBottom: '5px', display: 'inline-block' }}>银行通信地址</span>
                        <Input type="text"
                            value={this.state.yxtxdz}
                            placeholder="请输入银行通信地址"
                            style={{ width: '200px', height: '40px' }}
                            onChange={this.YxtxdzInput.bind(this)} />
                    </label>
                    <label>
                        <span style={{ marginBottom: '5px', display: 'inline-block' }}>联系人姓名</span>
                        <Input type="text"
                            value={this.state.lxrxm}
                            placeholder="请输入联系人姓名"
                            style={{ width: '200px', height: '40px' }}
                            onChange={this.LxrxmInput.bind(this)} />
                    </label>
                </div>
            
                <div style={{ display: 'flex', width: "100%", justifyContent: 'space-between', marginBottom: '5px' }}>
                    <label style={{width:'298px'}}>
                        <span style={{ marginBottom: '5px', display: 'inline-block' }}>联系人电话</span>
                        <Input type="text"
                            value={this.state.lxrdh}
                            placeholder="请输入联系人电话"
                            style={{ width: '200px', height: '40px' }}
                            onChange={this.LxrdhInput.bind(this)} />
                    </label>
                   
                    <label>
                        <span style={{ marginBottom: '5px', display: 'inline-block' }}>联系人电子邮箱</span>
                        <Input type="text"
                            value={this.state.lxrdzyx}
                            placeholder="请输入联系人电子邮箱"
                            style={{ width: '200px', height: '40px' }}
                            onChange={this.LxrdzyxInput.bind(this)} />
                    </label>
                </div>

                <div style={{ display: 'flex', width: "100%", justifyContent: 'space-between', marginBottom: '5px' }}>
                    <label style={{width:'284px'}}>
                        <span style={{ marginBottom: '5px', display: 'inline-block' }}>主监管员</span>
                        <Input type="text"
                            value={this.state.zjgy}
                            placeholder="请输入主监管员"
                            style={{ width: '200px', height: '40px' }}
                            onChange={this.ZjgyInput.bind(this)} />
                    </label>
              
                    <label>
                        <span style={{ marginBottom: '5px', display: 'inline-block' }}>主监管员电话</span>
                        <Input type="text"
                            value={this.state.zjgydh}
                            placeholder="请输入主监管员电话"
                            style={{ width: '200px', height: '40px' }}
                            onChange={this.ZjgydhInput.bind(this)} />
                    </label>
                </div>

                <div style={{ display: 'flex', width: "100%", justifyContent: 'space-between', marginBottom: '5px' }}>
                    <label style={{width:'298px'}}>
                        <span style={{ marginBottom: '5px', display: 'inline-block' }}>监管执行人</span>
                        <Input type="text"
                            value={this.state.jgzxr}
                            placeholder="请输入监管执行人"
                            style={{ width: '200px', height: '40px' }}
                            onChange={this.JgzxrInput.bind(this)} />
                    </label>
            
                    <label>
                        <span style={{ marginBottom: '5px', display: 'inline-block' }}>监管执行人电话</span>
                        <Input type="text"
                            value={this.state.jgzxrdh}
                            placeholder="请输入监管执行人电话"
                            style={{ width: '200px', height: '40px' }}
                            onChange={this.JgzxrdhInput.bind(this)} />
                    </label>
                </div>


                <div>
                    <label style={{textAlign:"left"}}>
                        <span style={{ marginBottom: '5px', display: 'inline-block' }}>内部机构号</span>
                        <br></br>
                        <Input type="text"
                            value={this.state.nbjgh}
                            placeholder="请输入内部机构号"
                            style={{ width: '200px', height: '40px' }}
                            onChange={this.NbjghInput.bind(this)} />
                    </label>  
                </div>

                
                    
            
         

                <div style={{ marginTop: '20px' }}>
                    <Button type="primary" onClick={this.DetermineClick.bind(this)}>确定</Button>
                    <Button style={{ marginLeft: '20px' }} onClick={this.CancelClick.bind(this)}>取消</Button>
                </div>
            </Fragment>
        )
    }
    
    // 取消按钮
    CancelClick() {
        this.props.CancelClick()
        this.setState({
            Change: "",
            yxjgdm: "",
            nbjgh:"",
            jrxkzh: "",
            yxjgmc: "",
            yxbgdz: "",
            yxtxdz: "",
            lxrxm: "",
            lxrdh: "",
            lxrdzyx: "",
            zjgy: "",
            zjgydh: "",
            jgzxr: "",
            jgzxrdh: "",
            dafaultInput: '',
        })
    }
    // 确定
    async DetermineClick() {
        let obj = {}
        obj.id = this.state.id
        obj.nbjgh = this.state.nbjgh
        obj.yxjgdm = this.state.yxjgdm
        obj.jrxkzh = this.state.jrxkzh
        obj.yxjgmc = this.state.yxjgmc
        obj.yxbgdz = this.state.yxbgdz
        obj.yxtxdz = this.state.yxtxdz
        obj.lxrxm = this.state.lxrxm
        obj.lxrdh = this.state.lxrdh
        obj.lxrdzyx = this.state.lxrdzyx
        obj.zjgy = this.state.zjgy
        obj.zjgydh = this.state.zjgydh
        obj.jgzxr = this.state.jgzxr
        obj.jgzxrdh = this.state.jgzxrdh
        console.log(obj)
        let data = await AddDataApi(obj)
        console.log(data,'新增')
            if (data.msg == "成功") {
                message.success('成功')
               this.props.queryDafault()
            }else{
                message.error(data.msg)
               this.props.CancelClick()
            }
    }

    // 内部机构号
    NbjghInput(e){
        this.setState({
            nbjgh:e.target.value
        })
    }
    // 银行机构代码
    YxjgdmInput(e){
        this.setState({
            yxjgdm:e.target.value
        })
    }
    // 金融许可证号
    JrxkzhInput(e){
        this.setState({
            jrxkzh:e.target.value
        })
    }
    // 银行机构名称
    YxjgmcInput(e){
        this.setState({
            yxjgmc:e.target.value
        })
    }

    // 银行办公地址
    YxbgdzInput(e){
        this.setState({
            yxbgdz:e.target.value
        })
    }

    // 银行通信地址
    YxtxdzInput(e){
        this.setState({
            yxtxdz:e.target.value
        })
    }

    // 联系人姓名
    LxrxmInput(e){
        this.setState({
            lxrxm:e.target.value
        })
    }

    // 联系人电话
    LxrdhInput(e){
        this.setState({
            lxrdh:e.target.value
        })
    }

    // 联系人电子邮箱
    LxrdzyxInput(e){
        this.setState({
            lxrdzyx:e.target.value
        })
    }

    // 主监管员
    ZjgyInput(e){
        this.setState({
            zjgy:e.target.value
        })
    }

    // 主监管员电话
    ZjgydhInput(e){
        this.setState({
            zjgydh:e.target.value
        })
    }

    // 监管执行人
    JgzxrInput(e){
        this.setState({
            jgzxr:e.target.value
        })
    }

    // 监管执行人电话
    JgzxrdhInput(e){
        this.setState({
            jgzxrdh:e.target.value
        })
    }

}
export default Fromlist