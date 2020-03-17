import {connect} from "react-redux";

const mapStateToProps = (state)=>({
    CheckingUpCharts:state.List.CheckingUpCharts,
    FromListStatus:state.List.FromListStatus
})

const mapDisPathToProps = (dispatch)=>({
    
})

export default connect(mapStateToProps,mapDisPathToProps)