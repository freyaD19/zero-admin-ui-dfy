// 引入 jest-dom 来扩展 Jest 的匹配器
require('@testing-library/jest-dom');

global.localStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
