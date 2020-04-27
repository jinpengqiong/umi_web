import React, {Component} from 'react';
import {connect} from 'dva';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import {Table} from 'antd';
import styles from './index.less';


class ConfigPage extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'clients/fetchClientList',
    });
  }

  renderTable = () => {
    const {clientList, clientListLoading} = this.props;
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
      },
      {
        title: 'Client Id',
        dataIndex: 'clientId',
      },
      {
        title: 'Secret Id',
        dataIndex: 'secretId',
      },
      {
        title: 'Secret Key',
        dataIndex: 'secretKey',
      }
    ];
    return (
      <Table
        rowKey='id'
        columns={columns}
        dataSource={clientList}
        loading={{
          tip: 'loading...',
          spinning: clientListLoading
        }}
        pagination={false}
      />
    )
  };

  render() {
    return (
      <PageHeaderWrapper className={styles.main}>
        <div
          style={{
            textAlign: 'center',
            paddingTop: 20,
          }}
        >
          <div>
            {this.renderTable()}
          </div>
        </div>
      </PageHeaderWrapper>
    )
  }
};

export default connect(({clients}) => ({...clients}))(ConfigPage);
