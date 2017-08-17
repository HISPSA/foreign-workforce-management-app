import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule }   from '@angular/router';

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
import {User} from './providers/user'


@NgModule({
  declarations: [
    AppComponent,
    EventCaptureFormProviderComponent,
    OrganisationunitsComponent,
    IndicatorsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
	RouterModule.forRoot([
  {
    path: 'event',
    component: EventCaptureFormProviderComponent
  }
  ])],
  providers: [DataElementService,DashboardService, DatasetService, DatavalueService, EventService,  OrganisationUnitService,  ProgramService, VisualiserService,ProgramStageSectionsService, ProgramStageDataElementService, IndicatorService, NetworkAvailability, User ],
  bootstrap: [AppComponent]
})
export class AppModule { }
