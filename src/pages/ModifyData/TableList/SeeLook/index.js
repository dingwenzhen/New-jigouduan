import React, { Fragment } from 'react'
import { Input, Button } from 'antd'
const { TextArea } = Input;
class SeeLook extends React.Component {
    constructor(props) {
        super(props)
        this.state = this.props.SeeData
    }
    render() {
        return (
            <Fragment>
                <div style={{  marginTop: '20px' }}>
                    <div>
                        <span style={{ display: 'inline-block', textAlign: 'right', width: '130px' }}>
                            {this.props.SeeData.fieldNameCn}：</span>
                        <Input
                            style={{ display: 'inline-block', width:'300px' }}
                            value={this.props.SeeData.fieldValue} disabled
                        >
                        </Input>
                    </div>
                    <div style={{ display: 'flex', marginTop: '20px' }}>
                        <span style={{ display: 'inline-block', width: '130px', textAlign: 'right' }}>参数描述：</span>
                        <TextArea rows={4} placeholder="请输入参数描述" value={this.props.SeeData.describe} disabled style={{width:'300px'}} />
                    </div>
                    <div style={{marginTop:'20px'}}>
                        <Button type='primary' onClick={this.CancelClick.bind(this)}>关闭</Button>
                    </div>
                </div>
            </Fragment>
        )
    }
    CancelClick(){
        this.props.CancelClick()
    }
}
export default SeeLook