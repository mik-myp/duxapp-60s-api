import { Header, TopView } from '@/duxui';
import { Menus, type MenuItem } from '@/toolbox/components/Memus';
import { useState } from 'react';

export const DailyNews = () => {
  const [menus, setMenus] = useState<MenuItem[]>([
    {
      name: '每天 60 秒读懂世界',
      url: 'UnderstandTheWorldIn60SecondsEveryDay',
      icon: 'miao'
    },
    {
      name: '必应每日壁纸（Bing）',
      url: 'BingDailyWallpaper',
      icon: 'biying'
    },
    {
      name: '当日货币汇率',
      url: 'CurrentCurrencyExchangeRate',
      icon: 'purse'
    },
    {
      name: '历史上的今天',
      url: 'HistoryToday',
      icon: 'lishi'
    }
  ]);

  return (
    <>
      <Header title='日更资讯' titleCenter />
      <Menus menus={menus} />
    </>
  );
};
