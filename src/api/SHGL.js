import http from "@utils/http";
import axios from "@utils/axios";
import Cookies from "js-cookie";
// 生成上报
export const SCSHVALUE = (val) => http.get(`${window.apiUrl}/review/dataCheckList`, {
    'cjrq': val.Time
})
// 向后端传数据，下载txt
export const TXTAPI = (val) => http.get(`${window.apiUrl}/review/Appear/inTheNewspapersLeadingOut`, {
    'number': val.number,
    'cjrq': val.cjrq,
    'jclc': val.jclc
})


// 发送时间-获取轮次
export const HQLCLIST = (val) => http.get(`${window.apiUrl}/review/check/lc`, {
    'cjrq': val.Time
})

// 向后端发送 时间+轮次
export const LCTIME = (val) => http.get(`${window.apiUrl}/review/Appear/inTheNewspapers`, {
    'cjrq': val.Time,
    'jclc': val.SelectValue
})

// 上报按钮
export const SCSBButton = (val) => http.post(`${window.apiUrl}/review/checkOut`, {
    'lc': val.lc,
    'checkTime': val.Time,
    'dDqGzs': val.FromListStatus
})

// 获取最大的轮次
export const MaxLC = () => http.get(`${window.apiUrl}/review/check/lcMax`, {
    'lc': '',
    'checkTime': ''
})

// 重新上传
export const ReUploadApi =(val)=> http.post(`${window.apiUrl}/review/Appear/ftpUpload`, {
    'fileList': val.arry,
    // 'fileList':  ["/Users/zqq/Downloads/dir1/xxxxx-hlxxb-20191231.txt", "/Users/zqq/Downloads/dir1/xxxxx-sxxx-20191231.txt"],
    'status': val.bool
})

// 获取状态
export const AcquisitionState=()=>http.get(`${window.apiUrl}/review/Appear/queryCheck`)
