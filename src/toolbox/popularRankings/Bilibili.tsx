import {
  Text,
  TopView,
  Header,
  ScrollView,
  CellGroup,
  Cell,
  type RequestHooks,
  route
} from '@/duxui';
import { useRequest } from '../request';
import Loading from '../components/Loading';

export interface Datum {
  /**
   * 详情链接（哔哩哔哩搜索）
   */
  link: string;
  /**
   * 标题
   */
  title: string;
  [property: string]: any;
}

export default function Bilibili() {
  const [data, action]: [Datum[], RequestHooks.RequestResult] = useRequest({
    url: 'bili'
  });
  console.log('🌍 ~ Bilibili ~ data:', data);

  return (
    <TopView>
      <Header title='哔哩哔哩热搜榜' titleCenter />
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
