import { isUrl, getPageQuery, getAuthority, tree } from './utils';

describe('Utils', () => {
  describe('isUrl', () => {
    it('应该识别有效的 URL', () => {
      expect(isUrl('http://example.com')).toBe(true);
      expect(isUrl('https://example.com')).toBe(true);
      expect(isUrl('ftp://example.com')).toBe(true);
      expect(isUrl('http://example.com:8080')).toBe(true);
      expect(isUrl('https://example.com/path/to/page')).toBe(true);
      expect(isUrl('https://example.com/path?query=value')).toBe(true);
    });

    it('应该拒绝无效的 URL', () => {
      expect(isUrl('not-a-url')).toBe(false);
      expect(isUrl('example.com')).toBe(false);
      expect(isUrl('/path/to/page')).toBe(false);
      expect(isUrl('')).toBe(false);
      expect(isUrl(null as any)).toBe(false);
      expect(isUrl(undefined as any)).toBe(false);
    });
  });

  describe('getPageQuery', () => {
    const originalLocation = window.location;

    beforeEach(() => {
      delete (window as any).location;
      (window as any).location = { search: '' };
    });

    afterEach(() => {
      window.location = originalLocation;
    });

    it('应该解析查询参数', () => {
      window.location.search = '?name=test&age=25';
      const query = getPageQuery();
      expect(query).toEqual({ name: 'test', age: '25' });
    });

    it('应该处理空查询字符串', () => {
      window.location.search = '';
      const query = getPageQuery();
      expect(query).toEqual({});
    });

    it('应该处理特殊字符', () => {
      window.location.search = '?name=test%20user&tag=a%2Bb';
      const query = getPageQuery();
      expect(query).toEqual({ name: 'test user', tag: 'a+b' });
    });

    it('应该处理多个相同的参数', () => {
      window.location.search = '?tag=a&tag=b&tag=c';
      const query = getPageQuery();
      expect(query.tag).toBeDefined();
      // URLSearchParams 可能返回数组或最后一个值，取决于实现
    });
  });

  describe('getAuthority', () => {
    beforeEach(() => {
      // 清理 localStorage
      localStorage.clear();
      (localStorage.getItem as jest.Mock).mockClear();
      (localStorage.setItem as jest.Mock).mockClear();
    });

    it('应该从 localStorage 获取权限', () => {
      (localStorage.getItem as jest.Mock).mockReturnValue(JSON.stringify(['admin', 'user']));

      const authority = getAuthority();
      expect(authority).toEqual(['admin', 'user']);
      expect(localStorage.getItem).toHaveBeenCalledWith('antd-pro-authority');
    });

    it('应该返回默认权限当 localStorage 为空', () => {
      (localStorage.getItem as jest.Mock).mockReturnValue(null);

      const authority = getAuthority();
      expect(authority).toEqual(['admin']);
    });

    it('应该处理字符串权限', () => {
      (localStorage.getItem as jest.Mock).mockReturnValue(JSON.stringify('admin'));

      const authority = getAuthority();
      expect(authority).toEqual(['admin']);
    });

    it('应该从参数获取权限', () => {
      const authority = getAuthority('guest');
      expect(authority).toEqual(['guest']);
    });

    it('应该处理无效的 JSON', () => {
      (localStorage.getItem as jest.Mock).mockReturnValue('invalid-json');

      const authority = getAuthority();
      expect(authority).toEqual(['admin']);
    });
  });

  describe('tree 函数', () => {
    it('应该将扁平数组转换为树形结构', () => {
      const flatData = [
        { id: 1, name: '根节点', pid: 0 },
        { id: 2, name: '子节点1', pid: 1 },
        { id: 3, name: '子节点2', pid: 1 },
        { id: 4, name: '孙节点1', pid: 2 },
        { id: 5, name: '孙节点2', pid: 2 },
      ];

      const result = tree(flatData);

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe(1);
      expect(result[0].name).toBe('根节点');
      expect(result[0].children).toHaveLength(2);
      expect(result[0].children[0].id).toBe(2);
      expect(result[0].children[0].children).toHaveLength(2);
    });

    it('应该处理多个根节点', () => {
      const flatData = [
        { id: 1, name: '根节点1', pid: 0 },
        { id: 2, name: '根节点2', pid: 0 },
        { id: 3, name: '子节点1', pid: 1 },
        { id: 4, name: '子节点2', pid: 2 },
      ];

      const result = tree(flatData);

      expect(result).toHaveLength(2);
      expect(result[0].id).toBe(1);
      expect(result[1].id).toBe(2);
      expect(result[0].children).toHaveLength(1);
      expect(result[1].children).toHaveLength(1);
    });

    it('应该处理空数组', () => {
      const result = tree([]);
      expect(result).toEqual([]);
    });

    it('应该使用自定义的父级字段', () => {
      const flatData = [
        { id: 1, name: '根节点', parentId: 0 },
        { id: 2, name: '子节点', parentId: 1 },
      ];

      const result = tree(flatData, 0, 'parentId');

      expect(result).toHaveLength(1);
      expect(result[0].children).toHaveLength(1);
    });

    it('应该处理没有子节点的情况', () => {
      const flatData = [
        { id: 1, name: '节点1', pid: 0 },
        { id: 2, name: '节点2', pid: 0 },
        { id: 3, name: '节点3', pid: 0 },
      ];

      const result = tree(flatData);

      expect(result).toHaveLength(3);
      result.forEach((node) => {
        expect(node.children).toBeUndefined();
      });
    });

    it('应该处理从非零根节点开始', () => {
      const flatData = [
        { id: 1, name: '节点1', pid: 0 },
        { id: 2, name: '节点2', pid: 1 },
        { id: 3, name: '节点3', pid: 2 },
        { id: 4, name: '节点4', pid: 2 },
      ];

      const result = tree(flatData, 2);

      expect(result).toHaveLength(2);
      expect(result[0].id).toBe(3);
      expect(result[1].id).toBe(4);
    });

    it('应该处理循环引用的数据', () => {
      const flatData = [
        { id: 1, name: '节点1', pid: 2 },
        { id: 2, name: '节点2', pid: 1 },
      ];

      const result = tree(flatData);
      expect(result).toEqual([]);
    });

    it('应该保留原始数据的其他属性', () => {
      const flatData = [
        { id: 1, name: '根节点', pid: 0, extra: 'data', order: 1 },
        { id: 2, name: '子节点', pid: 1, extra: 'child', order: 2 },
      ];

      const result = tree(flatData);

      expect(result[0].extra).toBe('data');
      expect(result[0].order).toBe(1);
      expect(result[0].children[0].extra).toBe('child');
      expect(result[0].children[0].order).toBe(2);
    });
  });
});
