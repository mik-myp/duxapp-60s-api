import React from 'react';
import { useRequest } from '../../request';
import { Card, Cell, Loading, px, ScrollView, Text } from '@/duxui';
import { View } from '@tarojs/components';

export default function Luck() {
  const [data, action] = useRequest({ url: 'luck' });

  return (
    <View style={{ height: px(1000) }}>
      <ScrollView onRefresh={action.reload}>
        <Card margin className='flex-grow'>
          <View>
            {action.loading ? (
              <Loading />
            ) : (
              <>
                <Text size={4} color={1}>
                  {data.luck_tip}
                </Text>
                <Text size={2} color={2}>
                  {data.luck_desc}
                </Text>
              </>
            )}
          </View>
        </Card>
      </ScrollView>
    </View>
  );
}
