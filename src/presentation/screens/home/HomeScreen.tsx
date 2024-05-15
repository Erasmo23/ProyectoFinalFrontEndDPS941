import { Button, Card, Layout, Text } from '@ui-kitten/components';
import { Platform, StyleSheet, View } from 'react-native';
import { CustomHeaderCard } from '../../components/ui/CustomHeaderCard';
import { useAuthStore } from '../../store/auth/useAuthStore';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CustomKittenIcon } from '../../components/ui/CustomKittenIcon';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigation/StackNavigation';

interface Props extends StackScreenProps<RootStackParams, 'HomeScreen'> { }

export const HomeScreen = ({ navigation }: Props) => {

  const { user } = useAuthStore();
  const { top } = useSafeAreaInsets();
  const { logout } = useAuthStore();

  return (
    <>

      {
        user ? (
          <>
            <Text style={{ textAlign: 'center', marginTop: top + 10 }} category='h4' status='info'>Bienvenido: {user.correo}</Text>
            <Text style={{ textAlign: 'center', marginTop: top + 10 }} category='h6' status='warning'>Rol: {user.codigoRol}</Text>
          </>
        )
          : null
      }

      <Layout style={{ marginTop: 20, flex: 3, flexDirection: 'column' }}>

        <Card status='primary' style={{ margin: 10, flex: 1 }} header={<CustomHeaderCard text='Especialidades' />}
          onPress={() => navigation.navigate('EspecialidadesScreen')} >
          <Text>Mantenimiento de Especialidades que dispone el Acilo</Text>
        </Card>

        <Card status='primary' style={{ margin: 10, flex: 1 }} header={<CustomHeaderCard text='Consultorios' />}
          onPress={() => navigation.navigate('ConsultoriosScreen')} >
          <Text>Mantenimiento de Consultorios / Habitaciones que dispone el Acilo</Text>
        </Card>

        <Card status='primary' style={{ margin: 10, flex: 1 }} header={<CustomHeaderCard text='Estados de Citas' />}
          onPress={() => navigation.navigate('EstadosCitasScreen')} >
          <Text>Mantenimiento de los estados en el cual puede estar una cita</Text>
        </Card>

        <Card status='primary' style={{ margin: 10, flex: 1 }} header={<CustomHeaderCard text='Usuarios Sistema' />}
          onPress={() => navigation.navigate('UsuariosSistemaScreen')} >
          <Text>Listado de Usuarios que pueden ingresar al sistema</Text>
        </Card>

      </Layout>

      <Layout style={{ marginTop: 1, flex: 1 }} />

      <Button accessoryLeft={<CustomKittenIcon name='log-out' white />}
        onPress={logout} status='danger' >
        Cerrar Sesión
      </Button>

    </>

  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 100
  },
  buttonFloatRigth: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: Platform.OS === 'android' ? 15 : 0
  }
});