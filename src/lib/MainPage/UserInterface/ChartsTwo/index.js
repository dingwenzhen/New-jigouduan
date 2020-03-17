import React, { Fragment } from "react";
import G2 from '@antv/g2'
import { CHARTSLISTVALUE } from "@api/UserInterface"
class ChartsTwo extends React.Component {
    constructor() {
        super()
        this.state = {
            flag: '000'
        }
    }
    render() {
        return (
            <Fragment>
                <div id="ChartsTwo"></div>
            </Fragment>
        )
    }
    async componentDidMount() {
        let parsetint;
        let Array = []
        let ArrayId = []
        let data = await CHARTSLISTVALUE()
        if (!data.data || data.msg == '失败') {
            for (var i = 10; i > 0; i--) {
                let obj = {}
                obj.year = `数据暂无${i}`
                obj.num = 1
                Array.push(obj)
            }
            parsetint = 1
        } else {
            let ChartsListValue = data.data[0].checkTimesHistory
            console.log(data.data[0].checkTimesHistory)
            for (var i = data.data[0].checkTimesHistory.length - 1; i >= 0; i--) {
                let obj = {}
                if (i < data.data[0].checkTimesHistory.length - 1) {
                    obj.year = ChartsListValue[i].rule_seq
                } else if (i == data.data[0].checkTimesHistory.length - 1) {
                    obj.year = ChartsListValue[i].rule_seq
                }
                obj.num = ChartsListValue[i].sumSfsjzl
                ArrayId.push(ChartsListValue[i].sumSfsjzl)
                Array.push(obj)
            }
            ArrayId = ArrayId.sort(function (a, b) {
                return b - a
            })
            parsetint = Math.ceil(ArrayId[0] / 5)
        }


        const chart = new G2.Chart({
            container: 'ChartsTwo',
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
            alias: '失范数量'
        });
        chart.coord().transpose();
        chart.interval().position('year*num').size(26)
            .opacity(1).color('#20CC8B')
        chart.render();
    }
}
export default ChartsTwo