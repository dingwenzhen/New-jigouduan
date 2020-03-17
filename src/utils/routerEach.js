import React from "react"
import { Switch, Route, Redirect } from "react-router-dom";
import LayoutComponent from "@layout";
import Cookies from "js-cookie";
export default  (routes) => {
    let eachRoutes = (route) => {
        return <Route
            key={route.key}
            path={route.path}
            render={() => {
                return <Switch>
                    {
                        route.children.map((child) => {
                            if (child.children) {
                                return eachRoutes(child)
                            } else {
                                return <Route path={child.path} key={child.key} render={(props) => {
                                    if (Cookies.get("67ae207794a5fa18fff94e9b62668e5c") || child.path === "/Login") {
                                        return child.path === "/Login" ? <child.component {...props} /> : <LayoutComponent><child.component {...props} /></LayoutComponent>
                                    } else {
                                        return <Redirect to={{ pathname: "/Login" }} />
                                    }
                                }} />

                            }
                        })
                    }
                    })
                }
            </Switch>
            }}
        />
    }
    return routes.map((route) => {
        if (route.children) {
            return eachRoutes(route)
        } else {
            
            return <Route path={route.path} key={route.key} render={(props) => {
                // 这里需要进行修改，判断当时登录注册页面的时候，是单独的页面的
                if(route.path == "/Login" || route.path == "/Sign"){
                    return <route.component {...props} key={route.key} />
                }else if (Cookies.get("67ae207794a5fa18fff94e9b62668e5c") || route.path === "/Login") {
                    return route.path === "/Login" ? <route.component {...props} key={route.key} /> : <LayoutComponent key={route.key}><route.component {...props} /></LayoutComponent>
                } else {
                    return <Redirect to={{ pathname: "/Login" }} />
                }
            }} />

        }
    })
}