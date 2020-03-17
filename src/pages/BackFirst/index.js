import React, { Fragment } from 'react'
import {Button} from 'antd'
import {withRouter} from 'react-router-dom'
// @withRouter()
class BackFirst extends React.Component{
    render(){
        console.log(this,'props')
        return(
            <div style={{position:'absolute',right:'0',left:'0',bottom:'0',top:'0',margin: 'auto',textAlign:'center',width:'260px',height:'200px'}}>
                <div >{this.props.title}</div>
                <Button style={{marginTop:'20px'}} onClick={this.BackPage.bind(this)}>回到首页</Button>
            </div>
        )
    }
    BackPage(){
        this.props.history.push('/DataChecking/UserInterface')
    }
}
export default withRouter(BackFirst)