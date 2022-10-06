import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchEngineRoutingModule } from './search-engine-routing.module';
import { SearchEngineComponent } from './search-engine.component';

@NgModule({
  declarations: [
    SearchEngineComponent
  ],
  exports: [
    SearchEngineComponent
  ],
  imports: [
    CommonModule,
    SearchEngineRoutingModule,
    FormsModule
  ]
})
export class SearchEngineModule { }
