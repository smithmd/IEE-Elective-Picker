import {Component, OnInit} from '@angular/core';
import {FilterListItem} from '../../classes/filter-list-item';

declare const Visualforce: any;

@Component({
  selector: 'iee-picklist-filter',
  templateUrl: './picklist-filter.component.html',
  styleUrls: ['./picklist-filter.component.css']
})
export class PicklistFilterComponent implements OnInit {
  dropDownIsVisible = false;
  filterList: FilterListItem[] = [];

  constructor() {
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
        this.filterList = filterTypes.map(t => {
          return new FilterListItem(false, t);
        });
      },
      {buffer: false, escape: false}
    );
  }

  onClickDropDown() {
    this.dropDownIsVisible = !this.dropDownIsVisible;
  }
}
