import Loading from "@common/Loading"
import reactLoadable from "react-loadable"

const DataChecking = reactLoadable({
    loader:()=>import("./DataChecking"),
    loading:Loading
})

const XTGLPage = reactLoadable({
    loader:()=>import("./XTGLPage"),
    loading:Loading
})
const UserInterface = reactLoadable({
    loader:()=>import("./UserInterface"),
    loading:Loading
})
const UserChoice = reactLoadable({
    loader:()=>import("./UserChoice"),
    loading:Loading
})

export {
    XTGLPage,DataChecking,UserInterface,UserChoice
}