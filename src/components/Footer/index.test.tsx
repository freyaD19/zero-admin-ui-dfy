import React from 'react';
import { render } from '@testing-library/react';
import Footer from './index';

// Mock umi's useIntl hook
jest.mock('umi', () => ({
  useIntl: () => ({
    formatMessage: ({ defaultMessage }: { defaultMessage: string }) => defaultMessage,
  }),
}));

describe('Footer Component', () => {
  it('should render correctly', () => {
    const { container } = render(<Footer />);
    // DefaultFooter 组件会有特定的 class
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should display current year in copyright', () => {
    const { getByText } = render(<Footer />);
    const currentYear = new Date().getFullYear();
    expect(getByText(new RegExp(currentYear.toString()))).toBeInTheDocument();
  });

  it('should display copyright message', () => {
    const { getByText } = render(<Footer />);
    const currentYear = new Date().getFullYear();
    // 检查完整的版权信息
    expect(getByText(`${currentYear} 蚂蚁集团体验技术部出品`)).toBeInTheDocument();
  });

  it('should have correct links', () => {
    const { getByText, container } = render(<Footer />);

    // 检查 Ant Design Pro 链接
    expect(getByText('Ant Design Pro')).toBeInTheDocument();

    // 检查 Ant Design 链接
    expect(getByText('Ant Design')).toBeInTheDocument();

    // 检查 GitHub 图标
    expect(container.querySelector('.anticon-github')).toBeInTheDocument();
  });
});
