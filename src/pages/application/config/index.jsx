import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { FormattedMessage } from 'umi-plugin-react/locale';
import { Table, Divider, Tag } from 'antd';
import styles from './index.less';

export default () => {
  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Client ID',
      dataIndex: 'client_id',
      key: 'client_id',
    },
    {
      title: 'Client Key',
      dataIndex: 'client_key',
      key: 'client_key',
    },
    {
      title: 'Client Value',
      key: 'client_value',
      dataIndex: 'client_value',
    },
    {
      title: 'operation',
      key: 'action',
      render: (text, record) => (
        <span>
          <a>Invite {record.name}</a>
          <Divider type="vertical" />
          <a>Delete</a>
        </span>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];
  return (
    <PageHeaderWrapper>
      <Table dataSource={data} columns={columns} />
    </PageHeaderWrapper>
  );};
