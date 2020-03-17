import http from "@utils/http";

// 选择机构的
export const queryApi = (val) => http.get(`${window.apiUrl}/fileup/listTask`,{
    'page':val.page,
    'cjrq':val.DatePickerTime,
    'taskNumber':val.taskNumber,
    'yxjgmc':val.Institution
})

// 上报任务-删除
export const deleteIdApi = (val)=>http.post(`${window.apiUrl}/fileup/delete`,{
    'id':val
})


// 上报任务-添加上报任务-所有的执行人
export const ToltalExecutorApi = ()=>http.get(`${window.apiUrl}/dept/selectSupervisorAndExecutorByDeptId`)

// 上报任务-根据id获取银行机构
export const ZxrIdApi = (val)=>http.post(`${window.apiUrl}/jgxxb/selectByOrgJgyAndZxrId`,{
    'exeSupId':val
})

// 上报任务-获取上报的文件
export const FileListApi = ()=>http.get(`${window.apiUrl}/fileup/file`)

// 上报任务-获取查询规则
export const queryRulesApi = ()=>http.get(`${window.apiUrl}/fileup/rule`)

// 上报任务-完成
export const OKRuleApi = (val)=>http.post(`${window.apiUrl}/fileup/savetask`,{
    'cjrq':val.cjrq,
    'upTodata':val.upTodata,
    'ruleSeq':val.ruleSeq,
    'bmCn':val.bmCn,
    'taskExecutor':val.taskExecutor,
    'yhjgdm':val.yhjgdm
})