import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {CoreService} from '../../service/core/core.service';
import {PageTitleService} from '../../core/page-title/page-title.service';
import {ActivatedRoute} from '@angular/router';
import {MhealthApiService} from '../../service/api-service/mhealth-api.service';
import {DataTableDirective} from 'angular-datatables';
import {TranslateService} from '@ngx-translate/core';
import { PageEvent } from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {AllAuthorityParticipantReport} from '../../reports/all-authority-participant-report';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'ms-detailed-survey',
    templateUrl: './detailed-survey.component.html',
    styleUrls: ['./detailed-survey.component.scss']
})
export class DetailedSurveyReportComponent implements OnInit {

    displayColumns = ['authorityCode', 'msisdn', 'network', 'type', 'typeQuestion', 'typeAnswer', 'status', 'answerDate', 'answerTime'];
    dataSource: MatTableDataSource<AllAuthorityParticipantReport>;
 

    @ViewChild(DataTableDirective, {static: false})
    datatableElement: DataTableDirective;
    dtOptions: DataTables.Settings = {};
    data: any = [];
    detailedReport: any;
    private type: any;
    private msisdn: any;
    private authority: any;
    private roleCode: string;
    private totalItems: any;
    private totalRecords: any;
    cols: any[];
    loading: boolean;
    private initPageIndex = '0';
    private initPageSize = '10';

    constructor(public translate: TranslateService,
                private coreService: CoreService,
                private route: ActivatedRoute,
                private mHealthApiService: MhealthApiService,
                private pageTitleService: PageTitleService) {

                    this.type = this.route.snapshot.params.type;
                    this.msisdn = this.route.snapshot.params.msisdn;
                    this.authority = localStorage.getItem('USER_AUTHORITY_CODE');
                    this.roleCode = localStorage.getItem('USER_ROLE')
                    this.totalRecords = localStorage.getItem('COUNT');
            
                    if (!this.type) {
                        this.type = localStorage.getItem('CLICKED_TYPE');
                        localStorage.removeItem('CLICKED_TYPE');
                    }

        this.setServiceData(this.authority, this.roleCode, this.initPageIndex, this.initPageSize);

        setTimeout(() => {
            this.dataSource = new MatTableDataSource(this.data);
        }, 20);
    }

    ngOnInit(): void {
        setTimeout(() => {
            this.pageTitleService.setTitle('Detailed Survey Report');
        }, 0);
    }

    getDetailedList(res) {
        this.getDetailedList = res;
        setTimeout(() => {
            this.data = this.getDetailedList;
        }, 0)
    }

    nextPage(event: PageEvent) {
        this.setServiceData(this.authority,
            this.roleCode, event.pageIndex.toString(), event.pageSize.toString());
    }

    setServiceData(authority: string, roleCode: string, pageIndex: string, pageSize: string) {
        this.mHealthApiService.allAuthoritySurveyParticipantReport(authority, roleCode, pageIndex, pageSize)
            .subscribe(res => {
                    this.detailedReport = res
                },
                err => console.log(err),
                () => {
                    this.data = this.detailedReport;
                    // this.getDetailedList(this.detailedReport)
                    this.dataSource = new MatTableDataSource(this.detailedReport);
                    // console.log('data  detailedReport -> ' + JSON.stringify(this.detailedReport));
                    // console.log('data  this.data -> ' + JSON.stringify(this.data));
                }
            );
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim();
        filterValue = filterValue.toLowerCase();
        this.dataSource.filter = filterValue;
    }

}
