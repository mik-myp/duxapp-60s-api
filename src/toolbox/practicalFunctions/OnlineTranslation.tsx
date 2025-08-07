import {
  Header,
  TopView,
  Text,
  Image,
  px,
  type RequestHooks,
  Form,
  PickerSelect,
  ScrollView,
  Card,
  DividerGroup,
  FormItem,
  Textarea,
  Button,
  Row,
  FormReset,
  FormSubmit,
  FormRef,
  toast
} from '@/duxui';
import { useRequest } from '../request';
import { useEffect, useRef, useState } from 'react';
import Loading from '../components/Loading';
import { View } from '@tarojs/components';

export interface Datum {
  /**
   * 字母表序号
   */
  alphabet: string;
  /**
   * 语言类型代码，用于翻译 API 参数
   */
  code: string;
  /**
   * 语言类型中文描述
   */
  label: string;
  [property: string]: any;
}

export interface Data {
  /**
   * 源语言信息
   */
  source: Source;
  /**
   * 目标语言信息
   */
  target: Target;
  [property: string]: any;
}

/**
 * 源语言信息
 */
export interface Source {
  /**
   * 源语言内容注音
   */
  pronounce: string;
  /**
   * 源语言内容
   */
  text: string;
  /**
   * 源语言类型
   */
  type: string;
  /**
   * 源语言类型中文描述
   */
  type_desc: string;
  [property: string]: any;
}

/**
 * 目标语言信息
 */
export interface Target {
  /**
   * 目标语言内容注音
   */
  pronounce: string;
  /**
   * 目标语言内容
   */
  text: string;
  /**
   * 目标语言类型
   */
  type: string;
  /**
   * 目标语言类型中文描述
   */
  type_desc: string;
  [property: string]: any;
}

export default function OnlineTranslation() {
  const [data, setData] = useState({
    text: '',
    from: 'auto',
    to: 'auto'
  });

  const [langs, langsAction]: [Datum[], RequestHooks.RequestResult] =
    useRequest({
      url: 'fanyi/langs'
    });

  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState('');

  const [translate, translateAction]: [Data, RequestHooks.RequestResult] =
    useRequest(
      {
        url: 'fanyi',
        data
      },
      {
        ready: isReady,
        onError: (e) => {
          setError(e.message);
          setIsReady(false);
        }
      }
    );

  return (
    <TopView>
      <Header title='在线翻译' titleCenter />
      {langsAction.loading ? (
        <Loading />
      ) : (
        <ScrollView>
          <Card margin verticalPadding={false}>
            <DividerGroup>
              <FormItem label='源语言类型'>
                <PickerSelect
                  nameKey='label'
                  valueKey='code'
                  search
                  placeholder='请选择'
                  range={[
                    {
                      label: '自动检测',
                      code: 'auto'
                    }
                  ].concat(langs)}
                  grow
                  title='请选择'
                  defaultValue='auto'
                  value={data.from}
                  onChange={(value) => {
                    setIsReady(false);
                    setData({
                      ...data,
                      from: value
                    });
                  }}
                />
              </FormItem>
              <FormItem label='目标语言类型'>
                <PickerSelect
                  nameKey='label'
                  valueKey='code'
                  placeholder='请选择'
                  search
                  range={[
                    {
                      label: '自动检测',
                      code: 'auto'
                    }
                  ].concat(langs)}
                  grow
                  title='请选择'
                  defaultValue='auto'
                  value={data.to}
                  onChange={(value) => {
                    setIsReady(false);
                    setData({
                      ...data,
                      to: value
                    });
                  }}
                />
              </FormItem>
              <FormItem label='需要翻译的内容' vertical>
                <Textarea
                  value={data.text}
                  onChange={(value) => {
                    setIsReady(false);
                    setData({
                      ...data,
                      text: value
                    });
                  }}
                />
              </FormItem>
            </DividerGroup>
          </Card>
          <Row className='p-3 gap-3'>
            <Button
              className='flex-grow'
              onClick={() => {
                setIsReady(false);
                setData({
                  text: '',
                  from: 'auto',
                  to: 'auto'
                });
              }}
            >
              重置
            </Button>
            <Button
              className='flex-grow'
              type='primary'
              onClick={() => {
                if (!data.text) {
                  toast('请输入需要翻译的内容');
                  return;
                }
                setError('');
                if (!isReady) {
                  setIsReady(true);
                }
              }}
            >
              翻译
            </Button>
          </Row>
          <View>
            {error ? (
              <Text>{error}</Text>
            ) : isReady ? (
              translateAction.loading ? (
                <Loading />
              ) : (
                <Card margin verticalPadding={false}>
                  <DividerGroup>
                    <FormItem label='源语言类型' field='source.type'>
                      <Text>{translate?.source?.type_desc}</Text>
                    </FormItem>
                    <FormItem label='源语言内容' field='source.text'>
                      <Text>{translate?.source?.text}</Text>
                    </FormItem>
                    <FormItem label='目标语言类型' field='target.type'>
                      <Text>{translate?.target?.type_desc}</Text>
                    </FormItem>
                    <FormItem label='目标语言内容' field='target.text'>
                      <Text>{translate?.target?.text}</Text>
                    </FormItem>
                  </DividerGroup>
                </Card>
              )
            ) : null}
          </View>
        </ScrollView>
      )}
    </TopView>
  );
}
