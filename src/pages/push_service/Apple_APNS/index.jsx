import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React from 'react';
import { connect } from 'dva';
import { EditableFormTable } from '../../../components/EditableCell/EditableCell';
import styles from './index.less';

const APNS = props => {
  console.log('props', props);
  const { tableData, dispatch } = props;
  return (
    <PageHeaderWrapper className={styles.main}>
      <div
        style={{
          paddingTop: 20,
          textAlign: 'center',
        }}
      >
        <EditableFormTable tableData={tableData} dispatch={dispatch} location={props.location} />
      </div>
    </PageHeaderWrapper>
  );
};
export default connect(({ config }) => ({ ...config }))(APNS);
