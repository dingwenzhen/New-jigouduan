import React from "react"
import { Menu, Icon } from 'antd';
const { SubMenu } = Menu;

export default (routes, sidebar) => {
    let eachTabBar = (route) => {
        return <SubMenu
            key={route.key}
            title={
                <span className={route.class}>
                    <Icon type={route.icon} />
                    <span>{route.name}</span>
                </span>
            }
        >
            {
                route.children.map((child) => {
                    for (var i = 0; i < sidebar.length; i++) {
                        if (child.name == sidebar[i].name) {
                            return <Menu.Item key={child.key} className={child.class}
                            >
                                <Icon type={child.icon} />
                                <span className="nav-text">{child.name}</span>
                            </Menu.Item>
                        }
                    }

                })
            }

        </SubMenu>
    }

    return routes.map((route) => {
        if (route.children) {
            for (var i = 0; i < sidebar.length; i++) {
                if (route.name == sidebar[i].name) {
                    return eachTabBar(route)
                }
            }
           
        } else {
            for (var i = 0; i < sidebar.length; i++) {
                if (route.name == sidebar[i].name) {
                    return <Menu.Item key={route.key} className={route.class}>
                        <Icon type={route.icon} />
                        <span className="nav-text">{route.name}</span>
                    </Menu.Item>
                }
            }

        }
    })
}


