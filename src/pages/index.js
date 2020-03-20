import Loading from "@common/Loading";
import reactLoadable from "react-loadable"

const Home = reactLoadable({
    loader:()=>import("./Home"),
    loading:Loading
})
const Login = reactLoadable({
    loader:()=>import("./login"),
    loading:Loading
})
const Sign = reactLoadable({
    loader:()=>import("./sign"),
    loading:Loading
})
const ClassfyList = reactLoadable({
    loader:()=>import("./classfyList"),
    loading:Loading
})
const Supervise = reactLoadable({
    loader:()=>import("./supervise"),
    loading:Loading
})
const Administration = reactLoadable({
    loader:()=>import("./Administration"),
    loading:Loading
})
const CheckingUp = reactLoadable({
    loader:()=>import("./CheckingUp"),
    loading:Loading
})
const FileManagement = reactLoadable({
    loader:()=>import("./FileManagement"),
    loading:Loading
})
const SBAdministration = reactLoadable({
    loader:()=>import("./SBAdministration"),
    loading:Loading
})
const Historical = reactLoadable({
    loader:()=>import("./Historical"),
    loading:Loading
})
const ModifyData = reactLoadable({
    loader:()=>import('./ModifyData'),
    loading:Loading
})
const Dafaultdelete = reactLoadable({
    loader:()=>import('./DafaultProportion'),
    loading:Loading
})
const Role = reactLoadable({
    loader:()=>import('./Role'),
    loading:Loading
})
const Privilege = reactLoadable({
    loader:()=>import('./Privilege'),
    loading:Loading
})
const BankInformation = reactLoadable({
    loader:()=>import('./BankInformation'),
    loading:Loading
})
const ReportingTask = reactLoadable({
    loader:()=>import('./ReportingTask'),
    loading:Loading
})
const NewReportingTask = reactLoadable({
    loader:()=>import('./ReportingTask/NewReportingTask'),
    loading:Loading
})
const EditInformation = reactLoadable({
    loader:()=>import('./EditInformation'),
    loading:Loading
})

export {
    Home,Login,Sign,ClassfyList,Supervise,Administration,
    CheckingUp,FileManagement,SBAdministration,Historical,
    ModifyData,Dafaultdelete,Role,Privilege,BankInformation,ReportingTask,NewReportingTask,EditInformation
}