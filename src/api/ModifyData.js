import http from "@utils/http";
import axios from "@utils/axios";
import Cookies from "js-cookie";
// 默认数据
export const DAFAULTVALUE = (val)=>http.get(`${window.apiUrl}/review/defalut/list`)

// 修改数据
export const QUERYDATALIST = (val)=>http.post(`${window.apiUrl}/review/defalut/updateBConstant`,{
    fieldName:val.field_name,
    fieldValue:val.field_value,
    describe:val.describe
})
// 查询
export const QUERYVALUE = (val)=>http.post(`${window.apiUrl}/review/defalut/updateBConstant`,{
    fieldName:val
})

// 下拉选择版本
export const SEQSELECT = ()=>http.get(`${window.apiUrl}/review/defalut/standardType`)

// 分页
export const PageApi = (val)=>http.get(`${window.apiUrl}/review/defalut/list`,{
    'page':val
})