import {connect} from "react-redux";

const mapStateToProps = (state)=>({
    
})

const mapDisPathToProps = (dispatch)=>({
    handleLogin(e){
        e.preventDefault()
        let arr = {}
        arr.userId=e.target.userId.value
        arr.password=e.target.password.value
        console.log(arr)
        console.log(this)
    },
    ClickSignValue(){
        this.props.history.push("/Login")
    }
})

export default connect(mapStateToProps,mapDisPathToProps)