import {connect} from "react-redux";
import {LOGINHOME} from "@api/Home"
import axios from 'axios'
const mapStateToProps = (state)=>({
    
})
const mapDisPathToProps = (dispatch)=>({
    async handleLogin(e){
        e.preventDefault()
        let arr = {}
        arr.userId=e.target.userId.value
        arr.password=e.target.password.value
        console.log(arr)
            // axios.post(`${window.apiUrl}/review/login`,arr).then((data)=>{
            //     console.log(data)
            // })
        let Login = await LOGINHOME(arr)
        console.log(Login,"login")
        // if(data.msg=='成功'){
        //     this.props.history.push("/DataChecking/UserInterface")
        // }
    }
})

export default connect(mapStateToProps,mapDisPathToProps)