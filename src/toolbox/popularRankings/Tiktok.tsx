import {
  Text,
  TopView,
  Header,
  RequestHooks,
  ScrollView,
  Card,
  route,
  Space,
  Column,
  px,
  Image,
  Divider,
  CellGroup,
  Cell
} from '@/duxui';
import { useRequest } from '../request';
import Loading from '../components/Loading';

export interface Datum {
  /**
   * 热搜激活时间字符串
   */
  active_time: string;
  /**
   * 热搜激活时间戳（13 位）
   */
  active_time_at: number;
  /**
   * 封面图 URL
   */
  cover: string;
  /**
   * 事件发生时间字符串
   */
  event_time: string;
  /**
   * 事件发生时间戳（13 位）
   */
  event_time_at: number;
  /**
   * 热度
   */
  hot_value: number;
  /**
   * 详情链接（抖音搜索）
   */
  link: string;
  /**
   * 标题
   */
  title: string;
  [property: string]: any;
}
export default function Tiktok() {
  const [data, action]: [Datum[], RequestHooks.RequestResult] = useRequest({
    url: 'douyin'
  });
  console.log('🌍 ~ Tiktok ~ data:', data);

  // 数字转万
  const numToWan = (num: number) => {
    if (num >= 10000) {
      return `${(num / 10000).toFixed(1)}万`;
    }
    return num.toString();
  };

  return (
    <TopView>
      <Header title='抖音热搜榜' titleCenter />
      <ScrollView className='m-2' onRefresh={action.reload}>
        {action.loading ? (
          <Loading />
        ) : (
          <CellGroup>
            {data?.map((item, index) => {
              return (
                <Cell
                  title={`${index + 1}. ${item.title}`}
                  onClick={() => route.nav(item.link)}
                  desc={numToWan(item.hot_value)}
                  key={item.title}
                />
              );
            })}
          </CellGroup>
        )}
      </ScrollView>
    </TopView>
  );
}
