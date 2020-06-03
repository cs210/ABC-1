import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { InAppBrowser,InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  articles;
  informPolarity = 'all';

  constructor(private apiService: ApiService, private iab: InAppBrowser){}

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
    this.informPolarity = ev;
  }

  ionViewDidEnter(){

    this.apiService.getNews().subscribe((data)=>{
      console.log(data);
      this.articles = data['articles'];
    });
  }

  openInAppBrowser(url : string) {
    this.iab.create(url, '_blank');
  }
}
