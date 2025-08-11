import {
  Header,
  TopView,
  Text,
  ScrollView,
  px,
  Divider,
  type RequestHooks
} from '@/duxui';
import Loading from '../components/Loading';
import { View } from '@tarojs/components';
import { useRequest } from '@/toolbox/request';

interface Data {
  /**
   * API 更新时间字符串
   */
  api_updated: string;
  /**
   * API 更新时间戳（13 位）
   */
  api_updated_at: number;
  audio: Audio;
  /**
   * 封面图 URL
   */
  cover: string;
  created: string;
  created_at: number;
  /**
   * 返回的数据所属日期
   */
  date: string;
  /**
   * 原文链接
   */
  link: string;
  /**
   * 新闻列表
   */
  news: string[];
  /**
   * 微语
   */
  tip: string;
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

interface Audio {
  music: string;
  news: string;
  [property: string]: any;
}

export default function UnderstandTheWorldIn60SecondsEveryDay() {
  const [data, action]: [Data, RequestHooks.RequestResult] = useRequest({
    url: '60s'
  });

  // 获取星期几的全大写英文
  const getDayOfWeek = (dateString: string) => {
    const date = new Date(dateString);
    const dayOfWeek = date.getDay();
    const daysOfWeek = [
      'SUNDAY',
      'MONDAY',
      'TUESDAY',
      'WEDNESDAY',
      'THURSDAY',
      'FRIDAY',
      'SATURDAY'
    ];
    return daysOfWeek[dayOfWeek];
  };

  const getYearMonthDay = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}年${month}月${day}日`;
  };

  return (
    <TopView>
      <Header title='每天 60 秒读懂世界' titleCenter />
      {action.loading ? (
        <Loading />
      ) : (
        <ScrollView className='m-2'>
          <View
            style={{
              height: px(250),
              backgroundColor: '#fd4545'
            }}
            className='items-center justify-center gap-1'
          >
            <Text color='#fff' size={3}>
              {getDayOfWeek(data.date || '')}
            </Text>
            <Text color='#fff' size={40}>
              {data.day_of_week}
            </Text>
            <Text color='#fff' size={3}>
              总有人间一两风，填我十万八千梦
            </Text>
          </View>
          <View className='items-center justify-center'>
            <Text color='#c77c77' className='mv-2'>
              NEWS
            </Text>
          </View>
          <Divider type='solid' size={10} style={{ borderColor: '#707070' }} />
          <View className='m-2 items-center justify-between flex-row'>
            <View style={{ width: '20%' }} className='text-left'>
              <Text>{data.lunar_date}</Text>
            </View>
            <View className='text-center'>
              <Text color='#b51227'>每天60秒读懂世界简报</Text>
            </View>
            <View style={{ width: '20%' }} className='text-right'>
              <Text>{getYearMonthDay(data.date || '')}</Text>
            </View>
          </View>
          <Divider type='solid' size={3} style={{ borderColor: '#707070' }} />
          <View className='mv-2'>
            {data.news?.map((item, index) => {
              return (
                <Text key={index} style={{ marginBottom: px(24) }}>
                  {`${index + 1}、${item}`}
                </Text>
              );
            })}
          </View>
        </ScrollView>
      )}
    </TopView>
  );
}
