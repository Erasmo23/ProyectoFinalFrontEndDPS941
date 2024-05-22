import { Button, Card, Layout, Text } from '@ui-kitten/components';
import { Platform, StyleSheet, View } from 'react-native';
import { CustomHeaderCard } from '../../components/ui/CustomHeaderCard';
import { useAuthStore } from '../../store/auth/useAuthStore';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CustomKittenIcon } from '../../components/ui/CustomKittenIcon';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigation/StackNavigation';

interface Props extends StackScreenProps<RootStackParams, 'HomePacienteScreen'> { }

export const HomePacienteScreen = ({ navigation }: Props) => {

  const { user } = useAuthStore();
  const { top } = useSafeAreaInsets();
  const { logout } = useAuthStore();

  return (
    <>

      {
        user ? (
          <>
            <Text style={{ textAlign: 'center', marginTop: top + 10 }} category='h4' status='info'>Bienvenido: {user.correo}</Text>
          </>
        )
          : null
      }

      <Layout style={{ marginTop: 20, flex: 3, flexDirection: 'column' }}>

        <Card status='primary' style={{ margin: 10, flex: 1 }} header={<CustomHeaderCard text='Especialidades' />}
          onPress={() => navigation.navigate('EspecialidadesScreen')} >
          <Text>Mantenimiento de Especialidades que dispone el Acilo</Text>
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