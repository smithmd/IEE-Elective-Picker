import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ElectivesRequirementsComponent} from './elective-picker-container/electives-requirements/electives-requirements.component';
import {RequirementComponent} from './elective-picker-container/electives-requirements/requirement/requirement.component';
import {ElectivesPeriodsComponent} from './elective-picker-container/electives-periods/electives-periods.component';
import {ElectivesComponent} from './elective-picker-container/electives/electives.component';
import {ElectiveComponent} from './elective-picker-container/elective/elective.component';
import {ElectivesSelectedComponent} from './elective-picker-container/electives-selected/electives-selected.component';
import {ElectivePickerContainerComponent} from './elective-picker-container/elective-picker-container.component';
import {ReviewContainerComponent} from './review-container/review-container.component';
import {ElectiveDataService} from './elective-data-service';
import {TabContainerComponent} from './tab-container/tab-container.component';
import {ElectiveCriteriaContainerComponent} from './elective-criteria-container/elective-criteria-container.component';
import {CriteriaCheckService} from './criteria-check.service';

@NgModule({
  declarations: [
    AppComponent,
    ElectivesRequirementsComponent,
    RequirementComponent,
    ElectivesPeriodsComponent,
    ElectivesComponent,
    ElectiveComponent,
    ElectivesSelectedComponent,
    ElectivePickerContainerComponent,
    ReviewContainerComponent,
    TabContainerComponent,
    ElectiveCriteriaContainerComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [ElectiveDataService, CriteriaCheckService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
