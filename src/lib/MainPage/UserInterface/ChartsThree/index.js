import React, { Fragment } from "react";
import G2 from '@antv/g2'
import { CHARTSLISTVALUE } from "@api/UserInterface"
class ChartsThree extends React.Component {
    constructor() {
        super()
        this.state = {
            data: [
                { year: '1991', value: 3 },
                { year: '1992', value: 4 },
                { year: '1993', value: 3.5 },
                { year: '1994', value: 5 },
                { year: '1995', value: 4.9 },
                { year: '1996', value: 6 },
                { year: '1997', value: 7 },
                { year: '1998', value: 9 },
                { year: '1999', value: 13 }
            ],
            parsetint: 2
        }
    }
    render() {
        return (
            <Fragment>
                <div id="ChartsThree"></div>
            </Fragment>
        )
    }
    async componentDidMount() {
        let ChartsValue = await CHARTSLISTVALUE()
        
        let Array = []
        let ArrayId = []
        if (ChartsValue.msg == '成功') {
            let ChartsList = ChartsValue.data[0].checkTimeLineChart
            for (var i = 0; i < ChartsList.length; i++) {
                let A = ChartsList[i].lineChart.split(':')
                let obj = {}
                obj.year = A[0]
                obj.value = Number(A[1])
                ArrayId.push(Number(A[1]))
                Array.push(obj)
            }
            ArrayId = ArrayId.sort(function (a, b) {
                return b - a
            })

            console.log(Array, 'three')
            let parsetint = Math.ceil(ArrayId[0] / 5)
        }else{
            for( var i = 0 ; i<6 ; i++ ){
                let obj = {}
                obj.year = '暂无数据'+i
                obj.value = i
                Array.push(obj)
            }
        }
        const chart = new G2.Chart({
            container: 'ChartsThree',
            forceFit: true,
            height: 500,
            padding:[50,50,60,50]
        });
        chart.source(Array);
        chart.scale('value', {
            min: 0
        });
        chart.scale('year', {
            range: [0, 1]
        });
        chart.axis('year', {
            label: {
                textStyle: {
                    fill: '#8d8d8d',
                    fontSize: 14
                }
            }
        });
        chart.tooltip({
            crosshairs: {
                type: 'line'
            }
        });
        chart.line().position('year*value');
        chart.point().position('year*value')
            .size(4)
            .shape('circle')
            .style({
                stroke: '#fff',
                lineWidth: 1
            });
        chart.render();
    }
    async HandlerChartsValue() {


    }
}
export default ChartsThree