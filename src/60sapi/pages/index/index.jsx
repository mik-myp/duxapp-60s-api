import { View, Text } from '@tarojs/components';
import { Header, ScrollView, TopView } from '@/duxapp';
import { Button } from '@/duxui';
import Taro from '@tarojs/taro';

export default TopView.page(function Index() {
  return (
    <>
      <Header title='60sapi' titleCenter />
      <ScrollView>
        <View className='gap-3 p-3'>
          <Text className='text-c1 text-s7 bold'>欢迎使用duxapp</Text>
          <Text className='text-c1 text-s3'>
            新创建的模块默认依赖于duxapp模块
          </Text>
          <Text className='text-c1 text-s3'>
            如果需要依赖于其他的模块请在app.json中修改依赖项, 并且使用 yarn
            duxapp app add 添加该依赖
          </Text>
        </View>
      </ScrollView>{' '}
      <Button
        size='s'
        onClick={() => {
          Taro.showToast({
            title: '购买成功'
          });
        }}
      >
        立即购买
      </Button>
      <Button size='l' plain>
        立即购买
      </Button>
    </>
  );
});
