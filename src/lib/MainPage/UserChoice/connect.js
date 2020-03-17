import {connect} from "react-redux";
import {VERSIONRULE} from "@actions/Queryfunction"
const mapStateToProps = (state)=>({

})

const mapDisPathToProps = (dispatch)=>({
    VersionRuleHandler(val){
        dispatch(VERSIONRULE(val))
    }
})

export default connect(mapStateToProps,mapDisPathToProps)