import http from "@utils/http";
import axios from "@utils/axios";
import Cookies from "js-cookie";
// 全部的角色----自己选择的
export const DAFAULTROLE = (val) => http.get(`${window.apiUrl}/review/role/findAllRoles`)

// 进入页面是默认的展示数据
export const WHOLEDATALIST = (val)=>http.get(`${window.apiUrl}/review/permission/findPermission`,{
    'name':val.name,
    'description':val.description,
    'page':val.page,
})
// 根据id删除数据
export const DELETEID = (val)=>http.post(`${window.apiUrl}/review/permission/delPermission`,{
    'ids':val,
})
// 点击编辑---传id--获取数据
export const IDOBTAINDATA = (val)=>http.post(`${window.apiUrl}/review/permission/detailsPermission`,{
    'id':val
})
// 修改权限
export const UPDATADTAAPI = (val)=>http.post(`${window.apiUrl}/review/permission/updPermission`,{
    'id':val.id,
    'name':val.name,
    'description':val.description,
    'roleIds':val.roleIds
})

// 添加

