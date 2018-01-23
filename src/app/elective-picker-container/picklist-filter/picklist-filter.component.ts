import {Component, Input, OnInit} from '@angular/core';
import {FilterListItem} from '../../classes/filter-list-item';
import {ElectiveDataService} from '../../services/elective-data-service';

declare const Visualforce: any;

@Component({
  selector: 'iee-picklist-filter',
  templateUrl: './picklist-filter.component.html',
  styleUrls: ['./picklist-filter.component.css']
})
export class PicklistFilterComponent implements OnInit {
  @Input() availableTypes: string[];
  dropDownIsVisible = false;
  filterList: FilterListItem[] = [];

  constructor(private electiveDataService: ElectiveDataService) {
  }

  get selectedListItems(): FilterListItem[] {
    return this.filterList.filter(item => {
      return item.isSelected;
    });
  }

  ngOnInit() {
    // initialize filter list
    Visualforce.remoting.Manager.invokeAction(
      'IEE_ElectivePicker_Controller.getElectiveTypesForFilter',
      json => {
        console.log(json);
        const filterTypes: string[] = JSON.parse(json);
        this.filterList = filterTypes.filter(t => {
          return this.availableTypes.indexOf(t) >= 0;
        }).map(t => {
          return new FilterListItem(false, t);
        });
        this.electiveDataService.typeFilterList.next(this.filterList);
      },
      {buffer: false, escape: false}
    );
  }

  onClickDropDown() {
    this.dropDownIsVisible = !this.dropDownIsVisible;
  }

  onRemoveSelectedItem(item: FilterListItem): void {
    item.isSelected = false;
  }

  onRemoveAllItems() {
    this.filterList.map(item => {
      item.isSelected = false;
    });
  }
}
