import http from '@utils/http'
import axios from "@utils/axios";
import Cookies from "js-cookie";
// 全部的数据加载 按钮 仅作查询
export const DATALOADINGTIME = () =>http.get(`${window.apiUrl}/review/wj/load`)

// 全部的数据加载按钮，传输时间
export const DAFAULTTIMEAPI = (val)=>http.get(`${window.apiUrl}/review/wj/stload`,{
    'cjrq':val.cjrq,
    'ids':val.ids
})

// 点击一个表的数据加载  传输id
export const FROMDATAID = (val)=>http.post(`${window.apiUrl}/review/wj/load`,{
    'idAndFileName':val.ids,
    // 'cjrq':val.cjrq
})