import { handleActions } from "redux-actions";

const defaultValue = {
    defaultValue:JSON.parse(sessionStorage.getItem('defaultValue')) || []
}
export default handleActions({
    dafault_value_api:(state, action)=>{
        console.log(action)
        let DafaultValue = JSON.parse(JSON.stringify(state))
        DafaultValue.defaultValue = action.payload
        sessionStorage.setItem('defaultValue',JSON.stringify(action.payload))
        return DafaultValue
    }
},defaultValue)