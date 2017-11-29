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

import { NgForm } from "@angular/forms";


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
  copyCriticalExceptionalskillsbol :boolean =  false;
  copyTransfertoanotherinstitutionbol: boolean = false;

  copyformalapplicationletterRequiredFileId: string;
  copyPassportRequiredFileId: string;
  copyOfQualificationRequiredFileId: string;
  copyOfProffesionalRegistrationRequiredFileId: string;
  copyOfReferenceLettersFileId: string;
  copySpouseIdRequiredFileId: string;
  copyOfMarriageCertificateFileId: string;
  copyResidenceVISARequiredFileId: string;
  copyPoliceAffidavitFileId: string;
  copySpouseEmploymentContractFileId: string;
  copySpouseVISAFileId: string;
  copySpouseLatestSalaryRequiredFileId: string;
  copySpouseEmploymentLetterRequiredFileId: string;
  copycvbolFileId: string;

  //additional applications

  copymotivationletterfromtheuniversitybolFileId: string;
  // copyRegistrationcertificatefromcouncilsbol
  copyOriginalcertifiedcopyCertifiedcopyofvalidresidencevisaFileId: string;
  copyProofofcompletinginternshipSupervisedpracticeFileId: string;
  copyRegistrationcertificatefromcouncilsHPCSASAPCFileId: string;
  copyProofofbeingsuccessfulinexamsHPCSASANCSAPCFileId: string;
  copyProofcompletingcommunityserviceFileId: string;
  copyOfficialcopyofstampedjoboffersignedFileId: string;
  copyLatestpayslipFileId: string;
  copyRegistrationcertificateFileId: string;
  copyMotivationletterfromemployerFileId: string;
  copyReleaseletterfromcurrentemployerFileId: string;
  copyLatestsalaryslipFileId: string;
  copyPermanentjobofferFileId: string;
  copyOfficialsupportletterfromUniversityFileId: string;
  copyLetterfromthecurrentuniversityFileId: string;
  copyAcceptanceletterfromSAuniversityFileId: string;
  copycurriculumvitaeFileId: string;
  copyoriginalcertifiedreferencelettersFileId: string;
  copyLetterfromtheUniversityFileId: string;
  copyLetterfromthehospitalFileId: string;
  copyJ1VisaformsFileId: string;
  copyStudentundertakingFileId: string;
  copyCriticalExceptionalskillsFileId: string;
  copyTransfertoanotherinstitutionFileId: string;




  formalapplicationletterRequiredFile: dataValues;
  PassportRequiredFile: dataValues;
  QualificationRequiredFile: dataValues;
  ProffesionalRegistrationRequiredFile: dataValues;
  ReferenceLettersFile: dataValues;
  SpouseIdRequiredFile: dataValues;
  MarriageCertificateFile: dataValues;
  ResidenceVISARequiredFile: dataValues;
  PoliceAffidavitFileId: dataValues;
  SpouseEmploymentContractFile: dataValues;
  SpouseVISAFile: dataValues;
  SpouseLatestSalaryRequiredFile: dataValues;
  SpouseEmploymentLetterRequiredFile: dataValues;
  cvbolFile: dataValues;


  motivationletterfromtheuniversitybolFile: dataValues;
  // copyRegistrationcertificatefromcouncilsbol
  OriginalcertifiedcopyCertifiedcopyofvalidresidencevisaFile: dataValues;
  ProofofcompletinginternshipSupervisedpracticeFile: dataValues;
  RegistrationcertificatefromcouncilsHPCSASAPCFile: dataValues;
  ProofofbeingsuccessfulinexamsHPCSASANCSAPCFile: dataValues;
  ProofcompletingcommunityserviceFile: dataValues;
  OfficialcopyofstampedjoboffersignedFile: dataValues;
  LatestpayslipFile: dataValues;
  RegistrationcertificateFile: dataValues;
  MotivationletterfromemployerFile: dataValues;
  ReleaseletterfromcurrentemployerFileId: dataValues;
  LatestsalaryslipFile: dataValues;
  PermanentjobofferFile: dataValues;
  OfficialsupportletterfromUniversityFile: dataValues;
  LetterfromthecurrentuniversityFile: dataValues;
  AcceptanceletterfromSAuniversityFile: dataValues;
  curriculumvitaeFile: dataValues;
  originalcertifiedreferencelettersFile: dataValues;
  LetterfromtheUniversityFile: dataValues;
  LetterfromthehospitalFile: dataValues;
  J1VisaformsFile: dataValues;
  StudentundertakingFile: dataValues;
  CriticalExceptionalskillsFile: dataValues;
  TransfertoanotherinstitutionFile: dataValues;


  filetoupload:dataValues;
  order: string = "name";
  ascending: boolean = true;

  checkIfDataelement: boolean = false;


  constructor(private router:Router, private http:Http, private dataelemetservice:DataElementService, private OptionSetsService:OptionSetsService, private programservice:ProgramService, private user:User) {

    this.eventPayload = new events();
    this.applicationType = new dataValues();
    this.applicationDate = new dataValues();
    this.applicationStatus = new dataValues();
    this.applicationNotes = new dataValues();

    this.filetoupload = new dataValues();

    //data values for files
    this.formalapplicationletterRequiredFile= new  dataValues();
    this.PassportRequiredFile= new  dataValues();
    this.QualificationRequiredFile= new  dataValues();
    this.ProffesionalRegistrationRequiredFile= new  dataValues();
    this.ReferenceLettersFile= new  dataValues();
    this.SpouseIdRequiredFile= new  dataValues();
    this.MarriageCertificateFile= new  dataValues();
    this.ResidenceVISARequiredFile= new  dataValues();
    this.PoliceAffidavitFileId= new  dataValues();
    this.SpouseEmploymentContractFile= new  dataValues();
    this.SpouseVISAFile= new  dataValues();
    this.SpouseLatestSalaryRequiredFile= new  dataValues();
    this.SpouseEmploymentLetterRequiredFile= new  dataValues();
    this.cvbolFile= new  dataValues();


    this.motivationletterfromtheuniversitybolFile= new  dataValues();
    // copyRegistrationcertificatefromcouncilsbol
    this.OriginalcertifiedcopyCertifiedcopyofvalidresidencevisaFile= new  dataValues();
    this.ProofofcompletinginternshipSupervisedpracticeFile= new  dataValues();
    this.RegistrationcertificatefromcouncilsHPCSASAPCFile= new  dataValues();
    this.ProofofbeingsuccessfulinexamsHPCSASANCSAPCFile= new  dataValues();
    this.ProofcompletingcommunityserviceFile= new  dataValues();
    this.OfficialcopyofstampedjoboffersignedFile= new  dataValues();
    this.LatestpayslipFile= new  dataValues();
    this.RegistrationcertificateFile= new  dataValues();
    this.MotivationletterfromemployerFile= new  dataValues();
    this.ReleaseletterfromcurrentemployerFileId= new  dataValues();
    this.LatestsalaryslipFile= new  dataValues();
    this.PermanentjobofferFile= new  dataValues();
    this.OfficialsupportletterfromUniversityFile= new  dataValues();
    this.LetterfromthecurrentuniversityFile= new  dataValues();
    this.AcceptanceletterfromSAuniversityFile= new  dataValues();
    this.curriculumvitaeFile= new  dataValues();
    this.originalcertifiedreferencelettersFile= new  dataValues();
    this.LetterfromtheUniversityFile= new  dataValues();
    this.LetterfromthehospitalFile= new  dataValues();
    this.J1VisaformsFile= new  dataValues();
    this.StudentundertakingFile= new  dataValues();
    this.CriticalExceptionalskillsFile= new  dataValues();
    this.TransfertoanotherinstitutionFile= new  dataValues();

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

  SubmitApplication(application: NgForm) {
    const urlSendEvents = '../../../events';
    const urlSendEnrol = '../../../enrollments'

    //this.eventPayload = null;
   // this.enrollment = null;
//    this.dataValuesArray = null;

    this.eventPayload = new events();
    this.enrollment = new Enrollments;

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
    this.applicationStatus.value = "Successfully Applied";

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
    application.resetForm();

//    window.location.reload();

  }

  ValidateApplicationRequiredDocs() {
    //check application types here and show relevant docs here under here
  }

  ValidateEnrollmentCheckDuplicates() {
    //check application types here and show relevant docs here under here
  }

  onApplicationSelection($event) {

    this.dataValuesArray = [];
    console.log("selected dropdown value: " +$event.target.value);

    this.selectedApplicationType = $event.target.value;
    this.docs = [];
    this.applicationNameValue = this.applicationType.value;
    this.trackEnUrl = '../../../trackedEntityInstances.json?ou=JLA7wl59oN3&program=FvVIOpqnKOJ&paging=false&filter=wQxl0pBY1Dq:eq:' + this.applicationNameValue + '&filter=fKLGaOy03uB:eq:true';
    this.programservice.getTrackEntityInstance(this.trackEnUrl).then(result => {
      this.RequiredDocuments = result.trackedEntityInstances;


      console.log("Required Docs for " + this.RequiredDocuments)

      if (this.selectedApplicationType.trim() == "First Time Application"){
        this.copyformalapplicationletterRequiredbol= true;
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
        this.copyformalapplicationletterRequiredbol= true
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
        this.copyCriticalExceptionalskillsbol = false;
        this.copyTransfertoanotherinstitutionbol = false;
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
        this.copyRegistrationcertificatebol=true;
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
        this.copyCriticalExceptionalskillsbol = false;
        this.copyTransfertoanotherinstitutionbol = false;

      }
      else if (this.selectedApplicationType.trim() == "Permanent Residence"){
        this.copyformalapplicationletterRequiredbol= true;
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
        this.copyCriticalExceptionalskillsbol = true;
        this.copyTransfertoanotherinstitutionbol = false;

      }
      else if (this.selectedApplicationType.trim() == "Transfer"){
        this.copyformalapplicationletterRequiredbol= true;
        this.copyPassportRequired=true;
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

        this.copyCriticalExceptionalskillsbol = false;
        this.copyTransfertoanotherinstitutionbol = true;
      }
      else if (this.selectedApplicationType.trim() == "Internship") {
        this.copyformalapplicationletterRequiredbol= true
        this.copyPassportRequired=true;
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

        this.copymotivationletterfromtheuniversitybol=true;
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
        this.copyLetterfromthehospitalbol=true;
        this.copyJ1Visaformsbol=false;
        this.copyStudentundertakingbol=false;
        this.copyCriticalExceptionalskillsbol = false;
        this.copyTransfertoanotherinstitutionbol = false;
      }
      else if (this.selectedApplicationType.trim() == "Community Service"){
        this.copyformalapplicationletterRequiredbol= true;
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

        this.copyCriticalExceptionalskillsbol = false;
        this.copyTransfertoanotherinstitutionbol = false;

      }
      else if (this.selectedApplicationType.trim() == "Seeking employment"){
        this.copyformalapplicationletterRequiredbol= true
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
        this.copyOriginalcertifiedcopyCertifiedcopyofvalidresidencevisabol=true;
        this.copyProofofcompletinginternshipSupervisedpracticebol=false;
        this.copyRegistrationcertificatefromcouncilsHPCSASAPCbol=false;
        this.copyProofofbeingsuccessfulinexamsHPCSASANCSAPCbol=true;
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
        this.copyLetterfromthehospitalbol=true;
        this.copyJ1Visaformsbol=false;
        this.copyStudentundertakingbol=false;

        this.copyCriticalExceptionalskillsbol = false;
        this.copyTransfertoanotherinstitutionbol = false;
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
        this.copyLetterfromthehospitalbol=true;
        this.copyJ1Visaformsbol=false;
        this.copyStudentundertakingbol=false;

        this.copyCriticalExceptionalskillsbol = false;
        this.copyTransfertoanotherinstitutionbol = false;
      }

      else if (this.selectedApplicationType.trim() == "Volunteer"){
        this.copyformalapplicationletterRequiredbol= true;
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
        this.copyLetterfromthehospitalbol=true;
        this.copyJ1Visaformsbol=false;
        this.copyStudentundertakingbol=false;

        this.copyCriticalExceptionalskillsbol = false;
        this.copyTransfertoanotherinstitutionbol = false;

      }
      else if (this.selectedApplicationType.trim() == "Postgraduate Studies: University Exams") {
        this.copyformalapplicationletterRequiredbol= true
        this.copyPassportRequired=false;
        this.copyOfQualificationRequired= true;
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

        this.copyCriticalExceptionalskillsbol = false;
        this.copyTransfertoanotherinstitutionbol = false;
      }

      else if (this.selectedApplicationType == "Exchange Programme") {

        this.copyformalapplicationletterRequiredbol= true;
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
        this.copyOfficialcopyofstampedjoboffersignedbol=false;
        this.copyLatestpayslipbol=false;
        this.copyRegistrationcertificatebol=true;
        this.copyMotivationletterfromemployerbol=false;
        this.copyReleaseletterfromcurrentemployerbol=false;
        this.copyLatestsalaryslipbol=false;
        this.copyPermanentjobofferbol=false;
        this.copyOfficialsupportletterfromUniversitybol=false;
        this.copyLetterfromthecurrentuniversitybol=false;
        this.copyAcceptanceletterfromSAuniversitybol=true;
        this.copycurriculumvitaebol=true;
        this.copyoriginalcertifiedreferencelettersbol=true;
        this.copyLetterfromtheUniversitybol=true;
        this.copyLetterfromthehospitalbol=false;
        this.copyJ1Visaformsbol=false;
        this.copyStudentundertakingbol=false;

        this.copyCriticalExceptionalskillsbol = false;
        this.copyTransfertoanotherinstitutionbol = false;


      }
      else if (this.selectedApplicationType == "Registration Only") {
        this.copyformalapplicationletterRequiredbol= true;
        this.copyPassportRequired=true;
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
        this.copyOriginalcertifiedcopyCertifiedcopyofvalidresidencevisabol=true;
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
        this.copycurriculumvitaebol=true;
        this.copyoriginalcertifiedreferencelettersbol=false;
        this.copyLetterfromtheUniversitybol=false;
        this.copyLetterfromthehospitalbol=true;
        this.copyJ1Visaformsbol=false;
        this.copyStudentundertakingbol=false;

        this.copyCriticalExceptionalskillsbol = false;
        this.copyTransfertoanotherinstitutionbol = false;
      }
      else if (this.selectedApplicationType == "Supernumerary") {
        this.copyformalapplicationletterRequiredbol= true;
        this.copyPassportRequired=true;
        this.copyOfQualificationRequired= true;
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
        this.copyoriginalcertifiedreferencelettersbol=true;
        this.copyLetterfromtheUniversitybol=true;
        this.copyLetterfromthehospitalbol=true;
        this.copyJ1Visaformsbol=true;
        this.copyStudentundertakingbol=true;

        this.copyCriticalExceptionalskillsbol = false;
        this.copyTransfertoanotherinstitutionbol = false;
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
        alert("The file size to upload cannot bigger than 2MB ");
      }
      else {
        //events will go in here and that is it
        //events for file upload in here
        //post a file here and get the id from the response
        let formData:FormData = new FormData();
        let headers = new Headers();
        headers.set('Accept', 'application/json');
        let options = new RequestOptions({headers: headers});
        formData.append("file", file, file.name);

        this.http.post(fileResourceURL, formData, options).map(res => res.json()).catch(error => Observable.throw(error)).subscribe(
            data => {
            // Consume Files
            // get the file uuid and store it.
            console.log(data);
            console.log(data.response.fileResource.id);
            //this.attrFilePassportId =data.response.fileResource.id;

/*
              //check uid for the file to upload
              switch(event.target.name){
                //application letter
                case "ULcSjvW3wfc": {
                  this.formalapplicationletterRequiredFile.dataElement = event.target.name;
                  this.formalapplicationletterRequiredFile.value = data.response.fileResource.id;
                }
                //passport
                case "tPkMXstaJhb": {
                  this.PassportRequiredFile.dataElement = event.target.name;
                  this.PassportRequiredFile.value = data.response.fileResource.id;

                }
                //cv
                case "ASKtPeETyxl": {
                  this.cvbolFile.dataElement = event.target.name;
                  this.cvbolFile.value = data.response.fileResource.id;

                }
                //qualifications
                case "yT2ZZpWDqrM": {

                  this.QualificationRequiredFile.dataElement = event.target.name;
                  this.QualificationRequiredFile.value = data.response.fileResource.id;
                }
                //prof registration
                case "wEvvumpKO4f": {
                  this.ProffesionalRegistrationRequiredFile.dataElement = event.target.name;
                  this.ProffesionalRegistrationRequiredFile.value = data.response.fileResource.id;
                }
                //ref letter
                case "FxiLQf0rO4X": {
                  this.ReferenceLettersFile.dataElement = event.target.name;
                  this.ReferenceLettersFile.value = data.response.fileResource.id;
                }
                //spouse id
                case "cgjcuzHaF0g": {
                  this.SpouseIdRequiredFile.dataElement = event.target.name;
                  this.SpouseIdRequiredFile.value = data.response.fileResource.id;
                }
                //marriage certificate
                case "NoIxOHbZHP3": {
                  this.MarriageCertificateFile.dataElement = event.target.name;
                  this.MarriageCertificateFile.value = data.response.fileResource.id;
                }
                //residense visa
                case "g5I2ZHDlycD": {
                  this.ResidenceVISARequiredFile.dataElement = event.target.name;
                  this.ResidenceVISARequiredFile.value = data.response.fileResource.id;
                }
                //affidavit
                case "ZmKDdaCulxi": {
                  this.PoliceAffidavitFileId.dataElement = event.target.name;
                  this.PoliceAffidavitFileId.value = data.response.fileResource.id;
                }
                //spouse employment contract
                case "ykkBPofpXkN": {
                  this.SpouseEmploymentContractFile.dataElement = event.target.name;
                  this.SpouseEmploymentContractFile.value = data.response.fileResource.id;
                }
                //spouse visa
                case "Npb4uxepgS0": {
                  this.SpouseVISAFile.dataElement = event.target.name;
                  this.SpouseVISAFile.value = data.response.fileResource.id;
                }
                //spouse salary slip
                case "FRjvttNPPTe": {
                  this.SpouseLatestSalaryRequiredFile.dataElement = event.target.name;
                  this.SpouseLatestSalaryRequiredFile.value = data.response.fileResource.id;
                }
                //spouse letter confirm employment
                case "ciXetLi20PE": {
                  this.SpouseEmploymentLetterRequiredFile.dataElement = event.target.name;
                  this.SpouseEmploymentLetterRequiredFile.value = data.response.fileResource.id;
                }
                //motivation letter
                case "R6ldZY1sOV3": {
                  this.motivationletterfromtheuniversitybolFile.dataElement = event.target.name;
                  this.motivationletterfromtheuniversitybolFile.value = data.response.fileResource.id;
                }
                //residense visa
                case "w0zt6ubwF8N": {
                  this.OriginalcertifiedcopyCertifiedcopyofvalidresidencevisaFile.dataElement = event.target.name;
                  this.OriginalcertifiedcopyCertifiedcopyofvalidresidencevisaFile.value = data.response.fileResource.id;

                }
                 //internship proof
                case "xLlAxxdsqwT": {

                  this.ProofofcompletinginternshipSupervisedpracticeFile.dataElement = event.target.name;
                  this.ProofofcompletinginternshipSupervisedpracticeFile.value = data.response.fileResource.id;
                }
                //certificate of registration
                case "tbVfHVWp8wk": {
                  this.RegistrationcertificatefromcouncilsHPCSASAPCFile.dataElement = event.target.name;
                  this.RegistrationcertificatefromcouncilsHPCSASAPCFile.value = data.response.fileResource.id;
                }
                //proof of success in exams hpcsa
                case "kmf3TzMlMZK": {
                  this.ProofofbeingsuccessfulinexamsHPCSASANCSAPCFile.dataElement = event.target.name;
                  this.ProofofbeingsuccessfulinexamsHPCSASANCSAPCFile.value = data.response.fileResource.id;
                }
                //community service
                case "NI3zNAv7oVr": {
                  this.ProofcompletingcommunityserviceFile.dataElement = event.target.name;
                  this.ProofcompletingcommunityserviceFile.value = data.response.fileResource.id;

                }
                //job offer from institution
                case "T3I1nPRUGxI": {
                  this.OfficialcopyofstampedjoboffersignedFile.dataElement = event.target.name;
                  this.OfficialcopyofstampedjoboffersignedFile.value = data.response.fileResource.id;

                }
                //latest salary slip
                case "aRnbPS0Du8Y": {
                  this.LatestpayslipFile.dataElement = event.target.name;
                  this.LatestpayslipFile.value = data.response.fileResource.id;
                }
                //registration certificate
                case "rCCSOXloArD": {
                  this.RegistrationcertificateFile.dataElement = event.target.name;
                  this.RegistrationcertificateFile.value = data.response.fileResource.id;
                }
                //release from current employer
                case "NEY582qdrxK": {
                  this.MotivationletterfromemployerFile.dataElement = event.target.name;
                  this.MotivationletterfromemployerFile.value = data.response.fileResource.id;
                }
                //permanent job offer
                case "sU2xEu2Dy0I": {
                  this.ReleaseletterfromcurrentemployerFileId.dataElement = event.target.name;
                  this.ReleaseletterfromcurrentemployerFileId.value = data.response.fileResource.id;
                }
                //support letter from university and employing hospital
                case "tSzfWCBihTz": {

                  this.OfficialsupportletterfromUniversityFile.dataElement = event.target.name;
                  this.OfficialsupportletterfromUniversityFile.value = data.response.fileResource.id;

                }
//Copy of motivation letter from employer (applies to refugees only)
                case "VzRj3tzW71n": {

                }
//                  Copy of letter from the current university
                case "tSzfWCBihTz": {

                  this.LetterfromthecurrentuniversityFile.dataElement = event.target.name;
                  this.LetterfromthecurrentuniversityFile.value = data.response.fileResource.id;

                }
                      //Copy acceptance letter from SA university
                case "NyX0mHwvMdk": {
                  this.AcceptanceletterfromSAuniversityFile.dataElement = event.target.name;
                  this.AcceptanceletterfromSAuniversityFile.value = data.response.fileResource.id;

                }
//Copy curriculum vitae (original document)
                case "ovJ4w1VCFpr": {
                  this.curriculumvitaeFile.dataElement = event.target.name;
                  this.curriculumvitaeFile.value = data.response.fileResource.id;
                }
//Copy of original certified reference letters
                case "JJLfQhSEMq2": {

                  this.originalcertifiedreferencelettersFile.dataElement = event.target.name;
                  this.originalcertifiedreferencelettersFile.value = data.response.fileResource.id;
              }
//Copy of letter from the university
                case "zCLxCuJHHxL": {

                  this.LetterfromtheUniversityFile.dataElement = event.target.name;
                  this.LetterfromtheUniversityFile.value = data.response.fileResource.id;
                }
                      //Copy J1 Visa forms
                case "Iht8DmUXSji": {

                  this.J1VisaformsFile.dataElement = event.target.name;
                  this.J1VisaformsFile.value = data.response.fileResource.id;
                }
                      //Copy of student undertaking
                case "LYQvw6ynmmQ": {
                  this.StudentundertakingFile.dataElement = event.target.name;
                  this.StudentundertakingFile.value = data.response.fileResource.id;

                }
                      //Copy of Critical/Exceptional skills VISA
                case "SrduT8ItOWc": {
                  this.CriticalExceptionalskillsFile.dataElement = event.target.name;
                  this.CriticalExceptionalskillsFile.value = data.response.fileResource.id;

                }
//Copy of Transfer to another institution
                case "oha7gtVN7zy": {
                this.TransfertoanotherinstitutionFile.dataElement = event.target.name;
                this.TransfertoanotherinstitutionFile.value = data.response.fileResource.id;
              }
                      //latest pay slip
                case "FRjvttNPPTe": {
                  this.LatestsalaryslipFile.dataElement = event.target.name;
                  this.LatestsalaryslipFile.value = data.response.fileResource.id;
                }
//permanent job offer
                case "sU2xEu2Dy0I": {
                  this.PermanentjobofferFile.dataElement = event.target.name;
                  this.PermanentjobofferFile.value = data.response.fileResource.id;
                }
              }

       */

            this.filetoupload.dataElement = event.target.name;
            this.filetoupload.value = data.response.fileResource.id;
              //check if the dataelement already exists. If it exists, replace the value.
              //loop through th daValuesArray


              for (let element of this.dataValuesArray)
              {
                if (element.dataElement==this.filetoupload.dataElement){
                  element.value= this.filetoupload.value
                  this.checkIfDataelement= true
                }
              }

              if (this.checkIfDataelement==true)
              {
                alert("file was already assigned and has been updated;")
              }else
              {
                this.dataValuesArray.push(this.filetoupload);
              }
            console.log("array values: "+this.dataValuesArray);

            fileList = null;
            this.filetoupload= new dataValues();

              this.checkIfDataelement = false;

          },
            error => {
            console.log(error)
          },
          () => {
            //this.sleep(1000).then(() =>
            // .. Post Upload Delayed Action
          });
      }
    } else {
      alert("Only pdf files are allowed uploaded ");
      //event.target.files[0] = null;
    }

  }
}
