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






  //Documents attributes will go under here

  private GenderTest: OptionSet[] = new Array<OptionSet>();

  constructor(private programService: ProgramService,private user:User, private dataelemetservice:DataElementService, private organisationUnitService: OrganisationUnitService, private OptionSetsService: OptionSetsService, private router: Router) {
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


    const urlTrackedEntityInstance = '../../../staging/api/trackedEntityInstances.json?ou=JLA7wl59oN3&paging=false&trackedEntityInstance=Z5ZQbIkSTND';

      this.programService.getTrackEntityInstance(urlTrackedEntityInstance).then(result => {this.applicantDetails =  result.trackedEntityInstances[0].attributes;
      console.log("applicant is : "+ this.applicantDetails);
      console.log("There are this number of attributes : "+  Object.keys(this.applicantDetails).length);

        if (this.applicantDetails){
          //for iterator starts here
          for (let attr of this.applicantDetails ) {
                                    console.log(attr)
            if (attr.attribute == "adkMaBHuDha")
            {
              this.attrSurname.value = attr.attribute.value
            }
            if (attr.attribute ==  "JLIDUSiUQTl")
            {
              this.attrFirstname.value = attr.attribute.value;
            }
            if (attr.attribute == "lMjqbn6uwKs")
            {
              this.attrMaidenname.value = attr.attribute.value;
            }
            if (attr.attribute ==  "GQQtlqqDRmz" )
            {
              this.attrInitialsname.value = attr.attribute.value;
            }
            if (attr.attribute ==  "p0ci9AQcqcI")
            {
              this.attrProffession.value = attr.attribute.value;
            }
            if (attr.attribute ==  "hQNk6ODZnXM")
            {
              this.attrGender.value = attr.attribute.value;
            }
            if ( attr.attribute ==  "M7vAlF8LTUK")
            {
              this.attrTitle.value = attr.attribute.value;
            }
            if (attr.attribute ==  "Cd2NLEe7pMi")
            {
              this.attrDatOfBirth.value = attr.attribute.value;
            }
            if ( attr.attribute ==  "SKyaaiQyMQj")
            {
              this.attrMaritaStatus.value =attr.attribute.value;
            }
            if (attr.attribute ==  "B22oDF7CWVF")
            {
              this.attrSpouseDetails.value = attr.attribute.value;
            }
            if ( attr.attribute ==  "fVNyIxlIYuP")
            {
              this.attrCurrentCountryOfResidence.value = attr.attribute.value;
            }
            if ( attr.attribute ==  "XSZCrXMiCjo")
            {
              this.attrCurrentResidentialStatus.value = attr.attribute.value;
            }
            if (  attr.attribute ==  "yv4ipn1dKoT")
            {
              this.attrSouthAfricanID.value = attr.attribute.value;
            }
            if ( attr.attribute ==  "JqLIzp2KYnH")
            {
              this.attrPassportNumber.value = attr.attribute.value;
            }
            if (  attr.attribute ==  "SWtBa8bXcOi")
            {
              this.attrRefugeeID.value = attr.attribute.value;
            }
            if (attr.attribute ==  "uezzshW3BN6" )
            {
              this.attrStreetAddressLine1.value = attr.attribute.value;
            }
            if ( attr.attribute ==  "CWlbP1cTK7u")
            {
              this.attrStreetAddressLine2.value = attr.attribute.value;
            }
            if (attr.attribute ==  "rxFinyRVA9T")
            {
              this.attrStreetAddressLine3.value = attr.attribute.value;
            }
            if (attr.attribute ==  "xDz6lSwCt7Y")
            {
              this.attrStreetPostalCode.value = attr.attribute.value;
            }
            if (attr.attribute ==  "fIVeC4j6YD8")
            {
              this.attrStreetZipCode.value = attr.attribute.value;
            }
            if (attr.attribute ==  "qMGmfAObIs6")
            {
             this.attrStreetAddressLine1Home.value = attr.attribute.value;
            }
            if (attr.attribute==  "gqixvHELgUO")
            {
              this.attrStreetAddressLine2Home.value = attr.attribute.value;
            }
            if ( attr.attribute ==  "hTEwEq41nnj")
            {
              this.attrStreetAddressLine3Home.value = attr.attribute.value;
            }
            if (attr.attribute ==  "e2aboFrKVe5")
            {
              this.attrStreetPostalCodeHome.value = attr.attribute.value;
            }
            if (attr.attribute ==  "fIVeC4j6YD8")
            {
              this.attrStreetZipCodeHome.value = attr.attribute.value;
            }
            if (attr.attribute ==  "CezOf26uGZ4")
            {
              this.attrCellphoneNumber.value = attr.attribute.value;
            }
            if (  attr.attribute ==  "ixHqdNQYfqF")
            {
              this.attrWorkTelephoneNumber.value = attr.attribute.value;
            }

            if ( attr.attribute ==  "t2Blc1cnEwd")
            {
              this.attrHomeTelephoneNumber.value = attr.attribute.value;
            }

            if (  attr.attribute ==  "QicAcX9cLKQ")
            {
              this.attrEmailAddressPrimary.value = attr.attribute.value;
            }
            if ( attr.attribute ==  "jbwHv5SYiME")
            {
              this.attrEmailAddressAlternative.value = attr.attribute.value;
            }

            if ( attr.attribute ==  "U16h9pm5aL6")
            {
              this.attrPrefferedMethodOfCommunication.value = attr.attribute.value;
            }

            if ( attr.attribute ==  "kOoVDeW9qrp")
            {
              this.attrCountryWhereQualificationObtained.value = attr.attribute.value;
            }

            if ( attr.attribute ==  "BQAchMg4aMq")
            {
              this.attrQualificationType.value = attr.attribute.value;
            }
            if ( attr.attribute ==  "UtmTAD03WcJ")
            {
              this.attrProffBodyRegistrationYesNo.value = attr.attribute.value;
            }
            if (
              attr.attribute ==  "OTkJvWxLVuD")
            {
              this.attrProffBodyRegistrationName.value = attr.attribute.value;
            }
            if (
              attr.attribute ==  "AiEiUfSNGTU")
            {
              this.attrSpecializationYesNo.value = attr.attribute.value;
            }
            if (
              attr.attribute ==  "UsZ89w0XS9f")
            {
              this.attrUseruuid.value = attr.attribute.value;
            }
          }
          //for iterator ends here

        }else
        {
          //here need to start creating a basic profile if does not exist already
          //surname, firstName, useruuid,primary, email, phoneNumber







        }
    }).catch(error => console.log(error));

    //create entity Instance
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
    console.log(result); this.userId = result.id;
    console.log("User Id is : "+ this.userId );
    }).catch(error => console.log(error));
  }
  fileEvent(event){
    let files = event.target.files.name;
}
  //load track enity instance profile at page load
  LoadTrackEntityInstance(url: string, userid: string){


    const urlTrackedEntityInstance = '../../../staging/api/trackedEntityInstances.json?ou=JLA7wl59oN3&paging=false&trackedEntityInstance=Z5ZQbIkSTND';
  //const urlTrackedEntityInstance = '../../../staging/api/trackedEntityInstances.json?ou=JLA7wl59oN3&paging=false&trackedEntityInstance='+userid;
  this.programService.getTrackEntityInstance(urlTrackedEntityInstance).then(result => this.applicantDetails =  result.trackedEntityInstances[0].attributes).catch(error => console.log(error));

  }


  checkIdTrackEntityExists()
  {


  }

//Map model to the UI
  saveTrackedEntityInstance(){
    //validate for nulls and exclude in the payload
    if (this.attrSurname.value)
    {
      this.attrSurname.attribute = "adkMaBHuDha";
      this.attributes.push(this.attrSurname);
    }


    if (  this.attrFirstname.value)
    {
      this.attrFirstname.attribute = "JLIDUSiUQTl";
      this.attributes.push(this.attrFirstname);
    }

    if (this.attrMaidenname.value)
    {
      this.attrMaidenname.attribute = "lMjqbn6uwKs";
      this.attributes.push(this.attrMaidenname);
    }
    if (this.attrInitialsname.value)
    {

      this.attrInitialsname.attribute = "GQQtlqqDRmz";
      this.attributes.push(this.attrInitialsname);
    }


    if (this.attrProffession.value)
    {
      this.attrProffession.attribute = "p0ci9AQcqcI";
      this.attributes.push(this.attrProffession);
    }

    if (this.attrGender.value )
    {
      this.attrGender.attribute = "hQNk6ODZnXM";
      this.attributes.push(this.attrGender);
    }


    if ( this.attrTitle.value)
    {
      this.attrTitle.attribute = "M7vAlF8LTUK";
      this.attributes.push(this.attrTitle);
    }


    if ( this.attrDatOfBirth.value)
    {
      this.attrDatOfBirth.attribute = "Cd2NLEe7pMi";
      this.attributes.push(this.attrDatOfBirth);

    }


    if (   this.attrMaritaStatus.value)
    {

      this.attrMaritaStatus.attribute = "SKyaaiQyMQj";
      this.attributes.push(this.attrMaritaStatus);
    }


    if ( this.attrSpouseDetails.value)
    {
      this.attrSpouseDetails.attribute = "B22oDF7CWVF";
      this.attributes.push(this.attrSpouseDetails);
    }


    if (this.attrCurrentCountryOfResidence.value)
    {
      this.attrCurrentCountryOfResidence.attribute = "fVNyIxlIYuP";
      this.attributes.push(this.attrCurrentCountryOfResidence);
    }

    if (this.attrCurrentResidentialStatus.value)
    {
      this.attrCurrentResidentialStatus.attribute = "XSZCrXMiCjo";
      this.attributes.push(this.attrCurrentResidentialStatus);

    }



    if ( this.attrSouthAfricanID.value)
    {
      this.attrSouthAfricanID.attribute = "yv4ipn1dKoT";
      this.attributes.push(this.attrSouthAfricanID);

    }
    if (this.attrPassportNumber.value)
    {
      this.attrPassportNumber.attribute = "JqLIzp2KYnH";
      this.attributes.push(this.attrPassportNumber);

    }



    if (  this.attrRefugeeID.value)
    {
      this.attrRefugeeID.attribute = "SWtBa8bXcOi";
      this.attributes.push(this.attrRefugeeID);
    }

    if (this.attrStreetAddressLine1.value)
    {
      this.attrStreetAddressLine1.attribute = "uezzshW3BN6";
      this.attributes.push(this.attrStreetAddressLine1);

    }




    if (this.attrStreetAddressLine2.value)
    {
      this.attrStreetAddressLine2.attribute = "CWlbP1cTK7u";
      this.attributes.push(this.attrStreetAddressLine2);
    }



    if (this.attrStreetAddressLine3.value)
    {
      this.attrStreetAddressLine3.attribute = "rxFinyRVA9T";
      this.attributes.push(this.attrStreetAddressLine3);

    }


    if ( this.attrStreetPostalCode.value)
    {
      this.attrStreetPostalCode.attribute = "xDz6lSwCt7Y";
      this.attributes.push(this.attrStreetPostalCode);
    }



    if ( this.attrStreetZipCode.value)
    {
      this.attrStreetZipCode.attribute = "fIVeC4j6YD8";
      this.attributes.push(this.attrStreetZipCode);
    }

    if (this.attrStreetAddressLine1Home.value)
    {this.attrStreetAddressLine1Home.attribute = "qMGmfAObIs6";
    }

    if ( this.attrStreetAddressLine2Home.value)
    {

      this.attrStreetAddressLine2Home.attribute = "gqixvHELgUO";
      this.attributes.push(this.attrStreetAddressLine2Home);
    }

    if (this.attrStreetAddressLine3Home.value)
    {
      this.attrStreetAddressLine3Home.attribute = "hTEwEq41nnj";
      this.attributes.push(this.attrStreetAddressLine3Home);

    }

    if (   this.attrStreetPostalCodeHome.value)
    {

      this.attrStreetPostalCodeHome.attribute = "e2aboFrKVe5";
      this.attributes.push(this.attrStreetPostalCodeHome);
    }



    if (this.attrStreetZipCodeHome.value)
    {
      this.attrStreetZipCodeHome.attribute = "fIVeC4j6YD8";
      this.attributes.push(this.attrStreetZipCodeHome);

    }

    if (this.attrCellphoneNumber.value)
    {
      this.attrCellphoneNumber.attribute = "CezOf26uGZ4";
      this.attributes.push(this.attrCellphoneNumber);

    }

    if (  this.attrWorkTelephoneNumber.value)
    {

      this.attrWorkTelephoneNumber.attribute = "ixHqdNQYfqF";
      this.attributes.push(this.attrWorkTelephoneNumber);
    }


    if (this.attrHomeTelephoneNumber.value)
    {
      this.attrHomeTelephoneNumber.attribute = "t2Blc1cnEwd";
      this.attributes.push(this.attrHomeTelephoneNumber);
    }


    if (  this.attrEmailAddressPrimary.value)
    {
      this.attrEmailAddressPrimary.attribute = "QicAcX9cLKQ";
      this.attributes.push(this.attrEmailAddressPrimary);
    }



    if ( this.attrEmailAddressAlternative.value)
    {
      this.attrEmailAddressAlternative.attribute = "jbwHv5SYiME";
      this.attributes.push(this.attrEmailAddressAlternative);
    }

    if ( this.attrPrefferedMethodOfCommunication.value)
    {

      this.attrPrefferedMethodOfCommunication.attribute = "U16h9pm5aL6";
      this.attributes.push(this.attrPrefferedMethodOfCommunication);
    }



    if ( this.attrCountryWhereQualificationObtained.value)
    {
      this.attrCountryWhereQualificationObtained.attribute = "kOoVDeW9qrp";
      this.attributes.push(this.attrCountryWhereQualificationObtained);

    }


    if ( this.attrQualificationType.value)
    {
      this.attrQualificationType.attribute = "BQAchMg4aMq";
      this.attributes.push(this.attrQualificationType);
    }



    if ( this.attrProffBodyRegistrationYesNo.value)
    {
      this.attrProffBodyRegistrationYesNo.attribute = "UtmTAD03WcJ";
      this.attributes.push(this.attrCountrySpecialization);
    }


    if (
      this.attrProffBodyRegistrationName.value)
    {
      this.attrProffBodyRegistrationName.attribute = "OTkJvWxLVuD";
      this.attributes.push(this.attrProffBodyRegistrationYesNo);

    }


    if (
      this.attrSpecializationYesNo.value)
    {
      this.attrSpecializationYesNo.attribute = "AiEiUfSNGTU";
      this.attributes.push(this.attrSpecializationYesNo);
    }

      this.attrUseruuid.attribute = "UsZ89w0XS9f";
      this.attrUseruuid.value = this.userId;
      this.attributes.push(this.attrUseruuid);


    this.enrollment.orgUnit = "JLA7wl59oN3";
    this.enrollment.program ="perc4ZpWBWr";
    this.enrollments.push(this.enrollment);

    this.trackedEntityInstances.trackedEntity = "HlrC9bKsuIg";
    this.trackedEntityInstances.orgUnit = "JLA7wl59oN3";
    this.trackedEntityInstances.enrollments = this.enrollments;
    this.trackedEntityInstances.attributes = this.attributes;

    this.trackedEntityInstancesArray.push(this.trackedEntityInstances);

    this.trackedEntityInstancesPayload.trackedEntityInstances =this.trackedEntityInstancesArray;

    console.log("Inside the TrackEntityInstance" + "  "+ JSON.stringify(this.trackedEntityInstancesPayload));

    //steps
    //create track entity instance
    //Enrol a tracked entity instance to a program

    const trackedEntityInstanceUrl = '../../../staging/api/trackedEntityInstances';

this.programService.enrolApplicant(trackedEntityInstanceUrl,this.trackedEntityInstancesPayload ).then(result => console.log(result)).catch(error => console.log(error));
  }

  //Save TrackedEntityInstance Profile
  OnButtonSubmit(){
    this.saveTrackedEntityInstance()
    this.router.navigate(['staging/api/apps/fhwm/application']);
  }
  //create TrackedEntityInstance profile on load if it does not exist



}
