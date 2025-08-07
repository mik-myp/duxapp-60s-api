import {
  Header,
  TopView,
  Text,
  RequestHooks,
  ScrollView,
  CellGroup,
  Cell,
  route
} from '@/duxui';
import { useRequest } from '../request';
import Loading from '../components/Loading';
export interface Data {
  /**
   * 日期（几月几号）
   */
  date: string;
  /**
   * 日
   */
  day: number;
  /**
   * 事件列表
   */
  items: Item[];
  /**
   * 月份
   */
  month: number;
  [property: string]: any;
}

export interface Item {
  /**
   * 事件描述
   */
  description: string;
  /**
   * 事件类型，death/event/birth
   */
  event_type: string;
  /**
   * 百科详情链接
   */
  link: string;
  /**
   * 标题
   */
  title: string;
  /**
   * 年份
   */
  year: string;
  [property: string]: any;
}
export default function HistoryToday() {
  const [data, action]: [Data, RequestHooks.RequestResult] = useRequest({
    url: 'today_in_history'
  });

  return (
    <TopView>
      <Header title='历史上的今天' />
      <ScrollView className='m-2'>
        {action.loading ? (
          <Loading />
        ) : (
          <CellGroup>
            {data.items?.map((item) => {
              return (
                <Cell
                  title={item.title}
                  subTitle={item.description}
                  desc={item.event_type}
                  onClick={() => route.nav(item.link)}
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
