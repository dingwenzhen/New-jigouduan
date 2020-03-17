import React, { Fragment } from "react";
import FromList from "./FromList"
import FromTable from "./FromTable"
class SubmitReport extends React.Component {
    render() {
        return (
            <Fragment>
                <div style={{ height: '40px', backgroundColor: '#fff', lineHeight: '40px', paddingLeft: '10px', fontSize: '14px', color: '#333' }}>
                    当前位置：首页-提交上报
                </div>
            <FromList SubmissionSB={this.SubmissionSB.bind(this)}/>
            <div style={{padding:"10px"}}>
                <FromTable />
            </div>
            </Fragment>
        )
    }
    SubmissionSB(){
        
    }
}
export default SubmitReport