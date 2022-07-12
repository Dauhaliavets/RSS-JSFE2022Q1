import { Model } from '../models/model';
import { Product } from '../models/model.types';

export class Controller {
  model: Model;

  constructor(model: Model) {
    this.model = model;
  }

  public addToCart(card: Product) {
    const state = { ...this.model.getState() };
    state.cart.push(card);
    this.model.setState({ ...state });
  }

  public removeFromCart(id: number) {
    const state = { ...this.model.getState() };
    const newCart = state.cart.filter((item) => item.id !== id);
    this.model.setState({ ...state, cart: newCart });
  }

  public toggleIsOnCart() {
    const newValue = !this.model.getState().isOnCart;
    this.model.setState({ ...this.model.getState(), isOnCart: newValue });
  }
}
