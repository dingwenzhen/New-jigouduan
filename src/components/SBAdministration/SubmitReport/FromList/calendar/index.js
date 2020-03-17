import React from "react";
import { Calendar } from 'antd';

class calendar extends React.Component{
    render(){
        return(
            <Calendar onPanelChange={this.onPanelChange.bind(this)} onSelect={this.onSelect.bind(this)} />
        )
    }
    onPanelChange(value, mode) {
        console.log(value._d, "777");
        const d = new Date(value._d)
        const resDate = d.getFullYear() + '-' + this.p((d.getMonth() + 1)) + '-' + this.p(d.getDate())
        const resTime = this.p(d.getHours()) + ':' + this.p(d.getMinutes()) + ':' + this.p(d.getSeconds())
        console.log(resDate)
        console.log(resTime)
        this.props.calendarTime()
    }
    p(s) {
        return s < 10 ? '0' + s : s
    }
    onSelect(date, moment){
        const d = new Date(date._d)
        const resDate = d.getFullYear() + '-' + this.p((d.getMonth() + 1)) + '-' + this.p(d.getDate())
        console.log(resDate)
        this.props.calendarTime(resDate)
    }
   
}
export default calendar