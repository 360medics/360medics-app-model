import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DeviceDetectorModule } from 'ngx-device-detector';

import { AppComponent } from './app.component';
import { FrontPageComponent } from './page';
import { ReadJsonFileService } from './services';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { SearchComponent } from './components/search/search.component';
import { AppEntryComponent } from './components/app/entry/app.entry.component';
import { AppListComponent } from './components/app/list/app.list.component';
import { Broadcaster } from './services/broadcaster.service';
import { IframeGeneratorService } from './services/iframe.generator.service';
import {HttpClientModule} from '@angular/common/http';
import {DataService} from './services/data.service';
import { Title }     from '@angular/platform-browser';
import {MatGridListModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchComponent,
    FrontPageComponent,
    FooterComponent,
    AppEntryComponent,
    AppListComponent
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        DeviceDetectorModule.forRoot(),
        MatGridListModule
    ],
  providers: [ReadJsonFileService, Broadcaster, IframeGeneratorService, DataService, Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
