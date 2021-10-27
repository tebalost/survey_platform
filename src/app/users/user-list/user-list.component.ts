import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {PageTitleService} from '../../core/page-title/page-title.service';
import {fadeInAnimation} from '../../core/route-animation/route.animation';
import {CoreService} from '../../service/core/core.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {MhealthApiUserService} from '../../service/api-service/mhealth-api-user.service'
import {DataTableDirective} from 'angular-datatables';
import {TranslateService} from '@ngx-translate/core';
import {BusinessUser} from '../../user';
import {Authority} from '../../authority';
import {AuthService} from '../../service/auth-service/auth.service';

@Component({
    //TODO, Complete Edit User
    selector: 'ms-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        '[@fadeInAnimation]': 'true'
    },
    animations: [fadeInAnimation]
})  // @ts-ignore
export class UserListComponent implements OnInit {

    @ViewChild(MatPaginator) paginator: MatPaginator;
    datatableElement: DataTableDirective;
    dtOptions: DataTables.Settings = {};
    businessUserList: any;
    popUpBusinessUserResponse: any;
    popUpEditBusinessUserResponse: any;
    popUpDeleteBusinessUserResponse: any;
    businessUser: BusinessUser;
    role: string;
    data: any [];

    color = {
        'Admin': 'primary',
        'SuperAdmin': 'accent',
        'user': 'warn'
    }

    displayedColumns: string[] = ['select', 'user', 'email', 'status', 'role', 'Authority', 'action'];
    dataSource = new MatTableDataSource<any>();
    selection = new SelectionModel<any>(true, []);


    constructor(public translate: TranslateService,
                private pageTitleService: PageTitleService,
                public authService: AuthService,
                private coreService: CoreService,
                private mhealthApiUserService: MhealthApiUserService) {
    }

    ngOnInit() {
        setTimeout(() => {
            this.pageTitleService.setTitle('System User List');
        }, 0);
        
        this.getBusinessUser();

        this.dtOptions = {
            pageLength: 10,
            ordering: true,
            // @ts-ignore
            bPaginate: false,
            info: true,
            processing: true,
            dom: 'Bfrtip',
            buttons: [
                {extend: 'copy'},
                {extend: 'csv'},
                {extend: 'excel'},
                {extend: 'pdf'},
                {extend: 'print'}
            ]
        };
        this.role = localStorage.getItem('USER_ROLE');
        console.log("Role:"+this.role);
        if(this.role != "SUPER_ADMIN"){
            this.displayedColumns = ['select', 'user', 'email', 'status', 'role', 'action'];
        }else{
            this.displayedColumns = ['select', 'user', 'email', 'status', 'role', 'Authority', 'action'];
        }
    }

    getBusinessUser(): void {
        this.mhealthApiUserService.getBusinessUsers()
            .subscribe(users => {
                    this.businessUserList = users
                },
                err => console.log(err),
                () => {
                    this.getBusinessUserList(this.businessUserList);
                }
            );
    }
    


    //getUserList method is used to get the user management list data.
    getBusinessUserList(res) {
        this.businessUserList = res;
        this.dataSource = new MatTableDataSource<any>(this.businessUserList);
        setTimeout(() => {
            this.dataSource.paginator = this.paginator;
            this.data = this.businessUserList;
        }, 0)
    }


    /**
     * addNewUserDialog method is used to open a add new user dialog.
     */
    addBusinessUserDialog() {
        this.coreService.addBusinessUserDialog().subscribe(res => {
                this.popUpBusinessUserResponse = res
            },
            err => console.log(err),
            () => this.getAddBusinessUserPopupResponse(this.popUpBusinessUserResponse))
    }

    /**
     *getAddUserPopupResponse method is used to get a new user dialog response.
     *if response will be get then add new user into user list.
     */
    getAddBusinessUserPopupResponse(response: any) {
        if (response) {
            this.businessUser = {
                businessUserId: 0,
                role: response.role,
                email: response.email,
                authorityCode: response.authorityCode,
                userStatus: response.userStatus,
                firstName: response.firstName,
                lastName: response.lastName,
                imageString: response.logoFile
            };
            let addedUser = {
                businessUserId: response.businessUserId,
                role: response.role,
                email: response.email,
                authorityCode: response.authorityCode,
                userStatus: response.userStatus,
                firstName: response.firstName,
                lastName: response.lastName,
                imageUrl: '',
                imageString: response.logoFile
            }

            let authDetails = {
                email: response.email,
                password: "123456",
                name: response.firstName + ' ' + response.lastName
            }

            this.mhealthApiUserService.createUpdateUser(this.businessUser).subscribe(newBusinessUser => {
                console.log(`successfully added Business User`);
                this.authService.signupUserProfile(authDetails);
            });

            this.businessUserList.push(addedUser);
            this.dataSource = new MatTableDataSource<any>(this.businessUserList);
            this.dataSource.paginator = this.paginator;
        }
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

    /**
     * onEdit method is used to open a edit dialog.
     */
    onBusinessEdit(data, index) {
        this.coreService.editBusinessUserList(data).subscribe(res => {
                this.popUpEditBusinessUserResponse = res
            },
            err => console.log(err),
            () => this.getBusinessEditResponse(this.popUpEditBusinessUserResponse, data, index))
    }

    /**
     * onView method is used to View a user profile.
     */
    onView(data, index) {
        this.coreService.viewList(data).subscribe(res => {
                this.popUpEditBusinessUserResponse = res
            },
            err => console.log(err),
            () => this.getBusinessEditResponse(this.popUpEditBusinessUserResponse, data, index))
    }

    /**
     * getEditResponse method is used to edit a user data.
     */
    getBusinessEditResponse(response: any, data, i) {
        if (response) {
            this.businessUserList[i].firstName = response.firstName,
                this.businessUserList[i].lastName = response.lastName,
                this.businessUserList[i].email = response.email,
                this.businessUserList[i].role = response.role,
                this.businessUserList[i].accountTypeColor = this.color[response.accountType]

        }
    }

    /**
     *onDelete method is used to open a delete dialog.
     */
    onDelete(i) {
        this.coreService.deleteDialog('Are you sure you want to delete this user permanently?').subscribe(res => {
                this.popUpDeleteBusinessUserResponse = res
            },
            err => console.log(err),
            () => this.getDeleteResponse(this.popUpDeleteBusinessUserResponse, i))
    }

    /**
     * getDeleteResponse method is used to delete a user from the user list.
     */
    getDeleteResponse(response: string, i) {
        if (response == 'yes') {
            this.dataSource.data.splice(i, 1);
            this.dataSource = new MatTableDataSource(this.dataSource.data);
        }
    }
}
