import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from "./pages-routing.module";
import { LayoutComponent } from './layout.component';
// import { ListComponent } from './list.component';
import { AddPageComponent } from "./add-page.component";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PagesRoutingModule
  ],
  declarations: [
    LayoutComponent,
    // ListComponent,
    AddPageComponent
  ]
})
export class PagesModule { }
