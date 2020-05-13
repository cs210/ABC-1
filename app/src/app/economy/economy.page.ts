import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { InAppBrowser,InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';


@Component({
  selector: 'app-economy',
  templateUrl: './economy.page.html',
  styleUrls: ['./economy.page.scss'],
})
export class EconomyPage implements OnInit {
  articles;

  constructor(private apiService: ApiService, private iab: InAppBrowser) { }
  ngOnInit(){
  }
  
  openInAppBrowser(url : string) {
    this.iab.create(url, '_blank');
  }

  ionViewDidEnter(){
     this.apiService.getEcon().subscribe((data)=>{
        console.log(data);
	this.articles = data['articles'];
     });
  }

}
