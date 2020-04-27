import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React from 'react';
import { connect } from 'dva';
import { EditableFormTable } from '../../../components/EditableCell/EditableCell';
import styles from './index.less';

const OPOPPush = (props) => {
  const { tableData, tableDataLoading, dispatch } = props;
  return (
    <PageHeaderWrapper className={styles.main}>
      <div
        style={{
          paddingTop: 20,
          textAlign: 'center',
        }}
      >
        <EditableFormTable
          tableData={tableData}
          tableDataLoading={tableDataLoading}
          dispatch={dispatch}
          location={props.location}
        />
      </div>
    </PageHeaderWrapper>
  );
};
export default connect(({ push_service }) => ({ ...push_service }))(OPOPPush);
