import {
  Text,
  TopView,
  Header,
  ScrollView,
  CellGroup,
  Cell,
  RollingView,
  px,
  Column,
  RequestHooks
} from '@/duxui';
import { useRequest } from '../request';
import Loading from '../components/Loading';
import { View } from '@tarojs/components';

export interface Data {
  list: List[];
  tip: string;
  update_time: string;
  update_time_at: number;
  [property: string]: any;
}

export interface List {
  box_office: number;
  box_office_desc: string;
  maoyan_id: number;
  movie_name: string;
  rank: number;
  release_year: string;
  [property: string]: any;
}

export default function Cateye() {
  const [data, action]: [Data, RequestHooks.RequestResult] = useRequest({
    url: 'maoyan'
  });

  return (
    <TopView>
      <Header title='猫眼票房排行榜' titleCenter />

      <ScrollView className='m-2' onRefresh={action.reload}>
        {action.loading ? (
          <Loading />
        ) : (
          <>
            <RollingView
              className='bg-warning r-1'
              style={{ height: px(80) }}
              duration={8000}
            >
              <Column
                className='h-full ph-3'
                justify='center'
                style={{ width: px(2000) }}
              >
                <Text style={{ whiteSpace: 'nowrap' }}>{data.tip}</Text>
              </Column>
            </RollingView>
            <CellGroup>
              {data?.list?.map((item, index) => {
                return (
                  <Cell
                    title={`${index + 1}. ${item.movie_name}`}
                    // 换行
                    subTitle={`上映日期：${item.release_year}`}
                    desc={`${item.box_office_desc}`}
                    key={item.maoyan_id}
                  />
                );
              })}
            </CellGroup>
          </>
        )}
      </ScrollView>
    </TopView>
  );
}
