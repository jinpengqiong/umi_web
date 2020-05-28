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
        <Divider orientation="left" className={styles.dividerMt}>Terminology</Divider>
        <div className={styles.contentWrapper}>
          <p>"Always Online Push Service" is short as AOPS.</p>
          <p>Always Online equals "using push notification technology once the app is terminated(Offline) or using real-time socket technology once the app is in the foreground(Online)", and the user always receives messages no matter he or she online or offline.</p>
          <p>User mode is designed to import and validate your users through your identity system via AOPS middle tier or app.</p>
          <p>Visitor mode is designed in those scenarios.</p>
          <p>1)Login is not required.</p>
          <p>2)The process for importing and validating your users through your identity system is handled via yourself backend or pre-prepared when you start integrating AOPS SDK.</p>
        </div>

        <Divider orientation="left">Understand Message Deliveries Paths</Divider>
        <div className={styles.contentWrapper}>
          <img className={styles.messageImg} src={messageImg} alt=""/>
        </div>

        <Divider orientation="left" className={styles.dividerMt}>Understand the Expected Result between Channel Type and App Behaviors</Divider>
        <div className={styles.contentWrapper}>
          {this.renderChannelTypeTable()}
        </div>

        <Divider orientation="left" className={styles.dividerMt}>Understand Quota Limitation on each Vendor Channel</Divider>
        <div className={styles.contentWrapper}>
          {this.renderQuotaTable()}
        </div>
        <div className={styles.contentWrapper}>
          <p>To get unlimited quota for IM scenario, you could send mail to Xiaomi, Vivo and OPPO(NU > 300K) to request special channel or message type.</p>
          <p>No significant code workload and request-feedback in 1 ~ 1.5 week.</p>
        </div>

        <Divider orientation="left" className={styles.dividerMt}>FAQ</Divider>
        <div className={styles.contentWrapper}>
          <p>Important!!!. Submit your app to Vivo and OPPO store at first, then you have the qualification to request (prod) push permission.</p>
          <p>Vivo doesn’t allow to deliver simple emoji, numbers messages. So we design a template to bypass the limitation on Vivo.</p>
          <p>The app probably can not receive message due to invalid registration Id. i.e.,user does not open this app in 30~90 days or OS upgrade.</p>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default Usage;
