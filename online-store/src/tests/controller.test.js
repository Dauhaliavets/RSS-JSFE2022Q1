import { Model } from '../models/model';
import { Controller } from '../controllers/controller';
import { describe, expect, test, beforeEach, jest } from '@jest/globals';
import fetchMock, { enableFetchMocks } from 'jest-fetch-mock';
enableFetchMocks();
fetchMock.dontMock();

global.alert = jest.fn();

describe('Controller:', () => {
  let model;
  let controller;
  const card = {
    id: 440,
    brand: 'Lenovo',
    category: 'Tablet',
    title: ' Планшет Lenovo Tab P11 Wi-Fi, 128GB, серый',
    description: {
      'Диагональ экрана, дюймы: ': '11',
      'Тип: ': 'Планшет',
      'Беспроводные интерфейсы: ': 'Bluetooth, Wi-Fi, GPS',
      'Встроенная память,  ГБ: ': '128',
      'Оперативная память: ': '6 ГБ',
    },
    price: 1344.4,
    isPopular: false,
    year: 2019,
    currency: 'BYN',
    isNew: false,
    img: 'https://cdn1.ozone.ru/s3/multimedia-c/wc250/6181744284.jpg',
    count: 4,
  };

  beforeEach(() => {
    model = new Model();
    controller = new Controller(model);
  });

  test('should return true if controller instance of class Controller', () => {
    expect(controller).toBeInstanceOf(Controller);
  });

  test('should save card to cart', () => {
    controller.addToCart(card);
    expect(model.getState().cart).toContain(card);
  });

  test('should remove card to cart', () => {
    model.setState({ cart: [card] });
    controller.removeFromCart(card.id);
    expect(model.getState().cart).not.toContain(card);
  });

  test('should return boolean if cart contains card', () => {
    model.setState({ cart: [card] });
    expect(controller.isInCart(card)).toBe(true);
  });

  test("should return boolean if cart don't contains card", () => {
    model.setState({ cart: [] });
    expect(controller.isInCart(card)).toBe(false);
  });

  test('should invert(toggle) value isOnCart', () => {
    const isOnCart = model.getState().isOnCart;
    controller.toggleIsOnCart();
    expect(model.getState().isOnCart).not.toBe(isOnCart);
  });

  test('should return boolean if filters(object) contains filter(array) is not empty', () => {
    const emptyFilters = {
      isPopular: [],
      isNew: [],
      category: [],
      brand: [],
    };
    model.setState({ filters: { ...emptyFilters } });
    expect(controller.hasAnyFilters()).toBe(false);
  });

  test('should return boolean if filters(object) contains filter(array) is empty', () => {
    const emptyFilters = {
      isPopular: [],
      isNew: ['new'],
      category: [],
      brand: [],
    };
    model.setState({ filters: { ...emptyFilters } });
    expect(controller.hasAnyFilters()).toBe(true);
  });

  test('should return boolean if one of all filter settings is not empty', () => {
    let newFilters = {
      sortSettings: 'title',
      searchValue: '',
      filters: {
        isPopular: [],
        isNew: [],
        category: [],
        brand: [],
      },
    };
    model.setState({ ...newFilters });
    expect(controller.checkAllSettings()).toBe(true);

    newFilters = {
      sortSettings: 'title',
      searchValue: 'zte',
      filters: {
        isPopular: [],
        isNew: ['new'],
        category: [],
        brand: [],
      },
    };
    model.setState({ ...newFilters });
    expect(controller.checkAllSettings()).toBe(true);

    newFilters = {
      sortSettings: 'title',
      searchValue: 'zte',
      filters: {
        isPopular: ['popular'],
        isNew: ['new'],
        category: [],
        brand: ['lenovo'],
      },
    };
    model.setState({ ...newFilters });
    expect(controller.checkAllSettings()).toBe(true);
  });

  test('should return boolean if all filter settings is empty', () => {
    const emptyFilters = {
      sortSettings: '',
      searchValue: '',
      filters: {
        isPopular: [],
        isNew: [],
        category: [],
        brand: [],
      },
    };
    model.setState({ ...emptyFilters });
    expect(controller.checkAllSettings()).toBe(false);
  });
});
