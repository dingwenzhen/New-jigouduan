import {connect} from "react-redux";

const mapStateToProps = (state)=>({
    CheckingUpCharts:state.List.CheckingUpCharts,
    
})

const mapDisPathToProps = (dispatch)=>({
    
})

export default connect(mapStateToProps,mapDisPathToProps)