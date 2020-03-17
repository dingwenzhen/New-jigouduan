import http from "@utils/http";
import axios from "@utils/axios";
import Cookies from "js-cookie";
// 默认数据
export const DAFAULTVALUE = (val) => http.get(`${window.apiUrl}/review/role/findAllPermissions`)

// 角色管理 -- 查询
export const QUERYDATA = (val) => http.get(`${window.apiUrl}/review/role/findRoles`, {
    'permissionName': val.permissionName,
    'name': val.userName,
    'description': val.description
})

// 角色管理 -- 删除
export const DELETEROLE = (val) => http.post(`${window.apiUrl}/review/role/delRoles`, {
    'ids': val
})
// 点击编辑--获取该用户的数据
export const EDITDATA = (val) => http.post(`${window.apiUrl}/review/role/assignAuthority`, {
    'id': val
})
// 角色管理 -- 添加角色
export const ADDTODATA = (val) => http.post(`${window.apiUrl}/review/permission/addPermission`, {
    'description': val.description,
    'roleIds': val.name,
    'name': val.permissionName
})

// 角色管理  --  分页
export const PAGELIST = (val) => http.get(`${window.apiUrl}/review/role/findRoles`, {
    'name': val.userName,
    'description': val.description,
    'permissionName': val.permissionName,
    'page': val.page
})
// 角色管理 -- 修改数据
export const SINGLESTRIP = (val)=>http.post(`${window.apiUrl}/review/role/updRoles`,{
    'description':val.description,
    'name':val.name,
    'permissionids':val.permissionids,
    'id':val.id
})

// 角色管理 -- 添加角色  ----不能修改
export const ADDLISTDATA = (val) => http.post(`${window.apiUrl}/review/role/addRoles`, {
    'description': val.description,
    'permissionids': val.permissionName,
    'name': val.name
})