import { Header } from '@/duxui';
import { Menus, type MenuItem } from '@/toolbox/components/Memus';
import { useState } from 'react';

export const PopularRankings = () => {
  const [menus, setMenus] = useState<MenuItem[]>([
    {
      name: '哔哩哔哩热搜榜',
      url: 'Bilibili'
    },
    {
      name: '猫眼票房排行榜',
      url: 'Cateye'
    },
    {
      name: '微博热搜榜',
      url: 'Weibo'
    },

    {
      name: '知乎热门话题',
      url: 'Zhihu'
    },
    {
      name: '抖音热搜榜',
      url: 'Tiktok'
    },
    {
      name: '头条热搜榜',
      url: 'Headlines'
    }
  ]);

  return (
    <>
      <Header title='热门榜单' titleCenter />
      <Menus menus={menus} />
    </>
  );
};
