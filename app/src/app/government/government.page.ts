import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-government',
  templateUrl: './government.page.html',
  styleUrls: ['./government.page.scss'],
})
export class GovernmentPage implements OnInit {
  articles;

  constructor(private apiService: ApiService) { }
  ngOnInit(){
  }

  ionViewDidEnter(){
     this.apiService.getGov().subscribe((data)=>{
        console.log(data);
	this.articles = data['articles'];
     });
  }

}
