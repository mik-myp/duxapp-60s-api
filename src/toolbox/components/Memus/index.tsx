import { ToolBoxIcon, Grid, Column, ScrollView, Text, route } from '@/duxui';
import { View } from '@tarojs/components';
import './index.scss';
import type { names } from '@/duxui/components/ToolBoxIcon';

export type MenuItem = {
  name: string;
  url: string;
  icon?: keyof names;
};

interface MenusProps {
  menus: MenuItem[];
}

export const Menus = (props: MenusProps) => {
  const { menus } = props;
  return (
    <ScrollView className='scroll-view'>
      <Grid column={2} gap={16} className='m-2'>
        {menus.map((item) => {
          return (
            <Column
              key={item.url}
              className='bg-white items-center justify-center menuItem'
              onClick={() => {
                route.nav(item.url);
              }}
            >
              <View className='menuItem__icon items-center justify-center'>
                {item.icon && <ToolBoxIcon name={item.icon} />}
              </View>
              <Text>{item.name}</Text>
            </Column>
          );
        })}
      </Grid>
    </ScrollView>
  );
};

export default Menus;
