import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {Routes, RouterModule }   from '@angular/router';

import {AppComponent } from './app.component';
import {EventCaptureFormProviderComponent } from './event-capture-form-provider/event-capture-form-provider.component';
import {DataElementService} from './providers/dataelement.service';
import {DashboardService} from './providers/dashboard-service';
import {DatasetService} from './providers/dataset.service';
import {EventService} from './providers/event.service';
import {OrganisationUnitService} from './providers/organisation-unit.service';
import {ProgramService} from './providers/program.service';
import {DatavalueService} from './providers/datavalue.service';
import {VisualiserService} from './providers/visualizer-service';
import {ProgramStageSectionsService} from './providers/program-stage-sections';
import {ProgramStageDataElementService} from './providers/program-stage-data-elements';
import {MetadataDictionaryService} from './providers/metadata-dictionary-service';
import {IndicatorService} from './providers/indicator.service';
import {NetworkAvailability} from './providers/network-availability';
import {PeriodService} from './providers/period-service';
import { OrganisationunitsComponent } from './organisationunits/organisationunits.component';
import { IndicatorsComponent } from './indicators/indicators.component';
import {User} from './providers/user';
import {OptionSetsService } from './providers/Option-sets.service';
import { CheckListPageComponent } from './check-list-page/check-list-page.component';
import { ApprovalScreenComponent } from './approval-screen/approval-screen.component';
import { ApplicationDetailViewComponent } from './application-detail-view/application-detail-view.component';
import { ApplicationListViewComponent } from './application-list-view/application-list-view.component';
import { NotificationsListViewPageComponent } from './notifications-list-view-page/notifications-list-view-page.component';
import { LettersGenerateComponent } from './letters-generate/letters-generate.component';
import { HomeComponent } from './home/home.component';
import { ApplicationComponent } from './application/application.component';
import { ApplicantListComponent } from './applicant-list/applicant-list.component';
import { ApplicantDetailsComponent } from './applicant-details/applicant-details.component';
import { ApplicationStatusComponent } from './application-status/application-status.component';
import { ApplicationReviewDetailComponent } from './application-review-detail/application-review-detail.component';
import { ApplicationApprovalDetailComponent } from './application-approval-detail/application-approval-detail.component';
import { ApplicantDetailComponent } from './applicant-detail/applicant-detail.component';
import { NotificationDetailComponent } from './notification-detail/notification-detail.component';
import { ApplicantPtofileComponent } from './applicant-ptofile/applicant-ptofile.component';
import { FaqFormsComponent } from './faq-forms/faq-forms.component';
import { ApplicantProfileComponent } from './applicant-profile/applicant-profile.component';

const appRoutes: Routes = [
  { path: 'staging/api/apps/fwm/letters', component: LettersGenerateComponent },
  { path: 'staging/api/apps/fwm/approval',  component: ApprovalScreenComponent },
  { path: 'staging/api/apps/fwm/application',component: ApplicationComponent },
  { path: 'staging/api/apps/fwm/applicationList',component: ApplicationListViewComponent },
  { path: 'staging/api/apps/fwm/notification',component: NotificationsListViewPageComponent },
  { path: 'staging/api/apps/fwm/applicationDetail',component: ApplicationDetailViewComponent },
  { path: 'staging/api/apps/fwm/notifications',component: NotificationsListViewPageComponent },
  { path: 'staging/api/apps/fwm/home',component: HomeComponent },
  { path: 'staging/api/apps/fwm/applicationList',component: ApplicantListComponent },
  { path: 'staging/api/apps/fwm/applicationDetail',component: ApplicantDetailsComponent },
  { path: 'staging/api/apps/fwm/applicationStatus',component: ApplicationStatusComponent },
  { path: 'staging/api/apps/fwm/faq',component: FaqFormsComponent },
  { path: 'staging/api/apps/fwm/profile',component: ApplicantProfileComponent }

];

@NgModule({
  declarations: [
    AppComponent,
    EventCaptureFormProviderComponent,
    OrganisationunitsComponent,
    IndicatorsComponent,
    CheckListPageComponent,
    ApprovalScreenComponent,
    ApplicationDetailViewComponent,
    ApplicationListViewComponent,
    NotificationsListViewPageComponent,
    LettersGenerateComponent,
    HomeComponent,
    ApplicationComponent,
    ApplicantListComponent,
    ApplicantDetailsComponent,
    ApplicationStatusComponent,
    ApplicationReviewDetailComponent,
    ApplicationApprovalDetailComponent,
    ApplicantDetailComponent,
    NotificationDetailComponent,
    ApplicantPtofileComponent,
    FaqFormsComponent,
    ApplicantProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
     RouterModule.forRoot(
        appRoutes,
        { enableTracing: true } // <-- debugging purposes only
      )],
  providers: [DataElementService,DashboardService, DatasetService, DatavalueService, EventService,  OrganisationUnitService,  ProgramService, VisualiserService,ProgramStageSectionsService, ProgramStageDataElementService, IndicatorService, NetworkAvailability, User,OptionSetsService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
