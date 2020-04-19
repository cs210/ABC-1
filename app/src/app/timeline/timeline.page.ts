import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';


@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.page.html',
  styleUrls: ['./timeline.page.scss'],
})
export class TimelinePage implements OnInit {
  articles;

  constructor(private apiService: ApiService, private ga: GoogleAnalytics) { }

  ngOnInit() {
  }
  ionViewDidEnter(){
    this.ga.trackView('Timeline');
    this.ga.trackEvent('Switched', 'Timeline');
    

    this.apiService.getTimeline().subscribe((data)=>{
      console.log(data);
      this.articles = data['articles'];
    });
  }

}
