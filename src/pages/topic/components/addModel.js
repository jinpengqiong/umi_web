import React, {Component} from 'react';
import {connect} from 'dva';
import {Modal, Input, Form} from 'antd';

class TopicAddModel extends Component {

  onCancel = () =>{
    const{form,dispatch}=this.props;
    dispatch({
      type: 'topic/changeVisible',
      payload: false
    });
    form.resetFields();
  };

  onCreate=()=>{
    const { form,dispatch } = this.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      dispatch({
        type: 'topic/createTopic',
        payload: values
      });
    });
  };

  render() {
    const {modelVisible,form} = this.props;
    const {getFieldDecorator} = form;

    return (
      <Modal
        visible={modelVisible}
        title="Create a new topic"
        okText="Create"
        onCancel={this.onCancel}
        onOk={this.onCreate}
      >
        <Form layout="vertical">
          <Form.Item label="Topic">
            {getFieldDecorator('topicName', {
              rules: [{required: true, message: 'Please input the topic!'}],
            })(<Input/>)}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default connect(({topic}) => ({...topic}))(Form.create()(TopicAddModel));
