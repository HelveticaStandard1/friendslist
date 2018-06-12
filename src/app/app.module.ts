import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PeopleService} from './shared/people/people.service';

import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { PeopleListComponent } from './people-list/people-list.component';

import {
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatListModule,
  MatToolbarModule,
  MatTableModule, MatSortModule, MatTabGroup, MatTabsModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { PersonEditComponent } from './person-edit/person-edit.component';
import { TabsComponent } from './tabs/tabs.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/people-list', pathMatch: 'full' },
  {
    path: 'people-list',
    component: TabsComponent
  },
  {
    path: 'person-add',
    component: PersonEditComponent
  },
  {
    path: 'person-edit/:id',
    component: PersonEditComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    PeopleListComponent,
    PersonEditComponent,
    TabsComponent
  ],
  imports: [
    FormsModule,
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
    MatTableModule,
    MatSortModule,
    MatTabsModule
  ],
  providers: [PeopleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
