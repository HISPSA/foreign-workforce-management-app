import {Component, OnInit, Input} from '@angular/core';


import 'rxjs/add/operator/toPromise';
import {DataElementService} from '../providers/dataelement.service';
import {OrganisationUnitService} from '../providers/organisation-unit.service';
import {User} from '../providers/user';
import {ProgramService} from '../providers/program.service';

import {OptionSetsService} from '../providers/Option-sets.service';
import {OptionSet} from "../option-set"

import {Attributes} from "../attributes";
import {Enrollments} from "../enrollments";
import {TrackedEntityInstancesWithoutEnrollment} from "../trackEntityInstanceWithoutEnrollment";


import {TrackedEntityInstancesPayload} from "../trackEntityInstacePayload"
import {TrackedEntityInstances} from "../tracked-entity-instances";
import {Router} from '@angular/router';

import { Http, Response, Headers, RequestOptions,ResponseOptions, URLSearchParams } from '@angular/http';


import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-application-list-view',
  templateUrl: './application-list-view.component.html',
  styleUrls: ['./application-list-view.component.css']
})
export class ApplicationListViewComponent implements OnInit {

  listOfApplications:any[];
  entityInstanceUrl:string;
  trackentityAtributeCount:number;
  trackentityInstance:string;
  userDisplayname:string;
  userId:string;

  applicantDetails:any[];

  busy: Promise<any>;

  constructor(private http:Http, private programService:ProgramService, private user:User, private dataelemetservice:DataElementService, private organisationUnitService:OrganisationUnitService, private OptionSetsService:OptionSetsService, private router:Router) {
    this.listOfApplications = [];
    this.applicantDetails = [];
  }

  ngOnInit() {

    const userurl = '../../../staging/api/me.json';


    this.user.getUser(userurl).then(result => {
      console.log(result);
      this.userDisplayname = result.displayName
      this.userId = result.id;
      console.log("User Id is : " + this.userId);

      const urlTrackedEntityInstance = '../../../staging/api/trackedEntityInstances.json?ou=JLA7wl59oN3&paging=false&filter=UsZ89w0XS9f:eq:' + this.userId;

      this.programService.getTrackEntityInstance(urlTrackedEntityInstance).then(result => {
        this.applicantDetails = result.trackedEntityInstances[0].attributes
        console.log("applicant is : " + this.applicantDetails);
        console.log("There are this number of attributes : " + Object.keys(this.applicantDetails).length);
        this.trackentityAtributeCount = Object.keys(this.applicantDetails).length;
        this.trackentityInstance = result.trackedEntityInstances[0].trackedEntityInstance;

        const listOfApplicationurl = '../../../staging/api/events.json?ou=JLA7wl59oN3&program=perc4ZpWBWr&trackedEntityInstance='+this.trackentityInstance;

        this.programService.getListOfApplications(listOfApplicationurl).then(result => {
          this.listOfApplications = result.events;
          console.log(result.events)
        }).catch(error => console.log(error));
      }).catch(error => console.log(error));
    }).catch(error => console.log(error));


  }
}
