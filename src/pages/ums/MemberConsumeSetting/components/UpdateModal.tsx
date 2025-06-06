import React, {useEffect} from 'react';
import {Form, Input, InputNumber, Modal, Radio} from 'antd';
import type { MemberConsumeSettingListItem} from '../data.d';

export interface UpdateModalProps {
  onCancel: () => void;
  onSubmit: (values: MemberConsumeSettingListItem) => void;
  updateVisible: boolean;
  currentData: Partial<MemberConsumeSettingListItem>;
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
      onSubmit(values as MemberConsumeSettingListItem);
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
          name="deductionPerAmount"
          label="每一元需要抵扣的积分数量"
          rules={[{required: true, message: '请输入每一元需要抵扣的积分数量!'}]}
        >
          <InputNumber id="update-deductionPerAmount" placeholder={'请输入每一元需要抵扣的积分数量!'}
                       style={{width: 255}}/>
        </FormItem>
        <FormItem
          name="maxPercentPerOrder"
          label="每笔订单最高抵用百分比"
          rules={[{required: true, message: '请输入每笔订单最高抵用百分比!'}]}
        >
          <InputNumber id="update-maxPercentPerOrder" placeholder={'请输入每笔订单最高抵用百分比!'}
                       style={{width: 255}}/>
        </FormItem>
        <FormItem
          name="useUnit"
          label="每次使用积分最小单位100"
          rules={[{required: true, message: '请输入每次使用积分最小单位100!'}]}
        >
          <InputNumber id="update-useUnit" placeholder={'请输入每次使用积分最小单位100!'} style={{width: 255}}/>
        </FormItem>
        <FormItem
          name="couponStatus"
          label="和优惠券同用"
          rules={[{required: true, message: '请输入是否可以和优惠券同用!'}]}
        >
          <Radio.Group>
            <Radio value={0}>不可以</Radio>
            <Radio value={1}>可以</Radio>
          </Radio.Group>
        </FormItem>
        <FormItem
          name="status"
          label="状态"
          rules={[{required: true, message: '请输入状态!'}]}
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
