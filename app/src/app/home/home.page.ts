import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { ApiService } from '../api.service';
import { InAppBrowser,InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { compareTwoStrings } from 'string-similarity';
import { removeStopwords } from 'stopword';
import {FlexLayoutModule} from "@angular/flex-layout";

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
  suggestedArticles = [];
  currArticle;
  isHidden = true;
  abcData = [];
  json = JSON;
  
  constructor(private apiService: ApiService, private iab: InAppBrowser){}

  segmentChanged(section: string) {
    section = JSON.parse(section)
    console.log('Segment changed', section);
    console.log(section['url'])
    this.apiService.getFromURL('https://abcnews.go.com/rsidxfeed/79/json?list=section&view=json&segment=iphone&embeds=true&collection=true&focusintocollection=true&caption=true&tagname=true').subscribe((data)=>{
      console.log(data)
    });
    // this.apiService.getFromURL(section['url']).subscribe((data)=>{
    //   console.log(data)
    // });
  }

  ionViewDidEnter(){
    this.apiService.getNews().subscribe((data)=>{
      // console.log(data);
      this.articles = data['articles'];
    });
    this.apiService.getABC().subscribe((data)=>{
      console.log(data['config']['sections'])
      this.abcData = data['config']['sections']
    });
    console.log(this.abcData)
  }

  openInAppBrowser(url : string) {
    this.iab.create(url, '_blank');
  }

  isHiddenForArticle(article: object) {
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
