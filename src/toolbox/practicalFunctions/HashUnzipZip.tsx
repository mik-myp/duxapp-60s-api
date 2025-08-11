import {
  Header,
  TopView,
  Text,
  Image,
  px,
  type RequestHooks,
  Form,
  FormItem,
  Input,
  FormSubmit,
  ScrollView,
  FormReset,
  Row,
  DividerGroup,
  Card,
  CellGroup,
  Cell,
  Loading,
  Button
} from '@/duxui';
import { getHash } from '../services';
import { View } from '@tarojs/components';
import { useState } from 'react';

export interface Data {
  base64: Base64;
  brotli: Brotli;
  deflate: Deflate;
  gzip: Gzip;
  /**
   * MD5 结果
   */
  md5: string;
  sha: Sha;
  /**
   * 原始字符串
   */
  source: string;
  url: Url;
  [property: string]: any;
}

export interface Base64 {
  /**
   * base64 解码结果
   */
  decoded: string;
  /**
   * base64 编码结果
   */
  encoded: string;
  [property: string]: any;
}

export interface Brotli {
  /**
   * Brotil 解压结果
   */
  decoded: string;
  /**
   * Brotil 压缩结果
   */
  encoded: string;
  [property: string]: any;
}

export interface Deflate {
  /**
   * Deflate 解压结果
   */
  decoded: string;
  /**
   * Deflate 压缩结果
   */
  encoded: string;
  [property: string]: any;
}

export interface Gzip {
  /**
   * GZIP 解压结果
   */
  decoded: string;
  /**
   * GZIP 压缩结果
   */
  encoded: string;
  [property: string]: any;
}

export interface Sha {
  /**
   * sha1 结果
   */
  sha1: string;
  /**
   * sha256 结果
   */
  sha256: string;
  /**
   * sha512 结果
   */
  sha512: string;
  [property: string]: any;
}

export interface Url {
  /**
   * UrlEncode 解码结果
   */
  decoded: string;
  /**
   * UrlEncode 编码结果
   */
  encoded: string;
  [property: string]: any;
}

// 默认值支持多种形式 会直接定义值 函数返回值 异步函数返回值
const defaultValues = async () => {
  return {
    content: ''
  };
};

export default function HashUnzipZip() {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Data>({} as Data);
  const [error, setError] = useState<string>('');
  const handleSubmit = (data) => {
    setLoading(true);
    getHash(data)
      .then((res) => {
        if (res) {
          setData(res as unknown as Data);
        }
        setError('');
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
    return true;
  };

  return (
    <TopView>
      <Header title='哈希/解压/压缩' titleCenter />
      <Form onSubmit={handleSubmit} defaultValues={defaultValues}>
        <ScrollView>
          <Card margin verticalPadding={false}>
            <DividerGroup>
              <FormItem
                label='字符'
                name='content'
                rules={[
                  { required: true, message: '请输入字符', type: 'string' }
                ]}
              >
                <Input placeholder='请输入字符' grow />
              </FormItem>
            </DividerGroup>
          </Card>
          <Row className='p-3 gap-3'>
            <FormReset>
              <Button
                onClick={() => {
                  setData({} as Data);
                }}
                className='flex-grow'
              >
                重置
              </Button>
            </FormReset>
            <FormSubmit className='flex-grow' type='primary'>
              提交
            </FormSubmit>
          </Row>

          <View className='m-2'>
            {loading ? (
              <Loading />
            ) : error ? (
              <Text className='text-danger'>{error}</Text>
            ) : (
              <CellGroup>
                <Cell
                  title={
                    <>
                      <Text bold>原始字符串：</Text>
                      <Text break>{data.source}</Text>
                    </>
                  }
                />
                <Cell
                  title={
                    <>
                      <Text bold>base64解码：</Text>
                      <Text break>{data.base64?.decoded}</Text>
                    </>
                  }
                />
                <Cell
                  title={
                    <>
                      <Text bold>base64编码：</Text>
                      <Text break>{data.base64?.encoded}</Text>
                    </>
                  }
                />
                <Cell
                  title={
                    <>
                      <Text bold>Brotil 解压：</Text>
                      <Text break>{data.brotli?.decoded}</Text>
                    </>
                  }
                />
                <Cell
                  title={
                    <>
                      <Text bold>Brotil 压缩：</Text>
                      <Text break>{data.brotli?.encoded}</Text>
                    </>
                  }
                />
                <Cell
                  title={
                    <>
                      <Text bold>Deflate 解压：</Text>
                      <Text break>{data.deflate?.decoded}</Text>
                    </>
                  }
                />
                <Cell
                  title={
                    <>
                      <Text bold>Deflate 压缩：</Text>
                      <Text break>{data.deflate?.encoded}</Text>
                    </>
                  }
                />
                <Cell
                  title={
                    <>
                      <Text bold>GZIP 解压：</Text>
                      <Text break>{data.gzip?.decoded}</Text>
                    </>
                  }
                />
                <Cell
                  title={
                    <>
                      <Text bold>GZIP 压缩：</Text>
                      <Text break>{data.gzip?.encoded}</Text>
                    </>
                  }
                />
                <Cell
                  title={
                    <>
                      <Text bold>MD5：</Text>
                      <Text break>{data.md5}</Text>
                    </>
                  }
                />
                <Cell
                  title={
                    <>
                      <Text bold>SHA1：</Text>
                      <Text break>{data.sha?.sha1}</Text>
                    </>
                  }
                />
                <Cell
                  title={
                    <>
                      <Text bold>SHA256：</Text>
                      <Text break>{data.sha?.sha256}</Text>
                    </>
                  }
                />
                <Cell
                  title={
                    <>
                      <Text bold>SHA512：</Text>
                      <Text break>{data.sha?.sha512}</Text>
                    </>
                  }
                />
                <Cell
                  title={
                    <>
                      <Text bold>UrlEncode 解码：</Text>
                      <Text break>{data.url?.decoded}</Text>
                    </>
                  }
                />
                <Cell
                  title={
                    <>
                      <Text bold>UrlEncode 编码：</Text>
                      <Text break>{data.url?.encoded}</Text>
                    </>
                  }
                />
              </CellGroup>
            )}
          </View>
        </ScrollView>
      </Form>
    </TopView>
  );
}
