import React from 'react';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { EditableFormTable } from './EditableCell'
import { FormattedMessage } from 'umi-plugin-react/locale';
import { Table, Divider, Tag } from 'antd';
import styles from './index.less';

const ConfigPage =  props => {
  console.log('props', props);
  const { tableData } = props;
  return (
    <PageHeaderWrapper>
      <EditableFormTable tableData={tableData} />
    </PageHeaderWrapper>
  );};

  export default connect(({ config }) => ({ ...config }))(ConfigPage);
