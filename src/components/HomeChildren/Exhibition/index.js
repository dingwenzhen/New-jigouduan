import React, { Component } from "react"
import { Table, Divider, Tag } from 'antd'; 

class Exhibition extends Component {
    constructor(){
        super()
        this.state={
            data : [
                {
                  key: '1',
                  name: 'John Brown',
                  age: 32,
                  address: 'New York No. 1 Lake Park',
                  tags: ['nice', 'developer'],
                },
                {
                  key: '2',
                  name: 'Jim Green',
                  age: 42,
                  address: 'London No. 1 Lake Park',
                  tags: ['loser'],
                },
                {
                  key: '3',
                  name: 'Joe Black',
                  age: 32,
                  address: 'Sidney No. 1 Lake Park',
                  tags: ['cool', 'teacher'],
                }
              ],
              columns : [
                {
                  title: 'Name',
                  dataIndex: 'name',
                  key: 'name',
                  render: text => <a>{text}</a>,
                },
                {
                  title: 'Age',
                  dataIndex: 'age',
                  key: 'age',
                },
                {
                  title: 'Address',
                  dataIndex: 'address',
                  key: 'address',
                },
                {
                  title: 'Tags',
                  key: 'tags',
                  dataIndex: 'tags',
                  render: tags => (
                    <span>
                      {tags.map(tag => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';
                        if (tag === 'loser') {
                          color = 'volcano';
                        }
                        return (
                          <Tag color={color} key={tag} onClick={this.HandlerIndex.bind(this)}>
                            {tag.toUpperCase()}
                          </Tag>
                        );
                      })}
                    </span>
                  ),
                },
                {
                  title: 'Action',
                  key: 'action',
                  render: (text, record) => (
                    <span>
                      <a onClick={this.HandleValue.bind(this,text)}>编辑</a>
                      <Divider type="vertical" />
                      <a>删除</a>
                    </span>
                  ),
                },
              ]
        }
    }
    render() {
        return (
            <Table columns={this.state.columns} dataSource={this.state.data} />
        )
    }
    componentDidMount() {
        // let {page,pageSize,free,group,finish,sortId} = this.state;
        // let data = await booksListApi(page,pageSize,free,group,finish,sortId);

        // console.log(data.data.bookList);
    }
    HandlerIndex(){
        console.log(111)
    }
    HandleValue(text){
      console.log(text)
    }
}

export default Exhibition