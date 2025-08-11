import React from 'react';
import { useRequest } from '../../request';
import { Card, Loading, px, ScrollView, Text, TopView } from '@/duxui';
import { View } from '@tarojs/components';

export default function Hitokoto() {
  const [data, action] = useRequest({ url: 'hitokoto' });

  return (
    <View style={{ height: px(1000) }}>
      <ScrollView onRefresh={action.reload}>
        <Card margin className='flex-grow'>
          <View>
            {action.loading ? (
              <Loading />
            ) : (
              <>
                <Text className='text-s5 text-c1'>{data.hitokoto}</Text>
              </>
            )}
          </View>
        </Card>
      </ScrollView>
    </View>
  );
}
