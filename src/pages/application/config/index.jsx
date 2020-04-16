import React from 'react';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { EditableFormTable } from '../../../components/EditableCell/EditableCell'
import { FormattedMessage } from 'umi-plugin-react/locale';
import { Table, Divider, Tag, Spin } from 'antd';
import styles from './index.less';

const ConfigPage =  props => {
  console.log('props', props);
  const { tableData, dispatch } = props;
  return (
    <PageHeaderWrapper className={styles.main}>
      <div
        style={{
          textAlign: 'center',
          paddingTop: 20,
        }}
      >
        <div>
          <EditableFormTable tableData={tableData} dispatch={dispatch} location={props.location} />
        </div>
      </div>
    </PageHeaderWrapper>
  );};

  export default connect(({ config }) => ({ ...config }))(ConfigPage);
