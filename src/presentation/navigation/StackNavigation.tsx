import { StackCardStyleInterpolator, createStackNavigator } from '@react-navigation/stack';
import { LoadingScreen } from '../screens/loading/LoadingScreen';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { HomeScreen } from '../screens/home/HomeScreen';
import { ResetScreen } from '../screens/auth/ResetScreen';
import { ConsultoriosScreen } from '../screens/consultorios/ConsultoriosScreen';
import { EspecialidadesScreen } from '../screens/especialidades/EspecialidadesScreen';
import { EstadosCitasScreen } from '../screens/estados_citas/EstadosCitasScreen';
import { ConsultorioScreen } from '../screens/consultorios/ConsultorioScreen';
import { EspecialidadScreen } from '../screens/especialidades/EspecialidadScreen';
import { UsuariosSistemaScreen } from '../screens/usuariosSistema/UsuariosSistemaScreen';

export type RootStackParams = {
    LoadingScreen : undefined;
    LoginScreen: undefined;
    HomeScreen: undefined;
    ResetScreen : undefined;
    ConsultoriosScreen : undefined;
    ConsultorioScreen: {id: string};
    EspecialidadesScreen : undefined;
    EspecialidadScreen: {id: string};
    EstadosCitasScreen : undefined;
    UsuariosSistemaScreen : undefined;

}

const Stack = createStackNavigator<RootStackParams>();

const fadeAnimation: StackCardStyleInterpolator = ({current}) => {
  return {
    cardStyle: {
      opacity: current.progress,
    },
  };
};

export const StackNavigation = () =>  {
  return (
    <Stack.Navigator initialRouteName='LoadingScreen' screenOptions={{
        headerShown: false
    }}>
      <Stack.Screen  options={{cardStyleInterpolator: fadeAnimation}} name="LoadingScreen" component={LoadingScreen} />
      <Stack.Screen  options={{cardStyleInterpolator: fadeAnimation}}  name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen  options={{cardStyleInterpolator: fadeAnimation}} name="ResetScreen" component={ResetScreen} />

      <Stack.Screen name="ConsultoriosScreen" component={ConsultoriosScreen} />
      <Stack.Screen name="ConsultorioScreen" component={ConsultorioScreen} />
      <Stack.Screen name="EspecialidadesScreen" component={EspecialidadesScreen} />
      <Stack.Screen name="EspecialidadScreen" component={EspecialidadScreen} />
      <Stack.Screen name="EstadosCitasScreen" component={EstadosCitasScreen} />
      <Stack.Screen name="UsuariosSistemaScreen" component={UsuariosSistemaScreen} />
    </Stack.Navigator>
  );
}