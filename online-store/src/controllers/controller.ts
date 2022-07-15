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

  private isAnyFilters() {
    const filters = this.model.getState().filters;
    const filterTypes = Object.values(filters);
    return !!filterTypes.filter((filterTypes) => filterTypes.length).length;
  }

  public sortItems = (key: string, direction: string): Product[] => {
    const isAnyFilters = this.isAnyFilters();
    let sortableItems: Product[];

    if (isAnyFilters) {
      sortableItems = this.model.getState().visible;
    } else {
      sortableItems = this.model.getState().products;
    }

    let newSortableItems = [...sortableItems];
    if (key === 'title') {
      newSortableItems.sort((a, b) => {
        if (a['title'].toLowerCase() < b['title'].toLowerCase()) {
          return direction === 'asc' ? -1 : 1;
        }
        if (a['title'].toLowerCase() > b['title'].toLowerCase()) {
          return direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    } else if (key === 'price') {
      newSortableItems.sort((a, b) => (direction === 'asc' ? a.price - b.price : b.price - a.price));
    }

    return newSortableItems;
  };

  public sortBy = (config: string) => {
    const [key, direction] = config.split('_');
    const sortableItems = this.sortItems(key, direction);

    this.model.setState({
      ...this.model.getState(),
      visible: sortableItems,
      sortSettings: config,
    });
  };

  public filteredItems(filtersCategory: Category[], filtersBrand: Brand[]): Product[] {
    const products = this.model.getState().products;

    return products.filter((product) => {
      if (filtersCategory.length && filtersBrand.length) {
        return (
          filtersCategory.find((filter) => Object.values(product).includes(filter)) &&
          filtersBrand.find((filter) => Object.values(product).includes(filter))
        );
      } else if (filtersCategory.length) {
        return filtersCategory.find((filter) => Object.values(product).includes(filter));
      } else if (filtersBrand.length) {
        return filtersBrand.find((filter) => Object.values(product).includes(filter));
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

    const filterableItems = this.filteredItems(newFiltersCategory, newFiltersBrand);

    this.model.setState({
      ...this.model.getState(),
      visible: filterableItems,
      filters: {
        category: newFiltersCategory,
        brand: newFiltersBrand,
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
