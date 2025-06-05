import React from 'react';
import { render } from '@testing-library/react';
import { IntlProvider } from 'umi';
import Footer from './index';

describe('Footer Component', () => {
  const defaultLocale = 'zh-CN';
  const messages = {
    'app.copyright.produced': '蚂蚁集团体验技术部出品',
  };

  const renderFooter = () => {
    return render(
      <IntlProvider locale={defaultLocale} messages={messages}>
        <Footer />
      </IntlProvider>
    );
  };

  it('should render correctly', () => {
    const { container } = renderFooter();
    expect(container).toBeInTheDocument();
  });

  it('should display current year in copyright', () => {
    const { getByText } = renderFooter();
    const currentYear = new Date().getFullYear();
    expect(getByText(new RegExp(currentYear.toString()))).toBeInTheDocument();
  });

  it('should display copyright message', () => {
    const { getByText } = renderFooter();
    expect(getByText(/蚂蚁集团体验技术部出品/)).toBeInTheDocument();
  });

  it('should have correct links', () => {
    const { container } = renderFooter();
    const links = container.querySelectorAll('a');
    
    expect(links).toHaveLength(3);
    
    // Check Ant Design Pro link
    const antDesignProLink = Array.from(links).find(link => 
      link.textContent === 'Ant Design Pro'
    );
    expect(antDesignProLink).toHaveAttribute('href', 'https://pro.ant.design');
    expect(antDesignProLink).toHaveAttribute('target', '_blank');
    
    // Check GitHub link
    const githubLink = Array.from(links).find(link => 
      link.querySelector('.anticon-github')
    );
    expect(githubLink).toHaveAttribute('href', 'https://github.com/ant-design/ant-design-pro');
    
    // Check Ant Design link
    const antDesignLink = Array.from(links).find(link => 
      link.textContent === 'Ant Design'
    );
    expect(antDesignLink).toHaveAttribute('href', 'https://ant.design');
  });
});