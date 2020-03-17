import React, { Fragment } from "react"
import { Calendar,Button } from 'antd';
class TimeCancel extends React.Component{
    constructor(){
        super()
        this.state={
            str:''
        }
    }
    render(){
        return(
            <Fragment>
                <div>
                    <Calendar fullscreen={false} onPanelChange={this.onPanelChange.bind(this)} onSelect={this.RQSelect.bind(this)} />
                </div>
                
            </Fragment>
        )
    }
    onPanelChange(value, mode) {
        console.log(value, mode);
    }
    RQSelect(date,moment){
        const d = new Date(date)
        const resDate = d.getFullYear() + '-' + this.p((d.getMonth() + 1)) + '-' + this.p(d.getDate())
        console.log(resDate.split('-'))
        let resDateList = resDate.split('-')
        let str = ''
        for( var i = 0 ; i<resDateList.length ; i++ ){
            str+=resDateList[i]
        }
        console.log(str)
        
        this.props.TimeClose(str)
    }
    p(s) {
        return s < 10 ? '0' + s : s
    }
   
}
export default TimeCancel