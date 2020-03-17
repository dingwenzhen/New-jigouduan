import http from "@utils/http";
import axios from "@utils/axios";
import Cookies from "js-cookie";
// 获取图表数据
export const CHARTSLISTVALUE = ()=>http.get(`${window.apiUrl}/review/jhjgls/chief`)

// 默认的时间查询有没有
export const DAFAULTTIME = () =>http.get(`${window.apiUrl}/review/defalut/Cjrq`)

// 时间不存在的时候向后端发送
export const SENDTIME = (val)=>http.post(`${window.apiUrl}/review/defalut/updateBConstant`,{
    'fieldValue':val.field_value,
    'describe':val.describe,
    'fieldName':'cjrq'
})

