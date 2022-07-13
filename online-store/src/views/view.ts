import { Footer } from './Footer';
import { Controller } from './../controllers/controller';
import { Cards } from './Cards';
import { AppState, Product } from '../models/model.types';
import { Header } from './Header';
import { Cart } from './Cart';
import { Model } from '../models/model';

export class View {
  parentElement: HTMLElement;
  header: Header | undefined;
  view: Cart | Cards | undefined;
  footer: Footer | undefined;

  constructor(parentElement: HTMLElement, model: Model, controller: Controller) {
    this.parentElement = parentElement;

    this.onUpdate(controller)(model.getState())
    model.events.add(this.onUpdate(controller));
  }
  
  public onUpdate = (controller: Controller) => (newState: AppState) => {
    console.log('Update')
    this.parentElement.innerHTML = '';
    this.header = new Header(this.parentElement, newState, controller);
    if (newState.isOnCart) {
      this.view = new Cart(this.parentElement, newState, controller);
    } else {
      this.view = new Cards(this.parentElement, newState, controller);
    }
    this.footer = new Footer(this.parentElement);
  }
}
