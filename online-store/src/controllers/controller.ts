import { Brand, Category } from './../models/model.types';
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

  private hasAnyFilters() {
    const filters = this.model.getState().filters;
    const filterTypes = Object.values(filters);
    return !!filterTypes.filter((filterTypes) => filterTypes.length).length;
  }

  private searchItems() {
    let products = [...this.model.getState().products];
    const hasAnyFilters = this.hasAnyFilters();

    if (hasAnyFilters) {
      products = this.filterItems();
    }

    return products.filter((item) => item.title.toLowerCase().includes(this.model.getState().searchValue));
  }

  public setSearchValue(inputValue: string) {
    this.model.setState({
      ...this.model.getState(),
      searchValue: inputValue,
    });

    const foundItems = this.searchItems();
    const fountAfterSort = this.sortItems(this.model.getState().sortSettings, foundItems);

    this.model.setState({
      ...this.model.getState(),
      visible: fountAfterSort,
    });
  }

  public sortItems = (config: string, products: Product[]): Product[] => {
    const [key, direction] = config.split('_');
    let sortableItems: Product[];

    sortableItems = [...products];

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
    let sortableItems: Product[];
    if (!this.model.getState().visible.length) {
      sortableItems = this.sortItems(config, this.model.getState().products);
    } else {
      sortableItems = this.sortItems(config, this.model.getState().visible);
    }

    this.model.setState({
      ...this.model.getState(),
      visible: sortableItems,
      sortSettings: config,
    });
  };

  public filterItems(): Product[] {
    const filters = this.model.getState().filters;
    const [category, brand] = Object.keys(filters);
    const products = [...this.model.getState().products];

    return products.filter((product) => {
      if (filters[category].length && filters[brand].length) {
        return (
          (filters[category] as Category[]).find((filter) => Object.values(product).includes(filter)) &&
          (filters[brand] as Brand[]).find((filter) => Object.values(product).includes(filter))
        );
      } else if (filters[category].length) {
        return (filters[category] as Category[]).find((filter) => Object.values(product).includes(filter));
      } else if (filters[brand].length) {
        return (filters[brand] as Brand[]).find((filter) => Object.values(product).includes(filter));
      }
    });
  }

  public changeFilters(event: MouseEvent, filter: string) {
    const checked = (event.target as HTMLInputElement).checked;
    const idFilter = (event.target as HTMLElement).id;
    const filters = this.model.getState().filters;
    let newFiltersCategory: Category[] = filters.category;
    let newFiltersBrand: Brand[] = filters.brand;

    if (checked) {
      if (filter === 'category') {
        newFiltersCategory = [...filters.category, idFilter as Category];
      } else if (filter === 'brand') {
        newFiltersBrand = [...filters.brand, idFilter as Brand];
      }
    } else {
      if (filter === 'category') {
        newFiltersCategory = filters.category.filter((cat) => cat !== idFilter);
      } else if (filter === 'brand') {
        newFiltersBrand = filters.brand.filter((cat) => cat !== idFilter);
      }
    }

    this.model.setState({
      ...this.model.getState(),
      filters: {
        category: newFiltersCategory,
        brand: newFiltersBrand,
      },
    });

    const foundItems = this.searchItems();
    const sortedItems = this.sortItems(this.model.getState().sortSettings, foundItems);

    this.model.setState({
      ...this.model.getState(),
      visible: sortedItems,
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
