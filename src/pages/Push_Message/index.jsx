import React, {Component} from 'react';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import {connect} from 'dva';
import {Form, Radio, Input, Button, Select, Divider} from 'antd';
import styles from './index.less';

const {Option} = Select;
const {TextArea} = Input;

class PushMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      radioValue: 1,
      contentType: null,
      clickAction: null
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  changeMode = e => {
    this.setState({
      radioValue: e.target.value,
    });
    this.props.form.resetFields()
  };

  changeContentType = e => {
    this.setState({
      contentType: e.target.value,
    });
  };

  changeClickAction = e => {
    this.setState({
      clickAction: e.target.value,
    });
  };

  changePushRange = e => {
    this.setState({
      pushRange: e.target.value,
    });
  };

  render() {
    const {contentType, clickAction,pushRange} = this.state;
    const {form, clientList} = this.props;
    const {getFieldDecorator} = form;
    const UserOption = clientList.map(v => <Option key={v.id} value={v.id}>{v.clientId}</Option>)
    const formItemLayout = {
      labelCol: {span: 4},
      wrapperCol: {span: 12},
    };
    const tailFormItemLayout = {
      wrapperCol: {
        span: 12,
        offset: 4
      },
    };

    const config = {
      mode: {
        initialValue: 1
      },
      title: {
        rules: [{required: true}]
      },
      content: {
        rules: [{required: true}]
      },
      contentType: {
        initialValue: 0
      },
      bannerLargeImageUrl: {
        rules: [{required: true}]
      },
      clickAction: {
        initialValue: 1
      },
      actionUrl: {
        rules: [{required: true}]
      },
      scheme: {
        rules: [{required: true}]
      },
      path: {
        rules: [{required: true}]
      },
      host: {
        rules: [{required: true}]
      },
      targetUrl: {
        rules: [{required: true}]
      },
      pushRange: {
        initialValue: 1
      },
      upns: {
        rules: [{required: true}]
      },
      pushChannelId: {
        rules: [{required: true}]
      },
      client: {
        rules: [{required: true}],
        initialValue: clientList.length>0 && clientList[0].id
      },
      passThrough: {
        initialValue: 0
      },
      template: {
        rules: [{required: true}]
      },
    };

    return (
      <PageHeaderWrapper className={styles.main}>
        <div style={{paddingTop: 20}}>
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Form.Item label="模式">
              {getFieldDecorator('mode', config.mode)(
                <Radio.Group onChange={this.changeMode} value={this.state.radioValue}>
                  <Radio value={1}>Visitor Mode</Radio>
                  <Radio value={2}>User Mode</Radio>
                </Radio.Group>
              )}
            </Form.Item>
            <Divider orientation="left">推送内容</Divider>
            <Form.Item label="Title">
              {getFieldDecorator('title', config.title)(<Input maxLength={40}/>)}
            </Form.Item>
            <Form.Item label="Banner Style">
              {getFieldDecorator('contentType', config.contentType)(
                <Radio.Group onChange={this.changeContentType}>
                  <Radio value={0}>Default</Radio>
                  <Radio value={1}>Card</Radio>
                  <Radio value={6}>Big Text</Radio>
                </Radio.Group>
              )}
            </Form.Item>
            {contentType === 1 ? (
              <Form.Item label="Banner Large Image Url">
                {getFieldDecorator('bannerLargeImageUrl', config.bannerLargeImageUrl)(<Input/>)}
              </Form.Item>
            ) : null}
            <Form.Item label="Content">
              {getFieldDecorator('content', config.content)(
                <TextArea maxLength={contentType === 6 ? 200 : 128} rows={3}/>
              )}
            </Form.Item>

            <Divider orientation="left">基本设置</Divider>

            <Form.Item label="Notification Actions">
              {getFieldDecorator('clickAction', config.clickAction)(
                <Radio.Group onChange={this.changeClickAction}>
                  <Radio value={1}>Open App</Radio>
                  <Radio value={2}>Open App Internal Page</Radio>
                  <Radio value={3}>Open Web Page</Radio>
                </Radio.Group>
              )}
            </Form.Item>
            {clickAction === 2 || clickAction === 3 ? (
              <Form.Item label="Action Url">
                {getFieldDecorator('actionUrl', config.actionUrl)(<Input/>)}
              </Form.Item>
            ) : null}
            {clickAction === 2 ? (
              <React.Fragment>
                <Form.Item label="Scheme">
                  {getFieldDecorator('scheme', config.scheme)(<Input/>)}
                </Form.Item>
                <Form.Item label="Path">
                  {getFieldDecorator('path', config.path)(<Input/>)}
                </Form.Item>
                <Form.Item label="Host">
                  {getFieldDecorator('host', config.host)(<Input/>)}
                </Form.Item>
                <Form.Item label="TargetUrl">
                  {getFieldDecorator('targetUrl', config.targetUrl)(<Input/>)}
                </Form.Item>
              </React.Fragment>
            ) : null}
            <Form.Item label="推送范围">
              {getFieldDecorator('pushRange', config.pushRange)(
                <Radio.Group onChange={this.changePushRange}>
                  <Radio value={1}>全部范围</Radio>
                  <Radio value={2}>Registration ID</Radio>
                </Radio.Group>
              )}
            </Form.Item>
            {pushRange===2?(
              <Form.Item label="Registration ID">
                {getFieldDecorator('upns', config.upns)(<TextArea rows={3}/>)}
              </Form.Item>
            ):null}
            <Form.Item label="Channel">
              {getFieldDecorator('passThrough', config.passThrough)(
                <Radio.Group>
                  <Radio value={0}>OS Message</Radio>
                  <Radio value={1}>Pass Through Message</Radio>
                </Radio.Group>
              )}
            </Form.Item>
            <Divider orientation="left">Others</Divider>
            <Form.Item label="Client">
              {getFieldDecorator('client', config.client)(
                <Select>
                  {UserOption}
                </Select>,
              )}
            </Form.Item>
            <Form.Item label="Template">
              {getFieldDecorator('template', config.template)(<Input/>)}
            </Form.Item>
            <Form.Item label="Channel Id">
              {getFieldDecorator('pushChannelId', config.pushChannelId)(<Input/>)}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </PageHeaderWrapper>
    );
  }
}

const WrappedComp = Form.create({})(PushMessage);
export default connect(({global, config}) => ({...global, ...config}))(WrappedComp);
