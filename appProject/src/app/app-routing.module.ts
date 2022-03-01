import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { FollowedStreamersComponent } from './followed-streamers/followed-streamers.component';
import { SearchComponent } from './search/search.component';
import { AuthGuard } from './services/auth-guard.service';
import { StreamerInfoComponent } from './streamer-info/streamer-info.component';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'auth' },
  { path: 'auth', component: AuthComponent },

  { path: 'streamer-info', component: StreamerInfoComponent },
  { path: 'search', component: SearchComponent },
  { path: 'followed', component: FollowedStreamersComponent },
  { path: '**', redirectTo: 'not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}

export const routedComponents = [AuthComponent];
