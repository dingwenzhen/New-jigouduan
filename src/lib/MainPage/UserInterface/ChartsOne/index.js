import React, { Fragment } from "react";
import G2 from '@antv/g2'
import { CHARTSLISTVALUE } from "@api/UserInterface"
class ChartsOne extends React.Component {
    constructor() {
        super()
        this.state = {
        }
    }
    render() {
        return (
            <Fragment>
                <div id="ChartsOne"></div>
            </Fragment>
        )
    }
    async componentDidMount() {
        let parsetint;
        let Array = []
        let ArrayId = []
        let data = await CHARTSLISTVALUE()
        console.log(data, 'data')
        if (!data.data || data.msg == '失败' || !data.data[0].checkTimesSFSJBLNumbers[0]) {
            for (var i = 10; i > 0; i--) {
                let obj = {}
                obj.year = `数据暂无  ${i}`
                obj.num = 1
                Array.push(obj)
            }
            parsetint = 1
        } else {
            let ChartsListValue = data.data[0].checkTimesSFSJBLNumbers
            console.log(ChartsListValue, 'ChartsListValue')
            for (var i = ChartsListValue.length - 1; i >= 0; i--) {
                let obj = {}
                if (i < ChartsListValue.length - 1) {
                    obj.year = ChartsListValue[i].RULE_SEQ
                } else if (i == ChartsListValue.length - 1) {
                    obj.year = ChartsListValue[i].RULE_SEQ
                }
                obj.num = ChartsListValue[i].SFSJ
                ArrayId.push(ChartsListValue[i].SFSJ)
                Array.push(obj)
            }
            ArrayId = ArrayId.sort(function (a, b) {
                return b - a
            })
            parsetint = Math.ceil(ArrayId[0] / 5)
        }
        const chart = new G2.Chart({
            container: 'ChartsOne',
            forceFit: true,
            padding: [20, 55, 50, 110]
        });
        chart.source(Array);
        chart.axis('year', {
            label: {
                textStyle: {
                    fill: '#8d8d8d',
                    fontSize: 14
                }
            },
            tickLine: {
                alignWithLabel: false,
                length: 0
            },
            line: {
                lineWidth: 0
            }
        });
        chart.legend(false);
        chart.scale('num', {
            alias: 'TOP 10'
          });
        chart.coord().transpose();
        chart.interval().position('year*num').size(26).opacity(1).color('#1D99FF');
        chart.render();
    }
}
export default ChartsOne