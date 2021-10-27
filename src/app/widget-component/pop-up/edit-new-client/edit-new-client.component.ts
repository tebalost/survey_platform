import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import {EcommerceService} from "../../../service/ecommerce/ecommerce.service";

@Component({
  selector: 'ms-edit-new-client',
  templateUrl: './edit-new-client.component.html',
  styleUrls: ['./edit-new-client.component.scss']
})
export class EditNewClientComponent implements OnInit {

 
	form : FormGroup
	data : any;
    countries   : any;
	imageSrc: string;
	constructor( public formBuilder : FormBuilder,
				public ecommerceservice: EcommerceService,
					 public dialogRef : MatDialogRef<EditNewClientComponent>) { }

	ngOnInit() 
		{
		this.form = this.formBuilder.group({
			name				: [],
			location: [],
			country 	: [],
			file 	: [],
			code 	: [],
			imageSrc 	: [],
			clientStatus 	: []
		});

		if(this.data){
			this.form.patchValue({
				name    : this.data.name,
		        country : this.data.country,
				location : this.data.location,
				file : this.data.file,
				imageSrc : this.data.imageString,
				code : this.data.code,
				clientStatus : this.data.clientStatus
			});
		}
		this.getCountry();
	}

	getCountry(){
		this.ecommerceservice.getCountries().
		subscribe( res => { this.countries = res['countries']},
			err => console.log(err),
			()  => this.countries
		);
	}
	get f(){
		return this.form.controls;
	}
	onFileChange(event) {
		const reader = new FileReader();

		if (event.target.files && event.target.files.length) {
			const [file] = event.target.files;
			reader.readAsDataURL(file);

			reader.onload = () => {

				this.imageSrc = reader.result as string;

				this.form.patchValue({
					fileSource: reader.result
				});

			};
		}
	}
	/**
	  *onFormSubmit method is used to submit the edit new user dialaog form and close the dialog.
	  */
	onFormSubmit(){
		this.dialogRef.close(this.form.value);
	}
}
