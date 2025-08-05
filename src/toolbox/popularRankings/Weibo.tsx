import {
  Text,
  TopView,
  Header,
  ScrollView,
  CellGroup,
  Cell,
  route,
  RequestHooks
} from '@/duxui';
import { useRequest } from '../request';
import Loading from '../components/Loading';

export interface Datum {
  /**
   * 热度
   */
  hot_value: number;
  /**
   * 详情链接（微博搜索）
   */
  link: string;
  /**
   * 热搜词
   */
  title: string;
  [property: string]: any;
}

export default function Weibo() {
  const [data, action]: [Datum[], RequestHooks.RequestResult] = useRequest({
    url: 'weibo'
  });
  console.log('🌍 ~ Weibo ~ data:', data);
  return (
    <TopView>
      <Header title='微博热搜榜' titleCenter />
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
