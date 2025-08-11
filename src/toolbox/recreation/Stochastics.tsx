import { Card, Header, px, Tab, TabItem, TopView, Text } from '@/duxui';
import Hitokoto from './components/Hitokoto';
import Luck from './components/Luck';
import Duanzi from './components/Duanzi';
import Answer from './components/Answer';
import Fabing from './components/Fabing';

function Stochastic() {
  return (
    <TopView>
      <Header title='消遣娱乐' titleCenter />
      <Tab scroll lazyload>
        <TabItem title='随机一言' paneKey={1}>
          <Hitokoto />
        </TabItem>
        <TabItem title='随机运势' paneKey={2}>
          <Luck />
        </TabItem>
        <TabItem title='随机搞笑段子' paneKey={3}>
          <Duanzi />
        </TabItem>
        <TabItem title='随机发病文学' paneKey={4}>
          <Fabing />
        </TabItem>
        <TabItem title='随机答案之书' paneKey={5}>
          <Answer />
        </TabItem>
      </Tab>
    </TopView>
  );
}

export default Stochastic;
