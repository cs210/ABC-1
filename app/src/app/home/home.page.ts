import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { ApiService } from '../api.service';
import { InAppBrowser,InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { compareTwoStrings } from 'string-similarity';
import { removeStopwords } from 'stopword';
import {FlexLayoutModule} from "@angular/flex-layout";

interface Article {
  title: string;
  url: string;
  image: string;
  description: string;
  content: string;
  source: string;
  author?: string;
  date: string;
};

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

@NgModule({
  imports: [FlexLayoutModule],
})

export class HomePage {
  // TODO: keep track of active abc articles
  //    that get displayed when 
  articles = [];
  suggestedArticles = [];
  currArticle;
  isHidden = true;
  abcData = [];
  json = JSON;

  constructor(private apiService: ApiService, private iab: InAppBrowser){}

  segmentChanged(section: string) {
    this.articles = [];
    section = JSON.parse(section)
    this.apiService.getFromAbcApi(section['url']).subscribe((data)=>{
      for (let i in data['channels']) {
        // TODO : account for empty image and author fields
        let currChannel = data['channels'][i]
        if (currChannel['items'].length != 0) {
          for (let j in currChannel['items']) {
            let curr = currChannel['items'][j];
            let article : Article = {
              title: curr['title'],
              url: curr['link'],
              image: curr['abcn:images'][0]['abcn:image']['url'],
              description: curr['description'],
              content: curr['abcn:subtitle'],
              source: 'ABC News',
              date: curr['pubDate']
            };
            this.articles.push(article);
          }
        }
      }
    });
  }

  ionViewDidEnter(){
    this.apiService.getNews().subscribe((data)=>{
      for (let i in data['articles']) {
        let curr = data['articles'][i]
        let article : Article = {
          title: curr['title'],
          url: curr['url'],
          image: curr['urlToImage'],
          description: curr['description'],
          content: curr['content'],
          source: curr['source']['name'],
          author: curr['author'],
          date: curr['publishedAt']
        };
        this.articles.push(article);
      }
    });
    this.apiService.getAllAbc().subscribe((data)=>{
      this.abcData = data['config']['sections']
    });
  }

  openInAppBrowser(url : string) {
    this.iab.create(url, '_blank');
  }

  isHiddenForArticle(article: object) {
    if (JSON.stringify(article) == JSON.stringify(this.currArticle)) return false;
    return true;
  }

  viewpointsOnClick(article: object) {
    //
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
  }
}
