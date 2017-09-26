import {Component, OnInit, Input} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import 'rxjs/add/operator/toPromise';
import {DataElementService} from '../providers/dataelement.service';
import {OrganisationUnitService} from '../providers/organisation-unit.service';
import {User} from '../providers/user';
import {OptionSetsService} from '../providers/Option-sets.service';
import {OptionSet} from "../option-set"

import {Attributes} from "../attributes";
import {Enrollments} from "../enrollments";
import {TrackedEntityInstances} from "../tracked-entity-instances";


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

  //Documents attributes will go under here

  private GenderTest: OptionSet[] = new Array<OptionSet>();

  constructor(private dataelemetservice:DataElementService, private organisationUnitService: OrganisationUnitService, private OptionSetsService: OptionSetsService ) {
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
    //const lkgenderurl = '../../../staging/api/optionSets.json?paging=false&fields=id,name,options[name]&filter=id:eq:zL9imKevTiF';

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

    const lkCommunicationTypeurl = '../../../staging/api/optionSets.json?paging=false&fields=options[name]&filter=id:eq:qOVusNGHZ0q';

    const user = '../../../staging/api/me.json'

    console.log("Observable Test",this.getGender());
    this.OptionSetsService.getOptionSetsService(lkgenderurl).then(result =>{
      this.options =  result.optionSets[0];}).catch(error => console.log(error));

    this.OptionSetsService.getOptionSetsService(lkgenderurl).then(result => {
      console.log("Gender: ",  result.optionSets[0])
      this.options =result.optionSets[0]
      console.log("Gender22222: ", this.options)
     test = this.options;
    });

    this.OptionSetsService.getOptionSetsService(lkgenderurl).then(result => {this.gender =  result.optionSets[0].options

    console.log("closer and closer", this.gender)
    }).catch(error => console.log(error));

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


     /**

      this.options =  result.optionSets[0];
      const json = JSON.stringify(result.optionSets[0]);
      this.gender = this.options;

      console.log("gender assigned", +  json )}).catch(error => console.log(error));

    this.OptionSetsService.getOptionSetsService(lktypeOfApplicationurl).then(result =>console.log("Application type: ",  result.optionSets)).catch(error => console.log(error));
    this.OptionSetsService.getOptionSetsService(titleurl).then(result => console.log("title: ",  result.optionSets)).catch(error => console.log(error));
    this.OptionSetsService.getOptionSetsService(lkcountryOriginurl).then(result => console.log("country: ",  result.optionSets)).catch(error => console.log(error));
    this.OptionSetsService.getOptionSetsService(lkmaritalStatusurl).then(result => console.log("marital status: ",  result.optionSets)).catch(error => console.log(error));
    this.OptionSetsService.getOptionSetsService(lkproffesionsurl).then(result => console.log("professions: ",  result.optionSets)).catch(error => console.log(error));
    this.OptionSetsService.getOptionSetsService(Residentialstatusurl).then(result => console.log("Residential ",  result.optionSets)).catch(error => console.log(error));
    this.OptionSetsService.getOptionSetsService(lktypeofidurl).then(result => console.log("type of id: ",  result.optionSets)).catch(error => console.log(error));
    this.OptionSetsService.getOptionSetsService(lktypeOfQualiurl).then(result => console.log("type of qualification: ",  result.optionSets)).catch(error => console.log(error));
    this.OptionSetsService.getOptionSetsService(lkvisaurl).then(result => console.log("visa: ",  result.optionSets)).catch(error => console.log(error));


    this.OptionSetsService.getOptionSetsService(lktypeOfApplicationurl).then(result => this.typeofApllication = result.optionSets).catch(error => console.log(error));
    this.OptionSetsService.getOptionSetsService(titleurl).then(result => this.title = result.optionSets).catch(error => console.log(error));
    this.OptionSetsService.getOptionSetsService(lkcountryOriginurl).then(result => this.countryOfOrigin = result.optionSets).catch(error => console.log(error));
    this.OptionSetsService.getOptionSetsService(lkmaritalStatusurl).then(result => this.maritalstatus = result.optionSets).catch(error => console.log(error));
    this.OptionSetsService.getOptionSetsService(lkproffesionsurl).then(result => this.proffession = result.optionSets).catch(error => console.log(error));
    this.OptionSetsService.getOptionSetsService(Residentialstatusurl).then(result => this.resedintialStatus = result.optionSets).catch(error => console.log(error));
    this.OptionSetsService.getOptionSetsService(lktypeofidurl).then(result => this.typeofid = result.optionSets).catch(error => console.log(error));
    this.OptionSetsService.getOptionSetsService(lktypeOfQualiurl).then(result => this.typeOfQualification = result.optionSets).catch(error => console.log(error));
    this.OptionSetsService.getOptionSetsService(lkvisaurl).then(result => this.visaDuration = result.optionSets).catch(error => console.log(error));


    this.dataElements = this.gender;

    console.log("Gender", this.dataElements);
    console.log("Title", this.title);
    console.log("Country of origin", this.countryOfOrigin);
    console.log("Marital Status", this.maritalstatus);
    console.log("Professions", this.proffession);
    console.log("Residential Status", this.resedintialStatus);
    console.log("type of id", this.typeofid);
    console.log("type of qualification", this.typeOfQualification);
    console.log("visa duration", this.visaDuration);

    console.log("gender", this.options);




/*
     this.dataelemetservice.getDataelementsService(dataelementUrl)
     .then(result => this.dataElements =result.dataElements)
     .catch(error => console.log(error));

     this.organisationUnitService.getOrganisationUnits(provincesurl)
     .then(result => this.organisationUnits =result.organisationUnits)
     .catch(error => console.log(error));

     this.organisationUnitsprovinstance1 = this.organisationUnits;
     this.organisationUnitsprovinstance2 = this.organisationUnits;

**/

     console.log("test", test)

  }

  getGender(): OptionSet[] {
    return this.GenderTest;
  }



  fileEvent(event){
    let files = event.target.files.name;
}


//Map model to the UI
  saveTrackedEntityInstance(){

    this.enrollment.orgUnit = "";
    this.enrollment.program ="";
    this.enrollments.push(this.enrollment);



    this.attributes.push(this.attrSurname);
    this.attributes.push(this.attrFirstname);
    this.attributes.push(this.attrSurname);










    this.trackedEntityInstances.trackedEntity = "";
    this.trackedEntityInstances.orgUnit = "";
    this.trackedEntityInstances.enrollments = this.enrollments;
    this.trackedEntityInstances.attributes = this.attributes;
  }

  //Save TrackedEntityInstance Profile
  OnButtonSubmit(){

  }

  //create TrackedEntityInstance profile on load if it does not exist
  OnTrackedEntityInstancesLoad(){



  }


}
