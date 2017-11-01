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
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent {

dataElements: any[] = [] ;
organisationUnits : any[] = [];
organisationUnitsprovinstance1: any[] = [] ;
organisationUnitsprovinstance2: any[] = [] ;
provinstance1;
provinstance2;

  //optionsets

gender: any
typeofApllication: any
title: any
countryOfOrigin:any
maritalstatus: any
proffession: any
resedintialStatus: any
typeofid: any
typeOfQualification: any
visaDuration: any
options: any
qualificationType: any
prefferedComunnicationType: any

  attributes:Attributes[];
  enrollments: Enrollments[];
  trackedEntityInstances:TrackedEntityInstances;

  trackedEntityInstancesWithoutEnrollment: TrackedEntityInstancesWithoutEnrollment;

  trackedEntityInstancesArray: TrackedEntityInstances[];
  trackedEntityInstancesPayload: TrackedEntityInstancesPayload;

  applicantDetails : any;

  enrollment: Enrollments;

  //Models to map to the template
  attrSurname: Attributes;
  attrFirstname: Attributes;
  attrMaidenname: Attributes;
  attrInitialsname: Attributes;
  attrProffession: Attributes;
  attrGender: Attributes;
  attrTitle: Attributes;
  attrDatOfBirth: Attributes;
  attrMaritaStatus: Attributes;
  attrSpouseDetails: Attributes;
  attrCurrentCountryOfResidence: Attributes;
  attrCurrentResidentialStatus: Attributes;
  attrSouthAfricanID:Attributes;
  attrPassportNumber: Attributes;
  attrRefugeeID: Attributes;
  attrStreetAddressLine1: Attributes;
  attrStreetAddressLine2: Attributes;
  attrStreetAddressLine3: Attributes;
  attrStreetPostalCode: Attributes;
  attrStreetZipCode: Attributes;
  attrStreetAddressLine1Home: Attributes;
  attrStreetAddressLine2Home: Attributes;
  attrStreetAddressLine3Home: Attributes;
  attrStreetPostalCodeHome: Attributes;
  attrStreetZipCodeHome: Attributes;
  attrCellphoneNumber: Attributes;
  attrWorkTelephoneNumber:Attributes;
  attrHomeTelephoneNumber:Attributes;
  attrEmailAddressPrimary:Attributes;
  attrEmailAddressAlternative:Attributes;
  attrPrefferedMethodOfCommunication:Attributes;
  attrCountryWhereQualificationObtained:Attributes;
  attrQualificationType:Attributes;
  attrCountrySpecialization:Attributes;
  attrProffBodyRegistrationYesNo: Attributes;
  attrProffBodyRegistrationName: Attributes;
  attrSpecializationYesNo: Attributes;
  attrUseruuid: Attributes;
  userId: string = "";


  //Files
  attrFilePassport: Attributes;
  attrFileCV: Attributes;
  attrFileQualifications: Attributes;
  attrFileProfRegistration: Attributes;
  attrFileRefLetter: Attributes;
  attrFileSpouseID: Attributes;
  attrFileMarriageCertificate: Attributes;
  attrFileSpouseIDDoc: Attributes;
  attrFileResidencePermit: Attributes;
  attrFileAffidavit: Attributes;
  attrFileSpouseEmploymentContract: Attributes;
  attrFileSpouseWorkPermit: Attributes;
  attrFileSpouseSalarySlip: Attributes;
  attrFileEmploymentLetter: Attributes;


  //This after the response after post
  attrFilePassportId: string;
  attrFileCVId: string;
  attrFileQualificationsId: string;
  attrFileProfRegistrationId: string;
  attrFileRefLetterId: string;
  attrFileSpouseIDId: string;
  attrFileMarriageCertificateId: string;
  attrFileSpouseIDDocId: string;
  attrFileResidencePermitId: string;
  attrFileAffidavitId: string;
  attrFileSpouseEmploymentContractId: string;
  attrFileSpouseWorkPermitId: string;
  attrFileSpouseSalarySlipId: string;
  attrFileEmploymentLetterId: string;


  FilePassportFilename: string
  CVFilename: string
  ProfRegistrationFilename: string
  RefLetterFilename: string
  SpouseIDFilename: string
  ResidencePermitFilename: string
  MarriageCertificateFilename: string
  AffidavitFilename: string
  SpouseEmploymentContractFilename: string
  SpouseWorkFilename: string
  SpouseSalaryFilename: string
  SpouseSalarySlipFilename: string

  //URL
  entityInstanceUrl: string;
  trackentityAtributeCount: number;
  trackentityInstance: string;
  userDisplayname: string;

  //Documents attributes will go under here

  private GenderTest: OptionSet[] = new Array<OptionSet>();

  constructor(private http:Http,private programService: ProgramService,private user:User, private dataelemetservice:DataElementService, private organisationUnitService: OrganisationUnitService, private OptionSetsService: OptionSetsService, private router: Router) {
    this.gender = [];
    this.typeofApllication =[];
    this.title = [];
    this.countryOfOrigin = [];
    this.maritalstatus = [];
    this.proffession = [];
    this.resedintialStatus = [];
    this.typeofid =[];
    this.typeOfQualification = [];
    this.visaDuration = [];
    this.options = [];
    this.qualificationType = [];
    this.prefferedComunnicationType = [];

    this.attributes =[];
    this.enrollments =[];

    this.enrollment =  new Enrollments();

    this.trackedEntityInstances= new TrackedEntityInstances();
    this.trackedEntityInstancesWithoutEnrollment = new TrackedEntityInstancesWithoutEnrollment();

    this.trackedEntityInstancesArray = [];


    this.trackedEntityInstancesPayload=  new TrackedEntityInstancesPayload();

    this.attrSurname = new  Attributes();
    this.attrFirstname= new  Attributes();
    this.attrMaidenname= new  Attributes();
    this.attrInitialsname= new  Attributes();
    this.attrProffession= new  Attributes();
    this.attrGender= new  Attributes();
    this.attrTitle= new  Attributes();
    this.attrDatOfBirth= new  Attributes();
    this.attrMaritaStatus= new  Attributes();
    this.attrSpouseDetails= new  Attributes();
    this.attrCurrentCountryOfResidence= new  Attributes();
    this.attrCurrentResidentialStatus= new  Attributes();
    this.attrSouthAfricanID= new  Attributes();
    this.attrPassportNumber= new  Attributes();
    this.attrRefugeeID= new  Attributes();
    this.attrStreetAddressLine1= new  Attributes();
    this.attrStreetAddressLine2= new  Attributes();
    this.attrStreetAddressLine3= new  Attributes();
    this.attrStreetPostalCode= new  Attributes();
    this.attrStreetZipCode= new  Attributes();
    this.attrStreetAddressLine1Home= new  Attributes();
    this.attrStreetAddressLine2Home= new  Attributes();
    this.attrStreetAddressLine3Home= new  Attributes();
    this.attrStreetPostalCodeHome= new  Attributes();
    this.attrStreetZipCodeHome= new  Attributes();
    this.attrCellphoneNumber= new  Attributes();
    this.attrWorkTelephoneNumber= new  Attributes();
    this.attrHomeTelephoneNumber= new  Attributes();
    this.attrEmailAddressPrimary= new  Attributes();
    this.attrEmailAddressAlternative= new  Attributes();
    this.attrPrefferedMethodOfCommunication= new  Attributes();
    this.attrCountryWhereQualificationObtained= new  Attributes();
    this.attrQualificationType= new  Attributes();
    this.attrCountrySpecialization= new  Attributes();
    this.attrProffBodyRegistrationYesNo= new  Attributes();
    this.attrProffBodyRegistrationName= new  Attributes();
    this.attrSpecializationYesNo = new  Attributes();
    this.attrUseruuid =  new  Attributes();

    this.attrFilePassport = new  Attributes();
    this.attrFileCV = new  Attributes();
    this.attrFileQualifications =new  Attributes();
    this.attrFileProfRegistration= new  Attributes();
    this.attrFileRefLetter = new Attributes();
    this.attrFileSpouseID = new Attributes();
    this.attrFileMarriageCertificate=new  Attributes();
    this.attrFileSpouseIDDoc= new  Attributes();
    this.attrFileResidencePermit = new Attributes();
    this.attrFileAffidavit= new Attributes();
    this.attrFileSpouseEmploymentContract = new Attributes();
    this.attrFileSpouseWorkPermit = new Attributes();
    this.attrFileSpouseSalarySlip = new Attributes();
    this.attrFileEmploymentLetter=new Attributes();



    this.applicantDetails = [];




    const lkgenderurlTest  = '../../../staging/api/optionSets.json?paging=false&fields=options[name]&filter=id:eq:zL9imKevTiF';
    this.OptionSetsService.getData(lkgenderurlTest).subscribe(data =>{this.GenderTest = data

    console.log("Genter Test", this.GenderTest )});

  }

  ngOnInit() {
    var test = [];
    const dataelementUrl='../../../staging/api/dataElements'+'.json?paging=false&fields=:all,id,name,aggregationType,displayName,categoryCombo[id,name,categories[id,name,categoryOptions[id,name]]],dataSets[:all,!compulsoryDataElementOperands]'
    const provincesurl = '../../../staging/api/organisationUnits?paging=false&fields=:all&filter=level:eq:2'

//optionsets
    //gender
    const lkgenderurl  = '../../../staging/api/optionSets.json?paging=false&fields=options[name]&filter=id:eq:zL9imKevTiF&order=name:asc';
    //type of application
    const lktypeOfApplicationurl = '../../../staging/api/optionSets.json?paging=false&fields=options[name]&filter=id:eq:dD5o5dzM6PO';
    //Title
    const titleurl =  '../../../staging/api/optionSets.json?paging=false&fields=options[name]&filter=id:eq:kSqeSdY8rlg';
    //country of origin
    const lkcountryOriginurl = '../../../staging/api/optionSets.json?paging=false&fields=options[name]&filter=id:eq:cURBuyAHItE';
    //Marital Status List
    const lkmaritalStatusurl = '../../../staging/api/optionSets.json?paging=false&fields=options[name]&filter=id:eq:VFjzsjC56Z5';
    //proffesions
    const lkproffesionsurl = '../../../staging/api/optionSets.json?paging=false&fields=options[name]&filter=id:eq:te7ulkuE2k6';
    //Residential Status
    const Residentialstatusurl = '../../../staging/api/optionSets.json?paging=false&fields=options[name]&filter=id:eq:Dw2owuxZfDj';
    //type of id
    const lktypeofidurl = '../../../staging/api/optionSets.json?paging=false&fields=options[name]&filter=id:eq:zpxdEupX6T7';
    //type of qualification
    const lktypeOfQualiurl = '../../../staging/api/optionSets.json?paging=false&fields=options[name]&filter=id:eq:kdg3F9nZKIV';
    //visa durations
    const lkvisaurl = '../../../staging/api/optionSets.json?paging=false&fields=options[name]&filter=id:eq:mOkBI4CVzoK';
    //communication Type
    const lkCommunicationTypeurl = '../../../staging/api/optionSets.json?paging=false&fields=options[name]&filter=id:eq:qOVusNGHZ0q';
    const userurl = '../../../staging/api/me.json';

    const fileResourceURL =  '../../../staging/api/fileResources';
    /*
    const urlTrackedEntityInstance = '../../../staging/api/trackedEntityInstances.json?ou=JLA7wl59oN3&paging=false&trackedEntityInstance=Z5ZQbIkSTND';
      this.programService.getTrackEntityInstance(urlTrackedEntityInstance).then(result => {this.applicantDetails =  result.trackedEntityInstances[0].attributes;
    }).catch(error => console.log(error));
    */
    //create entity Instance
    this.OptionSetsService.getOptionSetsService(lkgenderurl).then(result => this.gender =  result.optionSets[0].options).catch(error => console.log(error));

    this.OptionSetsService.getOptionSetsService(lktypeOfApplicationurl).then(result => this.typeofApllication =  result.optionSets[0].options).catch(error => console.log(error));
    this.OptionSetsService.getOptionSetsService(titleurl).then(result => this.title =  result.optionSets[0].options).catch(error => console.log(error));
    this.OptionSetsService.getOptionSetsService(lkcountryOriginurl).then(result => this.countryOfOrigin =  result.optionSets[0].options).catch(error => console.log(error));
    this.OptionSetsService.getOptionSetsService(lkmaritalStatusurl).then(result => this.maritalstatus =  result.optionSets[0].options).catch(error => console.log(error));
    this.OptionSetsService.getOptionSetsService(lkproffesionsurl).then(result => this.proffession =  result.optionSets[0].options).catch(error => console.log(error));
    this.OptionSetsService.getOptionSetsService(Residentialstatusurl).then(result => this.resedintialStatus =  result.optionSets[0].options).catch(error => console.log(error));
    this.OptionSetsService.getOptionSetsService(lktypeofidurl).then(result => this.typeofid =  result.optionSets[0].options).catch(error => console.log(error));
    this.OptionSetsService.getOptionSetsService(lktypeOfQualiurl).then(result => this.typeOfQualification =  result.optionSets[0].options).catch(error => console.log(error));
    this.OptionSetsService.getOptionSetsService(lkvisaurl).then(result => this.visaDuration =  result.optionSets[0].options).catch(error => console.log(error));
    this.OptionSetsService.getOptionSetsService(lkCommunicationTypeurl).then(result => this.prefferedComunnicationType =  result.optionSets[0].options).catch(error => console.log(error));

    //get user
    this.user.getUser(userurl).then(result => {
    console.log(result);
      this.userDisplayname = result.displayName
      this.userId = result.id;
    console.log("User Id is : "+ this.userId );

    const urlTrackedEntityInstance = '../../../staging/api/trackedEntityInstances.json?ou=JLA7wl59oN3&paging=false&filter=UsZ89w0XS9f:eq:'+this.userId;
    this.entityInstanceUrl = urlTrackedEntityInstance;

    this.programService.getTrackEntityInstance(urlTrackedEntityInstance).then(result => {
      this.applicantDetails = result.trackedEntityInstances[0].attributes
      console.log("applicant is : " + this.applicantDetails);
      console.log("There are this number of attributes : " + Object.keys(this.applicantDetails).length);
      this.trackentityAtributeCount = Object.keys(this.applicantDetails).length;
      this.trackentityInstance = result.trackedEntityInstances[0].trackedEntityInstance;

      if (this.applicantDetails) {
        //for iterator starts here
        for (let attr of  this.applicantDetails
      )
        {
          console.log(attr)
          if (attr.attribute == "adkMaBHuDha") {
            console.log("surname : " + attr.value);
            this.attrSurname.value = attr.value
          }
          if (attr.attribute == "JLIDUSiUQTl") {
            console.log("firstname : " + attr.value);
            this.attrFirstname.value = attr.value;
          }
          if (attr.attribute == "lMjqbn6uwKs") {
            console.log("Maiden name :" + attr.value);
            this.attrMaidenname.value = attr.value;
          }
          if (attr.attribute == "GQQtlqqDRmz") {
            console.log("Initials : " + attr.value);
            this.attrInitialsname.value = attr.value;
          }

          if (attr.attribute == "p0ci9AQcqcI") {
            this.attrProffession.value = attr.value;
          }
          if (attr.attribute == "hQNk6ODZnXM") {
            this.attrGender.value = attr.value;
          }
          if (attr.attribute == "M7vAlF8LTUK") {
            this.attrTitle.value = attr.value;
          }
          if (attr.attribute == "Cd2NLEe7pMi") {
            this.attrDatOfBirth.value = attr.value;
          }
          if (attr.attribute == "SKyaaiQyMQj") {
            this.attrMaritaStatus.value = attr.value;
          }
          if (attr.attribute == "B22oDF7CWVF") {
            this.attrSpouseDetails.value = attr.value;
          }
          if (attr.attribute == "fVNyIxlIYuP") {
            this.attrCurrentCountryOfResidence.value = attr.value;
          }
          if (attr.attribute == "XSZCrXMiCjo") {
            this.attrCurrentResidentialStatus.value = attr.value;
          }
          if (attr.attribute == "yv4ipn1dKoT") {
            this.attrSouthAfricanID.value = attr.value;
          }
          if (attr.attribute == "Uk8P0cvXKyD") {
            this.attrPassportNumber.value = attr.value;
          }
          if (attr.attribute == "SWtBa8bXcOi") {
            this.attrRefugeeID.value = attr.value;
          }
          if (attr.attribute == "uezzshW3BN6") {
            this.attrStreetAddressLine1.value = attr.value;
          }
          if (attr.attribute == "CWlbP1cTK7u") {
            this.attrStreetAddressLine2.value = attr.value;
          }
          if (attr.attribute == "rxFinyRVA9T") {
            this.attrStreetAddressLine3.value = attr.value;
          }
          if (attr.attribute == "xDz6lSwCt7Y") {
            this.attrStreetPostalCode.value = attr.value;
          }
          if (attr.attribute == "jbwHv5SYiME") {
            this.attrStreetZipCode.value = attr.value;
          }
          if (attr.attribute == "qMGmfAObIs6") {
            this.attrStreetAddressLine1Home.value = attr.value;
          }
          if (attr.attribute == "gqixvHELgUO") {
            this.attrStreetAddressLine2Home.value = attr.value;
          }
          if (attr.attribute == "hTEwEq41nnj") {
            this.attrStreetAddressLine3Home.value = attr.value;
          }
          if (attr.attribute == "e2aboFrKVe5") {
            this.attrStreetPostalCodeHome.value = attr.value;
          }
          if (attr.attribute == "fIVeC4j6YD8") {
            this.attrStreetZipCodeHome.value = attr.value;
          }
          if (attr.attribute == "CezOf26uGZ4") {
            this.attrCellphoneNumber.value = attr.value;
          }
          if (attr.attribute == "ixHqdNQYfqF") {
            this.attrWorkTelephoneNumber.value = attr.value;
          }

          if (attr.attribute == "t2Blc1cnEwd") {
            this.attrHomeTelephoneNumber.value = attr.value;
          }

          if (attr.attribute == "QicAcX9cLKQ") {
            this.attrEmailAddressPrimary.value = attr.value;
          }



          if (attr.attribute == "FmeEL6WAOOi") {
            this.attrEmailAddressAlternative.value = attr.value;
          }

          if (attr.attribute == "U16h9pm5aL6") {
            this.attrPrefferedMethodOfCommunication.value = attr.value;
          }

          if (attr.attribute == "kOoVDeW9qrp") {
            this.attrCountryWhereQualificationObtained.value = attr.value;
          }

          if (attr.attribute == "BQAchMg4aMq") {
            this.attrQualificationType.value = attr.value;
          }
          if (attr.attribute == "UtmTAD03WcJ") {
            this.attrProffBodyRegistrationYesNo.value = attr.value;
          }
          if (
            attr.attribute == "OTkJvWxLVuD") {
            this.attrProffBodyRegistrationName.value = attr.value;
          }
          if (
            attr.attribute == "AiEiUfSNGTU") {
            this.attrSpecializationYesNo.value = attr.value;
          }
          if (
            attr.attribute == "UsZ89w0XS9f") {
            this.attrUseruuid.value = attr.value;
          }
          //Files
        }
        //for iterator ends here

      } else {
        //here need to start creating a basic profile if does not exist already
        //surname, firstName, useruuid,primary, email, phoneNumber
      }
    }).catch(error => console.log(error));
    }).catch(error => console.log(error));
  }




  fileEvent(event){
    let files = event.target.files.name;
}
  //load track enity instance profile at page load
  checkIdTrackEntityExists()
  {
    //get trackentityInstance  from the useruuid
    //check if records exist





  }
//Map model to the UI
  saveTrackedEntityInstance() {
    if (this.trackedEntityInstancesWithoutEnrollment){
      this.trackedEntityInstancesWithoutEnrollment = new TrackedEntityInstancesWithoutEnrollment();
     // this.trackedEntityInstances = new TrackedEntityInstances();
      this.enrollments =  [];
      this.attributes = [];
      console.log(" new TrackedEntityInstances() passess")
    }
    else
    {

    }
    this.trackedEntityInstances = new TrackedEntityInstances();
    if (this.trackedEntityInstances){
      this.trackedEntityInstancesPayload=  new TrackedEntityInstancesPayload();
      this.trackedEntityInstances = new TrackedEntityInstances();
      this.enrollments =  [];
      this.attributes = [];
      this.trackedEntityInstancesArray = [];

      console.log("new TrackedEntityInstancesPayload() passess")
    }else
    {

    }

//validate for nulls and exclude in the payload
    if (this.attrSurname.value) {
      this.attrSurname.attribute = "adkMaBHuDha";
      this.attributes.push(this.attrSurname);
    }

    if (this.attrFirstname.value) {
      this.attrFirstname.attribute = "JLIDUSiUQTl";
      this.attributes.push(this.attrFirstname);
    }

    if (this.attrMaidenname.value) {
      this.attrMaidenname.attribute = "lMjqbn6uwKs";
      this.attributes.push(this.attrMaidenname);
    }
    if (this.attrInitialsname.value) {

      this.attrInitialsname.attribute = "GQQtlqqDRmz";
      this.attributes.push(this.attrInitialsname);
    }

    if (this.attrProffession.value) {
      this.attrProffession.attribute = "p0ci9AQcqcI";
      this.attributes.push(this.attrProffession);
    }

    if (this.attrGender.value) {
      this.attrGender.attribute = "hQNk6ODZnXM";
      this.attributes.push(this.attrGender);
    }


    if (this.attrTitle.value) {
      this.attrTitle.attribute = "M7vAlF8LTUK";
      this.attributes.push(this.attrTitle);
    }


    if (this.attrDatOfBirth.value) {
      this.attrDatOfBirth.attribute = "Cd2NLEe7pMi";
      this.attributes.push(this.attrDatOfBirth);

    }


    if (this.attrMaritaStatus.value) {
      this.attrMaritaStatus.attribute = "SKyaaiQyMQj";
      this.attributes.push(this.attrMaritaStatus);
    }


    if (this.attrSpouseDetails.value) {
      this.attrSpouseDetails.attribute = "B22oDF7CWVF";
      this.attributes.push(this.attrSpouseDetails);
    }


    if (this.attrCurrentCountryOfResidence.value) {
      this.attrCurrentCountryOfResidence.attribute = "fVNyIxlIYuP";
      this.attributes.push(this.attrCurrentCountryOfResidence);
    }

    if (this.attrCurrentResidentialStatus.value) {
      this.attrCurrentResidentialStatus.attribute = "XSZCrXMiCjo";
      this.attributes.push(this.attrCurrentResidentialStatus);

    }


    if (this.attrSouthAfricanID.value) {
      this.attrSouthAfricanID.attribute = "yv4ipn1dKoT";
      this.attributes.push(this.attrSouthAfricanID);

    }
    if (this.attrPassportNumber.value) {
      this.attrPassportNumber.attribute = "Uk8P0cvXKyD";
      this.attributes.push(this.attrPassportNumber);

    }

    if (this.attrRefugeeID.value) {
      this.attrRefugeeID.attribute = "SWtBa8bXcOi";
      this.attributes.push(this.attrRefugeeID);
    }

    if (this.attrStreetAddressLine1.value) {
      this.attrStreetAddressLine1.attribute = "uezzshW3BN6";
      this.attributes.push(this.attrStreetAddressLine1);

    }


    if (this.attrStreetAddressLine2.value) {
      this.attrStreetAddressLine2.attribute = "CWlbP1cTK7u";
      this.attributes.push(this.attrStreetAddressLine2);
    }


    if (this.attrStreetAddressLine3.value) {
      this.attrStreetAddressLine3.attribute = "rxFinyRVA9T";
      this.attributes.push(this.attrStreetAddressLine3);

    }


    if (this.attrStreetPostalCode.value) {
      this.attrStreetPostalCode.attribute = "xDz6lSwCt7Y";
      this.attributes.push(this.attrStreetPostalCode);
    }


    if (this.attrStreetZipCode.value) {
      this.attrStreetZipCode.attribute = "jbwHv5SYiME";
      this.attributes.push(this.attrStreetZipCode);
    }

    if (this.attrStreetAddressLine1Home.value) {
      this.attrStreetAddressLine1Home.attribute = "qMGmfAObIs6";
    }

    if (this.attrStreetAddressLine2Home.value) {

      this.attrStreetAddressLine2Home.attribute = "gqixvHELgUO";
      this.attributes.push(this.attrStreetAddressLine2Home);
    }

    if (this.attrStreetAddressLine3Home.value) {
      this.attrStreetAddressLine3Home.attribute = "hTEwEq41nnj";
      this.attributes.push(this.attrStreetAddressLine3Home);

    }

    if (this.attrStreetPostalCodeHome.value) {

      this.attrStreetPostalCodeHome.attribute = "e2aboFrKVe5";
      this.attributes.push(this.attrStreetPostalCodeHome);
    }


    if (this.attrStreetZipCodeHome.value) {
      this.attrStreetZipCodeHome.attribute = "fIVeC4j6YD8";
      this.attributes.push(this.attrStreetZipCodeHome);

    }

    if (this.attrCellphoneNumber.value) {
      this.attrCellphoneNumber.attribute = "CezOf26uGZ4";
      this.attributes.push(this.attrCellphoneNumber);

    }

    if (this.attrWorkTelephoneNumber.value) {

      this.attrWorkTelephoneNumber.attribute = "ixHqdNQYfqF";
      this.attributes.push(this.attrWorkTelephoneNumber);
    }


    if (this.attrHomeTelephoneNumber.value) {
      this.attrHomeTelephoneNumber.attribute = "t2Blc1cnEwd";
      this.attributes.push(this.attrHomeTelephoneNumber);
    }


    if (this.attrEmailAddressPrimary.value) {
      this.attrEmailAddressPrimary.attribute = "QicAcX9cLKQ";
      this.attributes.push(this.attrEmailAddressPrimary);
    }


    if (this.attrEmailAddressAlternative.value) {
      this.attrEmailAddressAlternative.attribute = "FmeEL6WAOOi";
      this.attributes.push(this.attrEmailAddressAlternative);
    }

    if (this.attrPrefferedMethodOfCommunication.value) {

      this.attrPrefferedMethodOfCommunication.attribute = "U16h9pm5aL6";
      this.attributes.push(this.attrPrefferedMethodOfCommunication);
    }


    if (this.attrCountryWhereQualificationObtained.value) {
      this.attrCountryWhereQualificationObtained.attribute = "kOoVDeW9qrp";
      this.attributes.push(this.attrCountryWhereQualificationObtained);
    }


    if (this.attrQualificationType.value) {
      this.attrQualificationType.attribute = "BQAchMg4aMq";
      this.attributes.push(this.attrQualificationType);
    }

    if (this.attrProffBodyRegistrationYesNo.value) {
      this.attrProffBodyRegistrationYesNo.attribute = "UtmTAD03WcJ";
      this.attributes.push(this.attrProffBodyRegistrationYesNo);
    }


    if (this.attrProffBodyRegistrationName.value) {
      this.attrProffBodyRegistrationName.attribute = "OTkJvWxLVuD";
      this.attributes.push(this.attrProffBodyRegistrationName);
    }

    if (this.attrSpecializationYesNo.value) {
      this.attrSpecializationYesNo.attribute = "AiEiUfSNGTU";
      this.attributes.push(this.attrSpecializationYesNo);
    }

    if (this.attrFilePassport.value) {
      this.attrFilePassport.attribute = "OTkJvWxLVuD";
      this.attributes.push(this.attrProffBodyRegistrationYesNo);
    }


    if (this.attrFilePassportId) {
      this.attrFilePassport.attribute = "Gcpk3BqfTfY";
      this.attrFilePassport.value = this.attrFilePassportId;
      this.attributes.push(this.attrFilePassport);
    }

    //start here with the files


     if (this.attrFileCVId){
     this.attrFileCV.attribute = "wKg02nSAnth";
     this.attrFileCV.value = this.attrFileCVId;
     this.attributes.push(this.attrFileCV);
     }

     if (this.attrFileCVId) {
     this.attrFileQualifications.attribute = "Gcpk3BqfTfY";
     this.attrFileQualifications.value = this.attrFileCVId;
     this.attributes.push(this.attrFileQualifications);
     }

     if (this.attrFileProfRegistrationId) {
     this.attrFileProfRegistration.value = "kL7nLPq9HmS";
     this.attrFileProfRegistration.attribute = this.attrFileProfRegistrationId;
     this.attributes.push(this.attrFileProfRegistration);
     }

     if (this.attrFileRefLetterId ) {
     this.attrFileRefLetter.attribute = "TeUV3frsYEc";
     this.attrFileRefLetter.value = this.attrFileProfRegistrationId;
     this.attributes.push(this.attrFileRefLetter);
     }


     if (this.attrFileSpouseIDId) {
     this.attrFileSpouseID.attribute = "QCGwC8WHzIV";
     this.attrFileSpouseID.value = this.attrFileSpouseIDId
     this.attributes.push(this.attrFileSpouseID);
     }


     if (this.attrFileMarriageCertificateId) {

     this.attrFileMarriageCertificate.attribute = "ukQzrmcUQgu";
     this.attrFileMarriageCertificate.value = this.attrFileProfRegistrationId
     this.attributes.push(this.attrFileMarriageCertificate);
     }

     if (this.attrFileSpouseIDDocId) {
     this.attrFileSpouseIDDoc.attribute = "QCGwC8WHzIV";
     this.attrFileSpouseIDDoc.value = this.attrFileSpouseIDDocId;
     this.attributes.push(this.attrFileSpouseIDDoc);
     }

     if (this.attrFileResidencePermitId) {
     this.attrFileResidencePermit.attribute = "QCGwC8WHzIV";
     this.attrFileResidencePermit.value = this.attrFileResidencePermitId;
     this.attributes.push(this.attrFileResidencePermit);
     }


     if (this.attrFileAffidavitId) {
     this.attrFileAffidavit.attribute = "OOCZMGkv1SF";
     this.attrFileAffidavit.value = this.attrFileAffidavitId;
     this.attributes.push(this.attrFileAffidavit);
     }

     if (this.attrFileSpouseEmploymentContractId) {
     this.attrFileSpouseEmploymentContract.attribute = "BnAeQ9CfPqD";
     this.attrFileSpouseEmploymentContract.value = this.attrFileSpouseEmploymentContractId;
     this.attributes.push(this.attrFileSpouseEmploymentContract);
     }

     if (this.attrFileSpouseWorkPermitId) {
     this.attrFileSpouseWorkPermit.attribute = "xJUWub6Na81";
     this.attrFileSpouseWorkPermit.value = this.attrFileSpouseWorkPermitId;
     this.attributes.push(this.attrFileSpouseWorkPermit);
     }


     if (this.attrFileSpouseSalarySlipId) {
     this.attrFileSpouseSalarySlip.attribute = "i63qGgDCqWK";
     this.attrFileSpouseSalarySlip.value = this.attrFileSpouseSalarySlipId;
     this.attributes.push(this.attrFileSpouseSalarySlip);
     }

     if (this.attrFileSpouseEmploymentContractId) {
     this.attrFileEmploymentLetter.attribute = "pCuas8xccgp";
     this.attrFileEmploymentLetter.value = this.attrFileSpouseEmploymentContractId;
     this.attributes.push(this.attrFileEmploymentLetter);
     }



    this.attrUseruuid.attribute = "UsZ89w0XS9f";
    this.attrUseruuid.value = this.userId;
    this.attributes.push(this.attrUseruuid);

    this.enrollment.orgUnit = "JLA7wl59oN3";
    this.enrollment.program = "perc4ZpWBWr";
    this.enrollments.push(this.enrollment);

    this.trackedEntityInstances.trackedEntity = "HlrC9bKsuIg";
    this.trackedEntityInstances.orgUnit = this.enrollment.orgUnit;
    this.trackedEntityInstances.enrollments = this.enrollments;
    this.trackedEntityInstances.attributes = this.attributes;

    this.trackedEntityInstancesArray.push(this.trackedEntityInstances);

    this.trackedEntityInstancesWithoutEnrollment.orgUnit =  this.trackedEntityInstances.orgUnit;
    this.trackedEntityInstancesWithoutEnrollment.trackedEntity = this.trackedEntityInstances.trackedEntity;
    this.trackedEntityInstancesWithoutEnrollment.attributes = this.trackedEntityInstances.attributes;

    this.trackedEntityInstancesPayload.trackedEntityInstances = this.trackedEntityInstancesArray;
    console.log("Inside the TrackEntityInstance" + "  " + JSON.stringify(this.trackedEntityInstancesPayload));

    //steps
    //create track entity instance
    //Enrol a tracked entity instance to a program
    const trackedEntityInstanceUrl = '../../../staging/api/trackedEntityInstances';
    const trackedEntityInstancePUTUrl =  '../../../staging/api/trackedEntityInstances/'+  this.trackentityInstance;

    //if profile exist update the profile else create/insert a new profile
    if (this.trackentityAtributeCount > 0) {
      console.log("TrackEntityInstance to update: " + "  " + JSON.stringify(this.trackedEntityInstances));
      this.programService.updateEnrolApplicant(trackedEntityInstancePUTUrl, this.trackedEntityInstancesWithoutEnrollment).then(result => {
      console.log(result)

        alert(this.userDisplayname+ " your profile has been updated.");
      }).catch(error => console.log(error));

    }
    else {
      this.programService.enrolApplicant(trackedEntityInstanceUrl, this.trackedEntityInstancesPayload).then(result => {
        this.trackentityInstance = result.reference;
        this.trackentityAtributeCount = 1;
        console.log(result)
        alert(this.userDisplayname+ " your profile is created.");
      }).catch(error => console.log(error));
    }

  }

  //Save TrackedEntityInstance Profile
  OnButtonSubmit(){
    this.saveTrackedEntityInstance();
    this.router.navigate(['staging/api/apps/fhwm/application']);
  }
  //create TrackedEntityInstance profile on load if it does not exist

  onFileChange(event){
    const fileResourceURL =  '../../../staging/api/fileResources';

    let fileList: FileList = event.target.files;
    let file: File = event.target.files[0];
    let fileSize:number=fileList[0].size;

    let filetype:any=fileList[0].type;

      console.log(event.target.files[0])
      console.log(event.target.name)


    //all events for file uploads must go in here. If a file is not .pdf do not upload it

    if (filetype=="application/pdf"){

      //check the file size here if bigger than 2MB do not allow upload
      if (fileSize > 2097152 )
      {
      }
      //events will go in here and that is  it
      else
      {
        //events for file upload in here

      }
    }else
    {
      alert("Only pdf files are allowed uploaded ");
    }



  if  (event.target.name == "Gcpk3BqfTfY"){

      //post a file here and get the id from the response
    let passportfileformData:FormData = new FormData();
   // passportfileformData.append('file',file.name);

    let headers = new Headers();
    headers.set('Accept', 'application/json');
    let options = new RequestOptions({ headers: headers });
    passportfileformData.append("file",file, file.name);

    this.http.post(fileResourceURL, passportfileformData, options).map(res => res.json()).catch(error => Observable.throw(error)).subscribe(
        data => {
        // Consume Files
        // get the file uuid and store it.
          console.log(data);
          console.log(data.response.fileResource.id);
          this.attrFilePassportId =data.response.fileResource.id;

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

    if  (event.target.name == "wKg02nSAnth"){
      let cvfileformData:FormData = new FormData();

      let headers = new Headers();
      headers.set('Accept', 'application/json');
      let options = new RequestOptions({ headers: headers });
      cvfileformData.append("file",file, file.name);

      this.http.post(fileResourceURL, cvfileformData, options).map(res => res.json()).catch(error => Observable.throw(error)).subscribe(
          data => {
          // Consume Files
          // get the file uuid and store it.
          console.log(data);
          console.log(data.response.fileResource.id);
          this.attrFileCVId =data.response.fileResource.id;
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
    if  (event.target.name == "kL7nLPq9HmS"){
      let profRegfileformData:FormData = new FormData();

      let headers = new Headers();
      headers.set('Accept', 'application/json');
      let options = new RequestOptions({ headers: headers });
      profRegfileformData.append("file",file, file.name);

      this.http.post(fileResourceURL, profRegfileformData, options).map(res => res.json()).catch(error => Observable.throw(error)).subscribe(
          data => {
          // Consume Files
          // get the file uuid and store it.
          console.log(data);
          console.log(data.response.fileResource.id);
          this.attrFileProfRegistrationId =data.response.fileResource.id;
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
    if  (event.target.name == "TeUV3frsYEc"){
      let RefLetterformData:FormData = new FormData();

      let headers = new Headers();
      headers.set('Accept', 'application/json');
      let options = new RequestOptions({ headers: headers });
      RefLetterformData.append("file",file, file.name);

      this.http.post(fileResourceURL, RefLetterformData, options).map(res => res.json()).catch(error => Observable.throw(error)).subscribe(
          data => {
          // Consume Files
          // get the file uuid and store it.
          console.log(data);
          console.log(data.response.fileResource.id);
          this.attrFileRefLetterId =data.response.fileResource.id;
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
    if  (event.target.name == "QCGwC8WHzIV"){
      let lifePatnerFileformData:FormData = new FormData();

      let headers = new Headers();
      headers.set('Accept', 'application/json');
      let options = new RequestOptions({ headers: headers });
      lifePatnerFileformData.append("file",file, file.name);

      this.http.post(fileResourceURL, lifePatnerFileformData, options).map(res => res.json()).catch(error => Observable.throw(error)).subscribe(
          data => {
          // Consume Files
          // get the file uuid and store it.
          console.log(data);
          console.log(data.response.fileResource.id);
          this.attrFileSpouseIDId =data.response.fileResource.id;
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

    if  (event.target.name == "OOCZMGkv1SF"){
      let affidavitFileformData:FormData = new FormData();

      let headers = new Headers();
      headers.set('Accept', 'application/json');
      let options = new RequestOptions({ headers: headers });
      affidavitFileformData.append("file",file, file.name);

      this.http.post(fileResourceURL, affidavitFileformData, options).map(res => res.json()).catch(error => Observable.throw(error)).subscribe(
          data => {
          // Consume Files
          // get the file uuid and store it.
          console.log(data);
          console.log(data.response.fileResource.id);
          this.attrFileAffidavitId =data.response.fileResource.id;
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

    if  (event.target.name == "BnAeQ9CfPqD"){
      let spouseContractFileIdformData:FormData = new FormData();

      let headers = new Headers();
      headers.set('Accept', 'application/json');
      let options = new RequestOptions({ headers: headers });
      spouseContractFileIdformData.append("file",file, file.name);

      this.http.post(fileResourceURL, spouseContractFileIdformData, options).map(res => res.json()).catch(error => Observable.throw(error)).subscribe(
          data => {
          // Consume Files
          // get the file uuid and store it.
          console.log(data);
          console.log(data.response.fileResource.id);
          this.attrFileSpouseEmploymentContractId =data.response.fileResource.id;
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
    if  (event.target.name == "xJUWub6Na81"){
      let SpouseWorkPermitformData:FormData = new FormData();

      let headers = new Headers();
      headers.set('Accept', 'application/json');
      let options = new RequestOptions({ headers: headers });
      SpouseWorkPermitformData.append("file",file, file.name);

      this.http.post(fileResourceURL, SpouseWorkPermitformData, options).map(res => res.json()).catch(error => Observable.throw(error)).subscribe(
          data => {
          // Consume Files
          // get the file uuid and store it.
          console.log(data);
          console.log(data.response.fileResource.id);
          this.attrFileSpouseWorkPermitId =data.response.fileResource.id;
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
    if  (event.target.name == "i63qGgDCqWK"){
      let SpouseSalarySlipformData:FormData = new FormData();


      let headers = new Headers();
      headers.set('Accept', 'application/json');
      let options = new RequestOptions({ headers: headers });
      SpouseSalarySlipformData.append("file",file, file.name);

      this.http.post(fileResourceURL, SpouseSalarySlipformData, options).map(res => res.json()).catch(error => Observable.throw(error)).subscribe(
          data => {
          // Consume Files
          // get the file uuid and store it.
          console.log(data);
          console.log(data.response.fileResource.id);
          this.attrFileSpouseSalarySlipId =data.response.fileResource.id;
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
    if  (event.target.name == "pCuas8xccgp"){
      let SpouseEmploymentContractformData:FormData = new FormData();

      let headers = new Headers();
      headers.set('Accept', 'application/json');
      let options = new RequestOptions({ headers: headers });
      SpouseEmploymentContractformData.append("file",file, file.name);

      this.http.post(fileResourceURL, SpouseEmploymentContractformData, options).map(res => res.json()).catch(error => Observable.throw(error)).subscribe(
          data => {
          // Consume Files
          // get the file uuid and store it.
          console.log(data);
          console.log(data.response.fileResource.id);
          this.attrFileSpouseEmploymentContractId =data.response.fileResource.id;
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

    if  (event.target.name == "ukQzrmcUQgu"){
      let marriageCertificateFormData:FormData = new FormData();

      let headers = new Headers();
      headers.set('Accept', 'application/json');
      let options = new RequestOptions({ headers: headers });
      marriageCertificateFormData.append("file",file, file.name);

      this.http.post(fileResourceURL, marriageCertificateFormData, options).map(res => res.json()).catch(error => Observable.throw(error)).subscribe(
          data => {
          // Consume Files
          // get the file uuid and store it.
          console.log(data);
          console.log(data.response.fileResource.id);
          this.attrFileMarriageCertificateId =data.response.fileResource.id;
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

    if  (event.target.name == "BQAchMg4aMq"){
      let qualificationFormData:FormData = new FormData();
      let headers = new Headers();
      headers.set('Accept', 'application/json');
      let options = new RequestOptions({ headers: headers });
      qualificationFormData.append("file",file, file.name);

      this.http.post(fileResourceURL, qualificationFormData, options).map(res => res.json()).catch(error => Observable.throw(error)).subscribe(
          data => {
          // Consume Files
          // get the file uuid and store it.
          console.log(data);
          console.log(data.response.fileResource.id);
          this.attrFileQualificationsId =data.response.fileResource.id;
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

    if  (event.target.name == "QCGwC8WHzIV"){
      let FileResidencePermitFormData:FormData = new FormData();
      let headers = new Headers();
      headers.set('Accept', 'application/json');
      let options = new RequestOptions({ headers: headers });
      FileResidencePermitFormData.append("file",file, file.name);

      this.http.post(fileResourceURL, FileResidencePermitFormData, options).map(res => res.json()).catch(error => Observable.throw(error)).subscribe(
          data => {
          // Consume Files
          // get the file uuid and store it.
          console.log(data);
          console.log(data.response.fileResource.id);
          this.attrFileResidencePermitId =data.response.fileResource.id;
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

    if  (event.target.name == "QCGwC8WHzIV"){
      let FileResidencePermitFormData:FormData = new FormData();
      let headers = new Headers();
      headers.set('Accept', 'application/json');
      let options = new RequestOptions({ headers: headers });
      FileResidencePermitFormData.append("file",file, file.name);

      this.http.post(fileResourceURL, FileResidencePermitFormData, options).map(res => res.json()).catch(error => Observable.throw(error)).subscribe(
          data => {
          // Consume Files
          // get the file uuid and store it.
          console.log(data);
          console.log(data.response.fileResource.id);
          this.attrFileResidencePermitId =data.response.fileResource.id;
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
