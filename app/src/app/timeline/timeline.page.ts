import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.page.html',
  styleUrls: ['./timeline.page.scss'],
})
export class TimelinePage implements OnInit {
  articles;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
  }
  ionViewDidEnter(){
    this.apiService.getTimeline().subscribe((data)=>{
      console.log(data);
      this.articles = data['articles'];
    });
  }

}
