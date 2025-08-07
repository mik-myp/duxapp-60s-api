import {
  Header,
  TopView,
  Text,
  Image,
  px,
  type RequestHooks,
  Card,
  Space,
  CardTitle,
  Column,
  Divider,
  ScrollView,
  route
} from '@/duxui';
import { useRequest } from '../request';
import Loading from '../components/Loading';
import { View } from '@tarojs/components';

export interface Datum {
  /**
   * 游戏封面图
   */
  cover: string;
  /**
   * 游戏描述
   */
  description: string;
  /**
   * 免费结束时间字符串
   */
  free_end: string;
  /**
   * 免费结束时间戳（13 位）
   */
  free_end_at: number;
  /**
   * 免费开始时间字符串
   */
  free_start: string;
  /**
   * 免费开始时间戳（13 位）
   */
  free_start_at: number;
  /**
   * ID
   */
  id: string;
  /**
   * 当前是否免费
   */
  is_free_now: boolean;
  /**
   * 游戏详情页
   */
  link: string;
  /**
   * 原价（数字，单位为人民币元）
   */
  original_price: number;
  /**
   * 已格式化原价描述（带单位）
   */
  original_price_desc: string;
  /**
   * 发行厂商/销售商
   */
  seller: string;
  /**
   * 游戏名称
   */
  title: string;
  [property: string]: any;
}

export default function EpicGamesFreeGame() {
  const [data, action]: [Datum[], RequestHooks.RequestResult] = useRequest({
    url: 'epic'
  });
  console.log('🌍 ~ EpicGamesFreeGame ~ data:', data);

  return (
    <TopView>
      <Header title='Epic Games 免费游戏' titleCenter />
      <ScrollView className='m-2' onRefresh={action.reload}>
        {action.loading ? (
          <Loading />
        ) : (
          <View className='flex gap-2'>
            {data.map((item) => {
              return (
                <Card
                  key={item.id}
                  onClick={() => {
                    route.nav(item.link);
                  }}
                >
                  <Space>
                    <CardTitle>{item.title}</CardTitle>
                    <Space row={false}>
                      <Image
                        style={{ height: px(400) }}
                        preview
                        mode='scaleToFill'
                        src={item.cover}
                      />
                      <Column grow className='gap-2'>
                        <Text>{`游戏描述：${item.description}`}</Text>
                        <Text>{`原价：${item.original_price_desc}`}</Text>
                        <Text>{`发行厂商/销售商：${item.seller}`}</Text>
                        <Text>{`当前是否免费：${
                          item.is_free_now ? '是' : '否'
                        }`}</Text>
                        <Text>{`免费开始时间：${item.free_start}`}</Text>
                        <Text>{`免费结束时间：${item.free_end}`}</Text>
                      </Column>
                    </Space>
                  </Space>
                </Card>
              );
            })}
          </View>
        )}
      </ScrollView>
    </TopView>
  );
}
