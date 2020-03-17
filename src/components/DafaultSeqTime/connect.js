import {connect} from "react-redux";

const mapStateToProps = (state)=>({
    defaultValue:state.Dafault.defaultValue
})

const mapDisPathToProps = (dispatch)=>({
    
})

export default connect(mapStateToProps,mapDisPathToProps)