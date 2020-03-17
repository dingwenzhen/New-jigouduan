import React,{Fragment} from "react";
import G2 from '@antv/g2'
class ColumnChart extends React.Component{
    constructor(){
        super()
        this.state={
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
    render(){
        return(
            <Fragment>
                <div id="mountNodecolumn"></div>
            </Fragment>
        )
    }
    componentDidMount(){
        var chart = new G2.Chart({
            container: 'mountNodecolumn',
            forceFit: true,
            height: window.innerHeight
          });
          chart.source(this.state.data);
          chart.axis('ruleSeq', {
            label: {
              offset: 10
            }
          });
          chart.coord().transpose();
          chart.interval().position('ruleSeq*sfsjzl');
          chart.render();
    }
}

export default ColumnChart