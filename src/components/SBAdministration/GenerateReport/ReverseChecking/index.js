import React, { Fragment } from "react"
import { Pagination, Button, Input } from 'antd';
// import XLSX from "xlsx"
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
            data: [],
            currPage: 1,
            totalCount: 100,
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
                                                return <td style={{ margin: '10px 0 10px 0', display: 'block' }} key={idx}>{item[itm]}</td>
                                            } else {
                                                return <td style={{ margin: '10px 0 10px 0' }} key={idx}>{item[itm]}</td>
                                            }

                                        })

                                    }
                                </tr>
                            })
                        }
                    </table>
                    <div style={{ marginTop: '10px' }}>
                        <Pagination showQuickJumper
                            defaultCurrent={this.state.currPage} total={this.state.totalCount}
                            onChange={this.onChange.bind(this)} />
                    </div>
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

        let Array = this.state.data
        for (let i = 0; i < 100; i++) {
            Array.push({
                key: i,
                name: `Edward King ${i}`,
                age: 32,
                address: `London, Park Lane no. ${i}`,
            });
        }
        // this.props.val[0].td.length
        let tddata = this.props.val[0].td
        let TD = []
        for( var i = 0 ; i<tddata.length ; i++ ){
            if(0<=i && i<10){
                TD.push(tddata[i])
            }
        }
        let totalCount = 20
        this.setState({
            data: Array,
            thdata: this.props.val[0].th,
            tddata: TD,
            topdata: this.props.val[0].topdate,
            totalCount:totalCount
        }, () => {
            console.log(this.state.tddata, "tddata")
        })
    }
    // 分页
    onChange(pageNumber) {
        console.log(pageNumber)
        let TDData = this.props.val[0].td
        let Max =  pageNumber*10

        
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
    // // 导出表格
    // async ExportExcel(e) {
    //     // 获取本地时间
    //     const d = new Date()
    //     const resDate = d.getFullYear() + '-' + this.p((d.getMonth() + 1)) + '-' + this.p(d.getDate())
    //     let Array = resDate.split("-")
    //     console.log(Array)
    //     let str = ""
    //     for(var i = 0 ; i<Array.length ; i++ ){
    //         str+=Array[i]
    //     }
    //     console.log(str)
    //     // let TimeLC = await ExcelDownload(str)
    //     // console.log(TimeLC)

    //     // 表格的处理
    //     let ArrayTH = []
    //     for (var i = 0; i < this.state.thdata.length; i++) {
    //         ArrayTH.push(this.state.thdata[i].fieldNameEn)
    //     }
    //     // const entozh = {
    //     //     "name": "姓名",
    //     //     "age": "年龄",
    //     //     "address": "地址"
    //     // }
    //     let entozh={}
    //     for(var i = 0 ; i<this.state.thdata.length ; i++){
    //         entozh[this.state.thdata[i].fieldNameEn]=this.state.thdata[i].fieldNameEn
    //     }
    //     console.log(entozh,"entozh")
    //     const nowdata = this.state.tddata;
    //     const json = nowdata.map((item) => {
    //         return Object.keys(item).reduce((newData, key) => {
    //             const newKey = entozh[key] || key
    //             newData[newKey] = item[key]
    //             return newData
    //         }, {})
    //     });
    //     const sheet = XLSX.utils.json_to_sheet(json);
    //     this.openDownloadDialog(this.sheet2blob(sheet, undefined), `全部信息.xlsx`);
    // }
    // openDownloadDialog = (url, saveName) => {
    //     if (typeof url == 'object' && url instanceof Blob) {
    //         url = URL.createObjectURL(url); // 创建blob地址
    //     }
    //     var aLink = document.createElement('a');
    //     aLink.href = url;
    //     aLink.download = saveName || ''; // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
    //     var event;
    //     if (window.MouseEvent) event = new MouseEvent('click');
    //     else {
    //         event = document.createEvent('MouseEvents');
    //         event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    //     }
    //     aLink.dispatchEvent(event);
    // }
    // sheet2blob = (sheet, sheetName) => {
    //     sheetName = sheetName || 'sheet1';
    //     var workbook = {
    //         SheetNames: [sheetName],
    //         Sheets: {}
    //     };
    //     workbook.Sheets[sheetName] = sheet; // 生成excel的配置项

    //     var wopts = {
    //         bookType: 'xlsx', // 要生成的文件类型
    //         bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
    //         type: 'binary'
    //     };
    //     var wbout = XLSX.write(workbook, wopts);
    //     var blob = new Blob([s2ab(wbout)], {
    //         type: "application/octet-stream"
    //     }); // 字符串转ArrayBuffer
    //     function s2ab(s) {
    //         var buf = new ArrayBuffer(s.length);
    //         var view = new Uint8Array(buf);
    //         for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
    //         return buf;
    //     }

    //     return blob;
    // }
}
export default ReverseChecking