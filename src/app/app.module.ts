import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DeviceDetectorModule } from 'ngx-device-detector';

import { AppComponent } from './app.component';
import { FrontPageComponent } from './page';
import { ReadJsonFileService } from './services';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { SearchComponent } from './components/search/search.component';
import { ScoreEntryComponent } from './components/score/entry/score.entry.component';
import { ScoreListComponent } from './components/score/list/score.list.component';
import { Broadcaster } from './services/broadcaster.service';
import { IframeGeneratorService } from './services/iframe.generator.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchComponent,
    FrontPageComponent,
    FooterComponent,
    ScoreEntryComponent,
    ScoreListComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    DeviceDetectorModule.forRoot()
  ],
  providers: [ReadJsonFileService, Broadcaster, IframeGeneratorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
