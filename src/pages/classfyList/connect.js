import {connect} from "react-redux";
import {CHECKING_UP} from "@actions/Queryfunction"

const mapStateToProps = (state)=>({
    DetailTime:state.List.DetailTime
})

const mapDisPathToProps = (dispatch)=>({
     handleAsyncList(val){
        // const d = new Date()
        // const resDate = d.getFullYear() + '-' + this.p((d.getMonth() + 1)) + '-' + this.p(d.getDate())
        let arr ={}
        arr.Time=JSON.parse(localStorage.getItem('DetailTime'))
        arr.List = arguments[0]
        // let dataList = await JHIDSH(arr)
        let ErrorTrue = []
        ErrorTrue.push(arguments[1])
        // ErrorTrue.push(dataList.data)
        // console.log(dataList,"状态")
        dispatch(CHECKING_UP(ErrorTrue))
        // if(dataList.msg=="成功"){
          console.log(this)
            this.history.push("/DataChecking/CheckingUp")
        // }
        
    },
    p(s) {
        return s < 10 ? '0' + s : s
    }
})

export default connect(mapStateToProps,mapDisPathToProps)