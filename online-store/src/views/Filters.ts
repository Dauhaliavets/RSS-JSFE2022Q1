import { Controller } from './../controllers/controller';
import { AppState, Category } from './../models/model.types';
import { Control } from '../controllers/Control';
export class Filters extends Control<HTMLElement> {
  filtersTitle: Control<HTMLElement>;
  filtersSubTitle: Control<HTMLElement>;

  filterItem: Control<HTMLElement> | undefined;
  label: Control<HTMLLabelElement> | undefined;
  checkbox: Control<HTMLInputElement> | undefined;

  constructor(parentElement: HTMLElement, data: AppState, controller: Controller) {
    super(parentElement, 'div', 'filters__container');

    this.filtersTitle = new Control(this.node, 'h3', 'filters__title', 'Фильтры');
    this.filtersSubTitle = new Control(this.node, 'h4', 'filters__subtitle', 'Категории');

    data.defaultFilters.category.forEach((defaultCategory) => this.createFilterItem(defaultCategory, data, controller));
  }

  private createFilterItem = (defaultCategory: Category, data: AppState, controller: Controller) => {
    this.filterItem = new Control(this.node, 'div', 'filter__item');
    this.label = new Control(this.filterItem.node, 'label', 'filter__item-label', defaultCategory);
    this.label.node.htmlFor = defaultCategory;
    this.checkbox = new Control(this.filterItem.node, 'input', 'filter__item-input');
    this.checkbox.node.type = 'checkbox';
    this.checkbox.node.id = defaultCategory;
    if (data.filters.category.includes(defaultCategory)) {
      this.checkbox.node.checked = true;
    }
    this.checkbox.node.onclick = (e: MouseEvent) => controller.changeFilters(e);
  };
}
