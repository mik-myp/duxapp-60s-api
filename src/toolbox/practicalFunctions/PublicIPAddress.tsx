import {
  Header,
  TopView,
  Text,
  Image,
  px,
  type RequestHooks,
  Cell
} from '@/duxui';
import { useRequest } from '../request';
import Loading from '../components/Loading';
import { View } from '@tarojs/components';

export default function PublicIPAddress() {
  const [data, action] = useRequest({
    url: 'ip'
  });

  return (
    <TopView>
      <Header title='公共 IP 地址' titleCenter />
      <View className='m-2'>
        {action.loading ? (
          <Loading />
        ) : (
          <Cell title={`公共 IP 地址：${data.ip}`} />
        )}
      </View>
    </TopView>
  );
}
