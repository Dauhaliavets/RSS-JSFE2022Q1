import { Model } from '../models/model';
import { Product } from '../models/model.types';

export class Controller {
  model: Model;

  constructor(model: Model) {
    this.model = model;
  }

  public getCart(): Array<Product> {
    const state = this.model.getState();
    return state.cart;
  }

  public isInCart(card: Product): boolean {
    return this.model.getState().cart.includes(card);
  }

  public addToCart(card: Product) {
    const state = this.model.getState();
    this.model.setState({ ...state, cart: [...state.cart, card] });
  }

  public removeFromCart(id: number) {
    const state = this.model.getState();
    const newCart = state.cart.filter((item) => item.id !== id);
    this.model.setState({ ...state, cart: newCart });
  }

  public toggleIsOnCart() {
    const state = this.model.getState();
    const newValue = !state.isOnCart;
    this.model.setState({ ...state, isOnCart: newValue });
  }
}
