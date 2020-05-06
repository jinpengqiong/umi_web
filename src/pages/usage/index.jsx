import React, {Component} from 'react';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import {Table, Divider} from 'antd';
import styles from './index.less';
import messageImg from "../../assets/message_deliveries_paths.png";
import {ChannelTypeDataSource, QuotaDataSource} from '../../utils/constant';


class Usage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderChannelTypeTable = () => {
    const columns = [
      {
        title: '',
        dataIndex: 'title',
      },
      {
        title: 'OS message',
        dataIndex: 'osMessage',
      },
      {
        title: 'PassThrough message',
        dataIndex: 'passThroughMessage',
      },
    ];

    return <Table dataSource={ChannelTypeDataSource} columns={columns} bordered size="small" pagination={false}/>;
  };

  renderQuotaTable = () => {
    const columns = [
      {
        title: 'Terms',
        children: [
          {
            title: 'Type',
            dataIndex: 'type',
          }
        ]
      },
      {
        title: 'Numbers of Active Users(NAU)',
        align: 'left',
        children: [
          {
            title: 'Base NAU',
            dataIndex: 'baseNAU',
          },
          {
            title: 'Base Qutoa',
            dataIndex: 'baseQutoa',
          },
          {
            title: 'Advanced Qutoa',
            dataIndex: 'advancedQutoa',
          }
        ]
      }
    ];

    return <Table dataSource={QuotaDataSource} columns={columns} bordered size="small" pagination={false}/>;
  };

  render() {

    return (
      <PageHeaderWrapper className={styles.main}>
        <Divider orientation="left">Understand Each Message Deliveries Paths</Divider>
        <div className={styles.contentWrapper}>
          <img className={styles.messageImg} src={messageImg} alt=""/>
        </div>

        <Divider orientation="left" className={styles.dividerMt}>Understand the Expected Result between Channel Type and App Behaviors</Divider>
        <div className={styles.contentWrapper}>
          {this.renderChannelTypeTable()}
        </div>

        <Divider orientation="left" className={styles.dividerMt}>Understand the Quota on each Vendor Channel</Divider>
        <div className={styles.contentWrapper}>
          {this.renderQuotaTable()}
        </div>

        <Divider orientation="left" className={styles.dividerMt}>FAQ</Divider>
        <div className={styles.contentWrapper}>
          <p>Vivo doesn’t allow to deliver simple emoji, numbers messages. And we fill the template to bypass the limitation on Vivo.</p>
          <p>The app probably can not received message if the user doesn't open this app in 30~90 days or OS upgrade.</p>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default Usage;
