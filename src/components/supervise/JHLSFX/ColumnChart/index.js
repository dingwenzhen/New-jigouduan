import React, { Fragment } from "react";
import G2 from '@antv/g2'
class ColumnChart extends React.Component {
  constructor() {
    super()
    this.state = {
      data: [{
        ruleSeq: '巴西',
        sfsjzl: 18203
      }, {
        ruleSeq: '印尼',
        sfsjzl: 23489
      }, {
        ruleSeq: '美国',
        sfsjzl: 29034
      }, {
        ruleSeq: '印度',
        sfsjzl: 104970
      }, {
        ruleSeq: 'eluosi',
        sfsjzl: 131744
      }, {
        ruleSeq: 'riben',
        sfsjzl: 131744
      }, {
        ruleSeq: 'yingguo',
        sfsjzl: 131744
      }]
    }
  }
  render() {
    return (
      <Fragment>
        <div id="mountNodecolumn"></div>
      </Fragment>
    )
  }
  componentDidMount() {
    var chart = new G2.Chart({
      container: 'mountNodecolumn',
      forceFit: true,
      
    });
    chart.source(this.state.data);

    chart.interval().position('ruleSeq*sfsjzl').color('type')
      .adjust([{
        type: 'dodge',
        marginRatio: 1 / 32
      }])
      .label('sfsjzl', function (val) {//这里的value代表的就是展示的数据
        let offset = -4;
        let shadowBlur = 2;
        let textAlign = 'start';
        let fill = 'white';
        offset = 4;
        textAlign = 'start'
        fill = '#666666';
        shadowBlur = 0;

        return {
          offset,
          textStyle: {
            shadowColor: 'rgba(0, 0, 0, .45)',
          }
        };
      });

    chart.coord().transpose();
    chart.interval().position('ruleSeq*sfsjzl');
    chart.render();
  }
}

export default ColumnChart