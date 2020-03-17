import http from "@utils/http";

// 用户管理默认列表
export const TotalDataApi = (val) => http.post(`${window.apiUrl}/review/jgxxb/list`, {
    'yhjgmc':val.yhjgmc,
    'page': val.page
})

// 删除
export const DeleteApi = (val)=>http.post(`${window.apiUrl}/review/users/findUsers`,{
    'id':val
})