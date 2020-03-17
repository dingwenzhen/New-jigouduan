import React, { Fragment } from 'react'
import {Input, Button} from 'antd'
import Axios from 'axios'
import Cookies from "js-cookie";
class ceshi extends React.Component{
    constructor(){
        super()
        this.state={
            jclc:''
        }
    }
    render(){
        return(
            <Fragment>
                <Input value={this.state.jclc} onChange={this.onChangeInput.bind(this)} placeholder='请输入检核轮次'/>
                <Button type='primary' onClick={this.ButtonClick.bind(this)}>导出</Button>
            </Fragment>
        )
    }
    onChangeInput(e){
        this.setState({
            jclc:e.target.value
        })
    }
    ButtonClick(){
        let _this = this
        Axios({
            url: `${window.apiUrl}/review/Appear/exportFileNameReport`,
            method: 'get',
            responseType: 'blob',
            headers: {
                'token': Cookies.get("67ae207794a5fa18fff94e9b62668e5c").split('"')[1]
            },
            params: {
                'jclc': _this.state.jclc
            }
        }).then(({ data }) => {
            console.log(data, '132')
            const blob = new Blob([data], { type: 'application/vnd.ms-excel;charset=utf-8' })
            var link = document.createElement('a')
            link.href = window.URL.createObjectURL(blob)
            link.download = _this.state.calendarTime + '.xls'
            link.click()
        })
    }
}
export default ceshi