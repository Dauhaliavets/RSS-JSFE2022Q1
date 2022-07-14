import { Category } from './../models/model.types';
// import { SortConfig } from './../models/model.types';
import { Model } from '../models/model';
import { Product } from '../models/model.types';

export class Controller {
  model: Model;

  constructor(model: Model) {
    this.model = model;
  }

  public isInCart(card: Product): boolean {
    return this.model.getState().cart.includes(card);
  }

  public sortedItems = (key: string, direction: string): Product[] => {
    const products = this.model.getState().products;

    let sortableItems = [...products];
    if (key === 'title') {
      sortableItems.sort((a, b) => {
        if (a['title'].toLowerCase() < b['title'].toLowerCase()) {
          return direction === 'asc' ? -1 : 1;
        }
        if (a['title'].toLowerCase() > b['title'].toLowerCase()) {
          return direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    } else if (key === 'price') {
      sortableItems.sort((a, b) => (direction === 'asc' ? a.price - b.price : b.price - a.price));
    }

    return sortableItems;
  };

  public sortBy = (config: string) => {
    const [key, direction] = config.split('_');
    const sortableItems = this.sortedItems(key, direction);

    this.model.setState({
      ...this.model.getState(),
      products: sortableItems,
      sortSettings: config,
    });
  };

  public filteredItems(filters: string[]): Product[] {
    const products = this.model.getState().products;

    return products.filter((product) => {
      return filters.find((filter) => Object.values(product).includes(filter));
    });
  }

  public changeFilters(event: MouseEvent) {
    const checked = (event.target as HTMLInputElement).checked;
    const idCategoryFilter = (event.target as HTMLElement).id;
    const filters = this.model.getState().filters;
    let newFiltersCategory: Category[] = [];

    if (checked) {
      newFiltersCategory = [...filters.category, idCategoryFilter as Category];
    } else {
      newFiltersCategory = filters.category.filter((cat) => cat !== idCategoryFilter);
    }

    const filterableItems = this.filteredItems(newFiltersCategory);

    this.model.setState({
      ...this.model.getState(),
      visible: filterableItems,
      filters: {
        category: newFiltersCategory,
      },
    });
  }

  public addToCart(card: Product) {
    const state = this.model.getState();
    if (state.cart.length < 20) {
      this.model.setState({ ...state, cart: [...state.cart, card] });
    } else {
      alert('Извините, все слоты заполнены');
    }
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
