import React, { Fragment } from "react";
import { Table } from "antd"
const columns = [
  {
    title: '规则号',
    dataIndex: 'ruleSeq',
    align: 'center',
    width: '100px'
  },
  {
    title: '规则描述',
    dataIndex: 'ruleDesc',
    align: 'center',
    width: '120px'
  },
  {
    title: '中文表名',
    dataIndex: 'srcTabNameCn',
    align: 'center',
    width: '100px',
  },
  {
    title: '英文表名',
    dataIndex: 'srcTabNameEn',
    align: 'center',
    width: '110px'
  },
  {
    title: '字段',
    dataIndex: 'dataFieldCode',
    align: 'center',
    width: '100px'
  },
  {
    title: '失范总数',
    dataIndex: 'sfsjzl',
    defaultSortOrder: 'descend',
    align: 'center',
    width: '100px',
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: '失范比例',
    dataIndex: 'sfsjbl',
    defaultSortOrder: 'descend',
    align: 'center',
    width: '100px',
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: '检核人',
    dataIndex: 'jhr',
    align: 'center',
  },
  {
    title: '审核人',
    dataIndex: 'shr',
    align: 'center',
  },
  {
    title: '银行机构代码',
    dataIndex: 'yhjgdm',
    align: 'center',
  },
  {
    title: '银行机构名称',
    dataIndex: 'yhjgmc',
    align: 'center',
  },
  {
    title: '内部机构号',
    dataIndex: 'nbjgh',
    align: 'center',
  },
  {
    title: '金融许可证',
    dataIndex: 'jrxkzh',
    align: 'center',
  },
];
class FromTable extends React.Component {
  constructor() {
    super()
    this.state = {
      data: [
        {
          key: '1',
          ruleSeq:'规则号',
          ruleDesc:'规则描述',
          srcTabNameCn:'中文表名',
          srcTabNameEn:'英文表名',
          dataFieldCode:'字段',
          sfsjzl:'失范总数',
          sfsjbl:'失范比例',
          jhr:'检核人',
          shr:'审核人',
          yhjgdm:'银行机构代码',
          yhjgmc:'银行机构名称',
          nbjgh:'内部机构号',
          jrxkzh:'金融许可证号',
        }
      ]
    }
  }

  render() {
    return (
      <Fragment>
        <Table
          style={{ backgroundColor: '#fff' }}
          columns={columns}
          dataSource={this.state.data}
          onChange={this.onChange.bind(this)}
          scroll={{ x: 1300 }} />
      </Fragment>
    )
  }
  onChange(pagination, filters, sorter, extra) {
    console.log('params', pagination, filters, sorter, extra);
  }
}
export default FromTable