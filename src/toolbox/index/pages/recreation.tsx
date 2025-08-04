import { Header } from '@/duxui';
import { Menus, type MenuItem } from '@/toolbox/components/Memus';
import { useState } from 'react';

export const Recreation = () => {
  const [menus, setMenus] = useState<MenuItem[]>([
    {
      name: '每天 60 秒读懂世界',
      url: 'UnderstandTheWorldIn60SecondsEveryDay'
    },
    {
      name: '必应每日壁纸（Bing）',
      url: 'BingDailyWallpaper'
    },
    {
      name: '当日货币汇率',
      url: 'CurrentCurrencyExchangeRate'
    },
    {
      name: '历史上的今天',
      url: 'HistoryToday'
    }
  ]);

  return (
    <>
      <Header title='消遣娱乐' titleCenter />
      <Menus menus={menus} />
    </>
  );
};
