import { Header } from '@/duxui';
import { Menus, type MenuItem } from '@/toolbox/components/Memus';
import { useState } from 'react';

export const PracticalFunctions = () => {
  const [menus, setMenus] = useState<MenuItem[]>([
    {
      name: 'Epic Games 免费游戏',
      url: 'EpicGamesFreeGame',
      icon: 'epicgames'
    },
    {
      name: '百度百科词条',
      url: 'BaiduBaikeEntry',
      icon: 'baidubaike'
    },
    {
      name: '在线翻译',
      url: 'OnlineTranslation',
      icon: 'fanyi'
    },
    {
      name: '公网 IP 地址',
      url: 'PublicIPAddress',
      icon: 'ip'
    },
    {
      name: '链接 OG 信息',
      url: 'LinkOGInformation',
      icon: 'lianjie'
    },
    {
      name: '哈希/解压/压缩',
      url: 'HashUnzipZip',
      icon: 'jiema'
    }
  ]);

  return (
    <>
      <Header title='实用功能' titleCenter />
      <Menus menus={menus} />
    </>
  );
};
