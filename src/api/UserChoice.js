import http from "@utils/http";
import axios from "@utils/axios";
import Cookies from "js-cookie";
// 获取select 下拉
export const SELECTLIST = ()=>http.get(`${window.apiUrl}/review/standardType/getType`)

// 传递 参数
export const USERDATA = (val)=>http.get(`${window.apiUrl}/review/standardType/submitType`,{
    'cjrq':val.cjrq,
    'booken':val.booken,
    'field_name':val.field_name
})

