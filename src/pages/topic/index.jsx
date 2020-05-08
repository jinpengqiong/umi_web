import React, {Component} from 'react';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import {connect} from 'dva';
import moment from 'moment';
import {Table, Select, Button, Popconfirm} from 'antd';
import TopicAddModelForm from './components/addModel';

import styles from './index.less';

const { Option } = Select;
const clientList = JSON.parse(sessionStorage.getItem('clientList'));

class Topic extends Component {

  componentDidMount() {
    this.props.dispatch({
      type: 'topic/getTopicList',
    })
  }

  onChangeClient = value => {
    this.props.dispatch({
      type: 'topic/changeClient',
      payload: value
    });
  };

  openModel = () =>{
    this.props.dispatch({
      type: 'topic/changeVisible',
      payload: true
    });
  };

  remove = topicName => {
    this.props.dispatch({
      type: 'topic/removeTopic',
      payload: topicName
    });
  };

  renderTopicTable = () => {
    const {topicListLoading,topicList,dispatch} = this.props;
    const remove = topicName => {
      dispatch({
        type: 'topic/removeTopic',
        payload: topicName
      });
    };

    const columns = [
      {
        title: 'Clients',
        dataIndex: 'clientId',
      },
      {
        title: 'Topics',
        dataIndex: 'topic',
      },
      {
        title: 'Create Time',
        dataIndex: 'createTime',
        render: text => moment(text).format('YYYY/MM/DD HH:mm:ss')
      },
      {
        title: '',
        dataIndex: 'topic',
        render: text => {
          return(
            <Popconfirm
              title="Are you sure remove this topic?"
              onConfirm={()=>{remove(text)}}
              okText="Yes"
              cancelText="No"
            >
              <a href="#">Remove</a>
            </Popconfirm>
          )
        }
      }
    ];

    return <Table dataSource={topicList}
                  columns={columns}
                  loading={{
                    tip: 'loading...',
                    spinning: topicListLoading
                  }}
                  pagination={false}/>;
  };

  render() {
    const {clientId} = this.props;
    const clientOption = clientList.map(v=><Option key={v.id} value={v.clientId}>{v.clientId}</Option>);

    return (
      <PageHeaderWrapper className={styles.main}>
        <div className={styles.toolWrapper}>
          {clientList.length > 0 && (
            <div>
              <span style={{marginRight:'10px'}}>Client:</span>
              <Select defaultValue={clientId} style={{width: 120}} onChange={this.onChangeClient}>
                {clientOption}
              </Select>
            </div>
          )}

          <Button type="primary" onClick={this.openModel}>New Topic</Button>
        </div>

        {this.renderTopicTable()}

        <TopicAddModelForm/>
      </PageHeaderWrapper>
    );
  }
}

export default connect(({topic}) => ({...topic}))(Topic);
