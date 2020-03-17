import React, { Fragment } from "react";
import { ModifyData_style } from "./styled"

import TableList from "./TableList"
class ModifyData extends React.Component {
    constructor() {
        super()
        this.state = {
           
        }
    }
    render() {
        return (
            <ModifyData_style>
                <div style={{ height: '40px', backgroundColor: '#fff', lineHeight: '40px', paddingLeft: 10, fontSize: '14px', color: '#333' }}>
                    当前位置：首页-系统管理-修改参数
                </div>
                <TableList/>
               
            </ModifyData_style>
        )
    }
    
    
}
export default ModifyData