import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-economy',
  templateUrl: './economy.page.html',
  styleUrls: ['./economy.page.scss'],
})
export class EconomyPage implements OnInit {
  articles;

  constructor(private apiService: ApiService) { }
  ngOnInit(){
  }

  ionViewDidEnter(){
     this.apiService.getEcon().subscribe((data)=>{
        console.log(data);
	this.articles = data['articles'];
     });
  }

}
