import { Controller } from './../controllers/controller';
import { Control } from '../controllers/Control';
import { AppState, Product } from '../models/model.types';
import { Card } from './Card';

export class Cards extends Control<HTMLElement> {
  constructor(parentElement: HTMLElement, data: AppState, controller: Controller) {
    super(parentElement, 'div', 'cards__container');
    data.products.map((product: Product) => new Card(this.node, product, controller));
  }
}
