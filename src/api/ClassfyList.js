import http from "@utils/http";
import axios from "@utils/axios";
import Cookies from "js-cookie";
// 数据检核-获取重要性
export const SJJHZYX = ()=>http.get(`${window.apiUrl}/review/rules/ruleType`)


// 查询版本是否存在
export const QUERYEXACT = ()=>http.get(`${window.apiUrl}/review/defalut/list`)

// 点击检核按钮的时候后端传过来的状态，判断是否存在
export const DAFAULTSEQTIME=()=>http.get(`${window.apiUrl}/review/defalut/isExistStandardType`)