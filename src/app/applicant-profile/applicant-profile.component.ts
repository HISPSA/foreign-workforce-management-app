import {Component, OnInit, Input} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import 'rxjs/add/operator/toPromise';
import {DataElementService} from '../providers/dataelement.service';
import {OrganisationUnitService} from '../providers/organisation-unit.service';
import {User} from '../providers/user';
import {ProgramService} from '../providers/program.service';
import {OptionSetsService} from '../providers/Option-sets.service';
import {OptionSet} from "../option-set"

import {Attributes} from "../attributes";
import {Enrollments} from "../enrollments";


import {TrackedEntityInstancesPayload} from "../trackEntityInstacePayload"
import {TrackedEntityInstances} from "../tracked-entity-instances";
import {Router} from '@angular/router';

import {dataValues} from "../dataValues";
import {events} from "../event";


@Component({
  selector: 'app-applicant-profile',
  templateUrl: './applicant-profile.component.html',
  styleUrls: ['./applicant-profile.component.css']
})
export class ApplicantProfileComponent implements OnInit {
  typeofApllication: any;
  eventPayload : events;

  applicationType: dataValues;
  applicationDate: dataValues;
  applicationStatus: dataValues;



  dataValuesArray: dataValues[];


  //URLs
eventurl: string= '../../../staging/api/';



  constructor(private dataelemetservice:DataElementService,  private OptionSetsService: OptionSetsService, private programservice: ProgramService, private user:User  ) {
  this.typeofApllication = [];
    this.eventPayload = new events();

    this.applicationType =  new dataValues();
    this.applicationDate =  new dataValues();
    this.applicationStatus = new dataValues();

    this.dataValuesArray = [];
  }

  ngOnInit() {
    const lktypeOfApplicationurl = '../../../staging/api/optionSets.json?paging=false&fields=options[name]&filter=id:eq:dD5o5dzM6PO';
    this.OptionSetsService.getOptionSetsService(lktypeOfApplicationurl).then(result => this.typeofApllication =  result.optionSets[0].options).catch(error => console.log(error));
  }

  SubmitApplication(url: string){
      //
    this.eventPayload.orgUnit  = "";
    this.eventPayload.program  = "";
    this.eventPayload.trackedEntityInstance = "";
    this.eventPayload.status ="";
    this.eventPayload.eventDate ="";
    this.eventPayload.selectedProgramStageId = "";
    this.eventPayload.storedBy = "";
    if ( this.applicationType.value)
    {
      this.applicationType.dataElement = "";
      this.dataValuesArray.push(this.applicationType);
    }

    if ( this.applicationDate.value)
    {
      this.applicationDate.dataElement = "";
      this.dataValuesArray.push(this.applicationDate);
    }

    if ( this.applicationStatus.value)
    {
      this.applicationStatus.dataElement = "";
      this.dataValuesArray.push(this.applicationStatus);
    }
    this.eventPayload.dataValues = this.dataValuesArray;
    console.log("Application Payload :" + this.eventPayload );
  }

  ValidateApplication(){

  }



}
