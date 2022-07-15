import { Signal } from '../controllers/Signal';
import { AppState, Product } from './model.types';

const initialState: AppState = {
  products: [],
  visible: [],
  cart: [],
  isOnCart: false,
  sortSettings: '',
  searchValue: '',
  defaultFilters: {
    category: ['Laptop', 'Monoblock', 'Smartphone', 'Tablet', 'TV'],
    brand: [
      'Asus',
      'Lenovo',
      'IRBIS',
      'Haier',
      'Acer',
      'Echips',
      'Poco',
      'realme',
      'ZTE',
      'Xiaomi',
      'Vivo',
      'Samsung',
      'Horizont',
      'KIVI',
      'HP',
      'MSI',
      'Dell',
      'Huawei',
      'Realme',
      'KIWI',
    ],
  },
  filters: {
    category: [],
    brand: [],
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
      .then((productsData: Array<Product>) => this.setState({ ...this._state, products: productsData }))
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
