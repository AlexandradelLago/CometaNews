import { Component, OnInit } from '@angular/core';
import { SelectControlValueAccessor } from '@angular/forms';
//importo los valores de seleccion de mis apis
import categories from '../apiselectors/quoteCategories'
import zodiac from '../apiselectors/zodiac'
import news from '../apiselectors/news'
import {ProfileService} from '../services/profile.service'
import {SessionService} from '../services/session.service'
import { FileUploader } from 'ng2-file-upload';
import { Router } from '@angular/router';

import $ from 'jquery';

@Component({
  selector: 'app-new-profile',
  templateUrl: './new-profile.component.html',
  styleUrls: ['./new-profile.component.css']
})
export class NewProfileComponent implements OnInit {
  checkbox:Array<boolean>=[];
  step:number=1;
  show:boolean=false;
  header:string='';
  quotesCategory:Array<string>= categories;
  zodiacSign: Array<string>=zodiac;
  news:Object=news;
  sourcesCounter:Number=0;
  sourcesMax=3;
  sourcesCheckBOX=[
    {acronim:"abc-news",checked:false},
    {acronim:"the-new-york-times",checked:false},
    {acronim:"the-huffington-post",checked:false},
    {acronim:"the-washington-post",checked:false},
    {acronim:"fox-news",checked:false},
    {acronim:"bbc-news",checked:false},
    {acronim:"bleacher-report",checked:false},
    {acronim:"cbs-news",checked:false},
    {acronim:"daily-mail",checked:false},
    {acronim:"cnn",checked:false},
    {acronim:"cnn-es",checked:false},
    {acronim:"buzzfeed",checked:false},
    {acronim:"mashable",checked:false},
    {acronim:"mtv-news",checked:false},
    {acronim:"vice-news",checked:false},
    {acronim:"spiegel",checked:false},
    {acronim:"bbc-sport",checked:false},
    {acronim:"espn",checked:false},
    {acronim:"fox-sport",checked:false},
    {acronim:"marca",checked:false},
    {acronim:"nfl-news",checked:false},
    {acronim:"ign",checked:false},
    {acronim:"techradar",checked:false},
    {acronim:"business-insider",checked:false},
    {acronim:"the-wall-street-journal",checked:false},
    {acronim:"wired",checked:false},
    {acronim:"bloomberg",checked:false}
 ];
  uploader:FileUploader = new FileUploader({
    url: `http://localhost:3000/profile`
  });
  user: any;
  constructor( private sessionS: SessionService,private profileS:ProfileService, private route:Router) { }

  ngOnInit() {

   // $('select').material_select();
 // tengo que hacer llamada al loggedin servicio y sacar el req.user 
  this.sessionS.loggedIn()
    .subscribe(result => {
      console.log(result);
      this.user=result._id;
      console.log(this.user);
    })
  console.log(this.news);
  }
 
  addNews(){
    this.show=true;
  }

  nextStep(){
    this.step++;
  }

  addNewstoProfile(){
    console.log("entro en addNews")
  }

  checkedSources(value){
    this.sourcesCheckBOX.forEach(s=>{

      if (s.acronim==value){
        if(s.checked==true){
          s.checked=false;
       this.sourcesCounter=+this.sourcesCounter;
        }else{
          s.checked=true;
          this.sourcesCounter=-this.sourcesCounter;
        }
        
        console.log("este es mi checked "+s.checked);
      }
    });
  }


  submitForm(newForm) {
    console.log(newForm.value);
    //form es un objeto interno de la instancia FileUploader
    this.uploader.onBuildItemForm = (item, form) => {
      form.append('sign', newForm.value.sign);
     // form.append('birthday', newForm.value.birthday);
      form.append('quote', newForm.value.quote);
      form.append('language', newForm.value.language);
      form.append('category', newForm.value.category);
      form.append('header', newForm.value.header);
      form.append('country', newForm.value.country);
      form.append('sources',newForm.value.sources);
      console.log(this.sourcesCheckBOX);

    };
    // uploaderAll hace la llamada post por mi al back
    this.uploader.uploadAll();
    this.uploader.onCompleteItem = () => this.route.navigate(['private']);
  }
}
