import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { SearchComponent } from './search/search.component';
import { AuthGuard } from './services/auth-guard.service';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'auth' },
  { path: 'auth', component: AuthComponent },
  { path: 'search', component: SearchComponent },
  { path: '**', redirectTo: 'not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}

export const routedComponents = [AuthComponent];
