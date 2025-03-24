import { Routes } from '@angular/router';
import { MainContentComponent } from './main-content/main-content.component';
import { PrivacyPolicyComponent } from '././shared/privacy-policy/privacy-policy.component';
import { ImprintComponent } from '././shared/imprint/imprint.component';

export const routes: Routes = [
  { path: '', component: MainContentComponent },
  { path: 'imprint', component: ImprintComponent },
  { path: 'privacyPolicy', component: PrivacyPolicyComponent },
];
