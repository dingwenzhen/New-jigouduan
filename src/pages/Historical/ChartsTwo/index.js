import React, { Fragment } from "react";
import G2 from '@antv/g2'
import insertCss from 'insert-css';
import connect from "./connect"
import {  DJCKJG } from "@api/CheckingUp"
@connect
class ChartsTwo extends React.Component {
  constructor() {
    super()
    this.state = {

    }
  }
  render() {
    return (
      <Fragment>
        <div id="LSChartsTwo"></div>
      </Fragment>
    )
  }
  async componentDidMount() {
    let data = await DJCKJG()
    let FromList = []
    let FromValue = data.data.jhjglsList[0].rightHashMaps
    if (!data.data || data.data.jhjglsList[0].rightHashMaps.length==0 ) {
      for (var i = 0; i < 10; i++) {
        let obj = {}
        obj.type = '数据暂无' + (i+1)
        obj.value = 1
        FromList.push(obj)
      }
      FromList = FromList.sort(function(a,b){
        return a-b
      })
    } else {
      for (var i = 0; i < FromValue.length; i++) {
          let obj = {}
          obj.type = FromValue[i].RULE_SEQ
          obj.value = FromValue[i].sfsjbl
          obj.num = (FromValue[i].sfsjbl*100)+"%"
          FromList.push(obj)
      }
    }
    this.ChartsHandler(FromList)
  }
  ChartsHandler(Data) {
    let _this = this
    const chart = new G2.Chart({
      container: 'LSChartsTwo',
      forceFit: true,
      height: 500,
      padding: [20, 55, 50, 100]
    });
    chart.source(Data);
   
    chart.scale('value', {
      alias: '失范数据比例'
    });
    chart.axis('type', {
      tickLine: {
        alignWithLabel: false,
        length: 0
      }
    });
    chart.axis('value', {
      label: {
        formatter: val => {
          return String(parseFloat(val * 100)) + '%';
        }
      }
    });
    chart.legend(false);
    chart.coord().transpose();
    chart.interval().position('type*value').size(26).opacity(1).label('value', {
        formatter: text => {
          const val = parseFloat(text);
          return (val * 100).toFixed(1) + '%';
        },
        offset: 10
      });
    chart.render();
    // chart.on('dblclick', _this.ChartAddClick.bind(this))
  }
  ChartAddClick(e) {
    if (!e.data) return;
    this.props.TableChartsTwo(e.data.point)
    console.log(e.data.point)
  }
}
export default ChartsTwo