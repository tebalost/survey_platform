import {Component, ViewEncapsulation} from '@angular/core';
import {AuthService} from '../../service/auth-service/auth.service';
import {TranslateService} from '@ngx-translate/core';
import {MhealthApiService} from '../../service/api-service/mhealth-api.service';
import {Subject} from 'rxjs';
import {MhealthApiUserService} from '../../service/api-service/mhealth-api-user.service';

@Component({
    selector: 'app-ms-register-session',
    templateUrl: './registerV2-component.html',
    styleUrls: ['./registerV2-component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class RegisterV2Component {

    firstName: string;
    lastName: string;
    email: string;
    role: string;
    businessUserId: number;
    userStatus: string;
    authorityCode: string;
    password: string;
    listActiveAuthorities = [];
    destroy$: Subject<boolean> = new Subject<boolean>();

    slideConfig = {'slidesToShow': 1, 'slidesToScroll': 1, 'autoplay': true, 'autoplaySpeed': 1000, 'dots': false, 'arrows': false};

    sessionSlider: any [] = [
        {
            image: 'assets/img/login-slider1.jpg',
            name: 'Lungisa Khumalo',
            designation: 'CEO-Aquity',
            content: 'Through our innovative solutions and use of technology, we still are still able to monitor patients\' outcomes even during the impossible lockdown times of COVID-19 pandemic.'
        },
        {
            image: 'assets/img/login-slider2.jpg',
            name: 'Charlotte Maxeke ',
            designation: 'mHealth Technical Support-Aquity',
            content: 'Faced with the COVID-19 pandemic, we have redefined our strategies to ensure continuity of service delivery and our stake holders are all involved.'
        },
        {
            image: 'assets/img/login-slider3.jpg',
            name: 'Sue Armstrong',
            designation: 'TB Medical Officer-Aquity',
            content: 'We still have access to the patients outcomes report and are able to make informed decisions through the use of technology as an enabler.'
        }
    ]

    constructor(public authService: AuthService,
                public translate: TranslateService,
                public mHealthUser : MhealthApiUserService,
                public mhealthApiService: MhealthApiService) {
    }

    ngOnInit() {

        console.log( "calling the method from the sever");

        console.log( this.mhealthApiService.getActiveAuthorities());
        this.userStatus = "PENDING";
        this.authorityCode = "SEEDM001"; 
        this.businessUserId = 0;
        this.role = "NORMAL_USER";
    }

    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

    // Register method is used to sign up on the template.
    register(value) {
        console.log(value);
        this.authService.signupUserProfile(value);
        let createdUser = this.authService.getLocalStorageUser();

        if (createdUser){
            console.log (`user has been successfully created => ${createdUser}`);
            this.mHealthUser.createUpdateUser(value) 
            .subscribe(newBusinessUser => {
                console.log(`successfully added Business User`)
              });
        }
    }

}
