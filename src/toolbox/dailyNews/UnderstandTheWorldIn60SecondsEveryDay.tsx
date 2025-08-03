import { Header, TopView, Text, ScrollView } from '@/duxui';
import { useEffect, useState } from 'react';
import { request } from '../request';

interface Data {
  date?: string;
  news?: string[];
  audio?: {
    music?: string;
    news?: string;
  };
  image?: string;
  tip?: string;
  cover?: string;
  link?: string;
  created?: string;
  created_at?: number;
  updated?: string;
  updated_at?: number;
  day_of_week?: string;
  lunar_date?: string;
  api_updated?: string;
  api_updated_at?: number;
}

export default function UnderstandTheWorldIn60SecondsEveryDay() {
  const [data, setData] = useState<Data>({});

  useEffect(() => {
    request({
      url: '60s'
    }).then((data) => {
      if (data) {
        setData(data as Data);
      }
    });
  }, []);

  return (
    <TopView>
      <Header title='每天 60 秒读懂世界' titleCenter />
      <ScrollView>
        <Text>{JSON.stringify(data)}</Text>
      </ScrollView>
    </TopView>
  );
}
