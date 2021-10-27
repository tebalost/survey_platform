import {Component, OnInit, ViewChild} from '@angular/core';
import {CoreService} from '../../service/core/core.service';
import {PageTitleService} from '../../core/page-title/page-title.service';
import {ActivatedRoute} from '@angular/router';
import {MhealthApiService} from '../../service/api-service/mhealth-api.service';
import {DataTableDirective} from 'angular-datatables';
import {TranslateService} from '@ngx-translate/core';
// @ts-ignore
import {PageEvent, MatPaginator} from '@angular/material';
import {AllAuthorityParticipantReport} from '../../reports/all-authority-participant-report';
import {MatTableDataSource} from '@angular/material/table';


@Component({
    // tslint:disable-next-line:component-selector
    selector: 'ms-detailed-adherence',
    templateUrl: './detailed-adherence.component.html',
    styleUrls: ['./detailed-adherence.component.scss']
})
export class DetailedAdherenceReportComponent implements OnInit {
    // tslint:disable-next-line:max-line-length
    displayColumns = ['authorityCode', 'msisdn', 'network', 'type', 'typeQuestion', 'typeAnswer', 'status', 'answerDate', 'answerTime'];
    dataSource: MatTableDataSource<AllAuthorityParticipantReport>;
    // data: AllAuthorityParticipantReport[];
    detailedReport: any;
    data: any = [];

    private type: any;
    private msisdn: any;
    private authority: any;

    private roleCode: string;
    private totalRecords: any;
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

        // tslint:disable-next-line:max-line-length
        // this.data =  [{'authorityCode': '', 'msisdn': '27743044603', 'status': 'ERROR', 'type': 'ADHERENCE', 'typeId': 'wewrqw-qe32eqwewq-qweqewqe', 'typeQuestion': 'Hello XHEGU  NYENGANE! Did you feel motivated to comply with TB treatment from 08/17/2021 - 08/10/2021? Please answer with 1 or 2. 1 - NO, 2 - YES.', 'typeQuestionId': 'wewrqw-qe32eqwewq-qeeere', 'typeAnswer': null, 'typeAnswerId': '', 'answerDate': '2021-08-23', 'answerTime': '23:05:14'}, {'authorityCode': '', 'msisdn': '27619629808', 'status': 'ERROR', 'type': 'ADHERENCE', 'typeId': 'wewrqw-qe32eqwewq-qweqewqe', 'typeQuestion': 'Hello Pricilla Mkansi! Did you feel motivated to comply with TB treatment from 08/17/2021 - 08/10/2021? Please answer with 1 or 2. 1 - NO, 2 - YES.', 'typeQuestionId': 'wewrqw-qe32eqwewq-qeeere', 'typeAnswer': null, 'typeAnswerId': '', 'answerDate': '2021-08-23', 'answerTime': '23:05:14'}, {'authorityCode': '', 'msisdn': '27721989196', 'status': 'ERROR', 'type': 'ADHERENCE', 'typeId': 'wewrqw-qe32eqwewq-qweqewqe', 'typeQuestion': 'Hello Nocoment Sibiya! Did you feel motivated to comply with TB treatment from 08/17/2021 - 08/10/2021? Please answer with 1 or 2. 1 - NO, 2 - YES.', 'typeQuestionId': 'wewrqw-qe32eqwewq-qeeere', 'typeAnswer': null, 'typeAnswerId': '', 'answerDate': '2021-08-23', 'answerTime': '23:05:14'}, {'authorityCode': '', 'msisdn': '27725819816', 'status': 'ERROR', 'type': 'ADHERENCE', 'typeId': 'wewrqw-qe32eqwewq-qweqewqe', 'typeQuestion': 'Hello Sinozuko Velezantsi! Did you feel motivated to comply with TB treatment from 08/17/2021 - 08/10/2021? Please answer with 1 or 2. 1 - NO, 2 - YES.', 'typeQuestionId': 'wewrqw-qe32eqwewq-qeeere', 'typeAnswer': null, 'typeAnswerId': '', 'answerDate': '2021-08-23', 'answerTime': '23:05:13'}, {'authorityCode': '', 'msisdn': '27766401629', 'status': 'ERROR', 'type': 'ADHERENCE', 'typeId': 'wewrqw-qe32eqwewq-qweqewqe', 'typeQuestion': 'Hello NGENISILE  MNUKWA! Did you feel motivated to comply with TB treatment from 08/17/2021 - 08/10/2021? Please answer with 1 or 2. 1 - NO, 2 - YES.', 'typeQuestionId': 'wewrqw-qe32eqwewq-qeeere', 'typeAnswer': null, 'typeAnswerId': '', 'answerDate': '2021-08-23', 'answerTime': '23:05:13'}, {'authorityCode': '', 'msisdn': '27839508675', 'status': 'COMPLETED', 'type': 'ADHERENCE', 'typeId': 'wewrqw-qe32eqwewq-qweqewqe', 'typeQuestion': 'Hello Fundakele Qubimpi! Did you feel motivated to comply with TB treatment from 08/17/2021 - 08/10/2021? Please answer with 1 or 2. 1 - NO, 2 - YES.', 'typeQuestionId': 'wewrqw-qe32eqwewq-qeeere', 'typeAnswer': 'No', 'typeAnswerId': '', 'answerDate': '2021-08-22', 'answerTime': '04:20:28'}, {'authorityCode': '', 'msisdn': '27724745862', 'status': 'ERROR', 'type': 'ADHERENCE', 'typeId': 'wewrqw-qe32eqwewq-qweqewqe', 'typeQuestion': 'Hello Themba Nyundu! Did you feel motivated to comply with TB treatment from 08/17/2021 - 08/10/2021? Please answer with 1 or 2. 1 - NO, 2 - YES.', 'typeQuestionId': 'wewrqw-qe32eqwewq-qeeere', 'typeAnswer': null, 'typeAnswerId': '', 'answerDate': '2021-08-21', 'answerTime': '23:05:13'}, {'authorityCode': '', 'msisdn': '27826479109', 'status': 'ERROR', 'type': 'ADHERENCE', 'typeId': 'wewrqw-qe32eqwewq-qweqewqe', 'typeQuestion': 'Hello Lucky Nkalanga! Did you feel motivated to comply with TB treatment from 08/17/2021 - 08/10/2021? Please answer with 1 or 2. 1 - NO, 2 - YES.', 'typeQuestionId': 'wewrqw-qe32eqwewq-qeeere', 'typeAnswer': null, 'typeAnswerId': '', 'answerDate': '2021-08-21', 'answerTime': '23:05:13'}, {'authorityCode': '', 'msisdn': '27825615491', 'status': 'ERROR', 'type': 'ADHERENCE', 'typeId': 'wewrqw-qe32eqwewq-qweqewqe', 'typeQuestion': 'Hello MKASIPHANGI  GAGULA! Did you feel motivated to comply with TB treatment from 08/17/2021 - 08/10/2021? Please answer with 1 or 2. 1 - NO, 2 - YES.', 'typeQuestionId': 'wewrqw-qe32eqwewq-qeeere', 'typeAnswer': null, 'typeAnswerId': '', 'answerDate': '2021-08-21', 'answerTime': '23:05:13'}, {'authorityCode': '', 'msisdn': '27792560949', 'status': 'ERROR', 'type': 'ADHERENCE', 'typeId': 'wewrqw-qe32eqwewq-qweqewqe', 'typeQuestion': 'Hello LULAMA IRENE  MALI! Did you feel motivated to comply with TB treatment from 08/17/2021 - 08/10/2021? Please answer with 1 or 2. 1 - NO, 2 - YES.', 'typeQuestionId': 'wewrqw-qe32eqwewq-qeeere', 'typeAnswer': null, 'typeAnswerId': '', 'answerDate': '2021-08-21', 'answerTime': '23:05:13'}];
        // tslint:disable-next-line:max-line-length
        this.setServiceData(this.authority, this.roleCode, this.initPageIndex, this.initPageSize);

        setTimeout(() => {
            this.dataSource = new MatTableDataSource(this.data);
        }, 20);
    }

    ngOnInit(): void {
        setTimeout(() => {
            this.pageTitleService.setTitle('Detailed Adherence Report');
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
        this.mHealthApiService.allAuthorityAdherenceParticipantReport(authority, roleCode, pageIndex, pageSize)
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
