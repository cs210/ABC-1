import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { InAppBrowser,InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { compareTwoStrings } from 'string-similarity';
import { removeStopwords } from 'stopword';

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

  otherViewpoints(articles: Array<object>, currArticle: object) {
    let suggested: Array<object> = [];
    for (let a in articles) {
      // add some check to make sure that the next article is more center
      // than the one currently being viewed
      if (JSON.stringify(articles[a]) == JSON.stringify(currArticle) || JSON.stringify(articles[a]['source']) == JSON.stringify(currArticle['source'])) {
        continue;
      }
      const art = {
        article: articles[a],
        score: compareTwoStrings(removeStopwords((articles[a]['title'] + articles[a]['description'] + articles[a]['content']).split(' ')).join(' '),
          removeStopwords((currArticle['title'] + currArticle['description'] + currArticle['content']).split(' ')).join(' ')),
      };
      suggested.push(art);
    }
    const sorted = suggested.sort((a1, a2)  => {
      return a2['score'] - a1['score'];
    }).map((a) => {
      return a['article'];
    }).slice(1,3);
    console.log(sorted[0])
  }
}
