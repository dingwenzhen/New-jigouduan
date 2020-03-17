import React, { Fragment } from "react";
import { Select, Button } from 'antd';

const { Option } = Select;
class SelectList extends React.Component {
    constructor(){
        super()
        this.state={
            SelectValue:''
        }
    }
    render() {
        return (
            <Fragment>
                <div>
                    <Select defaultValue="lucy" style={{ width: 120 }} onChange={this.handleChange.bind(this)}>
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="Yiminghe">yiminghe</Option>
                    </Select>
                </div>
                <div style={{marginTop:'20px'}}>
                    <Button type="primary" style={{marginRight:'10px'}} onClick={this.DetermineClose.bind(this)}>确定</Button>
                    <Button onClick={this.CancelClose.bind(this)}>取消</Button>
                </div>
            </Fragment>
        )
    }
    handleChange(value) {
        this.setState({
            SelectValue:value
        })
    }
    // 
    DetermineClose(){
        let value=this.state.SelectValue
        this.props.DetermineClose(value)
    }
    CancelClose(){
        this.props.CancelClose()
    }
}
export default SelectList