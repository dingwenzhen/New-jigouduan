import React from "react"
import { Menu, Icon } from 'antd';
const { SubMenu } = Menu;

export default (routes, sidebar) => {
    let eachTabBar = (val,route) => {
        return <SubMenu
            key={route.key}
            title={
                <span className={val.class}>
                    <Icon type={val.icon} />
                    <span id={val.name}>{val.name}</span>
                </span>
            }
        >
            {
                route.children.map((child) => {
                    for (var i = 0; i < sidebar.length; i++) {
                        if (child.path == sidebar[i].url) {
                            return <Menu.Item key={sidebar[i].url} className={sidebar[i].class}
                            >
                                <Icon type={sidebar[i].icon} />
                                <span className="nav-text" id={child.name}>{sidebar[i].name}</span>
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
                if (route.path == sidebar[i].url) {
                    return eachTabBar(sidebar[i],route)
                }
            }
           
        } else {
            for (var i = 0; i < sidebar.length; i++) {
                if (route.path == sidebar[i].url) {
                    return <Menu.Item key={sidebar[i].url} className={sidebar[i].class}>
                        <Icon type={sidebar[i].icon} />
                        <span id={route.name} className="nav-text">{sidebar[i].name}</span>
                    </Menu.Item>
                }
            }

        }
    })
}
