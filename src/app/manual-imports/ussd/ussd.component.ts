import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { PageTitleService } from '../../core/page-title/page-title.service';
import { fadeInAnimation } from '../../core/route-animation/route.animation';
import { TranslateService } from '@ngx-translate/core';
import * as xlsx from 'xlsx';
import { FileItem } from 'ng2-file-upload/file-upload/file-item.class';
import { MhealthApiService } from 'app/service/api-service/mhealth-api.service';
import { UssdFile } from 'app/ussd-file';
import { ToastrService } from 'ngx-toastr';


@Component({
    selector: 'ms-ussd',
    templateUrl: './ussd.component.html',
    styleUrls: ['./ussd.component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: { '[@fadeInAnimation]': 'true' },
    animations: [fadeInAnimation]
})
export class UssdComponent implements OnInit {
    willDownload = false;

    // @ts-ignore
    uploader: FileUploader = new FileUploader({ url: 'http://localhost:8082/api/excel-file-upload' });
    hasBaseDropZoneOver = false;
    hasUploaded = false;

    constructor(private pageTitleService: PageTitleService,
                private translate: TranslateService,
                private mhealthApiService: MhealthApiService,
                private toastr: ToastrService) {
    }

    ngOnInit() {
        setTimeout(() => {
            this.pageTitleService.setTitle('Upload');
        }, 0);
    }

    fileOverBase(e: any): void {
        this.hasBaseDropZoneOver = e;
    }

    uploadFile(fileItem: FileItem): any {
        let workBook = null;
        let jsonData = null;
        const reader = new FileReader();
        const file = fileItem._file;

        reader.onload = (event) => {
            const data = reader.result;
            workBook = xlsx.read(data, { type: 'binary' });
            jsonData = workBook.SheetNames.reduce((initial, name) => {
                const sheet = workBook.Sheets[name];
                initial[name] = xlsx.utils.sheet_to_json(sheet);
                return initial;
            }, {});
            this.hasUploaded = true;
            let imputFile: UssdFile[] = jsonData.Sheet1;
            this.mhealthApiService.uploadUssdFile(imputFile)
                .subscribe(uploadMessage => {
                        console.log(`Upload results >  ${JSON.stringify(uploadMessage)}`);
                        this.toastr.success(`${uploadMessage['message']}`);
                    },
                    err => {
                        console.log(err);
                        this.toastr.error(err);
                    }
                );
        }
        reader.readAsBinaryString(file);
    }
}


