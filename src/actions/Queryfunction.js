import {createAction} from "redux-actions"

export const CHECKING_UP=createAction("check_up_from_list",data=>data)


// checkingUp
export const CKJGVALU = createAction('chect_up_list_jg',data=>data)

// 保存用户初步进入的时候的版本号跟日期
export const VERSIONRULE = createAction('version_rule_value',data=>data)


// 查看是否存在默认的规则号以及时间
export const DAFAULTAPI = createAction('dafault_value_api',data=>data)