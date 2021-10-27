import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { CoreService } from '../../service/core/core.service';
import { MenuItems } from '../../core/menu/menu-items/menu-items';

@Component({
    selector: 'ms-side-bar',
    templateUrl: './side-bar.component.html',
    styleUrls: ['./side-bar.component.scss']
})

export class SideBarComponent implements OnInit {

    @Input() menuList: any;
    @Input() verticalMenuStatus: boolean;
    loginUserName: string;
    loginUserRole: string;
    loginUserImage: string;

    constructor(public translate: TranslateService,
        private router: Router,
        public coreService: CoreService,
        public menuItems: MenuItems) {
    }

    ngOnInit() {
        this.getLoginUserName();

        console.log(`<> ---> Login User Details  { Name -> ${this.loginUserName} ,  Role -> ${this.loginUserRole} }  <--- <>` );
    }

    onClick() {
        var first = location.pathname.split('/')[1];
        if (first == 'horizontal') {
            this.router.navigate(['/horizontal/dashboard/crm']);
        } else {
            this.router.navigate(['/dashboard/crm']);
        }
    }
    getLoginUserName() {
        var userData = JSON.parse(localStorage.getItem('userProfile'));
        this.loginUserName = userData.user && userData.user.name ? userData.user.name
            : userData.user.email.substring(0, userData.user.email.indexOf('@'));

        this.loginUserImage = localStorage.getItem('USER_IMAGE');

        this.loginUserRole = localStorage.getItem('USER_ROLE');
        if(this.loginUserRole === 'SUPER_ADMIN'){
            this.loginUserRole = 'SUPER';
        }
    }

    menuAccessAndTypeSub(menuItem: any = null) {
        return   this.menuAccessAndType(menuItem, 'sub');
    }

    menuAccessAndTypeLink(menuItem: any = null) {
        return   this.menuAccessAndType(menuItem, 'link');
    }

    menuAccessAndTypeButton(menuItem: any = null) {
        return  this.menuAccessAndType(menuItem, 'button');
    }

    menuAccessAndTypeSubChild(menuItem: any = null) {
        return (menuItem.accessRole && menuItem.accessRole.indexOf(this.loginUserRole) > -1);
    }

   private  menuAccessAndType(menuItem: any, menuItemType : string) {
        return ((menuItem.accessRole && menuItem.accessRole.indexOf(this.loginUserRole) > -1)
        && menuItem.type === menuItemType
        );
    }
}
