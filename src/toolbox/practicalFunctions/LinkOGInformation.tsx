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
import { getOg } from '../services';
import { View } from '@tarojs/components';
import { useState } from 'react';

type OgData = {
  title?: string;
  description?: string;
  image?: string;
};

const defaultValues = async () => {
  return { url: '' };
};
export default function LinkOGInformation() {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<OgData>({});
  const [error, setError] = useState<string>('');
  const handleSubmit = (data) => {
    setLoading(true);
    getOg(data)
      .then((res) => {
        setData(res as OgData);
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
      <Header title='链接 OG 信息' titleCenter />

      <Form onSubmit={handleSubmit} defaultValues={defaultValues}>
        <ScrollView>
          <Card margin verticalPadding={false}>
            <DividerGroup>
              <FormItem
                label='链接'
                field='url'
                rules={[
                  { required: true, message: '请输入链接', type: 'string' }
                ]}
              >
                <Input placeholder='请输入链接' grow />
              </FormItem>
            </DividerGroup>
          </Card>
          <Row className='p-3 gap-3'>
            <FormReset>
              <Button
                onClick={() => {
                  setData({} as OgData);
                  setError('');
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
                {
                  <Cell
                    title={
                      <>
                        <Text bold>标题：</Text>
                        <Text>{data.title}</Text>
                      </>
                    }
                  />
                }
                {
                  <Cell
                    title={
                      <>
                        <Text bold>描述：</Text>
                        <Text>{data.description}</Text>
                      </>
                    }
                  />
                }
                {
                  <Cell
                    title={
                      <>
                        <Text bold>图片：</Text>
                        <Image
                          style={{ height: px(400) }}
                          preview
                          mode='scaleToFill'
                          src={data.image}
                          imgProps={{
                            referrerPolicy: 'no-referrer'
                          }}
                        />
                      </>
                    }
                  />
                }
              </CellGroup>
            )}
          </View>
        </ScrollView>
      </Form>
    </TopView>
  );
}
