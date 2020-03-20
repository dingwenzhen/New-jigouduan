import http from "@utils/http";

// 用户管理默认列表
export const TotalDataApi = (val) => http.get(`${window.apiUrl}/review/yhxxb/list`, {
    'yxjgmc':val.yxjgmc,
    'page': val.page
})


// 确定修改
export const ModifyDataFinishApi = (val)=>http.post(`${window.apiUrl}/review/yhxxb/update`,{
    'id':val.id,
    'nbjgh':val.nbjgh,
    'yxjgdm':val.yxjgdm,
    'jrxkzh':val.jrxkzh,
    'yxjgmc':val.yxjgmc,
    'yxbgdz':val.yxbgdz,
    'yxtxdz':val.yxtxdz,
    'lxrxm':val.lxrxm,
    'lxrdh':val.lxrdh,
    'lxrdzyx':val.lxrdzyx,
    'zjgy':val.zjgy,
    'zjgydh':val.zjgydh,
    'jgzxr':val.jgzxr,
    'jgzxrdh':val.jgzxrdh
})

// 修改
export const ModifyDataApi = (val)=>http.get(`${window.apiUrl}/review/yhxxb/toUpdate`,{
    'id':val.id
})

// 删除
export const DeleteApi = (val)=>http.get(`${window.apiUrl}/review/yhxxb/delete`,{
    'id':val.id
})

// 新增
export const AddDataApi = (val)=>http.post(`${window.apiUrl}/review/yhxxb/save`,{
    'nbjgh':val.nbjgh,
    'yxjgdm':val.yxjgdm,
    'jrxkzh':val.jrxkzh,
    'yxjgmc':val.yxjgmc,
    'yxbgdz':val.yxbgdz,
    'yxtxdz':val.yxtxdz,
    'lxrxm':val.lxrxm,
    'lxrdh':val.lxrdh,
    'lxrdzyx':val.lxrdzyx,
    'zjgy':val.zjgy,
    'zjgydh':val.zjgydh,
    'jgzxr':val.jgzxr,
    'jgzxrdh':val.jgzxrdh

})