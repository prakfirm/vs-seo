import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {MarketComponent} from './market.component';
import {LandingModule} from './modules/landing/landing.module';
import {HeaderComponent} from "./components/header/header.component";
import {FooterComponent} from "./components/footer/footer.component";
import {IndividualVisaModule} from "./modules/individualVisa/individualVisa.module";
import {BusinessVisaModule} from "./modules/businessVisa/businessVisa.module";
import {TermsAndConditionsModule} from "./modules/termsAndConditions/termsAndConditions.module";
import {ContactUsModule} from "./modules/contactUs/contactUs.module";
import {PrivacyPolicyModule} from "./modules/privacyPolicy/privacyPolicy.module";
import {LoginModule} from "./modules/login/login.module";
import {SignUpModule} from "./modules/signUp/signUp.module";
import {StickyHeaderDirective} from "./components/stickyHeader/stickyHeader.directive";
import {AppSettingsService} from "./services/appSettings.service";
import {ChatDirective} from "./components/chat/chat.directive";
import {AccountService} from "./services/account.service";
import { UserService } from "./services/user.service";

@NgModule({
  imports: [
    SharedModule,
    LandingModule,
    IndividualVisaModule,
    BusinessVisaModule,
    TermsAndConditionsModule,
    PrivacyPolicyModule,
    ContactUsModule,
    LoginModule,
    SignUpModule
  ],
  declarations: [
    MarketComponent,
    HeaderComponent,
    StickyHeaderDirective,
    ChatDirective,
    FooterComponent
  ],
  providers: [
    UserService,
    AppSettingsService,
    AccountService
  ]
})
export class MarketModule {
}
