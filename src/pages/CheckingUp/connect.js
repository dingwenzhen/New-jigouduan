import {connect} from "react-redux";
import {CKJGVALU} from "@actions/Queryfunction"
const mapStateToProps = (state)=>({
    FromListStatus:state.List.FromListStatus,
    FromListId:state.List.FromListId
})

const mapDisPathToProps = (dispatch)=>({
     handleAsyncList(){
        console.log(111)
    },
    CheckingHistory(val){
        console.log(val)
        dispatch(CKJGVALU(val))
    }
})

export default connect(mapStateToProps,mapDisPathToProps)