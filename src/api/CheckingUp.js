import http from "@utils/http";
import axios from "@utils/axios";
import Cookies from "js-cookie";
// 检核状态查询
export const JHZTCX = (val)=>http.get(`${window.apiUrl}/review/EAST/queryCheck`,{
    ruleSeq:val
})
// 点击查看结果 向后端发送规则号 -- 跳转页面
export const DJCKJG = (val) =>http.get(`${window.apiUrl}/review/jhjgls/checkTimes`)
// 实时状态
export const SSZTCX = () =>http.get(`${window.apiUrl}/review/EAST/detection`)
