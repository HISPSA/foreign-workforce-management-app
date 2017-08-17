import {Component, OnInit, Input} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import 'rxjs/add/operator/toPromise';
import {DataElementService} from './providers/dataelement.service';
import {OrganisationUnitService} from './providers/organisation-unit.service';
import {User} from './providers/user';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent { 


	private dataElements: any[] = [] ; 
	
	private organisationUnits : any[] = []; 
	
	private organisationUnitsprovinstance1: any[] = [] ; 
	private organisationUnitsprovinstance2: any[] = [] ; 
	private provinstance1;
	private provinstance2;
 
   constructor(private dataelemetservice:DataElementService, private organisationUnitService: OrganisationUnitService) {        
     		}      
 
  ngOnInit() {	   
	    const dataelementUrl='../../../staging/api/dataElements'+'.json?fields=:all,id,name,aggregationType,displayName,categoryCombo[id,name,categories[id,name,categoryOptions[id,name]]],dataSets[:all,!compulsoryDataElementOperands]'
		
		const provincesurl = '../../../staging/api/organisationUnits?fields=:all&filter=level:eq:2'
   
this.dataelemetservice.getDataelementsService(dataelementUrl)
.then(result => this.dataElements =result.dataElements)  
.catch(error => console.log(error));

this.organisationUnitService.getOrganisationUnits(provincesurl)
.then(result => this.organisationUnits =result.organisationUnits)  
.catch(error => console.log(error));  
			
this.organisationUnitsprovinstance1 = this.organisationUnits;   
this.organisationUnitsprovinstance2 = this.organisationUnits;   
  }
 


}
