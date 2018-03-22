import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Http, Response} from '@angular/http';
import {environment}   from '../../environments/environment'
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
@Injectable()
export class SessionService {
  base_URL= environment.BASE_URL+'/auth';
  options= {withCredentials:true};
  
  constructor(private http: Http, public toastr:ToastsManager)
   { 
    
   }
  
  handleError(e) {
    return Observable.throw(e.json().message);
  }

  //Primera forma de enviar datos a nuestro Back-End
  login(username,password){
    return this.http.post(`${this.base_URL}/login`,{username,password}, this.options)
      .map(res => {
       this.toastr.success('Entraste','Bienvenido')
        return res.json()})
      .catch(err=>{
        this.toastr.error('Error','no funciona')
        return this.handleError(err)})
  }

//Segunda forma de enviar datos a nuestro Back-End
  signup(formSignup){
    return this.http.post(`${this.base_URL}/signup`,formSignup, this.options)
      .map(res => res.json())
      .catch(err=>this.handleError(err))      
  }

  loggedIn(){
    return this.http.get(`${this.base_URL}/loggedin`, this.options)
      .map(res => res.json())
      .catch(err=>this.handleError(err))      
  }

  logout(){
    return this.http.post(`${this.base_URL}/logout`, {})
      .map(res=> res.json())
      .catch(err => this.handleError(err) )
  }

}
