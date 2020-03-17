import Loading from "@common/Loading";
import reactLoadable from "react-loadable";

const Exhibition = reactLoadable({
    loader:()=>import("./HomeChildren/Exhibition"),
    loading:Loading
})
const Import = reactLoadable({
    loader:()=>import("./HomeChildren/Import"),
    loading:Loading
})
const LowerHair = reactLoadable({
    loader:()=>import("./HomeChildren/LowerHair"),
    loading:Loading
})
const GenerateReport = reactLoadable({
    loader:()=>import("./SBAdministration/GenerateReport"),
    loading:Loading
})
const JHLSFX = reactLoadable({
    loader:()=>import('./supervise/JHLSFX'),
    loading:Loading
})
const SubmitReport = reactLoadable({
    loader:()=>import('./supervise/SubmitReport'),
    loading:Loading
})
const GeneratingCharts = reactLoadable({
    loader:()=>import('./supervise/JHLSFX/GeneratingCharts'),
    loading:Loading
})
const Ceshi = reactLoadable({
    loader:()=>import('./ceshi'),
    loading:Loading
})
export {
    Exhibition,Import,LowerHair,GenerateReport,JHLSFX,SubmitReport,GeneratingCharts,Ceshi
}