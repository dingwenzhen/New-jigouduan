import React, { Fragment } from 'react'
import Catalog from './Catalog'
import { Radio } from 'antd'
import MenuList from './menuList'
class NewlyAdd extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: 2,data:this.props.dafaultData
        }
        console.log(this.props.dafaultData)
    }
    render() {
        const radioStyle = {
            display: 'inline-block',
            height: '30px',
            lineHeight: '30px',
          }
        return (
            <Fragment>
               
                   <MenuList dafaultData={this.state.data}/> 
                
            </Fragment>
        )
    }
    onChange = e => {
        console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
        });
    }
    //   第一个的确定
    DetermineClick() {
        this.props.DetermineClick('成功')
    }
    // 第一个的取消
    CancelClick() {
        this.props.CancelClick()
    }
}
export default NewlyAdd