import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';

import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';

import { AddNewUserComponent } from '../../widget-component/pop-up/add-new-user/add-new-user.component';
import { EditNewUserComponent } from '../../widget-component/pop-up/edit-new-user/edit-new-user.component';
import { DeleteDialogComponent } from '../../widget-component/pop-up/delete-dialog/delete-dialog.component';
import { AddNewClientComponent } from '../../widget-component/pop-up/add-new-client/add-new-client.component';
import { EditNewClientComponent } from '../../widget-component/pop-up/edit-new-client/edit-new-client.component';
import { AddBusinessUserComponent } from '../../widget-component/pop-up/add-business-user/add-business-user.component';
import { EditBusinessUserComponent } from '../../widget-component/pop-up/edit-business-user/edit-business-user.component';

@Injectable({
	providedIn: 'root'
})

export class CoreService {

	collapseSidebar 		 : boolean = false;
	collapseSidebarStatus : boolean;
	sidenavMode				 : string  = "side";
	sidenavOpen 			 : boolean = true;
	horizontalSideNavMode : string  = "over";
	horizontalSideNavOpen : boolean = false;
	projectDetailsContent : any;
	editProductData 		 : any;

	constructor(private matDialog : MatDialog,
				private http : HttpClient){
	}

	//getResponsiveTableContent method is used to get the user management grid list data from json file
	getUserManagementGridList(){
		return this.http.get('assets/data/user_management_grid_list.json').pipe(map(response => response));
	}

	//deleteDiaglog function is used to open the Delete Dialog Component.
	deleteDialog( data : string ) {
		let dialogRef : MatDialogRef<DeleteDialogComponent>;
		dialogRef = this.matDialog.open(DeleteDialogComponent);
		dialogRef.componentInstance.data = data;

		return dialogRef.afterClosed();
	}

	//editList function is used to open Edit Dialog Component.
	editList(data){
		let dialogRef : MatDialogRef<EditNewUserComponent>;
		dialogRef =this.matDialog.open(EditNewUserComponent);
		dialogRef.componentInstance.data = data;

		return dialogRef.afterClosed();
	}

	//viewList function is used to open Edit Dialog Component to view thw user profile.
	//TODO, to add this functionality
	viewList(data){
		let dialogRef : MatDialogRef<EditNewUserComponent>;
		dialogRef =this.matDialog.open(EditNewUserComponent);
		dialogRef.componentInstance.data = data;

		return dialogRef.afterClosed();
	}

	//getUserManagementList method is used to get the User Management list data from json file
	getUserManagementList(){
		return this.http.get('assets/data/user_management_list.json').pipe(map(response => response));
	}

	getAuthorityParticipantsList(){
		//TODO Call API to get the participants of the clicked Authority
		return this.http.get('assets/data/detailed_report.json').pipe(map(response => response));
	}

	//addNewUserDailog function is used to open Add New user Dialog Component.
	addNewUserDailog(){
		let dialogRef : MatDialogRef<AddNewUserComponent>;
		dialogRef = this.matDialog.open(AddNewUserComponent);

		return dialogRef.afterClosed();
	}

	//getTableTabContent method is used to get the table tab data from json file
	getTableTabContent(){
		return this.http.get('assets/data/table_tab_list.json').pipe(map(response => response));
	}

	//getCrmStatsCardContent method is used to get the Crm stats card data from json file
	getCrmStatsCardContent(){
		return this.http.get('assets/data/crm_stats_card.json').pipe(map(response => response));
	}

	//getLiveChatContent method is used to get the live chat support data from json file
	getLiveChatContent(){
		return this.http.get('assets/data/live_chat_support.json').pipe(map(response => response));
	}
	//editClientList function is used to open Edit Client Dialog Component.
	editClientList(data){
		let dialogRef : MatDialogRef<EditNewClientComponent>;
		dialogRef =this.matDialog.open(EditNewClientComponent);
		dialogRef.componentInstance.data = data;

		return dialogRef.afterClosed();
	}

	//addNewClientDialog function is used to open Add new client Dialog Component.
	addNewClientDialog(){
		let dialogRef : MatDialogRef<AddNewClientComponent>;
		dialogRef = this.matDialog.open(AddNewClientComponent);

		return dialogRef.afterClosed();
	}

	//getProjectContent method is used to get the  Json file for crm project component.
	getProjectContent () {
		return this.http.get('assets/data/crm_projects.json').pipe(map(response => response));
	}

	//getInvoiceListContent method is used to get the live chat support data from json file
	getInvoiceListContent(){
		return this.http.get('assets/data/invoice_list.json').pipe(map(response => response));
	}

	//getPaymentList method is used to get the payment list data from json file
	getPaymentList(){
		return this.http.get('assets/data/payment_list.json').pipe(map(response => response));
	}
	//getTaxRateList method is used to get the tax rate list data from json file
	getTaxRateList(){
		return this.http.get('assets/data/tax_rate_list.json').pipe(map(response => response));
	}
	//getTicketList method is used to get the add ticket list data from json file
	getTicketList(){
		return this.http.get('assets/data/add_ticket_list.json').pipe(map(response => response));
	}

	//Business Users
	//getUserList method is used to get the User list data from json file
	getUserList(){
		return this.http.get('assets/data/user_list.json').pipe(map(response => response));
	}
	getBusinessUserList(){
		return this.http.get('assets/data/user_list.json').pipe(map(response => response));
	}

	getAuthoritiesList(){
		return this.http.get('assets/data/all_participant_authorities.json').pipe(map(response => response));
	}

	getDetailedReport(){
		return this.http.get('assets/data/detailed_report.json').pipe(map(response => response));
	}
	//addNewClientDialog function is used to open Add new client Dialog Component.
	addBusinessUserDialog(){
		let dialogRef : MatDialogRef<AddBusinessUserComponent>;
		dialogRef = this.matDialog.open(AddBusinessUserComponent);

		return dialogRef.afterClosed();
	}

	editBusinessUserList(data){
		let dialogRef : MatDialogRef<EditBusinessUserComponent>;
		dialogRef =this.matDialog.open(EditBusinessUserComponent);
		dialogRef.componentInstance.data = data;
		return dialogRef.afterClosed();
	}

}
