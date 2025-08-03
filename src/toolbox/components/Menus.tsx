import { Grid, Column, ScrollView, Text, route } from '@/duxui';

export type MenuItem = {
  name: string;
  url: string;
};

interface MenusProps {
  menus: MenuItem[];
}

export const Menus = (props: MenusProps) => {
  const { menus } = props;
  return (
    <ScrollView className='m-2'>
      <Grid square column={3} gap={20}>
        {menus.map((item) => {
          return (
            <Column
              key={item.url}
              className='bg-primary flex items-center justify-center'
              onClick={() => {
                route.nav(item.url);
              }}
            >
              <Text>{item.name}</Text>
            </Column>
          );
        })}
      </Grid>
    </ScrollView>
  );
};
