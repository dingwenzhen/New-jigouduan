import http from "@utils/http";
import axios from "@utils/axios";
import Cookies from "js-cookie";
// 历史分析页面的-分页器
export const LSFXLIST = (val)=>http.get(`${window.apiUrl}/review/jhjgls/queryCheckList`,{
    'page':val.pageNumber,
    'cjrq':val.Time,
    "jclc":val.LC
})

// 历史分析页面的数据  当前
export const SUPERVISORVUE = (val) => http.get(`${window.apiUrl}/review/jhls/Period`, {
    'cjrq': val.Time,
    'jclc': val.sblc
})

// 分析页面全部的数据分页器的应用  当期 全部的按钮的分页器
export const ALLSINGLE = (val)=>http.get(`${window.apiUrl}/review/jhls/Period`,{
    'page':val.pageNumber,
    'cjrq':val.Time,
    "jclc":val.LC
})

// 发送时间-获取轮次
export const HQLCLIST = (val) =>http.get(`${window.apiUrl}/review/check/lc`,{
    'cjrq':val.Time
})

// 检核结果历史分析--查询
export const LSFXCHList = (val)=>http.get(`${window.apiUrl}/review/dataCheckList`,{
    'cjrq':val.Time,
    'jclc':val.SelectValue
})

// 导出样本上传数量
export const DCYBSCSL = (val)=>http.get(`${window.apiUrl}/review/check/export`,{
    'hc':val.hc,
    'cjrq':val.cjrq,
    'jclc':val.lc
})

// Time
export const TIMEJHSJ = (val)=>http.get(`${window.apiUrl}/review/defalut/Cjrq`)

// 检核历史详情页面  进来时候的默认数据
export const DEFAULTDATA = (val)=>http.get(`${window.apiUrl}/review/jhjgls/queryCheckList`,{
    'cjrq':val
    
})

// 反查  导出excel
export const QUERYEXCEL = (val)=>http.get(`${window.apiUrl}/review/fc/exportOne`,{
    'number':val.PopupDataLength,
    'cjrq':val.cjrq,
    'jclc':val.jclc,
    'ruleSeq':val.ruleSeq
})

// 生成图表
export const GeneratingChartsApi = (val)=>http.get(`${window.apiUrl}/review/jhjgls/historicalProductionChart`,{
    'cjrq':val.Time,
    'jclc':val.LC
})