import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Radio, Input, Button, Row, Col, Select } from 'antd';
import styles from './index.less';
const { Option } = Select;

class PushMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      radioValue: 1,
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

  onRadioChange = e => {
    console.log('radio checked', e.target.value);
    this.setState({
      radioValue: e.target.value,
    });
    this.props.form.resetFields()
  };

  handleSelectChange = value => {
    console.log(`selected ${value}`);
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <PageHeaderWrapper className={styles.main}>
        <div
          style={{
            // textAlign: 'center',
            paddingTop: 20,
          }}
        >
          <div>
            <Row>
              <Col span={4} offset={5}>
                <Radio.Group onChange={this.onRadioChange} value={this.state.radioValue}>
                  <Radio value={1}>Visitor Mode</Radio>
                  <Radio value={2}>User Mode</Radio>
                </Radio.Group>
              </Col>
            </Row>
            <br />
            <Row>
              <Col>
                <Form labelCol={{ span: 5 }} wrapperCol={{ span: 8 }} onSubmit={this.handleSubmit}>
                  {this.state.radioValue === 1 ? (
                    <React.Fragment>
                      <Form.Item label="Channels">
                        {getFieldDecorator('channels', {
                          // rules: [{ required: true, message: 'Please input your note!' }],
                        })(
                          <Select
                            defaultValue="os_message"
                            style={{ width: 200 }}
                            onChange={this.handleSelectChange}
                          >
                            <Option value="os_message">OS Message</Option>
                            <Option value="pass_through_message">Pass Through Message</Option>
                          </Select>,
                        )}
                      </Form.Item>
                      <Form.Item label="Banner Style">
                        {getFieldDecorator('banner_style', {
                          // rules: [{ required: true, message: 'Please select your gender!' }],
                        })(
                          <Select
                            defaultValue="default"
                            style={{ width: 200 }}
                            onChange={this.handleSelectChange}
                          >
                            <Option value="default">Default</Option>
                            <Option value="card">Big Image Card</Option>
                            <Option value="large_text">Large Text</Option>
                          </Select>,
                        )}
                      </Form.Item>
                      <Form.Item label="Title">
                        {getFieldDecorator('push_message', {
                          // rules: [{ required: true, message: 'Please select your gender!' }],
                        })(<Input />)}
                      </Form.Item>
                      <Form.Item label="Content">
                        {getFieldDecorator('push_message', {
                          // rules: [{ required: true, message: 'Please select your gender!' }],
                        })(<Input />)}
                      </Form.Item>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <Form.Item label="User Recipients">
                        {getFieldDecorator('user', {
                          // rules: [{ required: true, message: 'Please input your note!' }],
                        })(
                          <Select
                            defaultValue="os_message"
                            style={{ width: 200 }}
                            onChange={this.handleSelectChange}
                          >
                            <Option value="Tester1">Tester1</Option>
                            <Option value="Tester2">Tester2</Option>
                            <Option value="Tester3">Tester3</Option>
                            <Option value="Tester4">Tester4</Option>
                          </Select>,
                        )}
                      </Form.Item>
                      <Form.Item label="Channels">
                        {getFieldDecorator('channels', {
                          // rules: [{ required: true, message: 'Please input your note!' }],
                        })(
                          <Select
                            defaultValue="os_message"
                            style={{ width: 200 }}
                            onChange={this.handleSelectChange}
                          >
                            <Option value="os_message">OS Message</Option>
                            <Option value="pass_through_message">Pass Through Message</Option>
                          </Select>,
                        )}
                      </Form.Item>
                      <Form.Item label="Banner Style">
                        {getFieldDecorator('banner_style', {
                          // rules: [{ required: true, message: 'Please select your gender!' }],
                        })(
                          <Select
                            defaultValue="default"
                            style={{ width: 200 }}
                            onChange={this.handleSelectChange}
                          >
                            <Option value="default">Default</Option>
                            <Option value="card">Big Image Card</Option>
                            <Option value="large_text">Large Text</Option>
                          </Select>,
                        )}
                      </Form.Item>
                      <Form.Item label="Title">
                        {getFieldDecorator('push_message', {
                          // rules: [{ required: true, message: 'Please select your gender!' }],
                        })(<Input />)}
                      </Form.Item>
                      <Form.Item label="Content">
                        {getFieldDecorator('push_message', {
                          // rules: [{ required: true, message: 'Please select your gender!' }],
                        })(<Input />)}
                      </Form.Item>
                    </React.Fragment>
                  )}

                  <Form.Item wrapperCol={{ span: 8, offset: 5 }}>
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </div>
        </div>
      </PageHeaderWrapper>
    );
  }
}
const WrappedComp = Form.create({ name: 'coordinated' })(PushMessage);
export default connect(({ global }) => ({ ...global }))(WrappedComp);
