import http from "@utils/http";
import axios from "@utils/axios";

// 用户管理默认列表
export const DAFAULTDATA = (val) => http.get(`${window.apiUrl}/review/users/findUsers`, {
    'username': val.username,
    'email': val.email,
    'phone': val.phone,
    'name': val.name,
    'page': val.page
})
// 单条删除
export const DELETEONE = (val) => http.post(`${window.apiUrl}/review/users/delUsers`, {
    'ids': val
})

// 新增
export const NEWLYADDED = (val) => http.post(`${window.apiUrl}/review/users/addUsers`, {
    'username': val.username,
    'name': val.name,
    'phone': val.phone,
    'email': val.email,
    'roleIds': val.roleIds,
    'password': val.password
})
// 默认下拉的数据选择
export const SELECTLIST = () => http.get(`${window.apiUrl}/review/role/findAllRoles`)

// 点击编辑 往后端传id获取数据
export const TRANSMISSIONID = (val) => http.post(`${window.apiUrl}/review/users/findUsersById`, {
    'id': val
})
// 点击修改数据往后端传输数据
export const MODIFYDATA = (val) => http.post(`${window.apiUrl}/review/users/updUsers`, {
    'email': val.email,
    'name': val.name,
    'phone': val.phone,
    'username': val.username,
    'roleIds': val.roleIds,
    'id': val.id
})
