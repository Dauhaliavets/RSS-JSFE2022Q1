import { Signal } from '../controllers/Signal';
import { AppState, Product } from './model.types';

const initialState: AppState = {
  products: [],
  visible: [],
  cart: [],
  isOnCart: false,
  sortSettings: '',
  defaultFilters: {
    category: ['Laptop', 'Monoblock', 'Printer', 'SmartWatch', 'Smartphone', 'Tablet', 'TV'],
  },
  filters: {
    category: [],
  },
};

export class Model {
  private _state;
  public events = new Signal<AppState>();

  constructor(state: AppState = initialState) {
    this._state = state;
    this.loadData();
  }

  private async loadData() {
    await fetch('../DB/db.json')
      .then((res) => res.json())
      .then((productsData: Array<Product>) => this.setState({ ...this._state, products: productsData.slice(0, 80) }))
      .catch((error) => alert(`Ошибка ${error}`));
  }

  public getState() {
    return this._state;
  }

  public setState(newState: AppState) {
    this._state = { ...this.getState(), ...newState };
    this.events.emit(this._state);
  }
}
