import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {EcommerceService} from '../../../service/ecommerce/ecommerce.service';
import {HttpClient} from '@angular/common/http';
import get = Reflect.get;

@Component({
    selector: 'ms-add-new-client',
    templateUrl: './add-new-client.component.html',
    styleUrls: ['./add-new-client.component.scss']
})
export class AddNewClientComponent implements OnInit {

    addNewUserForm: FormGroup;
    emailPattern: string = '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$';
    countries: any;
    imageSrc: string;

    constructor(private formBuilder: FormBuilder,
                public ecommerceservice: EcommerceService,
                private http: HttpClient,
                public dialogRef: MatDialogRef<AddNewClientComponent>) {
    }

    onFileChange(event) {
        //Convert the Picture to Base64 to save to the DB
        var file = event.dataTransfer ? event.dataTransfer.files[0] : event.target.files[0];
        var pattern = /image-*/;
        var reader = new FileReader();
        if (!file.type.match(pattern)) {
            alert('invalid format');
            return;
        }
        reader.onload = this._handleReaderLoaded.bind(this);
        reader.readAsDataURL(file);
    }
    _handleReaderLoaded(e) {
        let reader = e.target;
        this.imageSrc = reader.result;
        this.addNewUserForm.controls.logoFile.setValue(this.imageSrc);
    }

    ngOnInit() {
        this.addNewUserForm = this.formBuilder.group({
            name: ['', [Validators.required]],
            country: ['', [Validators.required]],
            location: ['', [Validators.required]],
            file: ['', [Validators.required]],
            code: ['', [Validators.required]],
            clientStatus: [''],
            logoFile: ['']
        })
        this.getCountry();
        this.addNewUserForm.controls.clientStatus.setValue('ACTIVE');

    }
    get f(){
        return this.addNewUserForm.controls;
    }

    /**
     * getCountry is used to get the Country Data from JSON file.
     */
    getCountry() {
        this.ecommerceservice.getCountries().subscribe(res => {
                this.countries = res['countries'].filter(country => country.systemStatus);
            },
            err => console.log(err),
            () => this.countries
        );
    }
    onFormSubmit() {
        this.dialogRef.close(this.addNewUserForm.value);
    }
}



