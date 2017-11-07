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
  applicationNotes: dataValues;

  userId: string;
  storedBy: string;
  applicantDetails: any;
  dataValuesArray: dataValues[];
  programStage:  any;
  trackEntityInstance: any;
  instanceId: string;
  orgunit: string;
  trackEntity: string;
  enrollment: Enrollments;
  applicationTypeSuccessMessage: string
  //URLs
eventurl: string= '../../../events';

  userDisplayname: string;

  outstandingDocsCheck: boolean;

  RequiredDocuments:any[];
  trackEnUrl: string;


  documentsprogram: string="FvVIOpqnKOJ";
  orgUnitSA: string = "JLA7wl59oN3";
  applicationNameValue: string;


  docs:any[];




  constructor(private dataelemetservice:DataElementService,  private OptionSetsService: OptionSetsService, private programservice: ProgramService, private user:User  ) {

    this.eventPayload = new events();
    this.applicationType =  new dataValues();
    this.applicationDate =  new dataValues();
    this.applicationStatus = new dataValues();
    this.applicationNotes = new dataValues();

    this.dataValuesArray = [];
    this.applicantDetails = [];
    this.programStage = [];
    this.apllication = [];
    this.trackEntityInstance = [];

    this.enrollment = new Enrollments();
    this.outstandingDocsCheck = false;

    this.RequiredDocuments = [];

    this.docs=[];

  }

  ngOnInit() {
    //
    const lktypeOfApplicationurl = '../../../optionSets.json?paging=false&fields=options[name]&filter=id:eq:dD5o5dzM6PO';

    const userurl = '../../../me.json';
    const programStage = '../../../programStages.json?paging=false&filter=id:eq:EaLamgPg9IE';

    const urlTrackedEntityInstance = '../../../trackedEntityInstances.json?ou=JLA7wl59oN3&paging=false&trackedEntityInstance=Z5ZQbIkSTND';
    const dataelementUrl='../../../dataElements'+'.json?paging=false&fields=:all,id,name,aggregationType,displayName,categoryCombo[id,name,categories[id,name,categoryOptions[id,name]]],dataSets[:all,!compulsoryDataElementOperands]'
    const trackEntityIntanceUrl= '../../../trackedEntityInstances.json?ou=JLA7wl59oN3&paging=false&filter=UsZ89w0XS9f:eq:';










    this.OptionSetsService.getOptionSetsService(lktypeOfApplicationurl).then(result => {this.apllication =  result.optionSets[0].options;
      console.log("This is  the array" + this.apllication);
    }).catch(error => console.log(error));


    this.user.getUser(userurl).then(result => {
      console.log(result);

      this.userId = result.id;

      this.userDisplayname = result.displayName;

      console.log("User Id is : "+ this.userId );

    this.programservice.getTrackEntityInstance(trackEntityIntanceUrl+this.userId).then(result => {this.trackEntityInstance = result.trackedEntityInstances





      console.log(this.trackEntityInstance)

      for (let trackInstance of this.trackEntityInstance ) {
            console.log("InstanceId "+  trackInstance.attribute)
            this.instanceId = trackInstance.trackedEntityInstance;
            this.orgunit =  trackInstance.orgUnit;
            this.trackEntity = trackInstance.trackedEntity;
      }
    }).catch(error => console.log(error));

    }).catch(error => console.log(error));

    this.programservice.getTrackEntityInstance(urlTrackedEntityInstance).then(result => this.applicantDetails =  result.trackedEntityInstances).catch(error => console.log(error));

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
    const urlSendEvents = '../../../events';
    const urlSendEnrol = '../../../enrollments'

    this.eventPayload = null;
    this.enrollment = null;
    this.dataValuesArray = null;

    this.eventPayload = new events();
    this.enrollment =  new Enrollments;
    this.dataValuesArray = [];
      //
    this.eventPayload.orgUnit  = this.orgunit;
    this.eventPayload.program  = "perc4ZpWBWr";
    this.eventPayload.trackedEntityInstance = this.instanceId;

    console.log(this.eventPayload.trackedEntityInstance);

    this.eventPayload.status ="COMPLETED";
  //  this.eventPayload.eventDate ="2017-10-03";
   // this.eventPayload.completedDate = new Date().getDate().toString();
    this.eventPayload.programStage = "EaLamgPg9IE";
  //  this.eventPayload.storedBy = "admin";
 //   this.applicationDate.value = new Date().getDate().toString();
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

      if ( this.applicationNotes.value)
    {
      this.applicationNotes.dataElement = "JsgUaaZqhaq";
      this.dataValuesArray.push(this.applicationNotes);
    }

    /*
        if ( this.applicationStatus.value)
        {   this.applicationStatus.dataElement = "dCJ1BpFGMyv"
          this.dataValuesArray.push(this.applicationStatus);
        }
    **/

    /*
    this.enrollment.orgUnit =  this.eventPayload.orgUnit;
    this.enrollment.program = "perc4ZpWBWr";
    this.enrollment.trackedEntity = this.trackEntity;
    this.enrollment.trackedEntityInstance = this.instanceId;
    console.log("Enrolment Payload :" + JSON.stringify(this.enrollment));
    this.programservice.registerEvent(urlSendEnrol,this.enrollment );
     */

    this.eventPayload.dataValues = this.dataValuesArray;




    console.log("Application Payload :" + JSON.stringify(this.eventPayload));
    this.programservice.registerEvent(urlSendEvents,this.eventPayload );

    if ( this.applicationType.value)
    {
this.applicationTypeSuccessMessage = this.applicationType.value;
      alert(this.userDisplayname+ " : "+ this.applicationTypeSuccessMessage+ " applied for successfuly.");
    }
  }

  ValidateApplicationRequiredDocs(){
  //check application types here and show relevant docs here under here
  }

  ValidateEnrollmentCheckDuplicates(){
    //check application types here and show relevant docs here under here
  }
  onApplicationSelection()
  {
    this.docs = [];
    this.applicationNameValue = this.applicationType.value;
    this.trackEnUrl = '../../../trackedEntityInstances.json?ou=JLA7wl59oN3&paging=false&filter=wQxl0pBY1Dq:eq:'+this.applicationNameValue+'&filter=fKLGaOy03uB:eq:true';
    this.programservice.getTrackEntityInstance(this.trackEnUrl).then(result => {this.RequiredDocuments = result.trackedEntityInstances
      console.log("Required Docs for "+this.RequiredDocuments)

      for (let document of  this.RequiredDocuments){
        for (let attr of  document.attributes  ){
          if (attr.attribute == "QJl47J6Exm0" )
          {
            this.docs.push(attr.value)

          }
        }
      }
      console.log("doc types required " +this.docs);


    }).catch(error => console.log(error));
  }

}
