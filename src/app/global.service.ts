import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Injectable()
export class GlobalService{
    loginUser = new BehaviorSubject<boolean>(false);
	constructor() { 
    }
    setLoginStatus(value:any){
        this.loginUser.next(value);
    }
}