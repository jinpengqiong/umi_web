import React, {Component} from 'react';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import {connect} from 'dva';
import {Form, Radio, Input, Button, Select, Divider, Modal} from 'antd';
import Crypto from '@/utils/crypto';
import styles from './index.less';

const {Option} = Select;
const {TextArea} = Input;

const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
const clientList = JSON.parse(sessionStorage.getItem('clientList'));

class PushMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 0,
      contentType: null,
      clickAction: null,
      isPushToAll: null
    };
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'push_message/getTopicList',
      payload: clientList[0].clientId
    });

    this.props.dispatch({
      type: 'push_message/getXiaoMiApi',
      payload: clientList[0].clientId
    });

    this.props.dispatch({
      type: 'push_message/getOppoApi',
      payload: clientList[0].clientId
    })


  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let dispatchType = values.mode === 0 ? 'push_message/pushMessageVisitor' : 'push_message/pushMessageUser';
        const data = ({mode, ...rest}) => rest;
        const newData = {...data(values), from: userInfo.name, timestamp: new Date().getTime()};
        const {actionUrl, bannerLargeImageUrl, upns, content, title} = newData;
        newData.title = Crypto.AES_CBC_PKCS5PaddingEncrypt(title);
        newData.content = Crypto.AES_CBC_PKCS5PaddingEncrypt(content);
        if (actionUrl) {
          newData.actionUrl = Crypto.AES_CBC_PKCS5PaddingEncrypt(actionUrl);
        }
        if (bannerLargeImageUrl) {
          newData.bannerLargeImageUrl = Crypto.AES_CBC_PKCS5PaddingEncrypt(bannerLargeImageUrl);
        }
        if (typeof upns === 'undefined') {
          newData.upns = '';
        }

        // push message in topic
        if(values.isPushToAll === 2){
          dispatchType = 'push_message/pushMessageInTopic';
          newData.topics = newData.topics.join();
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
      isPushToAll: null
    });
    this.props.dispatch({
      type: 'push_message/getTopicList',
      payload: clientList[0].clientId
    })
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

  changeClientId = value => {
    this.setState({
      isPushToAll: 1,
    });
    this.props.form.setFieldsValue({isPushToAll: 1});
    this.props.dispatch({
      type: 'push_message/getTopicList',
      payload: value
    });

    this.props.dispatch({
      type: 'push_message/getXiaoMiApi',
      payload: value
    })

  };

  render() {
    const {contentType, clickAction, isPushToAll, mode} = this.state;
    const {form, submitLoading, topicList, loadingTopics, xiaoMiData, oppoData} = this.props;
    const {getFieldDecorator} = form;
    const clientOption = clientList.map(v=><Option key={v.id} value={v.clientId}>{v.clientId}</Option>);
    const topicOption = topicList.map(v=>(
      <Option key={v.id} value={v.topic}>
        {v.topic}
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
            message: 'Invalid URL(http(s) prefix or .jpg|.png|.jpeg subfix is required).',
          },
        ],
      },
      clickAction: {
        initialValue: 1,
      },
      actionUrl: {
        rules: [
          {required: true, message: 'Action url is required'},
          {pattern: new RegExp(/(https):\/\/([\w.]+\/?)\S*/, 'g'), message: 'Invalid URL(https is required).'},
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
      topics: {
        rules: [{required: true, message: 'Topic is required'}],
      },
      pushChannelId: {
        rules: [{required: true, message: 'Push channel id is required'}],
        initialValue: 'YOUR-CHANNEL-ID',
      },
      clientId: {
        rules: [{required: true, message: 'Client is required'}],
        initialValue: clientList[0].clientId
      },
      passThrough: {
        initialValue: 0,
      },
      vivoTemplate: {
        rules: [
          {required: true, message: 'Template is required'},
          {max: 15, message: 'Template cannot be longer than 15 characters'},
          ],
        initialValue: 'From AOPS:',
      },
    };

    return (
      <PageHeaderWrapper className={styles.main}>
        <div>
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
            <Form.Item label="Title" extra="Cannot be longer than 40 characters and do not use simple emoji, numbers">
              {getFieldDecorator('title', config.title)(<Input maxLength={40}/>)}
            </Form.Item>
            <Form.Item label="Banner Style">
              {getFieldDecorator(
                'contentType',
                config.contentType,
              )(
                <Radio.Group onChange={this.changeContentType}>
                  <Radio value={0}>Default</Radio>
                  <Radio value={1}>Card(Available on Xiaomi and Huawei)</Radio>
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
                  <Radio value={1}>Launch App</Radio>
                  <Radio value={2}>Open In-App Page</Radio>
                  <Radio value={3}>Open Web Page(https)</Radio>
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
                <Form.Item label="TargetUri" extra='Ask help from your engineer team'>
                  {getFieldDecorator('targetUrl', config.targetUrl)(<Input disabled/>)}
                </Form.Item>
              </React.Fragment>
            ) : null}
            <Form.Item label="Client">
              {getFieldDecorator('clientId', config.clientId)(
                <Select onChange={this.changeClientId}>
                  {clientOption}
                  {/*{mode === 0 ? (*/}
                  {/*  <Option value="VisitorApp1">Suunto(VisitorMode)</Option>*/}
                  {/*) : (*/}
                  {/*  <Option value="ChatApp">Suunto(UserMode)</Option>*/}
                  {/*)}*/}
                </Select>
              )}
            </Form.Item>
            <Form.Item label="Targets">
              {getFieldDecorator('isPushToAll', config.isPushToAll)(
                <Radio.Group onChange={this.changePushRange}>
                  <Radio value={1}>All</Radio>
                  <Radio value={0}>Registration ID</Radio>
                  <Radio value={2}>Topics</Radio>
                </Radio.Group>
              )}
            </Form.Item>
            {isPushToAll === 0 ? (
              <Form.Item label="Registration ID">
                {getFieldDecorator('upns', config.upns)(
                  <TextArea rows={3} placeholder="Maximum 500 targets and separate with commas."/>
                )}
              </Form.Item>
            ) : null}
            {isPushToAll === 2 ? (
              <Form.Item label="Topics">
                {getFieldDecorator('topics', config.topics)(
                  <Select mode="tags" style={{ width: '100%' }} loading={loadingTopics}>
                    {topicOption}
                  </Select>
                )}
              </Form.Item>
            ) : null}
            <Form.Item label="Channel">
              {getFieldDecorator('passThrough',config.passThrough)(
                <Radio.Group>
                  <Radio value={0}>OS Message(Recommended)</Radio>
                  <Radio value={1}>PassThrough Message(Available on Xiaomi and Huawei;N/A once app is terminated;Customize UI in app side.)</Radio>
                </Radio.Group>,
              )}
            </Form.Item>
            <Divider orientation="left">Others</Divider>

            <Form.Item label="Template" extra="Cannot be longer than 15 characters">
              {getFieldDecorator('vivoTemplate', config.vivoTemplate)(<Input maxLength={15}/>)}
            </Form.Item>
            <Form.Item label="Channel Id" extra="Create the channel in mobile SDK and ask help from your engineer team">
              {getFieldDecorator('pushChannelId', config.pushChannelId)(<Input disabled/>)}
            </Form.Item>


            <Divider orientation="left">余额</Divider>
            <Form.Item label="推送额度余量">
              <div className={styles.listWrapper}>
                <div className={`${styles.listGroup} ${styles.warning}`}>
                  <div>小米</div>
                  <div>{xiaoMiData.day_acked}次 - {xiaoMiData.day_quota}次</div>
                </div>
                <div className={styles.listGroup}>
                  <div>OPPO剩余</div>
                  <div>{oppoData.remain_count}次</div>
                </div>
                <div className={`${styles.listGroup} ${styles.good}`}>
                  <div>华为</div>
                  <div>无限制</div>
                </div>
                <div className={styles.listGroup}>
                  <div>Vivo</div>
                  <div>详情(URL)</div>
                </div>
              </div>
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
export default connect(({push_message}) => ({...push_message}))(WrappedComp);
