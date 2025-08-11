import React, { useState } from 'react';
import { useRequest } from '../../request';
import {
  Card,
  Input,
  InputSearch,
  px,
  ScrollView,
  Text,
  FormItem,
  DividerGroup
} from '@/duxui';
import { View } from '@tarojs/components';
import Loading from '../../components/Loading';

export default function Fabing() {
  const [name, setName] = useState('主人');

  const [data, action] = useRequest({ url: 'fabing', data: { name } });

  return (
    <View style={{ height: px(1000) }}>
      <ScrollView onRefresh={action.reload}>
        <Card margin verticalPadding={false} className='flex-grow'>
          <DividerGroup>
            <FormItem label='人名' desc='内容替换的人名，不填默认为“主人”'>
              <InputSearch
                placeholder='请输入'
                grow
                value={name}
                onChange={setName}
              />
            </FormItem>
            <View>
              {action.loading ? (
                <Loading />
              ) : (
                <Text className='text-s5 text-c1 mv-3'>{data.saying}</Text>
              )}
            </View>
          </DividerGroup>
        </Card>
      </ScrollView>
    </View>
  );
}
