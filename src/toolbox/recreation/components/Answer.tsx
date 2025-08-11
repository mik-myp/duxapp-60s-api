import React from 'react';
import { useRequest } from '../../request';
import { Card, Loading, px, ScrollView, Text } from '@/duxui';
import { View } from '@tarojs/components';

export default function Answer() {
  const [data, action] = useRequest({ url: 'answer' });

  return (
    <View style={{ height: px(1000) }}>
      <ScrollView onRefresh={action.reload}>
        <Card margin className='flex-grow'>
          <View>
            {action.loading ? (
              <Loading />
            ) : (
              <>
                <Text className='text-s5 text-c1'>{data.answer}</Text>
                <Text className='text-s5 text-c1'>{data.answer_en}</Text>
              </>
            )}
          </View>
        </Card>
      </ScrollView>
    </View>
  );
}
