import { View } from '@tarojs/components';
import { Loading as DuxLoading } from '@/duxapp';

export default function Loading() {
  return (
    <View
      className='items-center justify-center'
      style={{ height: '100%' }}
    >
      <DuxLoading />
    </View>
  );
}
