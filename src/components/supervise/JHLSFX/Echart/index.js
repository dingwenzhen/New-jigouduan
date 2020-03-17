import React, { Fragment } from "react";
import G2 from '@antv/g2'
class Echart extends React.Component {
  constructor() {
    super()
    this.state = {
      data: [{
        ruleSeq: '事例一',
        sfsjbl: 0.4
      }, {
        ruleSeq: '事例二',
        sfsjbl: 0.21
      }, {
        ruleSeq: '事例三',
        sfsjbl: 0.17
      }, {
        ruleSeq: '事例四',
        sfsjbl: 0.13
      }, {
        ruleSeq: '事例五',
        sfsjbl: 0.09
      }]
    }
  }
  render() {
    return (
      <Fragment>
        <div id="mountNodePie"></div>
      </Fragment>
    )
  }
  componentDidMount() {
    const chart = new G2.Chart({
      container: 'mountNodePie',
      forceFit: true,
    })
    chart.source(this.state.data, {
      sfsjbl: {
        formatter: function formatter(val) {
          val = val * 100 + '%';
          return val;
        }
      }
    })
    chart.coord('theta');
    chart.tooltip({
      showTitle: false
    });
    chart.intervalStack().position('sfsjbl').color('ruleSeq').label('sfsjbl', {
      offset: -40,
      // autoRotate: false,
      textStyle: {
        textAlign: 'center',
        shadowBlur: 2,
        shadowColor: 'rgba(0, 0, 0, .45)'
      }
    }).tooltip('ruleSeq*sfsjbl', function (ruleSeq, sfsjbl) {
      sfsjbl = sfsjbl * 100 + '%';
      return {
        name: ruleSeq,
        value: sfsjbl
      };
    }).style({
      lineWidth: 1,
      stroke: '#fff'
    })
    chart.render();
  }


}
export default Echart