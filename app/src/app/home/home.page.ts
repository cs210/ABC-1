import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { ApiService } from '../api.service';
import { InAppBrowser,InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { compareTwoStrings } from 'string-similarity';
import { removeStopwords } from 'stopword';
import {FlexLayoutModule} from "@angular/flex-layout";

import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

@NgModule({
  imports: [FlexLayoutModule],
})

export class HomePage {
  
  articles;
  informPolarity = 'all';
  suggestedArticles = [];
  currArticle;
  isHidden = true;

  constructor(
    private apiService: ApiService, 
    private iab: InAppBrowser,
    private ga: GoogleAnalytics
  ){}

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
    this.informPolarity = ev;
    this.ga.trackEvent('Polarity', ev)
  }

  ionViewDidEnter(){
    this.ga.trackView('Home');
    this.ga.trackEvent('Switched', 'Home');

    this.apiService.getNews().subscribe((data)=>{
      console.log(data);
      this.articles = data['articles'];
    });
  }

  ngOnInit(){

    this.ga.startTrackerWithId('UA-163974285-1')
    .then(() => {
      console.log('Google analytics is ready now');
      //the component is ready and you can call any method here
      this.ga.debugMode();
      //alert('reached inside')
    })
    .catch(e => console.log('Error starting GoogleAnalytics', e));

  }

  openInAppBrowser(url : string) {
    this.iab.create(url, '_blank');
    this.ga.trackEvent('URL Click', url);
  }

  isHiddenForArticle(article:object) {
    if (JSON.stringify(article) == JSON.stringify(this.currArticle)) return false;
    return true;
  }

  viewpointsOnClick(article: object) {
    this.isHidden = !this.isHidden;
    this.currArticle = article;

    let suggested: Array<object> = [];
    for (let a in this.articles) {
      // add some check to make sure that the next article is more center
      // than the one currently being viewed
      if (JSON.stringify(this.articles[a]) == JSON.stringify(this.currArticle) || JSON.stringify(this.articles[a]['source']) == JSON.stringify(this.currArticle['source'])) {
        continue;
      }
      const art = {
        article: this.articles[a],
        score: compareTwoStrings(removeStopwords((this.articles[a]['title'] + this.articles[a]['description'] + this.articles[a]['content']).split(' ')).join(' '),
          removeStopwords((this.currArticle['title'] + this.currArticle['description'] + this.currArticle['content']).split(' ')).join(' ')),
      };
      suggested.push(art);
    }
    this.suggestedArticles = suggested.sort((a1, a2)  => {
      return a2['score'] - a1['score'];
    }).map((a) => {
      return a['article'];
    }).slice(0,3);

    console.log(this.suggestedArticles)
  }
}
