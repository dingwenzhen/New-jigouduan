import React, { Fragment } from 'react'
import { Select, Tree, Modal, Button } from 'antd';

const { DirectoryTree } = Tree
const { Option, OptGroup } = Select
class menuList extends React.Component {
    constructor() {
        super()
        this.state = {
            SelectList: [],
            visible: false,
            MenuName: '',
            Url: '',
            treeData: [],
            SuperiorMenu: ''
        }
    }
    render() {

        return (
            <Fragment>
                <div>
                    <span style={{ display: 'inline-block', height: '32px', lineHeight: '32px' }}>菜单名称：</span>
                    <div style={{
                        display: 'inline-block', backgroundColor: '#f5f5f5', cursor: 'pointer',
                        height: '32px', border: '1px solid #d9d9d9', lineHeight: '32px', borderRadius: '4px',
                        width: '300px', paddingLeft: '10px', marginLeft: '20px'
                    }} onClick={this.menuBoolClick.bind(this)}
                    >{this.state.MenuName}</div>
                </div>
                <div style={{ marginTop: '20px' }}>
                    <span style={{ display: 'inline-block', height: '32px', lineHeight: '32px' }}>菜单路径：</span>
                    <div style={{
                        display: 'inline-block', backgroundColor: '#f5f5f5', cursor: 'pointer',
                        height: '32px', border: '1px solid #d9d9d9', lineHeight: '32px', borderRadius: '4px',
                        width: '300px', paddingLeft: '10px', marginLeft: '20px'
                    }}
                    >{this.state.Url}</div>
                </div>
                <div style={{ marginTop: '20px' }}>
                    <span style={{ display: 'inline-block', height: '32px', lineHeight: '32px' }}>上级菜单：</span>
                    <div style={{
                        display: 'inline-block', backgroundColor: '#f5f5f5', cursor: 'pointer',
                        height: '32px', border: '1px solid #d9d9d9', lineHeight: '32px', borderRadius: '4px',
                        width: '300px', paddingLeft: '10px', marginLeft: '20px'
                    }} onClick={this.SuperiorMenuClick.bind(this)}
                    >{this.state.SuperiorMenu}</div>
                </div>
                <div style={{ marginTop: '20px' }}>
                    <Button type='primary' onClick={this.DetermineClick.bind(this)} >确定</Button>
                    <Button style={{ marginLeft: '20px' }}>取消</Button>
                </div>
                <Modal
                    title="菜单列表"
                    visible={this.state.visible}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                >
                    <DirectoryTree
                        multiple
                        defaultExpandAll
                        onSelect={this.onSelect.bind(this)}
                        onExpand={this.onExpand.bind(this)}
                        treeData={this.state.treeData}
                    />
                </Modal>
                <Modal
                    title="菜单列表"
                    visible={this.state.SuperiorMenuBool}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                >
                    <DirectoryTree
                        multiple
                        defaultExpandAll
                        onSelect={this.SuperiorMenuonSelect.bind(this)}
                        onExpand={this.onExpand.bind(this)}
                        treeData={this.state.treeData}
                    />
                </Modal>
            </Fragment>
        )
    }
    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
            SuperiorMenuBool: false
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
            SuperiorMenuBool: false
        });
    };
    componentDidMount() {
        console.log(window.menu)
        let menuList = window.menu
        let List = []
        for (var i = 0; i < menuList.length; i++) {
            if (menuList[i].children) {
                let MuenList = this.ChildrenList(menuList[i])
                List.push(MuenList)
            } else {
                let obj = {}
                obj.title = menuList[i].name
                obj.key = menuList[i].path
                obj.isLeaf = true
                obj.url = menuList[i].path
                List.push(obj)
            }
        }
        this.setState({
            treeData: List
        })
    }
    ChildrenList(val) {
        let obj = {}
        obj.title = val.name
        obj.key = val.path
        obj.url = val.path
        obj.children = []
        for (var i = 0; i < val.children.length; i++) {
            if (val.children.children) {
                this.ChildrenList(val.children[i])
            } else {
                let arr = {}
                arr.title = val.children[i].name
                arr.key = val.children[i].path
                arr.isLeaf = true
                arr.url = val.children[i].path
                obj.children.push(arr)
            }
        }
        return obj
    }
    // 上级菜单
    SuperiorMenuClick() {
        this.setState({
            SuperiorMenuBool: true
        })
    }
    // 点击菜单列表
    SuperiorMenuonSelect(selectedKeys, e) {
        this.setState({
            SuperiorMenuBool: false,
            SuperiorMenu: e.node.props.title,
        })
    }
    // 点击 获取树桩
    menuBoolClick() {
        this.setState({
            visible: true
        })
    }
    onSelect = (selectedKeys, e) => {
        console.log('Trigger Select', selectedKeys, e.node.props);
        this.setState({
            visible: false,
            MenuName: e.node.props.title,
            Url: e.node.props.url
        })
    }

    onExpand = () => {
        console.log('Trigger Expand');
    }
    // 确定
    DetermineClick() {
        let obj = {}
        obj.MenuName = this.state.MenuName
        obj.Url = this.state.Url
        obj.SuperiorMenu = this.state.SuperiorMenu
        console.log(obj)
    }
}
export default menuList