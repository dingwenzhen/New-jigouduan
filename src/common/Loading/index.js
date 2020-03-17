import React from "react";
import { Spin } from 'antd';
class Loading extends React.Component{
    render(){
        return(
            <div style={{position:'absolute',right:'0',left:'0',bottom:'0',top:'0',margin:'auto',width:'200px',height:'200px'
            ,display:'flex',justifyContent:'center',alignItems:'center'
        }}>
                <Spin style={{width:'100%',height:'100%',display:'inline-block'}}  size="large" />
            </div>
        )
    }
}
export default Loading;