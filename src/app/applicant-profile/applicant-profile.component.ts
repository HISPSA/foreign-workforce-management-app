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

import { Http, Response, Headers, RequestOptions,ResponseOptions, URLSearchParams } from '@angular/http';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-applicant-profile',
  templateUrl: './applicant-profile.component.html',
  styleUrls: ['./applicant-profile.component.css']
})
export class ApplicantProfileComponent implements OnInit {
  apllication:any;
  eventPayload:events;
  applicationType:dataValues;
  applicationDate:dataValues;
  applicationStatus:dataValues;
  applicationNotes:dataValues;

  userId:string;
  storedBy:string;
  applicantDetails:any;
  dataValuesArray:dataValues[];
  programStage:any;
  trackEntityInstance:any;
  instanceId:string;
  orgunit:string;
  trackEntity:string;
  enrollment:Enrollments;
  applicationTypeSuccessMessage:string
  //URLs
  eventurl:string = '../../../events';

  userDisplayname:string = "";

  outstandingDocsCheck:boolean;

  RequiredDocuments:any[];
  trackEnUrl:string;


  documentsprogram:string = "FvVIOpqnKOJ";
  orgUnitSA:string = "JLA7wl59oN3";
  applicationNameValue:string;


  docs:any[];

  loading: boolean=false;
  //
  copyformalapplicationletterRequiredbol: boolean = false;
  copyPassportRequired: boolean  = false;
  copyOfQualificationRequired: boolean  = false;
  copyOfProffesionalRegistrationRequired: boolean = false;
  copyOfReferenceLetters: boolean = false;
  copySpouseIdRequired: boolean = false;
  copyOfMarriageCertificate: boolean = false;
  copyResidenceVISARequired: boolean = false;
  copyPoliceAffidavit: boolean = false;
  copySpouseEmploymentContract: boolean = false;
  copySpouseVISA: boolean = false;
  copySpouseLatestSalaryRequired: boolean = false;
  copySpouseEmploymentLetterRequired: boolean = false;
  copysupernumerarybol: boolean = false;
  copycvbol:boolean =false;

  selectedApplicationType: string;

  copymotivationletterfromtheuniversitybol: boolean = false;
 // copyRegistrationcertificatefromcouncilsbol: boolean = false;
  copyOriginalcertifiedcopyCertifiedcopyofvalidresidencevisabol: boolean = false;
  copyProofofcompletinginternshipSupervisedpracticebol: boolean = false;
  copyRegistrationcertificatefromcouncilsHPCSASAPCbol: boolean = false;
  copyProofofbeingsuccessfulinexamsHPCSASANCSAPCbol: boolean = false;
  copyProofcompletingcommunityservicebol: boolean = false;
  copyOfficialcopyofstampedjoboffersignedbol: boolean = false;
  copyLatestpayslipbol: boolean = false;
  copyRegistrationcertificatebol: boolean = false;
  copyMotivationletterfromemployerbol: boolean = false;
  copyReleaseletterfromcurrentemployerbol: boolean = false;
  copyLatestsalaryslipbol : boolean = false;
  copyPermanentjobofferbol: boolean = false;
  copyOfficialsupportletterfromUniversitybol: boolean = false;
   copyLetterfromthecurrentuniversitybol: boolean = false;
  copyAcceptanceletterfromSAuniversitybol: boolean = false;
  copycurriculumvitaebol: boolean = false;
  copyoriginalcertifiedreferencelettersbol: boolean = false;
  copyLetterfromtheUniversitybol: boolean = false;
  copyLetterfromthehospitalbol: boolean = false;
  copyJ1Visaformsbol: boolean = false;
  copyStudentundertakingbol: boolean = false;


  order: string = "name";
  ascending: boolean = true;
  constructor(private router:Router, private http:Http, private dataelemetservice:DataElementService, private OptionSetsService:OptionSetsService, private programservice:ProgramService, private user:User) {

    this.eventPayload = new events();
    this.applicationType = new dataValues();
    this.applicationDate = new dataValues();
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
    this.docs = [];

  }

  ngOnInit() {
    this.loading = false;
    //
    const lktypeOfApplicationurl = '../../../optionSets.json?paging=false&fields=options[name]&filter=id:eq:Pomw5weaEyx';

    const userurl = '../../../me.json';
    const programStage = '../../../programStages.json?paging=false&filter=id:eq:EaLamgPg9IE';

    const urlTrackedEntityInstance = '../../../trackedEntityInstances.json?ou=JLA7wl59oN3&paging=false&trackedEntityInstance=Z5ZQbIkSTND';
    const dataelementUrl = '../../../dataElements' + '.json?paging=false&fields=:all,id,name,aggregationType,displayName,categoryCombo[id,name,categories[id,name,categoryOptions[id,name]]],dataSets[:all,!compulsoryDataElementOperands]'
    const trackEntityIntanceUrl = '../../../trackedEntityInstances.json?ou=JLA7wl59oN3&paging=false&filter=UsZ89w0XS9f:eq:';


    this.OptionSetsService.getOptionSetsService(lktypeOfApplicationurl).then(result => {
      this.apllication = result.optionSets[0].options;
      console.log("This is  the array" + this.apllication);
    }).catch(error => console.log(error));


    this.user.getUser(userurl).then(result => {
      console.log(result);
      this.userId = result.id;
      this.userDisplayname = result.displayName;

      console.log("User Id is : " + this.userId);

      this.programservice.getTrackEntityInstance(trackEntityIntanceUrl + this.userId).then(result => {
        this.trackEntityInstance = result.trackedEntityInstances

        console.log(this.trackEntityInstance)

        for (let trackInstance of this.trackEntityInstance)
        {
          console.log("InstanceId " + trackInstance.attribute)
          this.instanceId = trackInstance.trackedEntityInstance;
          this.orgunit = trackInstance.orgUnit;
          this.trackEntity = trackInstance.trackedEntity;
        }
      }).catch(error => console.log(error));

    }).catch(error => console.log(error));

    // this.programservice.getTrackEntityInstance(urlTrackedEntityInstance).then(result => this.applicantDetails =  result.trackedEntityInstances).catch(error => console.log(error));

    this.programservice.getTrackEntityInstance(userurl).then(result => {
      console.log(result);
      this.userId = result.id;
      console.log("User Id is : " + this.userId);
    }).catch(error => console.log(error));


    this.programservice.getProgramStage(programStage).then(result => {
      console.log(result);
      this.userId = result.id;
      console.log("User Id is : " + this.userId);
    }).catch(error => console.log(error));

    this.loading = true;
  }

  SubmitApplication() {
    const urlSendEvents = '../../../events';
    const urlSendEnrol = '../../../enrollments'

    this.eventPayload = null;
    this.enrollment = null;
    this.dataValuesArray = null;

    this.eventPayload = new events();
    this.enrollment = new Enrollments;
    this.dataValuesArray = [];
    //
    this.eventPayload.orgUnit = this.orgunit;
    this.eventPayload.program = "perc4ZpWBWr";
    this.eventPayload.trackedEntityInstance = this.instanceId;

    console.log(this.eventPayload.trackedEntityInstance);

    this.eventPayload.status = "COMPLETED";
    //  this.eventPayload.eventDate ="2017-10-03";
    // this.eventPayload.completedDate = new Date().getDate().toString();
    this.eventPayload.programStage = "EaLamgPg9IE";
    //  this.eventPayload.storedBy = "admin";
    //   this.applicationDate.value = new Date().getDate().toString();
    this.applicationStatus.value = "COMPLETED";

    if (this.applicationType.value) {
      this.applicationType.dataElement = "HBI7F3arBXR";
      this.dataValuesArray.push(this.applicationType);
    }
    if (this.applicationDate.value) {
      this.applicationDate.dataElement = "M9OXsIODpaY";
      this.dataValuesArray.push(this.applicationDate);
    }

    if (this.applicationNotes.value) {
      this.applicationNotes.dataElement = "JsgUaaZqhaq";
      this.dataValuesArray.push(this.applicationNotes);
    }

    if (this.applicationStatus.value) {
      this.applicationStatus.dataElement = "dCJ1BpFGMyv";
      this.dataValuesArray.push(this.applicationStatus);
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
    this.programservice.registerEvent(urlSendEvents, this.eventPayload);

    if (this.applicationType.value) {
      this.applicationTypeSuccessMessage = this.applicationType.value;
      alert(this.userDisplayname + " : " + this.applicationTypeSuccessMessage + " applied for successfuly.");
    }
  }

  ValidateApplicationRequiredDocs() {
    //check application types here and show relevant docs here under here
  }

  ValidateEnrollmentCheckDuplicates() {
    //check application types here and show relevant docs here under here
  }

  onApplicationSelection($event) {

    console.log("selected dropdown value: " +$event.target.value);

    this.selectedApplicationType = $event.target.value;




    this.docs = [];
    this.applicationNameValue = this.applicationType.value;
    this.trackEnUrl = '../../../trackedEntityInstances.json?ou=JLA7wl59oN3&program=FvVIOpqnKOJ&paging=false&filter=wQxl0pBY1Dq:eq:' + this.applicationNameValue + '&filter=fKLGaOy03uB:eq:true';
    this.programservice.getTrackEntityInstance(this.trackEnUrl).then(result => {
      this.RequiredDocuments = result.trackedEntityInstances;


      console.log("Required Docs for " + this.RequiredDocuments)

      if (this.selectedApplicationType.trim() == "First Time Application"){
        this.copyformalapplicationletterRequiredbol= false
        this.copyPassportRequired=true;
        this.copyOfQualificationRequired= true;
        this.copyOfProffesionalRegistrationRequired=true;
        this.copyOfReferenceLetters=true;
        this.copySpouseIdRequired=true;
        this.copyOfMarriageCertificate=true;
        this.copyResidenceVISARequired=true;
        this.copyPoliceAffidavit=true;
        this.copySpouseEmploymentContract=true;
        this.copySpouseVISA=true;
        this.copySpouseLatestSalaryRequired=true;
        this.copySpouseEmploymentLetterRequired=true;
        this.copycvbol = true;
      }
      else if (this.selectedApplicationType.trim() == "Supervise Practice"){
        this.copyformalapplicationletterRequiredbol= false
        this.copyPassportRequired=true;
        this.copyOfQualificationRequired= true;

        //Proof of being successful in exams (HPCSA)

        this.copyOfProffesionalRegistrationRequired=false;
        this.copyOfReferenceLetters=false;
        this.copySpouseIdRequired=false;
        this.copyOfMarriageCertificate=false;
        this.copyResidenceVISARequired=true;
        this.copyPoliceAffidavit=false;
        this.copySpouseEmploymentContract=false;
        this.copySpouseVISA=false;
        this.copySpouseLatestSalaryRequired=false;
        this.copySpouseEmploymentLetterRequired=false;
        this.copycvbol = true;


        //additional applications

        this.copymotivationletterfromtheuniversitybol=false;
        // copyRegistrationcertificatefromcouncilsbol
        this.copyOriginalcertifiedcopyCertifiedcopyofvalidresidencevisabol=true;
        this.copyProofofcompletinginternshipSupervisedpracticebol=false;
        this.copyRegistrationcertificatefromcouncilsHPCSASAPCbol=false;
        this.copyProofofbeingsuccessfulinexamsHPCSASANCSAPCbol=true;
        this.copyProofcompletingcommunityservicebol=false;
        this.copyOfficialcopyofstampedjoboffersignedbol=false;
        this.copyLatestpayslipbol=false;
        this.copyRegistrationcertificatebol=false;
        this.copyMotivationletterfromemployerbol=false;
        this.copyReleaseletterfromcurrentemployerbol=false;
        this.copyLatestsalaryslipbol=false;
        this.copyPermanentjobofferbol=false;
        this.copyOfficialsupportletterfromUniversitybol=false;
        this.copyLetterfromthecurrentuniversitybol=false;
        this.copyAcceptanceletterfromSAuniversitybol=false;
        this.copycurriculumvitaebol=false;
        this.copyoriginalcertifiedreferencelettersbol=false;
        this.copyLetterfromtheUniversitybol=false;
        this.copyLetterfromthehospitalbol=false;
        this.copyJ1Visaformsbol=false;
        this.copyStudentundertakingbol=false;
      }
      else if (this.selectedApplicationType.trim() == "Extensions"){
        this.copyformalapplicationletterRequiredbol= true;
        this.copyPassportRequired=true;
        this.copyOfQualificationRequired= false;
        this.copyOfProffesionalRegistrationRequired=false;
        this.copyOfReferenceLetters=true;
        this.copySpouseIdRequired=false;
        this.copyOfMarriageCertificate=false;
        this.copyResidenceVISARequired=false;
        this.copyPoliceAffidavit=false;
        this.copySpouseEmploymentContract=false;
        this.copySpouseVISA=false;
        this.copySpouseLatestSalaryRequired=true;
        this.copySpouseEmploymentLetterRequired=false;
        this.copycvbol = true;

        //additional applications

        this.copymotivationletterfromtheuniversitybol=false;
        // copyRegistrationcertificatefromcouncilsbol
        this.copyOriginalcertifiedcopyCertifiedcopyofvalidresidencevisabol=false;
        this.copyProofofcompletinginternshipSupervisedpracticebol=false;
        this.copyRegistrationcertificatefromcouncilsHPCSASAPCbol=false;
        this.copyProofofbeingsuccessfulinexamsHPCSASANCSAPCbol=false;
        this.copyProofcompletingcommunityservicebol=false;
        this.copyOfficialcopyofstampedjoboffersignedbol=false;
        this.copyLatestpayslipbol=true;
        this.copyRegistrationcertificatebol=false;
        this.copyMotivationletterfromemployerbol=true;
        this.copyReleaseletterfromcurrentemployerbol=false;
        this.copyLatestsalaryslipbol=false;
        this.copyPermanentjobofferbol=false;
        this.copyOfficialsupportletterfromUniversitybol=false;
        this.copyLetterfromthecurrentuniversitybol=false;
        this.copyAcceptanceletterfromSAuniversitybol=false;
        this.copycurriculumvitaebol=false;
        this.copyoriginalcertifiedreferencelettersbol=false;
        this.copyLetterfromtheUniversitybol=false;
        this.copyLetterfromthehospitalbol=false;
        this.copyJ1Visaformsbol=false;
        this.copyStudentundertakingbol=false;

      }
      else if (this.selectedApplicationType.trim() == "Permanent Residence"){
        this.copyformalapplicationletterRequiredbol= false;
        this.copyPassportRequired=true;
        this.copyOfQualificationRequired= false;
        this.copyOfProffesionalRegistrationRequired=false;
        this.copyOfReferenceLetters=true;
        this.copySpouseIdRequired=false;
        this.copyOfMarriageCertificate=false;
        this.copyResidenceVISARequired=false;
        this.copyPoliceAffidavit=true;
        this.copySpouseEmploymentContract=false;
        this.copySpouseVISA=true;
        this.copySpouseLatestSalaryRequired=true;
        this.copySpouseEmploymentLetterRequired=false;
        this.copycvbol = true;


        //additional applications

        this.copymotivationletterfromtheuniversitybol=true;
        // copyRegistrationcertificatefromcouncilsbol
        this.copyOriginalcertifiedcopyCertifiedcopyofvalidresidencevisabol=false;
        this.copyProofofcompletinginternshipSupervisedpracticebol=false;
        this.copyRegistrationcertificatefromcouncilsHPCSASAPCbol=true;
        this.copyProofofbeingsuccessfulinexamsHPCSASANCSAPCbol=false;
        this.copyProofcompletingcommunityservicebol=false;
        this.copyOfficialcopyofstampedjoboffersignedbol=false;
        this.copyLatestpayslipbol=true;
        this.copyRegistrationcertificatebol=false;
        this.copyMotivationletterfromemployerbol=true;
        this.copyReleaseletterfromcurrentemployerbol=false;
        this.copyLatestsalaryslipbol=false;
        this.copyPermanentjobofferbol=true;
        this.copyOfficialsupportletterfromUniversitybol=false;
        this.copyLetterfromthecurrentuniversitybol=false;
        this.copyAcceptanceletterfromSAuniversitybol=false;
        this.copycurriculumvitaebol=false;
        this.copyoriginalcertifiedreferencelettersbol=false;
        this.copyLetterfromtheUniversitybol=false;
        this.copyLetterfromthehospitalbol=false;
        this.copyJ1Visaformsbol=false;
        this.copyStudentundertakingbol=false;

      }
      else if (this.selectedApplicationType.trim() == "Transfer"){
        this.copyformalapplicationletterRequiredbol= false
        this.copyPassportRequired=false;
        this.copyOfQualificationRequired= false;
        this.copyOfProffesionalRegistrationRequired=false;
        this.copyOfReferenceLetters=false;
        this.copyOfMarriageCertificate=false;
        this.copyResidenceVISARequired=false;
        this.copyPoliceAffidavit=false;
        this.copySpouseEmploymentContract=false;
        this.copySpouseVISA=true;
        this.copySpouseLatestSalaryRequired=true;
        this.copySpouseEmploymentLetterRequired=false;

        this.copySpouseIdRequired=true;
        this.copycvbol = true;


        //additional applications

        this.copymotivationletterfromtheuniversitybol=false;
        // copyRegistrationcertificatefromcouncilsbol
        this.copyOriginalcertifiedcopyCertifiedcopyofvalidresidencevisabol=false;
        this.copyProofofcompletinginternshipSupervisedpracticebol=false;
        this.copyRegistrationcertificatefromcouncilsHPCSASAPCbol=true;
        this.copyProofofbeingsuccessfulinexamsHPCSASANCSAPCbol=false;
        this.copyProofcompletingcommunityservicebol=false;
        this.copyOfficialcopyofstampedjoboffersignedbol=true;
        this.copyLatestpayslipbol=true;
        this.copyRegistrationcertificatebol=false;
        this.copyMotivationletterfromemployerbol=false;
        this.copyReleaseletterfromcurrentemployerbol=true;
        this.copyPermanentjobofferbol=false;
        this.copyOfficialsupportletterfromUniversitybol=false;
        this.copyLetterfromthecurrentuniversitybol=false;
        this.copyAcceptanceletterfromSAuniversitybol=false;
        this.copycurriculumvitaebol=false;
        this.copyoriginalcertifiedreferencelettersbol=false;
        this.copyLetterfromtheUniversitybol=false;
        this.copyLetterfromthehospitalbol=true;
        this.copyJ1Visaformsbol=false;
        this.copyStudentundertakingbol=false;
      }
      else if (this.selectedApplicationType.trim() == "Internship") {
        this.copyformalapplicationletterRequiredbol= true
        this.copyPassportRequired=false;
        this.copyOfQualificationRequired= false;
        this.copyOfProffesionalRegistrationRequired=false;
        this.copyOfReferenceLetters=true;
        this.copySpouseIdRequired=false;
        this.copyOfMarriageCertificate=true;
        this.copyResidenceVISARequired=false;
        this.copyPoliceAffidavit=false;
        this.copySpouseEmploymentContract=false;
        this.copySpouseVISA=false;
        this.copySpouseLatestSalaryRequired=false;
        this.copySpouseEmploymentLetterRequired=false;
        this.copycvbol = true;


        //additional applications

        this.copymotivationletterfromtheuniversitybol=false;
        // copyRegistrationcertificatefromcouncilsbol
        this.copyOriginalcertifiedcopyCertifiedcopyofvalidresidencevisabol=false;
        this.copyProofofcompletinginternshipSupervisedpracticebol=false;
        this.copyRegistrationcertificatefromcouncilsHPCSASAPCbol=true;
        this.copyProofofbeingsuccessfulinexamsHPCSASANCSAPCbol=false;
        this.copyProofcompletingcommunityservicebol=false;
        this.copyOfficialcopyofstampedjoboffersignedbol=true;
        this.copyLatestpayslipbol=false;
        this.copyRegistrationcertificatebol=false;
        this.copyMotivationletterfromemployerbol=false;
        this.copyReleaseletterfromcurrentemployerbol=false;
        this.copyLatestsalaryslipbol=false;
        this.copyPermanentjobofferbol=false;
        this.copyOfficialsupportletterfromUniversitybol=false;
        this.copyLetterfromthecurrentuniversitybol=false;
        this.copyAcceptanceletterfromSAuniversitybol=false;
        this.copycurriculumvitaebol=false;
        this.copyoriginalcertifiedreferencelettersbol=false;
        this.copyLetterfromtheUniversitybol=false;
        this.copyLetterfromthehospitalbol=false;
        this.copyJ1Visaformsbol=false;
        this.copyStudentundertakingbol=false;

      }
      else if (this.selectedApplicationType.trim() == "Community Service"){
        this.copyformalapplicationletterRequiredbol= false
        this.copyPassportRequired=true;
        this.copyOfQualificationRequired= false;
        this.copyOfProffesionalRegistrationRequired=false;
        this.copyOfReferenceLetters=false;
        this.copySpouseIdRequired=false;
        this.copyOfMarriageCertificate=false;
        this.copyResidenceVISARequired=false;
        this.copyPoliceAffidavit=false;
        this.copySpouseEmploymentContract=false;
        this.copySpouseVISA=false;
        this.copySpouseLatestSalaryRequired=false;
        this.copySpouseEmploymentLetterRequired=false;
        this.copycvbol = true;


        //additional applications

        this.copymotivationletterfromtheuniversitybol=false;
        // copyRegistrationcertificatefromcouncilsbol
        this.copyOriginalcertifiedcopyCertifiedcopyofvalidresidencevisabol=false;
        this.copyProofofcompletinginternshipSupervisedpracticebol=true;
        this.copyRegistrationcertificatefromcouncilsHPCSASAPCbol=true;
        this.copyProofofbeingsuccessfulinexamsHPCSASANCSAPCbol=false;
        this.copyProofcompletingcommunityservicebol=false;
        this.copyOfficialcopyofstampedjoboffersignedbol=false;
        this.copyLatestpayslipbol=false;
        this.copyRegistrationcertificatebol=false;
        this.copyMotivationletterfromemployerbol=false;
        this.copyReleaseletterfromcurrentemployerbol=false;
        this.copyLatestsalaryslipbol=false;
        this.copyPermanentjobofferbol=false;
        this.copyOfficialsupportletterfromUniversitybol=false;
        this.copyLetterfromthecurrentuniversitybol=false;
        this.copyAcceptanceletterfromSAuniversitybol=false;
        this.copycurriculumvitaebol=false;
        this.copyoriginalcertifiedreferencelettersbol=false;
        this.copyLetterfromtheUniversitybol=false;
        this.copyLetterfromthehospitalbol=false;
        this.copyJ1Visaformsbol=false;
        this.copyStudentundertakingbol=false;

      }
      else if (this.selectedApplicationType.trim() == "Seeking employment"){
        this.copyformalapplicationletterRequiredbol= false
        this.copyPassportRequired=true;
        this.copyOfQualificationRequired= false;
        this.copyOfProffesionalRegistrationRequired=true;
        this.copyOfReferenceLetters=true;
        this.copySpouseIdRequired=false;
        this.copyOfMarriageCertificate=false;
        this.copyResidenceVISARequired=false;
        this.copyPoliceAffidavit=false;
        this.copySpouseEmploymentContract=false;
        this.copySpouseVISA=true;
        this.copySpouseLatestSalaryRequired=false;
        this.copySpouseEmploymentLetterRequired=false;
        this.copycvbol = true;


        //additional applications

        this.copymotivationletterfromtheuniversitybol=false;
        // copyRegistrationcertificatefromcouncilsbol
        this.copyOriginalcertifiedcopyCertifiedcopyofvalidresidencevisabol=false;
        this.copyProofofcompletinginternshipSupervisedpracticebol=false;
        this.copyRegistrationcertificatefromcouncilsHPCSASAPCbol=false;
        this.copyProofofbeingsuccessfulinexamsHPCSASANCSAPCbol=false;
        this.copyProofcompletingcommunityservicebol=false;
        this.copyOfficialcopyofstampedjoboffersignedbol=false;
        this.copyLatestpayslipbol=false;
        this.copyRegistrationcertificatebol=false;
        this.copyMotivationletterfromemployerbol=false;
        this.copyReleaseletterfromcurrentemployerbol=false;
        this.copyLatestsalaryslipbol=false;
        this.copyPermanentjobofferbol=false;
        this.copyOfficialsupportletterfromUniversitybol=false;
        this.copyLetterfromthecurrentuniversitybol=false;
        this.copyAcceptanceletterfromSAuniversitybol=false;
        this.copycurriculumvitaebol=false;
        this.copyoriginalcertifiedreferencelettersbol=false;
        this.copyLetterfromtheUniversitybol=false;
        this.copyLetterfromthehospitalbol=false;
        this.copyJ1Visaformsbol=false;
        this.copyStudentundertakingbol=false;

      }
      else if (this.selectedApplicationType.trim() == "Registration and Employment"){
        this.copyformalapplicationletterRequiredbol= true
        this.copyPassportRequired=true;
        this.copyOfQualificationRequired= true;
        this.copyOfProffesionalRegistrationRequired=true;
        this.copyOfReferenceLetters=true;
        this.copySpouseIdRequired=false;
        this.copyOfMarriageCertificate=false;
        this.copyResidenceVISARequired=true;
        this.copyPoliceAffidavit=false;
        this.copySpouseEmploymentContract=false;
        this.copySpouseVISA=true;
        this.copySpouseLatestSalaryRequired=false;
        this.copySpouseEmploymentLetterRequired=false;
        this.copycvbol = true;

        //additional applications

        this.copymotivationletterfromtheuniversitybol=false;
        // copyRegistrationcertificatefromcouncilsbol
        this.copyOriginalcertifiedcopyCertifiedcopyofvalidresidencevisabol=false;
        this.copyProofofcompletinginternshipSupervisedpracticebol=false;
        this.copyRegistrationcertificatefromcouncilsHPCSASAPCbol=false;
        this.copyProofofbeingsuccessfulinexamsHPCSASANCSAPCbol=false;
        this.copyProofcompletingcommunityservicebol=true;
        this.copyOfficialcopyofstampedjoboffersignedbol=true;
        this.copyLatestpayslipbol=false;
        this.copyRegistrationcertificatebol=false;
        this.copyMotivationletterfromemployerbol=false;
        this.copyReleaseletterfromcurrentemployerbol=false;
        this.copyLatestsalaryslipbol=false;
        this.copyPermanentjobofferbol=false;
        this.copyOfficialsupportletterfromUniversitybol=false;
        this.copyLetterfromthecurrentuniversitybol=false;
        this.copyAcceptanceletterfromSAuniversitybol=false;
        this.copycurriculumvitaebol=false;
        this.copyoriginalcertifiedreferencelettersbol=false;
        this.copyLetterfromtheUniversitybol=false;
        this.copyLetterfromthehospitalbol=false;
        this.copyJ1Visaformsbol=false;
        this.copyStudentundertakingbol=false;
      }

      else if (this.selectedApplicationType.trim() == "Volunteer"){
        this.copyformalapplicationletterRequiredbol= true
        this.copyPassportRequired=true;
        this.copyOfQualificationRequired= true;
        this.copyOfProffesionalRegistrationRequired=false;
        this.copyOfReferenceLetters=false;
        this.copySpouseIdRequired=false;
        this.copyOfMarriageCertificate=false;
        this.copyResidenceVISARequired=false;
        this.copyPoliceAffidavit=false;
        this.copySpouseEmploymentContract=false;
        this.copySpouseVISA=false;
        this.copySpouseLatestSalaryRequired=false;
        this.copySpouseEmploymentLetterRequired=false;
        this.copycvbol = true;


        //additional applications

        this.copymotivationletterfromtheuniversitybol=false;
        // copyRegistrationcertificatefromcouncilsbol
        this.copyOriginalcertifiedcopyCertifiedcopyofvalidresidencevisabol=false;
        this.copyProofofcompletinginternshipSupervisedpracticebol=false;
        this.copyRegistrationcertificatefromcouncilsHPCSASAPCbol=false;
        this.copyProofofbeingsuccessfulinexamsHPCSASANCSAPCbol=false;
        this.copyProofcompletingcommunityservicebol=false;
        this.copyOfficialcopyofstampedjoboffersignedbol=true;
        this.copyLatestpayslipbol=false;
        this.copyRegistrationcertificatebol=false;
        this.copyMotivationletterfromemployerbol=false;
        this.copyReleaseletterfromcurrentemployerbol=false;
        this.copyLatestsalaryslipbol=false;
        this.copyPermanentjobofferbol=false;
        this.copyOfficialsupportletterfromUniversitybol=false;
        this.copyLetterfromthecurrentuniversitybol=false;
        this.copyAcceptanceletterfromSAuniversitybol=false;
        this.copycurriculumvitaebol=false;
        this.copyoriginalcertifiedreferencelettersbol=true;
        this.copyLetterfromtheUniversitybol=false;
        this.copyLetterfromthehospitalbol=false;
        this.copyJ1Visaformsbol=false;
        this.copyStudentundertakingbol=false;

      }
      else if (this.selectedApplicationType.trim() == "Postgraduate Studies: University Exams") {
        this.copyformalapplicationletterRequiredbol= false
        this.copyPassportRequired=false;
        this.copyOfQualificationRequired= false;
        this.copyOfProffesionalRegistrationRequired=false;
        this.copyOfReferenceLetters=false;
        this.copySpouseIdRequired=false;
        this.copyOfMarriageCertificate=false;
        this.copyResidenceVISARequired=false;
        this.copyPoliceAffidavit=false;
        this.copySpouseEmploymentContract=false;
        this.copySpouseVISA=true;
        this.copySpouseLatestSalaryRequired=false;
        this.copySpouseEmploymentLetterRequired=false;
        this.copycvbol = true;


        //additional applications

        this.copymotivationletterfromtheuniversitybol=false;
        // copyRegistrationcertificatefromcouncilsbol
        this.copyOriginalcertifiedcopyCertifiedcopyofvalidresidencevisabol=false;
        this.copyProofofcompletinginternshipSupervisedpracticebol=false;
        this.copyRegistrationcertificatefromcouncilsHPCSASAPCbol=false;
        this.copyProofofbeingsuccessfulinexamsHPCSASANCSAPCbol=false;
        this.copyProofcompletingcommunityservicebol=false;
        this.copyOfficialcopyofstampedjoboffersignedbol=false;
        this.copyLatestpayslipbol=false;
        this.copyRegistrationcertificatebol=false;
        this.copyMotivationletterfromemployerbol=false;
        this.copyReleaseletterfromcurrentemployerbol=false;
        this.copyLatestsalaryslipbol=false;
        this.copyPermanentjobofferbol=false;
        this.copyOfficialsupportletterfromUniversitybol=false;
        this.copyLetterfromthecurrentuniversitybol=false;
        this.copyAcceptanceletterfromSAuniversitybol=false;
        this.copycurriculumvitaebol=false;
        this.copyoriginalcertifiedreferencelettersbol=false;
        this.copyLetterfromtheUniversitybol=false;
        this.copyLetterfromthehospitalbol=false;
        this.copyJ1Visaformsbol=false;
        this.copyStudentundertakingbol=false;
      }

      else if (this.selectedApplicationType == "Exchange Programme") {

        this.copyformalapplicationletterRequiredbol= false
        this.copyPassportRequired=true;
        this.copyOfQualificationRequired= false;
        this.copyOfProffesionalRegistrationRequired=false;
        this.copyOfReferenceLetters=false;
        this.copySpouseIdRequired=false;
        this.copyOfMarriageCertificate=false;
        this.copyResidenceVISARequired=false;
        this.copyPoliceAffidavit=false;
        this.copySpouseEmploymentContract=false;
        this.copySpouseVISA=false;
        this.copySpouseLatestSalaryRequired=false;
        this.copySpouseEmploymentLetterRequired=false;
        this.copycvbol = true;



        //additional applications

        this.copymotivationletterfromtheuniversitybol=false;
        // copyRegistrationcertificatefromcouncilsbol
        this.copyOriginalcertifiedcopyCertifiedcopyofvalidresidencevisabol=false;
        this.copyProofofcompletinginternshipSupervisedpracticebol=false;
        this.copyRegistrationcertificatefromcouncilsHPCSASAPCbol=false;
        this.copyProofofbeingsuccessfulinexamsHPCSASANCSAPCbol=false;
        this.copyProofcompletingcommunityservicebol=false;
        this.copyOfficialcopyofstampedjoboffersignedbol=false;
        this.copyLatestpayslipbol=false;
        this.copyRegistrationcertificatebol=false;
        this.copyMotivationletterfromemployerbol=false;
        this.copyReleaseletterfromcurrentemployerbol=false;
        this.copyLatestsalaryslipbol=false;
        this.copyPermanentjobofferbol=false;
        this.copyOfficialsupportletterfromUniversitybol=false;
        this.copyLetterfromthecurrentuniversitybol=false;
        this.copyAcceptanceletterfromSAuniversitybol=true;
        this.copycurriculumvitaebol=true;
        this.copyoriginalcertifiedreferencelettersbol=false;
        this.copyLetterfromtheUniversitybol=true;
        this.copyLetterfromthehospitalbol=false;
        this.copyJ1Visaformsbol=false;
        this.copyStudentundertakingbol=false;


      }
      else if (this.selectedApplicationType == "Registration and Employment") {
        this.copyformalapplicationletterRequiredbol= false
        this.copyPassportRequired=false;
        this.copyOfQualificationRequired= false;
        this.copyOfProffesionalRegistrationRequired=false;
        this.copyOfReferenceLetters=false;
        this.copySpouseIdRequired=false;
        this.copyOfMarriageCertificate=false;
        this.copyResidenceVISARequired=false;
        this.copyPoliceAffidavit=false;
        this.copySpouseEmploymentContract=false;
        this.copySpouseVISA=true;
        this.copySpouseLatestSalaryRequired=false;
        this.copySpouseEmploymentLetterRequired=true;
        this.copycvbol = true;


        //additional applications

        this.copymotivationletterfromtheuniversitybol=false;
        // copyRegistrationcertificatefromcouncilsbol
        this.copyOriginalcertifiedcopyCertifiedcopyofvalidresidencevisabol=false;
        this.copyProofofcompletinginternshipSupervisedpracticebol=false;
        this.copyRegistrationcertificatefromcouncilsHPCSASAPCbol=false;
        this.copyProofofbeingsuccessfulinexamsHPCSASANCSAPCbol=false;
        this.copyProofcompletingcommunityservicebol=false;
        this.copyOfficialcopyofstampedjoboffersignedbol=false;
        this.copyLatestpayslipbol=false;
        this.copyRegistrationcertificatebol=false;
        this.copyMotivationletterfromemployerbol=false;
        this.copyReleaseletterfromcurrentemployerbol=false;
        this.copyLatestsalaryslipbol=false;
        this.copyPermanentjobofferbol=false;
        this.copyOfficialsupportletterfromUniversitybol=false;
        this.copyLetterfromthecurrentuniversitybol=false;
        this.copyAcceptanceletterfromSAuniversitybol=false;
        this.copycurriculumvitaebol=false;
        this.copyoriginalcertifiedreferencelettersbol=false;
        this.copyLetterfromtheUniversitybol=false;
        this.copyLetterfromthehospitalbol=false;
        this.copyJ1Visaformsbol=false;
        this.copyStudentundertakingbol=false;

      }
      else if (this.selectedApplicationType == "Supernumerary") {
        this.copyformalapplicationletterRequiredbol= false
        this.copyPassportRequired=false;
        this.copyOfQualificationRequired= false;
        this.copyOfProffesionalRegistrationRequired=false;
        this.copyOfReferenceLetters=false;
        this.copySpouseIdRequired=false;
        this.copyOfMarriageCertificate=false;
        this.copyResidenceVISARequired=false;
        this.copyPoliceAffidavit=false;
        this.copySpouseEmploymentContract=false;
        this.copySpouseVISA=true;
        this.copySpouseLatestSalaryRequired=false;
        this.copySpouseEmploymentLetterRequired=true;
        this.copycvbol = true;


        //additional applications

        this.copymotivationletterfromtheuniversitybol=false;
        // copyRegistrationcertificatefromcouncilsbol
        this.copyOriginalcertifiedcopyCertifiedcopyofvalidresidencevisabol=false;
        this.copyProofofcompletinginternshipSupervisedpracticebol=false;
        this.copyRegistrationcertificatefromcouncilsHPCSASAPCbol=false;
        this.copyProofofbeingsuccessfulinexamsHPCSASANCSAPCbol=false;
        this.copyProofcompletingcommunityservicebol=false;
        this.copyOfficialcopyofstampedjoboffersignedbol=false;
        this.copyLatestpayslipbol=false;
        this.copyRegistrationcertificatebol=false;
        this.copyMotivationletterfromemployerbol=false;
        this.copyReleaseletterfromcurrentemployerbol=false;
        this.copyLatestsalaryslipbol=false;
        this.copyPermanentjobofferbol=false;
        this.copyOfficialsupportletterfromUniversitybol=false;
        this.copyLetterfromthecurrentuniversitybol=false;
        this.copyAcceptanceletterfromSAuniversitybol=false;
        this.copycurriculumvitaebol=false;
        this.copyoriginalcertifiedreferencelettersbol=false;
        this.copyLetterfromtheUniversitybol=true;
        this.copyLetterfromthehospitalbol=true;
        this.copyJ1Visaformsbol=true;
        this.copyStudentundertakingbol=true;
      }

      if (Object.keys(this.RequiredDocuments).length > 0) {
        this.outstandingDocsCheck = true;

        for (let document of this.RequiredDocuments
      )
        {
          for (let attr of document.attributes
        )
          {
            if (attr.attribute == "QJl47J6Exm0") {
              this.docs.push(attr.value)
            }
          }
        }
        console.log("doc types required " + this.docs);

        this.docs = this.docs.sort();

      }
    }).catch(error => console.log(error));
  }

  //create TrackedEntityInstance profile on load if it does not exist

  onFileChange(event) {
    const fileResourceURL = '../../../fileResources';

    let fileList:FileList = event.target.files;
    let file:File = event.target.files[0];
    let fileSize:number = fileList[0].size;

    let filetype:any = fileList[0].type;

    console.log(event.target.files[0])
    console.log(event.target.name)


    //all events for file uploads must go in here. If a file is not .pdf do not upload it

    if (filetype == "application/pdf") {

      //check the file size here if bigger than 2MB do not allow upload
      if (fileSize > 2097152) {
      }
      //events will go in here and that is  it
      else {
        //events for file upload in here

      }
    } else {
      alert("Only pdf files are allowed uploaded ");
    }


    if (event.target.name == "Gcpk3BqfTfY") {
      //post a file here and get the id from the response
      let passportfileformData:FormData = new FormData();
      // passportfileformData.append('file',file.name);

      let headers = new Headers();
      headers.set('Accept', 'application/json');
      let options = new RequestOptions({headers: headers});
      passportfileformData.append("file", file, file.name);

      this.http.post(fileResourceURL, passportfileformData, options).map(res => res.json()).catch(error => Observable.throw(error)).subscribe(
          data => {
          // Consume Files
          // get the file uuid and store it.
          console.log(data);
          console.log(data.response.fileResource.id);
          //  this.attrFilePassportId =data.response.fileResource.id;

          fileList = null;
        },
          error => {
          console.log(error)
        },
        () => {
          //this.sleep(1000).then(() =>
          // .. Post Upload Delayed Action

        });
    }

    if (event.target.name == "wKg02nSAnth") {
      let cvfileformData:FormData = new FormData();

      let headers = new Headers();
      headers.set('Accept', 'application/json');
      let options = new RequestOptions({headers: headers});
      cvfileformData.append("file", file, file.name);

      this.http.post(fileResourceURL, cvfileformData, options).map(res => res.json()).catch(error => Observable.throw(error)).subscribe(
          data => {
          // Consume Files
          // get the file uuid and store it.
          console.log(data);
          console.log(data.response.fileResource.id);
          //   this.attrFileCVId =data.response.fileResource.id;
          fileList = null;
        },
          error => {
          console.log(error)
        },
        () => {
          //this.sleep(1000).then(() =>
          // .. Post Upload Delayed Action

        });
    }
    if (event.target.name == "kL7nLPq9HmS") {
      let profRegfileformData:FormData = new FormData();

      let headers = new Headers();
      headers.set('Accept', 'application/json');
      let options = new RequestOptions({headers: headers});
      profRegfileformData.append("file", file, file.name);

      this.http.post(fileResourceURL, profRegfileformData, options).map(res => res.json()).catch(error => Observable.throw(error)).subscribe(
          data => {
          // Consume Files
          // get the file uuid and store it.
          console.log(data);
          console.log(data.response.fileResource.id);
          // this.attrFileProfRegistrationId =data.response.fileResource.id;
          fileList = null;
        },
          error => {
          console.log(error)
        },
        () => {
          //this.sleep(1000).then(() =>
          // .. Post Upload Delayed Action

        });

    }
    if (event.target.name == "TeUV3frsYEc") {
      let RefLetterformData:FormData = new FormData();

      let headers = new Headers();
      headers.set('Accept', 'application/json');
      let options = new RequestOptions({headers: headers});
      RefLetterformData.append("file", file, file.name);

      this.http.post(fileResourceURL, RefLetterformData, options).map(res => res.json()).catch(error => Observable.throw(error)).subscribe(
          data => {
          // Consume Files
          // get the file uuid and store it.
          console.log(data);
          console.log(data.response.fileResource.id);
          //     this.attrFileRefLetterId =data.response.fileResource.id;
          fileList = null;
        },
          error => {
          console.log(error)
        },
        () => {
          //this.sleep(1000).then(() =>
          // .. Post Upload Delayed Action

        });
    }

    //duplicate
    if (event.target.name == "QCGwC8WHzIV") {
      let lifePatnerFileformData:FormData = new FormData();

      let headers = new Headers();
      headers.set('Accept', 'application/json');
      let options = new RequestOptions({headers: headers});
      lifePatnerFileformData.append("file", file, file.name);

      this.http.post(fileResourceURL, lifePatnerFileformData, options).map(res => res.json()).catch(error => Observable.throw(error)).subscribe(
          data => {
          // Consume Files
          // get the file uuid and store it.
          console.log(data);
          console.log(data.response.fileResource.id);
          //   this.attrFileSpouseIDId =data.response.fileResource.id;
          fileList = null;
        },
          error => {
          console.log(error)
        },
        () => {
          //this.sleep(1000).then(() =>
          // .. Post Upload Delayed Action

        });

    }

    if (event.target.name == "OOCZMGkv1SF") {
      let affidavitFileformData:FormData = new FormData();

      let headers = new Headers();
      headers.set('Accept', 'application/json');
      let options = new RequestOptions({headers: headers});
      affidavitFileformData.append("file", file, file.name);

      this.http.post(fileResourceURL, affidavitFileformData, options).map(res => res.json()).catch(error => Observable.throw(error)).subscribe(
          data => {
          // Consume Files
          // get the file uuid and store it.
          console.log(data);
          console.log(data.response.fileResource.id);
          //   this.attrFileAffidavitId =data.response.fileResource.id;
          fileList = null;
        },
          error => {
          console.log(error)
        },
        () => {
          //this.sleep(1000).then(() =>
          // .. Post Upload Delayed Action

        });
    }

    if (event.target.name == "BnAeQ9CfPqD") {
      let spouseContractFileIdformData:FormData = new FormData();

      let headers = new Headers();
      headers.set('Accept', 'application/json');
      let options = new RequestOptions({headers: headers});
      spouseContractFileIdformData.append("file", file, file.name);

      this.http.post(fileResourceURL, spouseContractFileIdformData, options).map(res => res.json()).catch(error => Observable.throw(error)).subscribe(
          data => {
          // Consume Files
          // get the file uuid and store it.
          console.log(data);
          console.log(data.response.fileResource.id);
          //   this.attrFileSpouseEmploymentContractId =data.response.fileResource.id;
          fileList = null;
        },
          error => {
          console.log(error)
        },
        () => {
          //this.sleep(1000).then(() =>
          // .. Post Upload Delayed Action

        });


    }
    if (event.target.name == "xJUWub6Na81") {
      let SpouseWorkPermitformData:FormData = new FormData();

      let headers = new Headers();
      headers.set('Accept', 'application/json');
      let options = new RequestOptions({headers: headers});
      SpouseWorkPermitformData.append("file", file, file.name);

      this.http.post(fileResourceURL, SpouseWorkPermitformData, options).map(res => res.json()).catch(error => Observable.throw(error)).subscribe(
          data => {
          // Consume Files
          // get the file uuid and store it.
          console.log(data);
          console.log(data.response.fileResource.id);
          //   this.attrFileSpouseWorkPermitId =data.response.fileResource.id;
          fileList = null;
        },
          error => {
          console.log(error)
        },
        () => {
          //this.sleep(1000).then(() =>
          // .. Post Upload Delayed Action

        });


    }
    if (event.target.name == "i63qGgDCqWK") {
      let SpouseSalarySlipformData:FormData = new FormData();


      let headers = new Headers();
      headers.set('Accept', 'application/json');
      let options = new RequestOptions({headers: headers});
      SpouseSalarySlipformData.append("file", file, file.name);

      this.http.post(fileResourceURL, SpouseSalarySlipformData, options).map(res => res.json()).catch(error => Observable.throw(error)).subscribe(
          data => {
          // Consume Files
          // get the file uuid and store it.
          console.log(data);
          console.log(data.response.fileResource.id);
          //  this.attrFileSpouseSalarySlipId =data.response.fileResource.id;
          fileList = null;
        },
          error => {
          console.log(error)
        },
        () => {
          //this.sleep(1000).then(() =>
          // .. Post Upload Delayed Action

        });
    }
    if (event.target.name == "pCuas8xccgp") {
      let SpouseEmploymentContractformData:FormData = new FormData();

      let headers = new Headers();
      headers.set('Accept', 'application/json');
      let options = new RequestOptions({headers: headers});
      SpouseEmploymentContractformData.append("file", file, file.name);

      this.http.post(fileResourceURL, SpouseEmploymentContractformData, options).map(res => res.json()).catch(error => Observable.throw(error)).subscribe(
          data => {
          // Consume Files
          // get the file uuid and store it.
          console.log(data);
          console.log(data.response.fileResource.id);
          //  this.attrFileSpouseEmploymentContractId =data.response.fileResource.id;
          fileList = null;
        },
          error => {
          console.log(error)
        },
        () => {
          //this.sleep(1000).then(() =>
          // .. Post Upload Delayed Action

        });

    }

    if (event.target.name == "ukQzrmcUQgu") {
      let marriageCertificateFormData:FormData = new FormData();

      let headers = new Headers();
      headers.set('Accept', 'application/json');
      let options = new RequestOptions({headers: headers});
      marriageCertificateFormData.append("file", file, file.name);

      this.http.post(fileResourceURL, marriageCertificateFormData, options).map(res => res.json()).catch(error => Observable.throw(error)).subscribe(
          data => {
          // Consume Files
          // get the file uuid and store it.
          console.log(data);
          console.log(data.response.fileResource.id);
          // this.attrFileMarriageCertificateId =data.response.fileResource.id;
          fileList = null;
        },
          error => {
          console.log(error)
        },
        () => {
          //this.sleep(1000).then(() =>
          // .. Post Upload Delayed Action
        });

    }

    if (event.target.name == "BQAchMg4aMq") {
      let qualificationFormData:FormData = new FormData();
      let headers = new Headers();
      headers.set('Accept', 'application/json');
      let options = new RequestOptions({headers: headers});
      qualificationFormData.append("file", file, file.name);

      this.http.post(fileResourceURL, qualificationFormData, options).map(res => res.json()).catch(error => Observable.throw(error)).subscribe(
          data => {
          // Consume Files
          // get the file uuid and store it.
          console.log(data);
          console.log(data.response.fileResource.id);
          //   this.attrFileQualificationsId =data.response.fileResource.id;
          fileList = null;
        },
          error => {
          console.log(error)
        },
        () => {
          //this.sleep(1000).then(() =>
          // .. Post Upload Delayed Action

        });

    }

    if (event.target.name == "QCGwC8WHzIV") {
      let FileResidencePermitFormData:FormData = new FormData();
      let headers = new Headers();
      headers.set('Accept', 'application/json');
      let options = new RequestOptions({headers: headers});
      FileResidencePermitFormData.append("file", file, file.name);

      this.http.post(fileResourceURL, FileResidencePermitFormData, options).map(res => res.json()).catch(error => Observable.throw(error)).subscribe(
          data => {
          // Consume Files
          // get the file uuid and store it.
          console.log(data);
          console.log(data.response.fileResource.id);
          //this.attrFileResidencePermitId =data.response.fileResource.id;
          fileList = null;
        },
          error => {
          console.log(error)
        },
        () => {
          //this.sleep(1000).then(() =>
          // .. Post Upload Delayed Action
        });
    }

    if (event.target.name == "QCGwC8WHzIV") {
      let FileResidencePermitFormData:FormData = new FormData();
      let headers = new Headers();
      headers.set('Accept', 'application/json');
      let options = new RequestOptions({headers: headers});
      FileResidencePermitFormData.append("file", file, file.name);

      this.http.post(fileResourceURL, FileResidencePermitFormData, options).map(res => res.json()).catch(error => Observable.throw(error)).subscribe(
          data => {
          // Consume Files
          // get the file uuid and store it.
          console.log(data);
          console.log(data.response.fileResource.id);
          //  this.attrFileResidencePermitId =data.response.fileResource.id;
          fileList = null;
        },
          error => {
          console.log(error)
        },
        () => {
          //this.sleep(1000).then(() =>
          // .. Post Upload Delayed Action

        });

    }


  }
}
