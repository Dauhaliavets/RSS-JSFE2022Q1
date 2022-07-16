import { Controller } from './../controllers/controller';
import { AppState, Brand, Category } from './../models/model.types';
import { Control } from '../controllers/Control';
export class Filters extends Control<HTMLElement> {
  filtersTitle: Control<HTMLElement>;
  filtersSubTitle: Control<HTMLElement>;

  filterItem: Control<HTMLElement> | undefined;
  label: Control<HTMLLabelElement> | undefined;
  checkbox: Control<HTMLInputElement> | undefined;
  clearBtns: Control<HTMLElement>;
  clearStorageBtn: Control<HTMLElement>;
  resetFilterBtn: Control<HTMLElement>;

  constructor(parentElement: HTMLElement, data: AppState, controller: Controller) {
    super(parentElement, 'div', 'filters__container');

    this.filtersTitle = new Control(this.node, 'h3', 'filters__title', 'Фильтры');

    this.clearBtns = new Control(this.node, 'div', 'filter-buttons');
    this.resetFilterBtn = new Control(this.clearBtns.node, 'button', 'filter-buttons__reset-filters', 'Reset Filters');
    this.resetFilterBtn.node.onclick = () => controller.resetFilters();
    this.clearStorageBtn = new Control(this.clearBtns.node, 'button', 'filter-buttons__clear-storage', 'Clear Storage');
    this.clearStorageBtn.node.onclick = () => controller.clearStorage();

    this.filtersSubTitle = new Control(this.node, 'h4', 'filters__subtitle', 'Категории');
    data.defaultFilters.category.forEach((item) => this.createFilterItem('category', item as never, data, controller));

    this.filtersSubTitle = new Control(this.node, 'h4', 'filters__subtitle', 'Бренды');
    data.defaultFilters.brand.forEach((item) => this.createFilterItem('brand', item as never, data, controller));
  }

  private createFilterItem = (filter: string, name: never, data: AppState, controller: Controller) => {
    this.filterItem = new Control(this.node, 'div', 'filter__item');
    this.label = new Control(this.filterItem.node, 'label', 'filter__item-label', name);
    this.label.node.htmlFor = name;
    this.checkbox = new Control(this.filterItem.node, 'input', 'filter__item-input');
    this.checkbox.node.type = 'checkbox';
    this.checkbox.node.id = name;
    if (data.filters[filter].includes(name)) {
      this.checkbox.node.checked = true;
    }
    this.checkbox.node.onclick = (e: MouseEvent) => controller.changeFilters(e, filter);
  };
}
