import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './Home';
import AddTask from './Addtask';
import EditTask from "./Edit"
import LogOut from './LogOut';
import FilterScreen from './FilterScreen';

const DNavigation = () => {
  const Drawer = createDrawerNavigator();
  const Stack = createStackNavigator();
  const HomeStack = () => {
    return (
      <Stack.Navigator options={{headerShown: false}}>
        <Stack.Screen
          options={{headerShown: false}}
          name="Home"
          component={Home}
        />
        {/* <Stack.Screen name="AddTask" options={{headerShown:false}} component={AddTask} /> */}
        <Stack.Screen name="FilterScreen" options={{headerShown:false}} component={FilterScreen} />
      </Stack.Navigator>
    );
  };
  return (
    <Drawer.Navigator
     drawerContent={props => <LogOut {...props} />}
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        drawerPosition: 'right',
      }}>
      <Drawer.Screen
        name="List"
        options={{headerShown: false}}
        component={HomeStack}
      />
      <Drawer.Screen name="AddTask" component={AddTask} />
      <Stack.Screen name="EditTask" options={{headerShown:false}} component={EditTask} />
      {/* <Drawer.Screen name="EditTask" component={EditTask} /> */}
      {/* <Drawer.Screen drawerContent={props => <LogOut {...props} name="LogOut" component={LogOut} /> */}
    </Drawer.Navigator>
  );
};
export default DNavigation;
// drawerContent={props => <LogOut {...props} />}
