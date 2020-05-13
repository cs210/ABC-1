import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { InAppBrowser,InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';


@Component({
  selector: 'app-government',
  templateUrl: './government.page.html',
  styleUrls: ['./government.page.scss'],
})
export class GovernmentPage implements OnInit {
  articles;

  constructor(private apiService: ApiService, private iab: InAppBrowser) { }
  ngOnInit(){
  }

  openInAppBrowser(url : string) {
    this.iab.create(url, '_blank');
  }
  
  ionViewDidEnter(){
     this.apiService.getGov().subscribe((data)=>{
        console.log(data);
	this.articles = data['articles'];
     });
  }

}
