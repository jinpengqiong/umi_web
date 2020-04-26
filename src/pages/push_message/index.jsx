import React, {Component} from 'react';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import {connect} from 'dva';
import {Form, Radio, Input, Button, Select, Divider, Modal} from 'antd';
import Crypto from '@/utils/crypto';
import styles from './index.less';

const {Option} = Select;
const {TextArea} = Input;

const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));

class PushMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 0,
      contentType: null,
      clickAction: null,
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const dispatchType =
          values.mode === 0 ? 'push_message/pushMessageVisitor' : 'push_message/pushMessageUser';
        const data = ({mode, ...rest}) => rest;
        const newData = {...data(values), from: userInfo.userid, timestamp: new Date().getTime()};
        const {actionUrl, bannerLargeImageUrl, targetUrl, upns, content} = newData;
        newData.content = Crypto.AES_CBC_PKCS5PaddingEncrypt(content);
        if (actionUrl) {
          newData.actionUrl = Crypto.AES_CBC_PKCS5PaddingEncrypt(actionUrl);
        }
        if (bannerLargeImageUrl) {
          newData.bannerLargeImageUrl = Crypto.AES_CBC_PKCS5PaddingEncrypt(bannerLargeImageUrl);
        }
        if (targetUrl) {
          newData.targetUrl = Crypto.AES_CBC_PKCS5PaddingEncrypt(targetUrl);
        }
        if (typeof upns === 'undefined') {
          newData.upns = '';
        }

        let seconds = 2;
        let interval = null;
        const modal = Modal.warning({
          title: `This message shall be sent in ${seconds} seconds.`,
          okText: 'Cancel to send',
          onOk: () => {
            clearInterval(interval);
          },
        });

        interval = setInterval(() => {
          seconds -= 1;
          modal.update({
            title: `This message shall be sent in ${seconds} seconds.`,
          });
          if (seconds === 0) {
            clearInterval(interval);
            modal.destroy();
            this.props.dispatch({
              type: dispatchType,
              payload: newData,
            });
          }
        }, 1000);
      }
    });
  };

  changeMode = e => {
    this.props.form.resetFields();
    this.setState({
      mode: e.target.value,
      contentType: null,
      clickAction: null,
    });
  };

  changeContentType = e => {
    this.setState({
      contentType: e.target.value,
    });
    this.props.form.setFieldsValue({content: ''});
  };

  changeClickAction = e => {
    this.setState({
      clickAction: e.target.value,
    });
  };

  changePushRange = e => {
    this.setState({
      isPushToAll: e.target.value,
    });
  };

  render() {
    const {contentType, clickAction, isPushToAll, mode} = this.state;
    const {form, clientList, submitLoading} = this.props;
    const {getFieldDecorator} = form;
    const UserOption = clientList.map(v => (
      <Option key={v.id} value={v.clientId}>
        {v.clientId}
      </Option>
    ));
    const formItemLayout = {
      labelCol: {span: 4},
      wrapperCol: {span: 12},
    };
    const tailFormItemLayout = {
      wrapperCol: {
        span: 12,
        offset: 4,
      },
    };

    const config = {
      mode: {
        initialValue: 0,
      },
      title: {
        rules: [
          {required: true, message: 'Title is required'},
          {max: 40, message: 'Title cannot be longer than 40 characters'},
        ],
      },
      content: {
        rules: [
          {required: true, message: 'Content is required'},
          {
            max: contentType === 6 ? 128 : 50,
            message: `Content cannot be longer than ${contentType === 6 ? 128 : 50} characters`,
          },
        ],
      },
      contentType: {
        initialValue: 0,
      },
      bannerLargeImageUrl: {
        rules: [
          {required: true, message: 'Banner large image url is required'},
          {
            pattern: new RegExp(/(http|https):\/\/([\w.]+\/?)\S*(.jpg|.png|.jpeg)$/, 'g'),
            message: '图片URL地址错误',
          },
        ],
      },
      clickAction: {
        initialValue: 1,
      },
      actionUrl: {
        rules: [
          {required: true, message: 'Action url is required'},
          {pattern: new RegExp(/(https):\/\/([\w.]+\/?)\S*/, 'g'), message: 'URL地址错误'},
        ],
      },
      scheme: {
        rules: [{required: true, message: 'Scheme is required'}],
        initialValue: 'aops',
      },
      path: {
        rules: [{required: true, message: 'Path is required'}],
        initialValue: 'NotificationListActivity',
      },
      host: {
        rules: [{required: true, message: 'Host is required'}],
        initialValue: 'com.symbio.ti.aops',
      },
      targetUrl: {
        rules: [{required: true, message: 'Target url is required'}],
        initialValue: 'demo.notificationlist.NotificationListActivity',
      },
      isPushToAll: {
        initialValue: 1,
      },
      upns: {
        rules: [{required: true, message: 'Upns is required'}],
      },
      pushChannelId: {
        rules: [{required: true, message: 'Push channel id is required'}],
        initialValue: 'YOUR-CHANNEL-ID',
      },
      clientId: {
        rules: [{required: true, message: 'Client is required'}],
        initialValue: mode === 0 ? 'VistorApp1' : 'ChatApp',
        // initialValue: clientList.length > 0 && clientList[0].clientId,
      },
      passThrough: {
        initialValue: 0,
      },
      template: {
        rules: [{required: true, message: 'Template is required'}],
        initialValue: 'From AOPS:',
      },
    };

    return (
      <PageHeaderWrapper className={styles.main}>
        <div style={{paddingTop: 20}}>
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Form.Item label="Mode">
              {getFieldDecorator(
                'mode',
                config.mode,
              )(
                <Radio.Group onChange={this.changeMode}>
                  <Radio value={0}>Visitor Mode</Radio>
                  <Radio value={1}>User Mode</Radio>
                </Radio.Group>,
              )}
            </Form.Item>
            <Divider orientation="left">Content</Divider>
            <Form.Item label="Title" extra="Cannot be longer than 40 characters">
              {getFieldDecorator('title', config.title)(<Input maxLength={40}/>)}
            </Form.Item>
            <Form.Item label="Banner Style">
              {getFieldDecorator(
                'contentType',
                config.contentType,
              )(
                <Radio.Group onChange={this.changeContentType}>
                  <Radio value={0}>Default</Radio>
                  <Radio value={1}>Card</Radio>
                  <Radio value={6}>Big Text</Radio>
                </Radio.Group>,
              )}
            </Form.Item>
            {contentType === 1 ? (
              <Form.Item label="Banner Large Image Url">
                {getFieldDecorator('bannerLargeImageUrl', config.bannerLargeImageUrl)(<Input/>)}
              </Form.Item>
            ) : null}
            <Form.Item
              label="Content"
              extra={`Cannot be longer than ${contentType === 6 ? 128 : 50} characters`}
            >
              {getFieldDecorator(
                'content',
                config.content,
              )(<TextArea maxLength={contentType === 6 ? 128 : 50} rows={3}/>)}
            </Form.Item>

            <Divider orientation="left">Basic Settings</Divider>

            <Form.Item label="Notification Actions">
              {getFieldDecorator(
                'clickAction',
                config.clickAction,
              )(
                <Radio.Group onChange={this.changeClickAction}>
                  <Radio value={1}>Open App</Radio>
                  <Radio value={2}>Open App Internal Page</Radio>
                  <Radio value={3}>Open Web Page</Radio>
                </Radio.Group>,
              )}
            </Form.Item>
            {clickAction === 3 ? (
              <Form.Item label="Action Url">
                {getFieldDecorator('actionUrl', config.actionUrl)(<Input/>)}
              </Form.Item>
            ) : null}
            {clickAction === 2 ? (
              <React.Fragment>
                <Form.Item label="Scheme">
                  {getFieldDecorator('scheme', config.scheme)(<Input disabled/>)}
                </Form.Item>
                <Form.Item label="Path">
                  {getFieldDecorator('path', config.path)(<Input disabled/>)}
                </Form.Item>
                <Form.Item label="Host">
                  {getFieldDecorator('host', config.host)(<Input disabled/>)}
                </Form.Item>
                <Form.Item label="TargetUri">
                  {getFieldDecorator('targetUrl', config.targetUrl)(<Input disabled/>)}
                </Form.Item>
              </React.Fragment>
            ) : null}
            <Form.Item label="Targets">
              {getFieldDecorator(
                'isPushToAll',
                config.isPushToAll,
              )(
                <Radio.Group onChange={this.changePushRange}>
                  <Radio value={1}>All</Radio>
                  <Radio value={0}>Registration ID</Radio>
                </Radio.Group>,
              )}
            </Form.Item>
            {isPushToAll === 0 ? (
              <Form.Item label="Registration ID">
                {getFieldDecorator(
                  'upns',
                  config.upns,
                )(
                  <TextArea rows={3} placeholder="Maximum 500 targets and separate with commas."/>,
                )}
              </Form.Item>
            ) : null}
            <Form.Item label="Channel">
              {getFieldDecorator(
                'passThrough',
                config.passThrough,
              )(
                <Radio.Group>
                  <Radio value={0}>OS Message(Recommend)</Radio>
                  <Radio value={1}>PassThrough Message(UI Customization)</Radio>
                </Radio.Group>,
              )}
            </Form.Item>
            <Divider orientation="left">Others</Divider>
            <Form.Item label="Client">
              {getFieldDecorator('clientId', config.clientId)(
                <Select>
                  {mode === 0 ? (
                    <Option value="VistorApp1">Suunto(VisitorMode)</Option>
                  ) : (
                    <Option value="ChatApp">Suunto(UserMode)</Option>
                  )}
                </Select>
              )}
            </Form.Item>
            <Form.Item label="Template">
              {getFieldDecorator('template', config.template)(<Input/>)}
            </Form.Item>
            <Form.Item label="Channel Id">
              {getFieldDecorator('pushChannelId', config.pushChannelId)(<Input disabled/>)}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit" loading={submitLoading}>
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
export default connect(({global, push_message}) => ({...global, ...push_message}))(WrappedComp);
