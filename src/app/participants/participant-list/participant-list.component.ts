import {Component, OnInit} from '@angular/core';
import {CoreService} from '../../service/core/core.service';
import {PageTitleService} from '../../core/page-title/page-title.service';
import {ActivatedRoute} from '@angular/router';
import {MhealthApiService} from '../../service/api-service/mhealth-api.service';
import 'datatables.net-buttons/js/buttons.flash';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.print';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-buttons';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
    selector: 'ms-participant-list',
    templateUrl: './participant-list.component.html',
    styleUrls: ['./participant-list.component.scss']
})
export class ParticipantListComponent implements OnInit {
    dtOptions: DataTables.Settings = {};
    data: any = [];
    usermanagelist: any;
    private authorityId: string;
    private roleCode : string;

    constructor(private coreService: CoreService,
                private route: ActivatedRoute,
                private mhealthApiService : MhealthApiService,
                private pageTitleService : PageTitleService) {
    }

    ngOnInit() {
        setTimeout(() => {
            this.pageTitleService.setTitle('Participants Reports');
        }, 0);

        this.authorityId = this.route.snapshot.params.id;
        this.roleCode = this.route.snapshot.params.roleCode;


            this.mhealthApiService.allAuthoritiesParticipants(this.authorityId ).subscribe(res => {
                    this.usermanagelist = res
                },
                err => console.log(err),
                () => this.getUserList(this.usermanagelist)
            );


        this.dtOptions = {
            pageLength: 10,
            ordering: true,
            // @ts-ignore
            bPaginate: false,
            info: true,
            processing: true,
            dom: 'Bfrtip',
            buttons: [
                { extend: 'copy'},
                { extend: 'csv'},
                { extend: 'excel'},
                { extend: 'pdf'},
                { extend: 'print'}
            ]
        };
    }
    getUserList(res) {
        this.usermanagelist = res;
        setTimeout(() => {
        }, 0);
        this.data = this.usermanagelist;
    }
}
