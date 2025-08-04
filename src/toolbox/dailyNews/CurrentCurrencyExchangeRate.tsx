import {
  Header,
  TopView,
  PickerSelect,
  ScrollView,
  FormItem,
  Card,
  Text,
  RequestHooks
} from '@/duxui';
import { currencyList, currencyMap } from './utils';
import { useState } from 'react';
import { useRequest } from '@/toolbox/request';
import { View } from '@tarojs/components';
import Loading from '../components/Loading';

export interface Data {
  /**
   * 基准货币代码，也就是你传的货币代码
   */
  base_code: string;
  /**
   * 下次更新时间字符串
   */
  next_updated: string;
  /**
   * 下次更新时间戳（13 位）
   */
  next_updated_at: number;
  /**
   * 汇率列表
   */
  rates: RateElement[];
  /**
   * 更新时间字符串
   */
  updated: string;
  /**
   * 更新时间戳（13 位）
   */
  updated_at: number;
  [property: string]: any;
}

export interface RateElement {
  /**
   * 货币代码
   */
  currency: string;
  /**
   * 货币相较于基准货币的比例
   */
  rate: number | number;
  [property: string]: any;
}

export default function CurrentCurrencyExchangeRate() {
  const [currency, setCurrency] = useState<string>('CNY');

  const [data, action]: [Data, RequestHooks.RequestResult] = useRequest({
    url: 'exchange_rate',
    data: {
      currency
    }
  });

  const handleChangeCurrency = (value: string) => {
    setCurrency(value);
  };

  return (
    <TopView>
      <Header title='当日货币汇率' />{' '}
      <Card margin verticalPadding={false}>
        <FormItem label='货币'>
          <PickerSelect
            placeholder='请选择'
            range={currencyList}
            grow
            search
            title='请选择'
            value={currency}
            onChange={handleChangeCurrency}
          />
        </FormItem>
      </Card>
      {action.loading ? (
        <Loading />
      ) : (
        <ScrollView onRefresh={action.reload}>
          {data.rates?.map((item) => {
            if (!currencyMap[item.currency]) return null;
            return (
              <View className='flex-row justify-between align-center bg-white m-3 p-3 r-3'>
                <Text>{`${currencyMap[item.currency]}（${
                  item.currency
                }）`}</Text>
                <Text>{`${item.rate}`}</Text>
              </View>
            );
          })}
        </ScrollView>
      )}
    </TopView>
  );
}
