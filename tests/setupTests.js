const enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');
// 引入 jest-dom 来扩展 Jest 的匹配器
require('@testing-library/jest-dom');

enzyme.configure({ adapter: new Adapter() });

// 设置全局的 localStorage mock
global.localStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
