import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MarketComponent } from './market.component';
import { LandingModule } from './modules/landing/landing.module';
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { IndividualVisaModule } from "./modules/individualVisa/individualVisa.module";
import { BusinessVisaModule } from "./modules/businessVisa/businessVisa.module";
import { TermsAndConditionsModule } from "./modules/termsAndConditions/termsAndConditions.module";
import { ContactUsModule } from "./modules/contactUs/contactUs.module";
import { FaqModule } from "./modules/faq/faq.module";
import { PrivacyPolicyModule } from "./modules/privacyPolicy/privacyPolicy.module";
import { LoginModule } from "./modules/login/login.module";
import { SignUpModule } from "./modules/signUp/signUp.module";
import { StickyHeaderDirective } from "./components/stickyHeader/stickyHeader.directive";
import { AppSettingsService } from "./services/appSettings.service";
import { ChatDirective } from "./components/chat/chat.directive";
import { AccountService } from "./services/account.service";
import { UserService } from "./services/user.service";
import { LangService } from "./services/lang.service";
import { AboutUsModule } from "./modules/aboutUs/aboutUs.module";
import { FacebookAuthService } from "./services/facebook.auth.service";
import { GoogleAuthService } from "./services/google.auth.service";
import { EnvService } from "./services/env.service";
import { SpinnerService } from "./services/spinner.service";
import { SpinnerComponent } from "./components/spinner/spinner.component";
import {DropdownModule} from "./components/dropdown/dropdown.module";

@NgModule({
  imports: [
    SharedModule,
    LandingModule,
    IndividualVisaModule,
    BusinessVisaModule,
    TermsAndConditionsModule,
    PrivacyPolicyModule,
    ContactUsModule,
    FaqModule,
    LoginModule,
    SignUpModule,
    AboutUsModule,
    DropdownModule
  ],
  declarations: [
    MarketComponent,
    HeaderComponent,
    StickyHeaderDirective,
    ChatDirective,
    FooterComponent,
  ],
  providers: [
    UserService,
    GoogleAuthService,
    FacebookAuthService,
    AppSettingsService,
    AccountService,
    LangService,
    EnvService
  ]
})
export class MarketModule {
}
