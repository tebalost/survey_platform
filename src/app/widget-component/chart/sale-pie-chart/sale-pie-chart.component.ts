import {Component, OnInit} from '@angular/core';
import {MhealthApiService} from '../../../service/api-service/mhealth-api.service';

@Component({
    selector: 'ms-sale-pie-chart',
    templateUrl: './sale-pie-chart.component.html',
    styleUrls: ['./sale-pie-chart.component.scss']
})
export class SalePieChartComponent implements OnInit {

    dashboardPieChart: any;

    pieChartOptions: any;

    roleCode: string;
    authorityCode: string;

    constructor(private mHealthApiService: MhealthApiService) {
    }

    ngOnInit() {
        this.authorityCode = localStorage.getItem('USER_AUTHORITY_CODE');
        this.roleCode = localStorage.getItem('USER_ROLE');

        this.pieChartOptions = {
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
                bottom: 10,
                left: 'center',
                x: 'center',
                y: 'bottom'
            },
            series: [
                {
                    type: 'pie',
                    radius: '75%',
                    center: ['50%', '50%'],
                    selectedMode: 'single',
                    itemStyle: {
                        normal: {
                            label: {
                                show: false
                            },
                            labelLine: {
                                show: false
                            }
                        }
                    },
                    data: [
                        {
                            label: {
                                normal: {
                                    backgroundColor: '#eee',
                                    borderColor: '',
                                    borderWidth: 1,
                                    borderRadius: 4
                                }
                            }
                        },
                        // FIXME get the values from the json file
                        // FIXME get the values from the service
                        {value: 535, name: 'Cancer', itemStyle: {color: '#67b7dc'}},
                        {value: 510, name: 'Silicosis', itemStyle: {color: '#8067dc'}},
                        {value: 634, name: '', itemStyle: {color: '#6771dc'}},
                        {value: 735, name: 'Depression', itemStyle: {color: '#6794dc'}}
                    ]
                }
            ]
        };

        this.mHealthApiService.getdashboardPieChatApi(this.authorityCode, this.roleCode)
            .subscribe(res => {
                    this.dashboardPieChart = res

                    for (let i = 0; i < this.dashboardPieChart.length; i++) {
                        this.pieChartOptions.series[0].data[i + 1].name = this.dashboardPieChart[i].name;
                        this.pieChartOptions.series[0].data[i + 1].value = this.dashboardPieChart[i].total;
                        console.log('The Pie Chart data    ' + JSON.stringify(this.pieChartOptions.series[0].data[i + 1]));
                    }
                },
                err => console.log(err),
                () => this.dashboardPieChart
            );
    }

}
