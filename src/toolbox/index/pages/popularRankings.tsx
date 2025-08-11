import { Header } from '@/duxui';
import { Menus, type MenuItem } from '@/toolbox/components/Memus';
import { useState } from 'react';

export const PopularRankings = () => {
  const [menus, setMenus] = useState<MenuItem[]>([
    {
      name: '哔哩哔哩热搜榜',
      url: 'Bilibili',
      icon: 'bilibili'
    },
    {
      name: '猫眼票房排行榜',
      url: 'Cateye',
      icon: 'maoyan'
    },
    {
      name: '微博热搜榜',
      url: 'Weibo',
      icon: 'xinlangweibo'
    },

    {
      name: '知乎热门话题',
      url: 'Zhihu',
      icon: 'zhihu'
    },
    {
      name: '抖音热搜榜',
      url: 'Tiktok',
      icon: 'douyin'
    },
    {
      name: '头条热搜榜',
      url: 'Headlines',
      icon: 'newspaper'
    }
  ]);

  return (
    <>
      <Header title='热门榜单' titleCenter />
      <Menus menus={menus} />
    </>
  );
};
