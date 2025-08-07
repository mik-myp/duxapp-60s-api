import {
  Header,
  TopView,
  Text,
  Image,
  px,
  type RequestHooks,
  Form,
  ScrollView,
  Card,
  InputSearch,
  FormItem,
  FormRef,
  Space,
  Column,
  Link,
  Button,
  route
} from '@/duxui';
import { useRequest } from '../request';
import { useRef, useState } from 'react';
import Loading from '../components/Loading';
import { View } from '@tarojs/components';

export interface Data {
  /**
   * 封面图 URL
   */
  cover: string;
  /**
   * 词条描述
   */
  description: string;
  /**
   * 百科详情链接
   */
  link: string;
  /**
   * 词条名称
   */
  name: string;
  /**
   * 更新时间字符串
   */
  update_time: string;
  /**
   * 更新时间戳（13 位）
   */
  update_time_at: number;
  [property: string]: any;
}

export default function BaiduBaikeEntry() {
  const [word, setWord] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [data, action]: [Data, RequestHooks.RequestResult] = useRequest(
    {
      url: 'baike',
      data: { word }
    },
    {
      ready: !!word,
      onError: (err) => {
        setErrorMessage(err.message);
      }
    }
  );

  return (
    <TopView>
      <Header title='百度百科词条' titleCenter />
      <Card margin verticalPadding={false}>
        <FormItem label='搜索输入' field='word'>
          <InputSearch
            placeholder='请输入关键词'
            align='right'
            grow
            value={word}
            onChange={(value) => {
              setWord(value);
              setErrorMessage('');
            }}
          />
        </FormItem>
      </Card>

      <ScrollView className='m-2' onRefresh={action.reload}>
        {word && action.loading ? (
          <Loading />
        ) : (
          <>
            {errorMessage ? (
              <Text>{`${errorMessage}，请下拉刷新重试`}</Text>
            ) : null}
            {word && data ? (
              <Space
                row={false}
                onClick={() => {
                  route.nav(data.link);
                }}
              >
                <Image
                  style={{ height: px(400) }}
                  preview
                  mode='scaleToFill'
                  src={data.cover}
                  imgProps={{
                    referrerPolicy: 'no-referrer'
                  }}
                />
                <Column grow className='gap-2'>
                  <Text>{`词条名称：${data.title}`}</Text>
                  <Text>{`词条描述：${data.description}`}</Text>
                  <Text>{`摘要：${data.abstract}`}</Text>
                </Column>
              </Space>
            ) : null}
          </>
        )}
      </ScrollView>
    </TopView>
  );
}
