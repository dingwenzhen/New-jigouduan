import { handleActions } from "redux-actions"

const defaultValue = {
    FromListStatus: JSON.parse(localStorage.getItem("FromListStatus")) || [],
    commodities: [],
    FromListId : JSON.parse(localStorage.getItem('FromListId')) || [],
    FromListLength:JSON.parse(localStorage.getItem('FromListLength')) || 0,
    CheckingUpCharts:JSON.parse(localStorage.getItem('CheckingUpCharts')) || [],
    VersionRule:JSON.parse(localStorage.getItem('VersionRule')) || [],
    DetailTime:JSON.parse(localStorage.getItem('DetailTime')) || ''
}
export default handleActions({
    check_up_from_list: (state, action) => {
        let FromList = JSON.parse(JSON.stringify(state))
        let ActionList = action.payload[0]
        let FromListId = []
        for(var k = 0 ; k<ActionList.length ; k++){
            ActionList[k].statusType = "正在执行"
            FromListId.push(ActionList[k].id)
        }
        FromList.FromListStatus = ActionList
        // localStorage.setItem('FromListLength',JSON.stringify(FromListId.length))
        // localStorage.setItem("FromListId",JSON.stringify(FromListId))
        // localStorage.setItem("FromListStatus", JSON.stringify(action.payload[0]))
        return FromList
    },
    chect_up_list_jg:(state, action)=>{
        let CheckingUp = JSON.parse(JSON.stringify(state))
        CheckingUp.CheckingUpCharts=action.payload
        localStorage.setItem('CheckingUpCharts',JSON.stringify(action.payload))
        return CheckingUp
    },
    version_rule_value:(state, action)=>{
        let UserDefault = JSON.parse(JSON.stringify(state))
        UserDefault.VersionRule = action.payload.field_name
        UserDefault.DetailTime = action.payload.cjrq
        localStorage.setItem('VersionRule',JSON.stringify(action.payload.field_name))
        localStorage.setItem('DetailTime',JSON.stringify(action.payload.cjrq))
        return UserDefault
    }
}, defaultValue)