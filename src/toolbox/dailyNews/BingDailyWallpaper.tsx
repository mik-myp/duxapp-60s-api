import { Header, TopView, Text, Image, px, type RequestHooks } from '@/duxui';
import { useRequest } from '@/toolbox/request';
import { View } from '@tarojs/components';
import Loading from '../components/Loading';

interface Data {
  /**
   * 版权方
   */
  copyright: string;
  /**
   * 壁纸链接
   */
  cover: string;
  /**
   * 壁纸描述
   */
  description: string;
  /**
   * 大纲标题
   */
  headline: string;
  /**
   * 壁纸长描述
   */
  main_text: string;
  /**
   * 标题
   */
  title: string;
  /**
   * 更新时间字符串
   */
  update_date: string;
  /**
   * 更新时间戳（13 位）
   */
  update_date_at: number;
  [property: string]: any;
}
export default function BingDailyWallpaper() {
  const [data, action]: [Data, RequestHooks.RequestResult] = useRequest({
    url: 'bing'
  });

  return (
    <TopView>
      <Header title='必应每日壁纸（Bing）' />
      {action.loading ? (
        <Loading />
      ) : (
        <View className='m-2'>
          <Image
            style={{ height: px(400) }}
            preview
            mode='scaleToFill'
            src={data.cover}
            imgProps={{
              alt: data.description,
              title: data.title
            }}
          />
          <Text className='text-left mv-2 bold' size={7}>
            {data.title}
          </Text>
          <Text className='text-left mv-2 bold'>{data.description}</Text>
        </View>
      )}
    </TopView>
  );
}
