import React, { Fragment } from "react";
import { Modal, Button } from 'antd';
import {withRouter} from "react-router-dom"

@withRouter
class GoToState extends React.Component {
    constructor(){
        super()
        this.state={
            visible:false
        }
    }
    render() {
        return (
            <Fragment>
                <Modal
                    title="检核提示"
                    visible={this.state.visible}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                >
                   您有数据正在检核，是否前往查看？
                   <div style={{marginTop:'20px'}}>
                    <Button type="primary" onClick={this.CurrentState.bind(this)}>查看当前检核状态</Button>
                    <Button type="primary" onClick={this.DeleteClick.bind(this)} style={{marginLeft:'20px'}}>取消</Button>
                   </div>
                </Modal>
            </Fragment>
        )
    }
    componentDidMount(){
        let review = JSON.parse(localStorage.getItem('review'))
        if(review){
            this.setState({
                visible:true
            })
        }
    }
    handleOk(){
        this.setState({
            visible:false
        })
    }
    handleCancel(){
        this.setState({
            visible:false
        })
    }
    DeleteClick(){
        this.setState({
            visible:false
        })
    }
    CurrentState(){
        // console.log(this)
        this.props.history.push('/DataChecking/CheckingUp')
    }
}
export default GoToState