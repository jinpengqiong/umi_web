import React from 'react';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { EditableFormTable } from './EditableCell'
import { FormattedMessage } from 'umi-plugin-react/locale';
import { Table, Divider, Tag, Spin } from 'antd';
import styles from './index.less';

const ConfigPage =  props => {
  console.log('props', props);
  const { tableData, dispatch } = props;
  const theData =
    tableData && tableData.code === '200'
      ? tableData.data
      : null;
  return (
    <PageHeaderWrapper className={styles.main}>
      <div
        style={{
          textAlign: 'center',
          paddingTop: 20,
        }}
      >
        {/* <Spin spinning={loading} size="large" /> */}
        <div>
          <EditableFormTable tableData={theData} dispatch={dispatch} />
        </div>
      </div>
    </PageHeaderWrapper>
  );};

  export default connect(({ config }) => ({ ...config }))(ConfigPage);
