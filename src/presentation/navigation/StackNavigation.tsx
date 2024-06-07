import { StackCardStyleInterpolator, createStackNavigator } from '@react-navigation/stack';
import { LoadingScreen } from '../screens/loading/LoadingScreen';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { HomeScreen } from '../screens/home/HomeScreen';
import { HomeDoctorScreen } from '../screens/home/HomeDoctorScreen';
import { HomePacienteScreen } from '../screens/home/HomePacienteScreen';
import { ResetScreen } from '../screens/auth/ResetScreen';
import { ConsultoriosScreen } from '../screens/consultorios/ConsultoriosScreen';
import { EspecialidadesScreen } from '../screens/especialidades/EspecialidadesScreen';
import { EstadosCitasScreen } from '../screens/estados_citas/EstadosCitasScreen';
import { ConsultorioScreen } from '../screens/consultorios/ConsultorioScreen';
import { EspecialidadScreen } from '../screens/especialidades/EspecialidadScreen';
import { UsuariosSistemaScreen } from '../screens/usuariosSistema/UsuariosSistemaScreen';
import { ChangePassword2Screen } from '../screens/auth/ChangePassword2Screen';
import { PacientesScreen } from '../screens/pacientes/PacientesScreen';
import { PacienteScreen } from '../screens/pacientes/PacienteScreen';
import { DoctoresScreen } from '../screens/doctores/DoctoresScreen';
import { DoctorScreen } from '../screens/doctores/DoctorScreen';
import { CitasPendientesScreen } from '../screens/citas/CitasPendientesScreen';
import { RegistroCitaScreen } from '../screens/citas/RegistroCitaScreen';
import { ReprogramarCitaScreen } from '../screens/citas/ReProgramarCitaScreen';
import { HistorialCitasScreen } from '../screens/citas/HistorialCitasScreen';
import { FinalizarCitaScreen } from '../screens/citas/FinalizarCitaScreen';
import { VerCitaScreen } from '../screens/citas/VerCitaScreen';


export type RootStackParams = {
    LoadingScreen : undefined;
    LoginScreen: undefined;
    HomeScreen: undefined;
    HomeDoctorScreen: undefined;
    HomePacienteScreen : undefined;
    ResetScreen : undefined;
    ConsultoriosScreen : undefined;
    ConsultorioScreen: {id: string};
    EspecialidadesScreen : undefined;
    EspecialidadScreen: {id: string};
    EstadosCitasScreen : undefined;
    UsuariosSistemaScreen : undefined;
    ChangePasswordScreen: {correo: string};
    PacientesScreen: undefined;
    PacienteScreen: {id: string};
    DoctoresScreen: undefined;
    DoctorScreen: {id: string};
    CitasPendientesScreen : undefined;
    RegistroCitaScreen : {id: string};
    ReprogramarCitaScreen : {id: number};
    HistorialCitasScreen : undefined;
    FinalizarCitaScreen : {id: number};
    VerCitaScreen : {id: number};
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
      <Stack.Screen name="HomeDoctorScreen" component={HomeDoctorScreen} />
      <Stack.Screen name="HomePacienteScreen" component={HomePacienteScreen} />
      <Stack.Screen  options={{cardStyleInterpolator: fadeAnimation}} name="ResetScreen" component={ResetScreen} />

      <Stack.Screen name="ConsultoriosScreen" component={ConsultoriosScreen} />
      <Stack.Screen name="ConsultorioScreen" component={ConsultorioScreen} />
      <Stack.Screen name="EspecialidadesScreen" component={EspecialidadesScreen} />
      <Stack.Screen name="EspecialidadScreen" component={EspecialidadScreen} />
      <Stack.Screen name="EstadosCitasScreen" component={EstadosCitasScreen} />
      <Stack.Screen name="UsuariosSistemaScreen" component={UsuariosSistemaScreen} />
      <Stack.Screen name="ChangePasswordScreen" component={ChangePassword2Screen} />
      <Stack.Screen name='PacientesScreen' component={ PacientesScreen } />
      <Stack.Screen name='PacienteScreen' component={PacienteScreen} />

      <Stack.Screen name='DoctoresScreen' component={ DoctoresScreen } />
      <Stack.Screen name='DoctorScreen' component={DoctorScreen} />

      <Stack.Screen name='CitasPendientesScreen' component={CitasPendientesScreen} />
      <Stack.Screen name='RegistroCitaScreen' component={RegistroCitaScreen} />
      <Stack.Screen name='ReprogramarCitaScreen' component={ReprogramarCitaScreen} />
      <Stack.Screen name='HistorialCitasScreen' component={HistorialCitasScreen} />

      <Stack.Screen name='FinalizarCitaScreen' component={FinalizarCitaScreen} />
      <Stack.Screen name='VerCitaScreen' component={VerCitaScreen} />

    </Stack.Navigator>
  );
}