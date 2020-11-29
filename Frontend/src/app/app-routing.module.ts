import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeedComponent } from './pages/feed/feed.component';
import { HomeComponent } from './pages/home/home.component';
import { MainComponent } from './pages/main/main.component';
import { SearchComponent } from './pages/search/search.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { UserComponent } from './pages/user/user.component';

const routes: Routes = [{
  path: 'signup',
  component: SignUpComponent,
},
{
  path: 'signin',
  component: SignInComponent,
},
{
  path: '',
  component: MainComponent,
  children: [
    {
      path: '',
      redirectTo: 'feed',
      pathMatch: 'full'
    },
    {
      path: 'feed',
      component: FeedComponent,
    },
    {
      path: 'search',
      component: SearchComponent,
    },
    {
      path: 'home',
      component: HomeComponent,
    },
    {
      path: 'users/:id',
      component: UserComponent,
    }
  ],
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
