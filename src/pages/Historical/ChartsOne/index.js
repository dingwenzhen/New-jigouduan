import React, { Fragment } from "react"
import G2 from '@antv/g2'
import connect from "./connect"
import insertCss from 'insert-css';
import { DJCKJG } from "@api/CheckingUp"
@connect
class ChartsOne extends React.Component {
  constructor() {
    super()
    this.state = {

    }
  }
  render() {
    return (
      <Fragment>
       
        <div id="LSChartsOne"></div>
      </Fragment>
    )
  }
  async componentDidMount() {
    let data = await DJCKJG()
    let FromList = []
    let FromValue = data.data.jhjglsList[0].leftHashMaps
    console.log(FromValue, 'diyigetu ')
    if (!data.data || data.data.jhjglsList[0].leftHashMaps.length == 0) {
      for (var i = 0; i < 10; i++) {
        let obj = {}
        obj.type = '数据暂无' + i
        obj.value = 1
        obj.actual = 10
        FromList.push(obj)
      }
    } else {
      for (var i = 0; i < FromValue.length; i++) {
        let obj = {}
        obj.type = FromValue[i].RULE_SEQ
        obj.value = FromValue[i].SFSJBL
        obj.num = (FromValue[i].SFSJBL * 100) + "%"
        obj.actual = 10
        FromList.push(obj)
      }
    }
    this.ChartsHandler(FromList)
  }
  ChartsHandler(Data) {
    let _this = this
    const chart = new G2.Chart({
      container: 'LSChartsOne',
      forceFit: true,
      height: 500,
      padding: [20, 60, 50, 100]
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
    console.log(this)
    this.props.TableChartsOne(e.data.point)
    console.log(e.data.point)
  }
}
export default ChartsOne