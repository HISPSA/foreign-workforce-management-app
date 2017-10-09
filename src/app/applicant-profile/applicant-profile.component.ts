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
  apllication: any;

  eventPayload : events;

  applicationType: dataValues;
  applicationDate: dataValues;
  applicationStatus: dataValues;

  userId: string;
  storedBy: string;

  applicantDetails: any;



  dataValuesArray: dataValues[];
  programStage:  any;


  //URLs
eventurl: string= '../../../staging/api/';
  constructor(private dataelemetservice:DataElementService,  private OptionSetsService: OptionSetsService, private programservice: ProgramService, private user:User  ) {

    this.eventPayload = new events();

    this.applicationType =  new dataValues();
    this.applicationDate =  new dataValues();
    this.applicationStatus = new dataValues();

    this.dataValuesArray = [];
    this.applicantDetails = [];
    this.programStage = [];

    this.apllication = [];
  }

  ngOnInit() {
    //
    const lktypeOfApplicationurl = '../../../staging/api/optionSets.json?paging=false&fields=options[name]&filter=id:eq:dD5o5dzM6PO';

    const userurl = '../../../staging/api/me.json';

    const programStage = '../../../staging/api/programStages.json?paging=false&filter=id:eq:EaLamgPg9IE';

    const urlTrackedEntityInstance = '../../../staging/api/trackedEntityInstances.json?ou=JLA7wl59oN3&paging=false&trackedEntityInstance=Z5ZQbIkSTND';
    const dataelementUrl='../../../staging/api/dataElements'+'.json?paging=false&fields=:all,id,name,aggregationType,displayName,categoryCombo[id,name,categories[id,name,categoryOptions[id,name]]],dataSets[:all,!compulsoryDataElementOperands]'

    this.OptionSetsService.getOptionSetsService(lktypeOfApplicationurl).then(result => {this.apllication =  result.optionSets[0].options;
      console.log("This is  the array" + this.apllication);

    }).catch(error => console.log(error));

    this.user.getUser(userurl).then(result => {
      console.log(result); this.userId = result.id;
      console.log("User Id is : "+ this.userId );


    }).catch(error => console.log(error));

    this.programservice.getTrackEntityInstance(urlTrackedEntityInstance).then(result => this.applicantDetails =  result.trackedEntityInstances[0].attributes).catch(error => console.log(error));

    this.programservice.getTrackEntityInstance(userurl).then(result => {
      console.log(result); this.userId = result.id;
      console.log("User Id is : "+ this.userId );
    }).catch(error => console.log(error));


    this.programservice.getProgramStage(programStage).then(result => {
      console.log(result); this.userId = result.id;
      console.log("User Id is : "+ this.userId );
    }).catch(error => console.log(error));
  }

  SubmitApplication(){

    const urlSendEvents = '../../../staging/api/events';
      //
    this.eventPayload.orgUnit  = "JLA7wl59oN3";
    this.eventPayload.program  = "perc4ZpWBWr";
    this.eventPayload.trackedEntityInstance = "jWqdXOMyozX";
    this.eventPayload.status ="COMPLETED";
    this.eventPayload.eventDate ="2017-10-03";
    this.eventPayload.completedDate = "2017-10-03";
    this.eventPayload.programStage = "EaLamgPg9IE";
    this.eventPayload.storedBy = "admin";
    this.applicationDate.value = "2017-10-03";
    this.applicationStatus.value = "COMPLETED";

    if ( this.applicationType.value)
    {
      this.applicationType.dataElement = "HBI7F3arBXR";
      this.dataValuesArray.push(this.applicationType);
    }
    if ( this.applicationDate.value)
    {
      this.applicationDate.dataElement = "M9OXsIODpaY";
      this.dataValuesArray.push(this.applicationDate);
    }
/*
    if ( this.applicationStatus.value)
    {   this.applicationStatus.dataElement = "dCJ1BpFGMyv"
      this.dataValuesArray.push(this.applicationStatus);
    }
**/
    this.eventPayload.dataValues = this.dataValuesArray;
    console.log("Application Payload :" + JSON.stringify(this.eventPayload));
    this.programservice.registerEvent(urlSendEvents,this.eventPayload );
  }

  ValidateApplicationRequiredDocs(){
  //check application types here and show relevant docs here under here
  }

  ValidateEnrollmentCheckDuplicates(){
    //check application types here and show relevant docs here under here
  }

}
