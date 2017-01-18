import {Routes} from '@angular/router';
import {IndividualVisaMainComponent} from "./components/howItWorks/individualVisaHowItWorks.component";
import {IndividualVisaListComponent} from "./components/list/individualVisaList.component";
import {IndividualVisaDetailsComponent} from "./components/visaDetails/individualVisaDetails.component";

export const individualVisaRoutes: Routes = [
  {path: '', redirectTo: 'how-it-works', pathMatch: 'full'},
  {path: 'how-it-works', component: IndividualVisaMainComponent, data: {title: 'IndividualVisaMainComponent'}},
  {path: 'list', component: IndividualVisaListComponent, data: {title: 'IndividualVisaListComponent'}},
  {path: ':visaId', component: IndividualVisaDetailsComponent, data: {title: 'IndividualVisaDetailsComponent'}},
];
