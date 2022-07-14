import { Controller } from './../controllers/controller';
import { AppState } from './../models/model.types';
import { Control } from '../controllers/Control';

export class Filters extends Control<HTMLElement> {
  filtersTitle: Control<HTMLElement>;
  filtersSubTitle: Control<HTMLElement>;
  labelLaptop: Control<HTMLLabelElement>;
  checkboxLaptop: Control<HTMLInputElement>;
  labelMonoblock: Control<HTMLLabelElement>;
  checkboxMonoblock: Control<HTMLInputElement>;
  labelPrinter: Control<HTMLLabelElement>;
  checkboxPrinter: Control<HTMLInputElement>;
  labelSmartphone: Control<HTMLLabelElement>;
  checkboxSmartphone: Control<HTMLInputElement>;
  labelTV: Control<HTMLLabelElement>;
  checkboxTV: Control<HTMLInputElement>;
  filterItem: Control<HTMLElement>;

  constructor(parentElement: HTMLElement, data: AppState, controller: Controller) {
    super(parentElement, 'div', 'filters__container');

    this.filtersTitle = new Control(this.node, 'h3', 'filters__title', 'Фильтры');
    this.filtersSubTitle = new Control(this.node, 'h4', 'filters__subtitle', 'Категории');

    this.filterItem = new Control(this.node, 'div', 'filter__item');
    this.labelLaptop = new Control(this.filterItem.node, 'label', 'filter__item-label', 'Laptop');
    this.labelLaptop.node.htmlFor = 'Laptop';
    this.checkboxLaptop = new Control(this.filterItem.node, 'input', 'filter__item-input');
    this.checkboxLaptop.node.type = 'checkbox';
    this.checkboxLaptop.node.id = 'Laptop';
    this.checkboxLaptop.node.onclick = (e: MouseEvent) => controller.changeFilters(e);

    this.filterItem = new Control(this.node, 'div', 'filter__item');
    this.labelMonoblock = new Control(this.filterItem.node, 'label', 'filter__item-label', 'Monoblock');
    this.labelMonoblock.node.htmlFor = 'Monoblock';
    this.checkboxMonoblock = new Control(this.filterItem.node, 'input', 'filter__item-input');
    this.checkboxMonoblock.node.type = 'checkbox';
    this.checkboxMonoblock.node.id = 'Monoblock';
    this.checkboxMonoblock.node.onclick = (e: MouseEvent) => controller.changeFilters(e);

    this.filterItem = new Control(this.node, 'div', 'filter__item');
    this.labelPrinter = new Control(this.filterItem.node, 'label', 'filter__item-label', 'Printer');
    this.labelPrinter.node.htmlFor = 'Printer';
    this.checkboxPrinter = new Control(this.filterItem.node, 'input', 'filter__item-input');
    this.checkboxPrinter.node.type = 'checkbox';
    this.checkboxPrinter.node.id = 'Printer';
    this.checkboxPrinter.node.onclick = (e: MouseEvent) => controller.changeFilters(e);

    this.filterItem = new Control(this.node, 'div', 'filter__item');
    this.labelSmartphone = new Control(this.filterItem.node, 'label', 'filter__item-label', 'Smartphone');
    this.labelSmartphone.node.htmlFor = 'Smartphone';
    this.checkboxSmartphone = new Control(this.filterItem.node, 'input', 'filter__item-input');
    this.checkboxSmartphone.node.type = 'checkbox';
    this.checkboxSmartphone.node.id = 'Smartphone';
    this.checkboxSmartphone.node.onclick = (e: MouseEvent) => controller.changeFilters(e);

    this.filterItem = new Control(this.node, 'div', 'filter__item');
    this.labelTV = new Control(this.filterItem.node, 'label', 'filter__item-label', 'TV');
    this.labelTV.node.htmlFor = 'TV';
    this.checkboxTV = new Control(this.filterItem.node, 'input', 'filter__item-input');
    this.checkboxTV.node.type = 'checkbox';
    this.checkboxTV.node.id = 'TV';
    this.checkboxTV.node.onclick = (e: MouseEvent) => controller.changeFilters(e);

    // this.node.onclick = (e) => console.log(e.target)
  }
}
