import { createDrawerNavigator } from '@react-navigation/drawer';
import { ConsultoriosScreen } from '../screens/consultorios/ConsultoriosScreen';
import { EspecialidadesScreen } from '../screens/especialidades/EspecialidadesScreen';
import { EstadosCitasScreen } from '../screens/estados_citas/EstadosCitasScreen';
import { StackNavigation } from './StackNavigation';

import { Avatar, Drawer, DrawerItem, IndexPath, Layout, StyleService, Text, useStyleSheet } from '@ui-kitten/components';
import { CustomKittenIcon } from '../components/ui/CustomKittenIcon';

export type RootDrawerParams = {
    StackNavigation: undefined;
    ConsultoriosScreen: undefined;
    EstadosCitasScreen: undefined;
    EspecialidadesScreen: undefined;
}

const { Navigator, Screen } = createDrawerNavigator<RootDrawerParams>();

const themedStyles = StyleService.create({
    header: {
        height: 128,
        paddingHorizontal: 16,
        justifyContent: "center",
    },
    profileContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    profileName: {
        marginHorizontal: 16,
    },

    icon: {
        width: 22,
        height: 22,
        marginRight: 8,
    },
});

const styles = useStyleSheet(themedStyles);

const Header = () => (   
    
    <Layout style={styles.header}>
        <Layout style={styles.profileContainer}>
          <Avatar size="giant" source={require("../../assets/logo.png")} />
          <Text style={styles.profileName} category="h6">Acilo Esperanza</Text>
        </Layout>
      </Layout>
  );

const DrawerContent = ({ navigation, state }) => (

    <Drawer header={Header}
        selectedIndex={new IndexPath(state.index)} onSelect={index => navigation.navigate(state.routeNames[index.row])}>
        <DrawerItem disabled />
        <DrawerItem title='Consultorios' accessoryLeft={<CustomKittenIcon name='layout' />} accessoryRight={<CustomKittenIcon name='arrow-ios-forward' />} />
        <DrawerItem title='Especialidades' accessoryLeft={<CustomKittenIcon name='list' />} accessoryRight={<CustomKittenIcon name='arrow-ios-forward' />} />
        <DrawerItem title='Estados Citas' accessoryLeft={<CustomKittenIcon name='clipboard' />} accessoryRight={<CustomKittenIcon name='arrow-ios-forward' />} />
    </Drawer>
);

export const DrawerNavigation = () => {
    return (
        <Navigator drawerContent={props => <DrawerContent {...props} />}>
            <Screen name="StackNavigation" component={StackNavigation} />
            <Screen name="ConsultoriosScreen" component={ConsultoriosScreen} />
            <Screen name="EspecialidadesScreen" component={EspecialidadesScreen} />
            <Screen name="EstadosCitasScreen" component={EstadosCitasScreen} />
        </Navigator>
    );
}