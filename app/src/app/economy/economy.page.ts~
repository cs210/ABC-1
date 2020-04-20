import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-coronavirus',
  templateUrl: './coronavirus.page.html',
  styleUrls: ['./coronavirus.page.scss'],
})
export class CoronavirusPage implements OnInit {
  articles;

  constructor(private apiService: ApiService) { }
  ngOnInit(){
  }

  ionViewDidEnter(){
     this.apiService.getCoronavirus().subscribe((data)=>{
        console.log(data);
	this.articles = data['articles'];
     });
  }

}
