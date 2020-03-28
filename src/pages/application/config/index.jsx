import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { EditableFormTable } from './EditableCell'
import { FormattedMessage } from 'umi-plugin-react/locale';
import { Table, Divider, Tag } from 'antd';
import styles from './index.less';

export default () => {
  return (
    <PageHeaderWrapper>
      <EditableFormTable />
    </PageHeaderWrapper>
  );};
