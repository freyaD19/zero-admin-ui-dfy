import React, {useEffect} from 'react';
import {Form, Input, InputNumber, Modal, Radio} from 'antd';
import type { MemberTagListItem} from '../data.d';

export interface UpdateModalProps {
  onCancel: () => void;
  onSubmit: (values: MemberTagListItem) => void;
  updateVisible: boolean;
  currentData: Partial<MemberTagListItem>;
}

const FormItem = Form.Item;

const formLayout = {
  labelCol: {span: 10},
  wrapperCol: {span: 10},
};

const UpdateModal: React.FC<UpdateModalProps> = (props) => {
  const [form] = Form.useForm();

  const {
    onSubmit,
    onCancel,
    updateVisible,
    currentData,
  } = props;

  useEffect(() => {
    if (form && !updateVisible) {
      form.resetFields();
    }
  }, [props.updateVisible]);

  useEffect(() => {
    if (currentData) {
      form.setFieldsValue({
        ...currentData,
      });
    }
  }, [props.currentData]);

  const handleSubmit = () => {
    if (!form) return;
    form.submit();
  };

  const handleFinish = (values: { [key: string]: any }) => {
    if (onSubmit) {
      onSubmit(values as MemberTagListItem);
    }
  };

  const renderContent = () => {
    return (
      <>
        <FormItem
          name="id"
          label="主键"
          hidden
        >
          <Input id="update-id"/>
        </FormItem>


        <FormItem
          name="tagName"
          label="标签名称"
          rules={[{required: true, message: '请输入标签名称!'}]}
        >
          <Input id="update-tagName" placeholder={'请输入标签名称!'}/>
        </FormItem>
        <FormItem
          name="description"
          label="标签描述"
          rules={[{required: true, message: '请输入标签描述!'}]}
        >
          <Input.TextArea rows={2} placeholder={'请输入标签描述'}/>
        </FormItem>
        <FormItem
          name="finishOrderCount"
          label="自动打标签完成订单数量"
          rules={[{required: true, message: '请输入自动打标签完成订单数量!'}]}
        >
          <InputNumber id="update-finishOrderCount" placeholder={'请输入自动打标签完成订单数量!'} style={{width: 255}}/>
        </FormItem>
        <FormItem
          name="finishOrderAmount"
          label="自动打标签完成订单金额"
          rules={[{required: true, message: '请输入自动打标签完成订单金额!'}]}
        >
          <InputNumber id="update-finishOrderAmount" placeholder={'请输入自动打标签完成订单金额!'} style={{width: 255}}/>
        </FormItem>
        <FormItem
          name="status"
          label="状态"
          rules={[{required: true, message: '请输入状态：0-禁用，1-启用!'}]}
        >
          <Radio.Group>
            <Radio value={1}>正常</Radio>
            <Radio value={0}>禁用</Radio>
          </Radio.Group>
        </FormItem>
      </>
    );
  };


  const modalFooter = {okText: '保存', onOk: handleSubmit, onCancel};

  return (
    <Modal
      forceRender
      destroyOnClose
      title="编辑"
      open={updateVisible}
      {...modalFooter}
      width={600}
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

export default UpdateModal;
