import React from "react";
import { Table, Input, Button, Popconfirm, Form, Select } from 'antd';
const { Option } = Select;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
    state = {
        editing: false,
    };

    toggleEdit = () => {
        const editing = !this.state.editing;
        this.setState({ editing }, () => {
            if (editing) {
                this.input.focus();
            }
        });
    };

    save = e => {
        const { record, handleSave } = this.props;
        this.form.validateFields((error, values) => {
            if (error && error[e.currentTarget.id]) {
                return;
            }
            this.toggleEdit();
            handleSave({ ...record, ...values });
        });
    };

    renderCell = form => {
        this.form = form;
        const { children, dataIndex, record, title } = this.props;
        const { editing } = this.state;
        return editing ? (
            <Form.Item style={{ margin: 0 }}>
                {form.getFieldDecorator(dataIndex, {
                    rules: [
                        {
                            required: true,
                            message: `${title} is required.`,
                        },
                    ],
                    initialValue: record[dataIndex],
                })(<Input ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save} />)}
            </Form.Item>
        ) : (
                <div
                    className="editable-cell-value-wrap"
                    style={{ paddingRight: 24 }}
                    onClick={this.toggleEdit}
                >
                    {children}
                </div>
            );
    };

    render() {
        const {
            editable,
            dataIndex,
            title,
            record,
            index,
            handleSave,
            children,
            ...restProps
        } = this.props;
        return (
            <td {...restProps}>
                {editable ? (
                    <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
                ) : (
                        children
                    )}
            </td>
        );
    }
}

class NewlyAdded extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: '检核规则序号',
                dataIndex: 'ruleSeq',
                width: "100px",
                editable: true,
                onSelect: (changeableRowKeys) => {
                    console.log(changeableRowKeys)
                }
            },
            {
                title: '规则描述',
                dataIndex: 'ruleDesc',
                editable: true,
                width: '100px',
            },
            {
                title: '检核类型',
                dataIndex: 'ruleType',
                render: (text, record) => {
                    console.log(record, "8")
                    return <Select defaultValue="格式校验" style={{ width: 80 }} onChange={this.handleChange.bind(this, record.key)}>
                        <Option value="格式校验">格式校验</Option>
                        <Option value="关联交验">关联交验</Option>
                    </Select>
                }

            },
            {
                title: '检核重要性',
                dataIndex: 'ruleImp',
                render: (text, record) => {
                    return <Select defaultValue="关键" style={{ width: 80 }} onChange={this.handleChange.bind(this, record.key)}>
                        <Option value="关键">关键</Option>
                        <Option value="可选">可选</Option>
                        <Option value="一般">一般</Option>
                    </Select>
                }
            },
            {
                title: '检核表名（中文）',
                dataIndex: 'srcTabNameCn',
                render: (text, record) => {
                    return <Select defaultValue="机构信息表" style={{ width: 80 }} onChange={this.handleChange.bind(this, record.key)}>
                        <Option value="机构信息表">机构信息表</Option>
                        <Option value="员工表">员工表</Option>
                    </Select>
                }
            },
            {
                title: '检核表名（英文）',
                dataIndex: 'srcTabNameEn',
                render: (text, record) => {
                    return <Select defaultValue="GYB" style={{ width: 80 }} onChange={this.handleChange.bind(this, record.key)}>
                        <Option value="GYB">GYB</Option>
                        <Option value="YGB">YGB</Option>
                    </Select>
                }
            },
            {
                title: '数据项名称（中文）',
                dataIndex: 'dataFieldName',
                editable: true,
            },
            {
                title: '数据项名称（英文）',
                dataIndex: 'dataFieldCode',
                editable: true,
                width: '100px'
            },
            {
                title: '查询SQL',
                dataIndex: 'diySql',
                editable: true,
                text: 'buhao',
                width: '100px'
            },
            {
                title: '重要级别',
                dataIndex: 'level',
                editable: true,
                width: '100px'
            },
            {
                title: '规则标准类型',
                dataIndex: 'standardType',
                render: (text, record) => {
                    return <Select defaultValue="机构自有" style={{ width: 80 }} onChange={this.handleChange.bind(this, record.key)}>
                        <Option value="机构自有">机构自有</Option>
                        <Option value="同步">同步</Option>
                    </Select>
                }
            },

            {
                title: '删除表',
                dataIndex: 'operation',
                render: (text, record) =>
                    this.state.dataSource.length >= 1 ? (
                        <Popconfirm title="删除当前?" onConfirm={() => this.handleDelete(record.key)}>
                            <a>Delete</a>
                        </Popconfirm>
                    ) : null,
            }
        ];

        this.state = {
            dataSource: [
                {
                    key: '0',
                    ruleSeq: '请输入序号',
                    ruleDesc: '请输入描述',
                    ruleType: ' ',
                    ruleImp: ' ',
                    srcTabNameCn: '机构信息表',
                    dataFieldName: 'cn',
                    dataFieldCode: "en",
                    diySql: 'SQL',
                    level: 1,
                    gzVersion: 'banben',
                    status: ""
                }
            ],
            count: 2,
        };
    }

    handleDelete = key => {
        const dataSource = [...this.state.dataSource];
        this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
    };
    handleChange(value) {
        let index = arguments[0]
        let context = arguments[1]

        // eslint-disable-next-line default-case
        switch (context) {
            case "格式校验" || "关联交验":
                let contextList = this.state.dataSource
                contextList[index].ruleType = context;
                this.setState({
                    dataSource: contextList
                })
                break;
            case "关键" || "可选" || "一般":
                console.log(context)
                let contextDelete = this.state.dataSource
                contextDelete[index].ruleImp = context;
                this.setState({
                    dataSource: contextDelete
                }, () => {
                    console.log(this.state.dataSource[1], "xiugai")
                })
                break;
            case "机构信息表" || "员工表":
                let contextxin = this.state.dataSource
                contextxin[index].srcTabNameCn = context;
                this.setState({
                    dataSource: contextxin
                })
                break;
            case "GYB" || "YGB":
                let contextEn = this.state.dataSource
                contextEn[index].srcTabNameEn = context;
                this.setState({
                    dataSource: contextEn
                })
                break;
            case "机构自有":
                let contextMy = this.state.dataSource
                contextMy[index].standardType = context;
                this.setState({
                    dataSource: contextMy
                })
                break;
            case "生效" || "过期":
                let contextStatus = this.state.dataSource
                contextStatus[index].status = context;
                this.setState({
                    dataSource: contextStatus
                })
                break;
        }
    }

    handleAdd = () => {
        const { count, dataSource } = this.state;
        const newData = {
            key: count,
            ruleSeq: '请输入序号',
            ruleDesc: '请输入描述',
            ruleType: ' ',
            ruleImp: ' ',
            srcTabNameCn: '',
            dataFieldName: 'cn',
            dataFieldCode: "en",
            diySql: 'SQL',
            level: 1,
            gzVersion: 'banben'
        };
        this.setState({
            dataSource: [...dataSource, newData],
            count: count + 1,
        });
    };

    handleSave = row => {
        const newData = [...this.state.dataSource];
        const index = newData.findIndex(item => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        this.setState({ dataSource: newData });
    };

    render() {
        const { dataSource } = this.state;
        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        };
        const columns = this.columns.map(col => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.handleSave,
                }),
            };
        });
        return (
            <div>
                <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
                    Add a row
        </Button>
                <Button onClick={this.AddClickList.bind(this)} type="primary" style={{ marginBottom: 16 }}>
                    提交
        </Button>
                <Table
                    components={components}
                    rowClassName={() => 'editable-row'}
                    bordered
                    dataSource={dataSource}
                    columns={columns}
                />
            </div>
        );
    }
    AddClickList() {
        console.log(this.state.dataSource, "999")
    }
}



export default NewlyAdded