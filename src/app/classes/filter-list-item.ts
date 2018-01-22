export class FilterListItem {
  isSelected: boolean;
  description: string;

  constructor(selected: boolean, description: string) {
    this.isSelected = selected;
    this.description = description;
  }
}
