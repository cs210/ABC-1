import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { InAppBrowser,InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';


@Component({
  selector: 'app-coronavirus',
  templateUrl: './coronavirus.page.html',
  styleUrls: ['./coronavirus.page.scss'],
})
export class CoronavirusPage implements OnInit {
  articles;

  constructor(private apiService: ApiService, private iab: InAppBrowser) { }
  ngOnInit(){
  }

  openInAppBrowser(url : string) {
    this.iab.create(url, '_blank');
  }

  ionViewDidEnter(){
     this.apiService.getCoronavirus().subscribe((data)=>{
        console.log(data);
	this.articles = data['articles'];
     });
  }

}
