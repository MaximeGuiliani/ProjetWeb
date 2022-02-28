import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule, routedComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { SearchComponent } from './search/search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FollowedStreamersComponent } from './followed-streamers/followed-streamers.component';
import { SearchService } from './services/search.service';
import { StreamerComponent } from './streamer/streamer.component';
import { StreamerInfoComponent } from './streamer-info/streamer-info.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    routedComponents,
    SearchComponent,
    FollowedStreamersComponent,
    StreamerComponent,
    StreamerInfoComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [AuthService, AuthGuard, SearchService],
  bootstrap: [AppComponent],
})
export class AppModule {}
