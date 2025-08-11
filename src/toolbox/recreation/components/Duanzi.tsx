import React from 'react';
import { useRequest } from '../../request';
import { Card, Loading, px, ScrollView, Text } from '@/duxui';
import { View } from '@tarojs/components';

export default function Duanzi() {
  const [data, action] = useRequest({ url: 'duanzi' });

  return (
    <View style={{ height: px(1000) }}>
      <ScrollView onRefresh={action.reload}>
        <Card margin className='flex-grow'>
          <View>
            {action.loading ? (
              <Loading />
            ) : (
              <>
                <Text className='text-s5 text-c1'>{data.duanzi}</Text>
              </>
            )}
          </View>
        </Card>
      </ScrollView>
    </View>
  );
}
