import { Component, OnInit } from '@angular/core';
import { CoreService } from '../../service/core/core.service';
import { PageTitleService } from '../../core/page-title/page-title.service';
import {MhealthApiService} from '../../service/api-service/mhealth-api.service';
import {Authority} from '../../authority';


@Component({
  selector: 'ms-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

	popUpDeleteResponse    : any;
	popUpNewClientResponse : any;
	popUpEditUserResponse  : any;
	clientsContent : any [];
	authority : Authority;

	constructor(public coreService : CoreService,
				private MhealthApiService: MhealthApiService,
				private pageTitleService: PageTitleService) { }

	ngOnInit() {
		setTimeout(() =>{
			this.pageTitleService.setTitle("Clients");
			},0);

		this.getAuthorities();

	}

	getAuthorities(): void {
		this.MhealthApiService.getActiveAuthorities()
			.subscribe(authorities => this.clientsContent = authorities);
	}

	/**
	  *onDelete method is used to open a delete dialog.
	  */
	onDelete(i){
		this.coreService.deleteDialog("Are you sure you want to delete this Client permanently?").
			subscribe(res => {this.popUpDeleteResponse = res},
						 err => console.log(err),
						 ()  => this.getDeleteResponse(this.popUpDeleteResponse,i)
			);
	}

	/*
	  * getDeleteResponse method is used to delete a client from the client list.
	  */
	getDeleteResponse(response, i ) {
		if(response == 'yes'){
			this.clientsContent.splice(i,1);
		}
	}

	/**
	  * addNewClientDialog method is used to open a add new client dialog.
	  */
	addNewClientDialog() {
		this.coreService.addNewClientDialog().
			subscribe( res => {this.popUpNewClientResponse = res},
						  err => console.log(err),
						  ()  => this.getAddClientPopupResponse(this.popUpNewClientResponse))
	}

	/**
	  *getAddClientPopupResponse method is used to get a new client dialog response.
	  *if response will be get then add new client into client list.
	  */
	getAddClientPopupResponse(response: any){
		if(response){

			this.authority ={
				code: response.code,
				clientStatus: response.clientStatus,
				country : response.country,
				name:response.name,
				location: response.location,
				systemClientId: 0,
				imageUrl: "",
				imageString: response.logoFile
			};
			this.clientsContent.push(this.authority);
			this.MhealthApiService.addAuthority(this.authority);
		}
	}

	/**
	  * onEdit method is used to open a edit dialog.
	  */
	onEdit(data, index){
		this.coreService.editClientList(data).
			subscribe( res => {this.popUpEditUserResponse = res},
						  err => console.log(err),
						  ()  => this.getEditResponse(this.popUpEditUserResponse, data, index))
	}

	/**
	  * getEditResponse method is used to edit a client data.
	  */
	getEditResponse(response : any , data, i){
		if(response) {
			this.clientsContent[i].name = response.name,
			this.clientsContent[i].location = response.location,
			this.clientsContent[i].code = response.code,
			this.clientsContent[i].country = response.country
		}
	}
}
