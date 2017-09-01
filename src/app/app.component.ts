import {Component, OnInit, Input} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import 'rxjs/add/operator/toPromise';
import {DataElementService} from './providers/dataelement.service';
import {OrganisationUnitService} from './providers/organisation-unit.service';
import {User} from './providers/user';
import {OptionSetsService} from './providers/Option-sets.service';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  constructor(private dataelemetservice:DataElementService, private organisationUnitService: OrganisationUnitService, private OptionSetsService: OptionSetsService ) {


   }





}
