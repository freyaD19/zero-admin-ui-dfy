import React, { useEffect, useState } from 'react';
import { Form, Input, InputNumber, message, Modal, Radio, Select } from 'antd';
import type { ProductCategoryListItem} from '../data.d';
import { queryProductCategoryList } from '../service';
import UploadFileComponents from "@/components/common/UploadFileComponents";

export interface AddModalProps {
  onCancel: () => void;
  onSubmit: (values: ProductCategoryListItem) => void;
  addVisible: boolean;
}

const FormItem = Form.Item;

const formLayout = {
  labelCol: {span: 7},
  wrapperCol: {span: 13},
};

const AddModal: React.FC<AddModalProps> = (props) => {
  const [form] = Form.useForm();
  const [parentIdMap, setParentIdMap] = useState([]);
  const {
    onSubmit,
    onCancel,
    addVisible,
  } = props;

  useEffect(() => {
    if (form && !addVisible) {
      form.resetFields();
    }
    queryProductCategoryList({parentId: 0}).then((res) => {
      if (res.code === '000000') {
        const map = res.data.map((item: { id: any; name: any; }) => ({
          value: item.id,
          label: item.name,
        }));
        map.unshift({
          value: 0,
          label: '主分类',
        })
        setParentIdMap(map);
      } else {
        message.error(res.msg);
      }
    });


  }, [props.addVisible]);


  const handleSubmit = () => {
    if (!form) return;
    form.submit();
  };

  const handleFinish = (values: ProductCategoryListItem) => {
    if (onSubmit) {
      onSubmit(values);
    }
  };

  const renderContent = () => {
    return (
      <>

        <FormItem
          name="parentId"
          label="上级分类"
          rules={[{required: true, message: `请输入上级分类!`}]}
        >
          <Select id="parentId" options={parentIdMap} placeholder={'请选择上级'}/>
         </FormItem>
        <FormItem
          name="name"
          label="商品分类名称"
          rules={[{required: true, message: '请输入商品分类名称!'}]}
        >
            <Input id="create-name" placeholder={'请输入商品分类名称!'}/>
         </FormItem>
        <FormItem
          name="level"
          label="分类级别"
          rules={[{required: true, message: '请输入分类级别!'}]}
        >
          <Select id="level" placeholder={'请选择分类级别'}>
            <Select.Option value={0}>一级</Select.Option>
            <Select.Option value={1}>二级</Select.Option>
          </Select>
         </FormItem>
        <FormItem
          name="productUnit"
          label="商品单位"
          rules={[{required: true, message: '请输入商品单位!'}]}
        >
            <Input id="create-productUnit" placeholder={'请输入商品单位!'}/>
         </FormItem>
        <FormItem
          name="navStatus"
          label="是否显示在导航栏"
          rules={[{required: true, message: '请输入是否显示在导航栏!'}]}
        >
              <Radio.Group>
                <Radio value={0}>不显示</Radio>
                <Radio value={1}>显示</Radio>
              </Radio.Group>
       </FormItem>
        <FormItem
          name="isEnabled"
          label="是否启用"
          rules={[{required: true, message: '请输入是否启用!'}]}
        >
          <Radio.Group>
            <Radio value={0}>否</Radio>
            <Radio value={1}>是</Radio>
          </Radio.Group>
        </FormItem>
        <FormItem
          name="sort"
          label="排序"
          rules={[{required: true, message: '请输入排序!'}]}
        >
            <InputNumber style={ {width: 255} }/>
        </FormItem>
        <FormItem
          name="icon"
          label="图标"
          rules={[{required: true, message: '请输入图标!'}]}
        >
          <UploadFileComponents
          backApi={'http://127.0.0.1:8000/api/sys/upload'}
          count={1}
          onSubmit={(url) => {
            form.setFieldValue("icon",url);
          }}/>
         </FormItem>
        <FormItem
          name="keywords"
          label="关键字"
          rules={[{required: true, message: '请输入关键字!'}]}
        >
            <Input id="create-keywords" placeholder={'请输入关键字!'}/>
         </FormItem>
        <FormItem
          name="description"
          label="描述"
        >
          <Input.TextArea rows={2} id="update-description" placeholder={'请输入描述'}/>
         </FormItem>


      </>
    );
  };


  const modalFooter = {okText: '保存', onOk: handleSubmit, onCancel};

  return (
    <Modal
      forceRender
      destroyOnClose
      title="新增"
      open={addVisible}
      {...modalFooter}
    >
      <Form
        {...formLayout}
        form={form}
        onFinish={handleFinish}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default AddModal;
