import { Signal } from '../controllers/Signal';
import { AppState, Product } from './model.types';

const initialState: AppState = {
  products: [],
  cart: [],
  isOnCart: false,
};

export class Model {
  private _state;
  public events = new Signal<AppState>()

  constructor(state: AppState = initialState) {
    this._state = state;
  }

  public getState() {
    return this._state;
  }

  public setState(newState: AppState) {
    this._state = { ...this.getState(), ...newState };
    this.events.emit(this._state);
  }
}
