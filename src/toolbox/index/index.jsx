import { TopView, ToolBoxIcon } from '@/duxui';
import { TabBar } from '@/toolbox';

import {
  DailyNews,
  PopularRankings,
  PracticalFunctions,
  Recreation
} from './pages';

const pages = [
  {
    comp: DailyNews,
    type: 'DailyNews',
    icon: 'wenjian',
    name: '日更资讯'
  },
  {
    comp: PopularRankings,
    type: 'PopularRankings',
    icon: 'zhexiantu',
    name: '热门榜单'
  },
  {
    comp: PracticalFunctions,
    type: 'PracticalFunctions',
    icon: 'yingyong',
    name: '实用功能'
  },
  {
    comp: Recreation,
    type: 'Recreation',
    icon: 'wangyou',
    name: '消遣娱乐'
  }
];

const TabBarIcon = ({ hover, index }) => {
  const item = pages[index];
  return (
    <TabBar.ItemIcon
      hover={hover}
      name={item.name}
      // 在创建项目后建议替换成图标组件，这样可以适应主题变化
      icon={
        <ToolBoxIcon
          name={item.icon}
          size={52}
          className={hover ? 'text-primary' : 'text-c1'}
        />
      }
    />
  );
};

export default TopView.page(
  function Index() {
    return (
      <TabBar>
        {pages.map((item) => (
          <TabBar.Item
            key={item.type}
            itemKey={item.type}
            component={item.comp}
            icon={TabBarIcon}
          />
        ))}
      </TabBar>
    );
  },
  { isSafe: true }
);
