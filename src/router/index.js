import { Home, Login, Sign, ClassfyList, Administration, CheckingUp, FileManagement,
     SBAdministration, Historical,ModifyData,Dafaultdelete,Role,Privilege,BankInformation,ReportingTask,
     NewReportingTask,EditInformation } from "@pages/index.js"
import { JHLSFX,SubmitReport ,GeneratingCharts,Ceshi} from "@components/index"

import { XTGLPage, DataChecking,UserInterface ,UserChoice} from "@lib/MainPage"
export const PagesComponent = [
    {
        key: "/Login",
        path: "/Login",
        component: Login,
        icon: "",
        name: "Login",
        meta: {
            flag: true
        }
    },
    {
        key: "/NewReportingTask",
        path: "/NewReportingTask",
        component: NewReportingTask,
        icon: "",
        name: "NewReportingTask",
        meta: {
            flag: true
        }
    },
    {
        key: "/EditInformation",
        path: "/EditInformation",
        component: EditInformation,
        icon: "",
        name: "EditInformation",
        meta: {
            flag: true
        }
    },
    {
        key: "/XTGLPage/Dafaultdelete",
        path: "/XTGLPage/Dafaultdelete",
        class:'Dafaultdelete',
        component: Dafaultdelete,
        icon: "setting",
        name: "用户管理",
        meta: {
            flag: true
        }
    },
    {
        key: "/DataChecking/GeneratingCharts",
        path: "/DataChecking/GeneratingCharts",
        class:'GeneratingCharts',
        component: GeneratingCharts,
        icon: "history",
        name: "生成图表",
        meta: {
            flag: true
        }
    },
    {
        key: "/DataChecking/SubmitReport",
        path: "/DataChecking/SubmitReport",
        class:'SubmitReport',
        component: SubmitReport,
        icon: "pie-chart",
        name: "生成上报",
        meta: {
            flag: true
        }
    },
    {
        key: "/DataChecking/CheckingUp",
        path: "/DataChecking/CheckingUp",
        class:'CheckingUp',
        component: CheckingUp,
        icon: "copy",
        name: "检核状态",
        meta: {
            flag: true
        }
    }
]
export const layoutRoute = [

    {
        key: "/DataChecking",
        path: "/DataChecking",
        class:'DataChecking',
        icon: "fund",
        name: "数据检核",
        component: DataChecking,
        children: [
            {
                key: "/DataChecking/UserInterface",
                path: "/DataChecking/UserInterface",
                class:'UserInterface',
                component: UserInterface,
                icon: "bar-chart",
                name: "历史检核结果",
                meta: {
                    flag: true
                }
            },
            {
                key: "/DataChecking/FileManagement",
                path: "/DataChecking/FileManagement",
                class:'FileManagement',
                component: FileManagement,
                icon: "folder-open",
                name: "文件检核",
                meta: {
                    flag: true
                }
            },
            {
                key: "/DataChecking/ClassfyList",
                path: "/DataChecking/ClassfyList",
                class:'ClassfyList',
                component: ClassfyList,
                icon: "pie-chart",
                name: "数据检核",
                meta: {
                    flag: true
                }
            },
            {
                key: "/DataChecking/JHLSFX",
                path: "/DataChecking/JHLSFX",
                class:'JHLSFX',
                component: JHLSFX,
                icon: "history",
                name: "检核历史详情",
                meta: {
                    flag: true
                }
            },
            {
                key: "/DataChecking/Historical",
                path: "/DataChecking/Historical",
                class:'Historical',
                component: Historical,
                icon: "check-circle",
                name: "最新检查结果",
                meta: {
                    flag: true
                }
            }
        ]
    },
    {
        key: "/XTGLPage",
        path: "/XTGLPage",
        class:'XTGLPage',
        icon: "edit",
        name: "系统管理",
        component: XTGLPage,
        children: [
            {
                key: "/XTGLPage/ModifyData",
                path: "/XTGLPage/ModifyData",
                class:'ModifyData',
                component: ModifyData,
                icon: "form",
                name: "修改参数",
                meta: {
                    flag: true
                }
            },
            {
                key: "/XTGLPage/Administration",
                path: "/XTGLPage/Administration",
                class:'Administration',
                component: Administration,
                icon: "setting",
                name: "用户管理",
                meta: {
                    flag: true
                }
            },
            {
                key: "/XTGLPage/Role",
                path: "/XTGLPage/Role",
                class:'Role',
                component: Role,
                icon: "smile",
                name: "角色管理",
                meta: {
                    flag: true
                }
            },
            {
                key: "/XTGLPage/Privilege",
                path: "/XTGLPage/Privilege",
                class:'Privilege',
                icon: "copyright",
                name: "权限管理",
                component: Privilege
            },
            {
                key: "/XTGLPage/Home",
                path: "/XTGLPage/Home",
                class:'Home',
                icon: "unordered-list",
                name: "规则管理",
                component: Home
            },
            {
                key: "/XTGLPage/BankInformation",
                path: "/XTGLPage/BankInformation",
                class:'BankInformation',
                icon: "BankOutlined",
                name: "银行信息",
                component: BankInformation
            }
        ]
    },
    {
        key: "/SBAdministration",
        path: "/SBAdministration",
        class:'SBAdministration',
        component: SBAdministration,
        icon: "pie-chart",
        name: "上报管理",
        meta: {
            flag: true
        }
    },
    {
        key: "/ReportingTask",
        path: "/ReportingTask",
        class:'ReportingTask',
        component: ReportingTask,
        icon: "pie-chart",
        name: "任务管理",
        meta: {
            flag: true
        }
    },
]
window.menu = layoutRoute

export const EachWhole = PagesComponent.concat(layoutRoute)