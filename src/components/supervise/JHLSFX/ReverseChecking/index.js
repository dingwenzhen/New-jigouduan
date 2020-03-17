import React, { Fragment } from "react"
import { Pagination, Button, Input } from 'antd';
import XLSX from "xlsx"
import {ExcelDownload} from "@api"
class ReverseChecking extends React.Component {
    constructor() {
        super()
        this.state = {
            columns: [
                {
                    title: 'Name',
                    dataIndex: 'name',
                    width: 150,
                },
                {
                    title: 'Age',
                    dataIndex: 'age',
                    width: 150,
                },
                {
                    title: 'Address',
                    dataIndex: 'address',
                }
            ],
            selectedRowKeys: [],
            thdata: [],
            tddata: [],
            topdata: {}
        }
    }


    onSelectChange = selectedRowKeys => {
        console.log('点击前面的选框 ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };

    render() {
        const { selectedRowKeys, topdata, tddata } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        return (
            <Fragment>
                <div className="SuperviseTable">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <span>表名：{topdata.srcTabNameEn}</span>
                        <span>规则描述：{topdata.ruleDesc}</span>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span>导出数量(行)</span>
                            <Input type="text" style={{ marginRight: '10px' }} defaultValue={tddata.length} />
                            <Button type="primary" onClick={this.ExportExcel.bind(this)}>导出</Button>
                        </div>
                    </div>
                    <table width="100%" style={{ fontSize: "12px" }}>
                        <tr style={{ backgroundColor: "#f4f4f4", borderBottom: "1px solid #e8e8e8", textAlign: 'center' }}>
                            {
                                this.state.thdata.map(item => {
                                    return <th key={item.id} style={{
                                        padding: "5px 0 5px 10px", borderBottom: "1px solid #e8e8e8"
                                    }}>{item.fieldNameEn}</th>

                                })
                            }
                        </tr>
                        {
                            this.state.tddata.map((item, index) => {
                                let ArrayTH = []
                                for (var i = 0; i < this.state.thdata.length; i++) {
                                    ArrayTH.push(this.state.thdata[i].fieldNameEn)
                                }
                                return <tr style={{ borderBottom: "1px solid #e8e8e8", textAlign: 'center' }} key={index}>
                                    {
                                        ArrayTH.map((itm, idx) => {
                                            if (idx == 0) {
                                                return <td style={{ margin: '10px 0 10px 0', display: 'block' }}>{item[itm]}</td>
                                            } else {
                                                return <td style={{ margin: '10px 0 10px 0' }}>{item[itm]}</td>
                                            }

                                        })

                                    }
                                </tr>
                            })
                        }
                    </table>
                   
                    <div>
                        <Button type="primary" style={{ marginTop: '10px' }}

                            onClick={() => this.CloseClick(this.state.tddata, '表单')}>关闭</Button>
                    </div>

                </div>
            </Fragment >
        )
    }
    componentDidMount() {
        console.log(this.props.val, "弹窗")
        this.setState({
            // data: Array,
            thdata: this.props.val[0].th,
            tddata: this.props.val[0].td,
            topdata: this.props.val[0].topdate
        }, () => {
            console.log(this.state.tddata, "tddata")
        })
    }
    // 分页
    onChange(pageNumber) {
        console.log(pageNumber)
        // let data = await pagingListApi(pageNumber)
        // console.log(data)
        // this.setState({
        //     data: data.data.list,
        //     currPage: data.data.currPage
        // })
    }
    // 关闭按钮
    CloseClick() {
        this.props.CloseClick()
        
    }
    p(s) {
        return s < 10 ? '0' + s : s
    }
    // 导出表格
    ExportExcel(e) {
        
    }
    
}
export default ReverseChecking