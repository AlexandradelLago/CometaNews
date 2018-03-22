import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Http, Response} from '@angular/http';
import {ProfileService} from '../services/profile.service';
import {SessionService} from '../services/session.service';
import { switchAll } from 'rxjs/operators';

@Injectable()
export class ApisService {
  base_URL="http://quotes.rest/qod.json?category="
  base_URL_horoscope="http://sandipbgt.com/theastrologer/api/horoscope";
  base_URL_news="https://newsapi.org/v2/";

  //   "https://newsapi.org/v2/everything?q=bitcoin&apiKey= 
  API_KEY="3b4af330ce004204bc4122457cb415a6";
  constructor(private http:Http, private profileS: ProfileService, private sessionS: SessionService) { }
  
  handleError(e) {
    return Observable.throw(e.json().message);
  }


  //obtengo quote de mi api en el front --ok!
  getQuote(category){
   //console.log("esta es mi categoria en el servicio"+category);
    return this.http.get(`${this.base_URL}${category}`)
      .map(res => res.json())
      .catch(err=>this.handleError(err))
  }

  //obtengo el signo de mi api en el front -- ok!
  getHoroscope(sign){
    return this.http.get(`${this.base_URL_horoscope}/${sign}/today`)
      .map(res => res.json())
      .catch(err=>this.handleError(err))
  }

  getHeadlinesCountryCategory(news){
    console.log(`${this.base_URL_news}${news.header}?country=${news.country}&category=${news.category}&apiKey=${this.API_KEY}`);
    //https://newsapi.org/v2/top-headlines?country=de&category=business&apiKey=3b4af330ce004204bc4122457cb415a6
    return this.http.get(`${this.base_URL_news}top-headlines?country=${news.country}&category=${news.category}&apiKey=${this.API_KEY}`)
    .map(res => res.json())
    .catch(err=>this.handleError(err))
}

searchNew(word){
  console.log(`${this.base_URL_news}everything?b=${word}&apiKey=${this.API_KEY}`);
  //https://newsapi.org/v2/top-headlines?country=de&category=business&apiKey=3b4af330ce004204bc4122457cb415a6
  return this.http.get(`${this.base_URL_news}everything?b=${word}&apiKey=${this.API_KEY}`)
  .map(res => res.json())
  .catch(err=>this.handleError(err))
}

getHeadlinesSources(news){
  //https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=3b4af330ce004204bc4122457cb415a6
  console.log("ESTOY EN HEADLINESSOURCE");
  console.log(news)
  switch (news.sources.length) {
    case 1:
    console.log(`${this.base_URL_news}top-headlines?sources=${news.sources[0]}&apiKey=${this.API_KEY}`)
    return this.http.get(`${this.base_URL_news}${news.header}?sources=${news.sources[0]}&apiKey=${this.API_KEY}`)
    .map(res => res.json())
    .catch(err=>this.handleError(err))
   case 2:
      console.log(`${this.base_URL_news}top-headlines?sources=${news.sources[0]},${news.sources[1]}&apiKey=${this.API_KEY}`)
      return this.http.get(`${this.base_URL_news}${news.header}?sources=${news.sources[0]},${news.sources[1]}&apiKey=${this.API_KEY}`)
      .map(res => res.json())
      .catch(err=>this.handleError(err))
   case 3:
   console.log(`${this.base_URL_news}top-headlines?sources=${news.sources[0]},${news.sources[1]},${news.sources[2]}&apiKey=${this.API_KEY}`)
   return this.http.get(`${this.base_URL_news}${news.header}?sources=${news.sources[0]},${news.sources[1]},${news.sources[2]}&apiKey=${this.API_KEY}`)
      .map(res => res.json())
      .catch(err=>this.handleError(err))
  }
}

  getSourcesLanguageCategory(news){
    //https://newsapi.org/v2/sources?language=en&country=us&apiKey=3b4af330ce004204bc4122457cb415a6
    console.log("CHECKANDO EL LANGUAGE Y CATEGORY")
    console.log(`${this.base_URL_news}sources?language=${news.language}&category=${news.category}&apiKey=${this.API_KEY}`)
    return this.http.get(`${this.base_URL_news}sources?language=${news.language}&category=${news.category}&apiKey=${this.API_KEY}`)
    .map(res => res.json())
    .catch(err=>this.handleError(err))
}



}
