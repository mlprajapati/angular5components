import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Users } from './users';
import { GlobalService } from '../global.service';

@Injectable()
export class UserService {
    //URLs for CRUD operations
	logineUrl = "http://localhost:8080/user/login";
	userDetail:any = undefined;
	//Create constructor to get Http instance
	constructor(private http:Http,private globalService: GlobalService) { 
	}

	//Fetch article by id
    getUser(username: string,password:string): Observable<Users[]> {
		let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
		let cpParams = new URLSearchParams();
        cpParams.set('username', username);		
        cpParams.set('password', password);			
		let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
		return this.http.get(this.logineUrl, options)
			   .map(this.extractData)
			   .catch(this.handleError);
    }	
	
	private extractData(res: Response) {
	    let body = res.json();
        return body;
    }
    private handleError (error: Response | any) {
		console.error(error.message || error);
		return Observable.throw(error.status);
	}
	logout(){
		this.userDetail = undefined;
		this.globalService.setLoginStatus(false);
		localStorage.removeItem("loggin");
	}
	setLoginUserDetail(value:any){
		this.userDetail = value;
	}
	getLoginUserDetail(){
		return this.userDetail;
	}
}