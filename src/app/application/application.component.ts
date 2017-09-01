import {Component, OnInit, Input} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import 'rxjs/add/operator/toPromise';
import {DataElementService} from '../providers/dataelement.service';
import {OrganisationUnitService} from '../providers/organisation-unit.service';
import {User} from '../providers/user';
import {OptionSetsService} from '../providers/Option-sets.service';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent {


  private dataElements: any[] = [] ;

  private organisationUnits : any[] = [];

  private organisationUnitsprovinstance1: any[] = [] ;
  private organisationUnitsprovinstance2: any[] = [] ;
  private provinstance1;
  private provinstance2;

  //optionsets

  private gender: any
  private typeofApllication: any
  private title: any
  private countryOfOrigin:any
  private maritalstatus: any
  private proffession: any
  private resedintialStatus: any
  private typeofid: any
  private typeOfQualification: any
  private visaDuration: any

  private options: any

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



  }

  ngOnInit() {

    const dataelementUrl='../../../staging/api/dataElements'+'.json?paging=false&fields=:all,id,name,aggregationType,displayName,categoryCombo[id,name,categories[id,name,categoryOptions[id,name]]],dataSets[:all,!compulsoryDataElementOperands]'

    const provincesurl = '../../../staging/api/organisationUnits?paging=false&fields=:all&filter=level:eq:2'

//optionsets
    //gender
    //const lkgenderurl = '../../../staging/api/optionSets.json?paging=false&fields=id,name,options[name]&filter=id:eq:zL9imKevTiF';

    const lkgenderurl  = '../../../staging/api/optionSets.json?paging=false&fields=options[name]&filter=id:eq:zL9imKevTiF';
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


    this.OptionSetsService.getOptionSetsService(lkgenderurl).then(result =>{ this.gender =  result.optionSets[0];}).catch(error => console.log(error));

    this.OptionSetsService.getOptionSetsService(lkgenderurl).then(result => {console.log("Gender: ",  result.optionSets[0]);
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
    /**
     this.dataelemetservice.getDataelementsService(dataelementUrl)
     .then(result => this.dataElements =result.dataElements)
     .catch(error => console.log(error));

     this.organisationUnitService.getOrganisationUnits(provincesurl)
     .then(result => this.organisationUnits =result.organisationUnits)
     .catch(error => console.log(error));

     this.organisationUnitsprovinstance1 = this.organisationUnits;
     this.organisationUnitsprovinstance2 = this.organisationUnits;
     **/
  }



}
