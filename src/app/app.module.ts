import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent }  from './app.component';
import { ArticleComponent }  from './article.component';
import { ArticleService } from './article.service';
import { UserComponent } from './user/user.component';
import { UserService } from './user/user.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NavigationComponent } from './navigation/navigation.component';
import { GlobalService } from './global.service';
const appRoutes: Routes = [
      { path: '', component: UserComponent },
      { path: 'login', component: UserComponent },
      { path: 'article',      component: ArticleComponent }
];
@NgModule({
  imports: [     
        BrowserModule,
            HttpModule,
            NgbModule.forRoot(),
            ReactiveFormsModule,
            RouterModule.forRoot(
                  appRoutes,
                  { enableTracing: true } // <-- debugging purposes only
                )
  ],
  declarations: [
        AppComponent,
		ArticleComponent,
		UserComponent,
		NavigationComponent
  ],
  providers: [
        ArticleService,
        UserService,
        GlobalService
  ],
  bootstrap: [
        AppComponent
  ]
})
export class AppModule { }
