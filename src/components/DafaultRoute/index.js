import React, { Fragment } from 'react'
import { DAFAULTROUTE } from "@api"
import {QUERYDATALIST} from '@api/ModifyData'
import { Modal, Button, Table, Select, Pagination, Input } from 'antd';
const { TextArea } = Input;
const { Option } = Select
class DafaultRoute extends React.Component {
    constructor() {
        super()
        this.state = {
            field_value:'',
            describe:'',
            visible:false,
            selectList:[]
        }
    }
    render() {
        return (
            <Fragment>
                <Modal
                    title="请选择路径"
                    visible={this.state.visible}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                >
                    <div style={{ display: 'flex' }}>
                        <span style={{ display: 'inline-block', textAlign: 'right', marginRight: '10px', width: '100px' }}>默认路径：</span>
                        <Input
                            onChange={this.LevelhandleChange.bind(this)}
                            value={this.state.field_value}
                            style={{ display: 'inline-block', flex: '1' }}
                        >
                            
                        </Input>
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
            </Fragment>
        )
    }
    async componentDidMount() {
        let Route = await DAFAULTROUTE()
        console.log(Route, 'Route')
        if (Route.data == '0') {
            console.log('路径不存在')
            this.setState({
                visible: true,
                selectList:['C:\/Windows\/System32','D:\/check'],
                field_value:''
            })
        }
    }
    handleOk() {
        this.setState({
            visible: false,
        });
    }
    handleCancel() {
        this.setState({
            visible: false,
        });
    }
    LevelhandleChange(e){
        this.setState({
            field_value: e.target.value
        })
    }
    describeInput(e){
        this.setState({
            describe:e.target.value
        })
    }
    async SumbitInput(){
        let Route = {}
        Route.field_name='filepath'
        Route.field_value = this.state.field_value
        Route.describe = this.state.describe
        let RouteUpdata = await QUERYDATALIST(Route)
        if(RouteUpdata.msg == '成功'){
            this.setState({
                visible:false
            })
        }
    }
}
export default DafaultRoute