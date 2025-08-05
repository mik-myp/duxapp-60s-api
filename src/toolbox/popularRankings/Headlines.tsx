import {
  Text,
  TopView,
  Header,
  RequestHooks,
  ScrollView,
  CellGroup,
  Cell,
  route
} from '@/duxui';
import Loading from '../components/Loading';
import { useRequest } from '../request';

export interface Datum {
  /**
   * 封面 URL
   */
  cover: string;
  /**
   * 热度
   */
  hot_value: number;
  /**
   * 详情链接
   */
  link: string;
  /**
   * 热搜标题
   */
  title: string;
  [property: string]: any;
}

export default function Headlines() {
  const [data, action]: [Datum[], RequestHooks.RequestResult] = useRequest({
    url: 'toutiao'
  });

  // 数字转万
  const numToWan = (num: number) => {
    if (num >= 10000) {
      return `${(num / 10000).toFixed(1)}万`;
    }
    return num.toString();
  };

  return (
    <TopView>
      <Header title='头条热搜榜' titleCenter />
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
                  desc={numToWan(item.hot_value)}
                />
              );
            })}
          </CellGroup>
        )}
      </ScrollView>
    </TopView>
  );
}
