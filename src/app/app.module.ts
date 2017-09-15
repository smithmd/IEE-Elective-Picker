import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ElectivesRequirementsComponent } from './electives-requirements/electives-requirements.component';
import { RequirementComponent } from './electives-requirements/requirement/requirement.component';
import { ElectivesPeriodsComponent } from './electives-periods/electives-periods.component';
import { ElectivesComponent } from './electives/electives.component';
import { ElectiveComponent } from './electives/elective/elective.component';
import { ElectivesSelectedComponent } from './electives-selected/electives-selected.component';

@NgModule({
  declarations: [
    AppComponent,
    ElectivesRequirementsComponent,
    RequirementComponent,
    ElectivesPeriodsComponent,
    ElectivesComponent,
    ElectiveComponent,
    ElectivesSelectedComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
