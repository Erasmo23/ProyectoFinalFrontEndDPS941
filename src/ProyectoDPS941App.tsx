import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { StackNavigation } from './presentation/navigation/StackNavigation';

import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry, Layout, Text } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

import { useColorScheme } from 'react-native';

import SplashScreen from 'react-native-splash-screen';
import { useEffect } from 'react';
import { DrawerNavigation } from './presentation/navigation/DrawerNavigation';
import { AuthProvider } from './presentation/providers/AuthProvider';


export const ProyectoDPS941App = () => {

    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? eva.dark : eva.light;
    const backgroundColor = colorScheme === 'dark' ? theme['color-basic-800'] : theme['color-basic-100'];

    useEffect(() => {
        SplashScreen.hide();
    }, []);

    return (
        <>
            <IconRegistry icons={EvaIconsPack} />
            <ApplicationProvider {...eva} theme={theme} >
                <NavigationContainer theme={{
                    dark: colorScheme === 'dark',
                    colors: {
                        primary: theme['color-primary-500'],
                        background: backgroundColor,
                        card: theme['color-basic-100'],
                        text: theme['text-basic-color'],
                        border: theme['color-basic-800'],
                        notification: theme['color-primary-500'],
                    }
                }}>
                    <AuthProvider>
                        <StackNavigation />
                    </AuthProvider>
                    {/*<DrawerNavigation />*/}
                </NavigationContainer>
            </ApplicationProvider>
        </>
    )
}