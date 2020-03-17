import {connect} from "react-redux";
import {booksListApi} from "@api"
const mapStateToProps = (state)=>({
    
})

const mapDisPathToProps = (dispatch)=>({
     handleAsyncList(){
        console.log(111)
    }
})

export default connect(mapStateToProps,mapDisPathToProps)