import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth-service/auth.service';
import { ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MhealthApiUserService } from 'app/service/api-service/mhealth-api-user.service';
import { BusinessUser } from 'app/user';
import { ToastrService } from 'ngx-toastr';

@Component({
   selector: 'ms-loginV2-session',
   templateUrl: './loginV2-component.html',
   styleUrls: ['./loginV2-component.scss'],
   encapsulation: ViewEncapsulation.None
})
export class LoginV2Component {

   businessUser: BusinessUser;

   email: string = "";
   password: string = "";

   slideConfig = { "slidesToShow": 1, "slidesToScroll": 1, "autoplay": true, "autoplaySpeed": 1000, "dots": false, "arrows": false };

   sessionSlider: any[] = [
      {
         image: "assets/img/login-slider1.jpg",
         name: "Lungisa Khumalo",
         designation: "CEO-Aquity",
         content: "Through our innovative solutions and use of technology, we still are still able to monitor patients' outcomes even during the impossible lockdown times of COVID-19 pandemic."
      },
      {
         image: "assets/img/login-slider2.jpg",
         name: "Charlotte Maxeke ",
         designation: "mHealth Technical Support-Aquity",
         content: "Faced with the COVID-19 pandemic, we have redefined our strategies to ensure continuity of service delivery and our stake holders are all involved."
      },
      {
         image: "assets/img/login-slider3.jpg",
         name: "Sue Armstrong",
         designation: "TB Medical Officer-Aquity",
         content: "We still have access to the patients outcomes report and are able to make informed decisions through the use of technology as an enabler."
      }
   ]
   constructor(public authService: AuthService,
      public translate: TranslateService,
      public mhealthApiUserService: MhealthApiUserService,
      private toastr: ToastrService) { }

   login(value) {

      this.mhealthApiUserService.businessUserLogin(value.email)
         .subscribe(user => {
            console.log('response received' + user);
            if (user){
               this.authService.loginUser(value);
               localStorage.setItem("USER_ROLE", user.role);
               localStorage.setItem("USER_IMAGE", JSON.stringify(user.imageString));
               localStorage.setItem("USER_AUTHORITY_CODE", user.authorityCode);
            }   
            else
               this.toastr.error('User not active, You need to contact Admin to be activated');
         }, (err) => {
            this.toastr.error(err.message);
            console.error('error caught in component')
         }
         );
   }
}



