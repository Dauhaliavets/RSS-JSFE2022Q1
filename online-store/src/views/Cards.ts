import { Controller } from './../controllers/controller';
import { Control } from '../controllers/Control';
import { AppState, Product } from '../models/model.types';
import { Card } from './Card';

export class Cards extends Control<HTMLElement> {
  cardsWrapper: Control<HTMLElement>;
  select: Control<HTMLSelectElement>;
  optionSortByHighPrice: Control<HTMLOptionElement>;
  optionSortByLowPrice: Control<HTMLOptionElement>;
  optionSortByNameAZ: Control<HTMLOptionElement>;
  optionSortByNameZA: Control<HTMLOptionElement>;
  // optionDefaultItem: Control<HTMLOptionElement>;

  constructor(parentElement: HTMLElement, data: AppState, controller: Controller) {
    super(parentElement, 'div', 'cards__container');
    this.select = new Control(this.node, 'select', '');

    // this.optionDefaultItem = new Control(this.select.node, 'option', '', 'Sort by: ');
    // this.optionDefaultItem.node.disabled;

    this.optionSortByHighPrice = new Control(this.select.node, 'option', '', 'Сорт по убыванию цены');
    this.optionSortByHighPrice.node.id = 'price_desc';
    this.optionSortByHighPrice.node.selected;

    this.optionSortByLowPrice = new Control(this.select.node, 'option', '', 'Сорт по возрастанию цены');
    this.optionSortByLowPrice.node.id = 'price_asc';

    this.optionSortByNameAZ = new Control(this.select.node, 'option', '', 'Сорт по названию А-Я');
    this.optionSortByNameAZ.node.id = 'title_desc';

    this.optionSortByNameZA = new Control(this.select.node, 'option', '', 'Сорт по названию Я-А');
    this.optionSortByNameZA.node.id = 'title_asc';

    for (const node of this.select.node.children) {
      if (node.id === data.sortSettings) {
        node.setAttribute('selected', 'true');
      }
    }

    this.select.node.onchange = () => {
      controller.sortBy(this.select.node.selectedOptions[0].id);
    };

    this.cardsWrapper = new Control(this.node, 'div', 'cards__wrapper');

    // console.log(data.filters?.category.length);
    if (data.filters?.category.length) {
      data.visible.map((product: Product) => new Card(this.cardsWrapper.node, product, controller));
    } else {
      data.products.map((product: Product) => new Card(this.cardsWrapper.node, product, controller));
    }
  }
}
