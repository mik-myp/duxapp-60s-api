import { Header } from '@/duxui';
import { Menus, type MenuItem } from '@/toolbox/components/Memus';
import { useState } from 'react';

export const PracticalFunctions = () => {
  const [menus, setMenus] = useState<MenuItem[]>([
    {
      name: 'Epic Games 免费游戏',
      url: 'EpicGamesFreeGame'
    },
    {
      name: '百度百科词条',
      url: 'BaiduBaikeEntry'
    },
    {
      name: '在线翻译',
      url: 'OnlineTranslation'
    },
    {
      name: '公网 IP 地址',
      url: 'PublicIPAddress'
    },
    {
      name: '链接 OG 信息',
      url: 'LinkOGInformation'
    },
    {
      name: '哈希/解压/压缩',
      url: 'HashUnzipZip'
    }
  ]);

  return (
    <>
      <Header title='实用功能' titleCenter />
      <Menus menus={menus} />
    </>
  );
};
