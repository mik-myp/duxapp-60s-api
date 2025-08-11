import {
  Text,
  TopView,
  Header,
  RequestHooks,
  ScrollView,
  Card,
  Space,
  CardTitle,
  Column,
  px,
  Image,
  Divider,
  route
} from '@/duxui';
import { useRequest } from '../request';
import Loading from '../components/Loading';

export interface Datum {
  /**
   * 回答数
   */
  answer_cnt: number;
  /**
   * 评论数
   */
  comment_cnt: number;
  /**
   * 封面图 URL
   */
  cover: string;
  /**
   * 创建时间字符串
   */
  created: string;
  /**
   * 创建时间戳（13 位）
   */
  created_at: number;
  /**
   * 话题详情
   */
  detail: string;
  /**
   * 关注数
   */
  follower_cnt: number;
  /**
   * 热度描述
   */
  hot_value_desc: string;
  /**
   * 原文链接
   */
  link: string;
  /**
   * 话题标题
   */
  title: string;
  [property: string]: any;
}

export default function Zhihu() {
  const [data, action]: [Datum[], RequestHooks.RequestResult] = useRequest({
    url: 'zhihu'
  });

  return (
    <TopView>
      <Header title='知乎热门话题' titleCenter />{' '}
      <ScrollView onRefresh={action.reload}>
        {action.loading ? (
          <Loading />
        ) : (
          <>
            {Array.isArray(data) &&
              data?.map((item, index) => {
                return (
                  <Card
                    className='m-2'
                    key={item.link}
                    onClick={() => {
                      const link = item.link.replace(
                        'api.zhihu.com/questions',
                        'www.zhihu.com/question'
                      );
                      route.nav(link);
                    }}
                  >
                    <Space>
                      <Space row>
                        <Column grow className='gap-2'>
                          <Text bold numberOfLines={2}>
                            {item.title}
                          </Text>
                          <Text size={1} color={2} numberOfLines={3}>
                            {item.detail}
                          </Text>
                        </Column>
                        {item.cover && (
                          <Image
                            style={{ width: px(200) }}
                            square
                            radiusType='round-min'
                            src={item.cover}
                          />
                        )}
                      </Space>
                    </Space>
                    <Divider type='dashed' />
                    <Space
                      row
                      justify='start'
                      style={{
                        marginTop: px(16)
                      }}
                    >
                      <Text size={1} color={2}>
                        {item.hot_value_desc}
                      </Text>
                    </Space>
                  </Card>
                );
              })}
          </>
        )}
      </ScrollView>
    </TopView>
  );
}
