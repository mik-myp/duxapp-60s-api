import { Header } from '@/duxui';
import { Menus, type MenuItem } from '@/toolbox/components/Memus';
import { useState } from 'react';

export const Recreation = () => {
  const [menus, setMenus] = useState<MenuItem[]>([
    {
      name: '随机唱歌音频',
      url: 'StochasticMusic',
      icon: 'yinpin'
    },
    {
      name: '其他随机',
      url: 'Stochastics',
      icon: 'suiji'
    }
  ]);

  return (
    <>
      <Header title='消遣娱乐' titleCenter />
      <Menus menus={menus} />
    </>
  );
};
