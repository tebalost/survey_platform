import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'ms-edit-business-user',
  templateUrl: './edit-business-user.component.html',
  styleUrls: ['./edit-business-user.component.scss']
})
export class EditBusinessUserComponent implements OnInit {

	form : FormGroup
	data : any;

	constructor( public formBuilder : FormBuilder,
					 public dialogRef : MatDialogRef<EditBusinessUserComponent>) { }

	ngOnInit() 
		{
		this.form = this.formBuilder.group({
			firstName		: [],
			lastName 		: [],
			email   : [],
			role 	: []
		});

		if(this.data){
			this.form.patchValue({
				firstName    : this.data.firstName,
				lastName		 : this.data.lastName,
				email : this.data.email,
				role  : this.data.role
			});
		}
	}

	/**
	  *onFormSubmit method is used to submit the edit new user dialaog form and close the dialog.
	  */
	onFormSubmit(){
		this.dialogRef.close(this.form.value);
	}
}
