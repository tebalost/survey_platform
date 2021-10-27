import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { CoreService } from '../../service/core/core.service';
import { PageTitleService } from '../../core/page-title/page-title.service';
import {ActivatedRoute} from '@angular/router';
import {MhealthApiService} from '../../service/api-service/mhealth-api.service';

@Component({
  selector: 'ms-participant-authority',
  templateUrl: './participant-authority.component.html',
  styleUrls: ['./participant-authority.component.scss']
})
export class ParticipantAuthorityComponent implements OnInit {

	@ViewChild(MatPaginator) paginator : MatPaginator;
	authoritieslist                     : any;

	color = {
		"Admin" : "primary",
		"SuperAdmin"     : "accent",
		"user"   : "warn"
	}

	displayedColumns : string [] = ['select','authorityCode','authorityName','participants','action'];
	dataSource = new MatTableDataSource<any>();
	selection = new SelectionModel<any>(true, []);

	constructor ( private coreService : CoreService,
				  private MhealthApiService: MhealthApiService,
				  private pageTitleService : PageTitleService,
				  private activatedRoute: ActivatedRoute ) {
		this.activatedRoute.queryParams.subscribe(params => {
			console.log(params['participantauthorities'])
		});
	}

	ngOnInit () {
		setTimeout(() =>{
			this.pageTitleService.setTitle("Participant Authorities");
			},0);
		this.dataSource.paginator = this.paginator;

		this.MhealthApiService.allParticipantAuthorities().
			subscribe( res => { this.authoritieslist = res },
						  err => console.log(err),
						  ()  => this.getAuthorityList(this.authoritieslist)
						);
	}

	//getUserList method is used to get the user management list data.
	getAuthorityList(res){
		this.getAuthorityList = res;
		this.dataSource = new MatTableDataSource<any>(this.authoritieslist);
		setTimeout(()=>{
			this.dataSource.paginator = this.paginator;
		},0)
	}

	/**
	  * Whether the number of selected elements matches the total number of rows.
	  */
	isAllSelected() {
		const numSelected = this.selection.selected.length;
		const numRows = this.dataSource.data.length;
		return numSelected === numRows;
	}

	/**
	  * Selects all rows if they are not all selected; otherwise clear selection.
	  */
	masterToggle() {
		this.isAllSelected() ?
		this.selection.clear() :
		this.dataSource.data.forEach(row => this.selection.select(row));
	}


}
