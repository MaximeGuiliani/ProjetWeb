import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { FollowedStreamersComponent } from './followed-streamers/followed-streamers.component';
import { SearchComponent } from './search/search.component';
import { CalendarComponent } from './calendar/calendar.component';

import { AuthGuard } from './services/auth-guard.service';
import { ListCalendarComponent } from './list-calendar/list-calendar.component';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'auth' },
  { path: 'auth', component: AuthComponent },

  {
    path: 'search',
    //canActivate: [AuthGuard],
    component: SearchComponent,
  },
  { path: 'search/:id', component: CalendarComponent },
  {
    path: 'planning',
    canActivate: [AuthGuard],
    component: ListCalendarComponent,
  },

  {
    path: 'followed',
    canActivate: [AuthGuard],
    component: FollowedStreamersComponent,
  },
  { path: '**', redirectTo: 'not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}

export const routedComponents = [AuthComponent];
