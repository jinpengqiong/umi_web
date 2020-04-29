export const ChannelTypeDataSource = [
  {
    title: 'App is terminated',
    osMessage: 'Y',
    passThroughMessage: 'N',
  },
  {
    title: 'App in background',
    osMessage: 'Y',
    passThroughMessage: 'Y/N depends on',
  },
  {
    title: 'App in foreground',
    osMessage: 'Y',
    passThroughMessage: 'Y',
  },
  {
    title: 'Customize your UI In app side',
    osMessage: 'N',
    passThroughMessage: 'Xiaomi and Huawei',
  }
];

export const QuotaDataSource = [
  {
    type: 'Xiaomi',
    baseNAU: '10000',
    baseQutoa: '50000',
    advancedQutoa: 'NAU*5'
  },
  {
    type: 'Huawei',
    baseNAU: 'N/A',
    baseQutoa: 'N/A',
    advancedQutoa: 'N/A'
  },
  {
    type: 'OPPO',
    baseNAU: '50000',
    baseQutoa: '100000',
    advancedQutoa: 'NAU*2'
  },
  {
    type: 'Vivo',
    baseNAU: '10000',
    baseQutoa: '10000',
    advancedQutoa: 'NAU'
  },
  {
    type: 'Unknown',
    baseNAU: '10000',
    baseQutoa: '50000',
    advancedQutoa: 'NAU*5'
  }
];
