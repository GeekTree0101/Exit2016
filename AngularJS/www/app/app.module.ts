import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './page/component/app.component';

@NgModule({
  imports:      [ BrowserModule ],
  declarations : [ AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }