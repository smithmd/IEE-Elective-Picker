import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

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
    TabContainerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [ElectiveDataService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
