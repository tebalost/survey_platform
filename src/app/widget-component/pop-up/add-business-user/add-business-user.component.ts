import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import {MhealthApiUserService} from '../../../service/api-service/mhealth-api-user.service';
import {MhealthApiService} from '../../../service/api-service/mhealth-api.service';



@Component({
  selector: 'ms-add-business-user',
  templateUrl: './add-business-user.component.html',
  styleUrls: ['./add-business-user.component.scss']
})
export class AddBusinessUserComponent implements OnInit {

	addBusinessUserForm    : FormGroup;
	emailPattern 		: string = "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$";
	authorities: any [];
	imageSrc: string;

	constructor( private formBuilder : FormBuilder,
				 private mhealthApiUserService: MhealthApiUserService,
					 private MhealthApiService: MhealthApiService,
					 public dialogRef    : MatDialogRef<AddBusinessUserComponent>) { }

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
		this.addBusinessUserForm.controls.logoFile.setValue(this.imageSrc);
	}

	ngOnInit() {
		this.addBusinessUserForm = this.formBuilder.group({
			firstName	 : ['',[Validators.required]],
			lastName 	 : ['',[Validators.required]],
			email : ['',[Validators.required,Validators.pattern(this.emailPattern)]],
			authorityCode  : ['',[Validators.required]],
			role  : ['',[Validators.required]],
			file: ['', [Validators.required]],
			userStatus : [''],
			businessUserId : [''],
			logoFile: ['']
		});
		this.addBusinessUserForm.controls.userStatus.setValue('ACTIVE');
		this.addBusinessUserForm.controls.businessUserId.setValue(0);

		this.MhealthApiService.getActiveAuthorities()
			.subscribe(authorities => this.authorities = authorities);
	}
	get f(){
		return this.addBusinessUserForm.controls;
	}
	// onFormSubmit method is submit a add new user form.

	onFormSubmit(){
		this.mhealthApiUserService.createUpdateUser(this.addBusinessUserForm.value);
		this.dialogRef.close(this.addBusinessUserForm.value);
	}

}
