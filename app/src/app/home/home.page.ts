import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { InAppBrowser,InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { compareTwoStrings } from 'string-similarity';
import { removeStopwords } from 'stopword';

import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  articles;
  informPolarity = 'all';

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
      this.ga.trackView('timeline');
      //alert('reached inside')
      this.ga.trackTiming('Timing', 100, 'Timing', 'Timing') // where IntervalInMilliseconds is numeric



      //this.ga.setAllowIDFACollection(true);
    })
    .catch(e => console.log('Error starting GoogleAnalytics', e));

    // this.ga.startTrackerWithId('UA-163974285-1')
    //   .then(() => {}).catch(e => alert('Error starting GoogleAnalytics == '+ e));
 
    // alert('Reached 0.')

    // this.ga.trackView('Home Page')
    // .then(() => {})
    // .catch(e => alert('Failed to setup home page tracker.'));

    // alert('Reached 1.')
  }
 
 
  // itemTapped(event, item) {
  //   this.ga.trackEvent('Category', 'Tapped Action', 'Item Tapped is '+item, 0);
  //   // That's right, we're pushing to ourselves!
  //   this.navCtrl.push(ListPage, {
  //     item: item
  //   });
  // }

  openInAppBrowser(url : string) {
    this.iab.create(url, '_blank');
    this.ga.trackEvent('URL Click', url);
  }

  otherViewpoints(articles: Array<object>, currArticle: object) {
    let suggested: Array<object> = [];
    for (let a in articles) {
      // add some check to make sure that the next article is more center
      // than the one currently being viewed
      if (JSON.stringify(articles[a]) == JSON.stringify(currArticle) || JSON.stringify(articles[a]['source']) == JSON.stringify(currArticle['source'])) {
        continue;
      }
      console.log(removeStopwords((articles[a]['title'] + articles[a]['description'] + articles[a]['content']).split(' ')).join(' '));
      const art = {
        article: articles[a],
        score: compareTwoStrings(removeStopwords((articles[a]['title'] + articles[a]['description'] + articles[a]['content']).split(' ')).join(' '),
          removeStopwords((currArticle['title'] + currArticle['description'] + currArticle['content']).split(' ')).join(' ')),
      };
      suggested.push(art);
    }
    const sorted = suggested.sort((a1, a2)  => {
      return a2['score'] - a1['score'];
    });
    console.log(sorted[0])
  }
}
