import { Component, OnInit,OnDestroy } from '@angular/core';
import { UserService } from '../user/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalService } from '../global.service';
import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit,OnDestroy {
  loginStatus:any = false;
  protected _loginStatus: Subscription;
  constructor(private userService: UserService,private route: ActivatedRoute,private router: Router,private globalService:GlobalService) { }

  ngOnInit() {
    this._loginStatus = this.globalService.loginUser.subscribe(this.setLoginStatus.bind(this));
   
  }
  ngOnDestroy(){
    this._loginStatus.unsubscribe();
  }
  navigateTo(link:string){
     
    switch(link){
      case 'article':
        this.router.navigateByUrl('/article');
        break;
      case 'logout':
        this.userService.logout();
        this.loginStatus = false;
        this.router.navigateByUrl('/login');
        break;
      default :
        this.router.navigateByUrl('/login');
    }
    
   
  }
  setLoginStatus(value){
     this.loginStatus = value;
  }

}
