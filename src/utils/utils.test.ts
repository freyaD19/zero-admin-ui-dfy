import { tree } from './utils';

describe('Utils', () => {
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
