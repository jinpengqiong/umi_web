import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { Component } from 'react';
import { connect } from 'dva';
import { EditableFormTable } from '../../../components/EditableCell/EditableCell';
import styles from './index.less';


class XIAOMIPush extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'push_service/fetchTableData',
      payload: { vendorType: 12 },
    });
  }

  render() {
    const { tableData, tableDataLoading, dispatch, location } = this.props;
    return (
      <PageHeaderWrapper className={styles.main}>
        <div
          style={{
            textAlign: 'center',
          }}
        >
          <EditableFormTable
            tableData={tableData}
            tableDataLoading={tableDataLoading}
            dispatch={dispatch}
            location={location}
          />
        </div>
      </PageHeaderWrapper>
    );
  }
}
export default connect(({ push_service }) => ({ ...push_service }))(XIAOMIPush);
