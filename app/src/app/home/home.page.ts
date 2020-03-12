import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})


export class HomePage {
  
  articles;
  informPolarity;

  constructor(private apiService: ApiService){}

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
}
