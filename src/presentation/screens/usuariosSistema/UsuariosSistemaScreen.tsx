import { MainLayoutAdmin } from '../../layouts/MainLayoutAdmin';
import { Input, Layout, List, Spinner, Text } from '@ui-kitten/components';
import { useAuthStore } from '../../store/auth/useAuthStore';
import { FullScreenLoader } from '../../components/ui/FullScreenLoader';
import { Alert, StyleSheet } from 'react-native';
import { useUsuariosSistema } from '../../hooks/useUsuariosSistema';
import { CustomKittenIcon } from '../../components/ui/CustomKittenIcon';
import { useEffect, useState } from 'react';
import { useDebouncedValue } from '../../hooks/useDebouncedValue';
import { UsuarioSistema } from '../../../domain/entities/usuariosSistema';

export const UsuariosSistemaScreen = () => {

  const { logout } = useAuthStore();
  const [term, setTerm] = useState('');
  const {debouncedValue, loading : debouncedLoading} = useDebouncedValue(term);

  useEffect(() => {
    reloadData(debouncedValue);
  }, [debouncedValue])
  
  const { isLoading, usuariosSistema, reloadData, changeEstado } = useUsuariosSistema();

  const onConfirmChangeEstado = async (id: number) => {
    const data = await changeEstado(id);
    if (data.code === '1') {

      if (term === '') {
        reloadData('');
      }else{
        setTerm('');
      }
      
    }
    Alert.alert(data.messages);
  }

  const createAlertChangeEstado = (id: number, correo: string) => {
    Alert.alert(`Desea realizar el cambio de estado a ${correo}`, '¿Ésta seguro del cambio de estado del registro?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Cambiar', onPress: () => onConfirmChangeEstado(id), style: 'destructive' },
    ]);
  }

  const renderItemTable = ({ item }: { item: UsuarioSistema }) => {

    let iconEstado = item.activo ? 'close-circle-outline' : 'checkmark-circle-2-outline';
    let colorIcon = item.activo ? 'color-danger-600' : 'color-success-600';

    return (
      <Layout style={styles.item}>
        <Text style={[styles.itemText, { width: '50%' }]}>{item.correo}</Text>
        <Text style={[styles.itemText, { width: '25%', fontSize:10 }]}>{item.rol}</Text>
        <Text style={[styles.itemText, { width: '15%' }]}>{item.activo ? 'Activo' : 'Inactivo'}</Text>
        <Text style={[styles.itemText, { width: '10%' }]} onPress={() => createAlertChangeEstado(item.id, item.correo)} >
          <CustomKittenIcon name={iconEstado} color={colorIcon} />
        </Text>
      </Layout>
    )
  };

  return (
    <>
      <MainLayoutAdmin title='Listado de Usuarios con acceso al sistema' subTitle='Otorgar acceso al sistema'
        rightAction={logout} rightActionIcon='log-out' isListPage >

        {

          isLoading
            ? (<FullScreenLoader />)
            :
            (
              <>
                <Layout style={[styles.container, { marginTop: 25 }]}>

                  <Input placeholder='Busqueda por usuario/correo'
                    accessoryLeft={<CustomKittenIcon name='search-outline' />}
                    autoCapitalize='none'
                    value={term}
                    onChangeText={setTerm}
                    style={{ marginHorizontal: 15 }} />

                  <Layout style={{ height: 10 }} />

                  <Layout style={styles.header}>
                    <Text style={[styles.headerText, { width: '50%' }]}>Usuario</Text>
                    <Text style={[styles.headerText, { width: '25%' }]}>Rol</Text>
                    <Text style={[styles.headerText, { width: '15%' }]}>Estado</Text>
                    <Text style={[styles.headerText, { width: '10%' }]}>Acción</Text>
                  </Layout>

                  {
                    (debouncedLoading) 
                      ? (
                        <Layout style={{justifyContent: 'center', alignItems: 'center'}}>
                          <Spinner  size="giant"  />
                        </Layout>
                      )
                      : null
                  }

                  <List data={usuariosSistema} renderItem={renderItemTable}
                        keyExtractor={(item, index) => `${item.id}-${index}`} />

                </Layout>

              </>
            )
        }
      </MainLayoutAdmin>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
    paddingBottom: 50
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderRadius: 5,
    paddingHorizontal: 5
  },
  headerText: {
    fontFamily: 'Poppins SemiBold',
    fontSize: 12,
  },
  item: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#A7E8DF',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemText: {
    fontSize: 12,
    fontFamily: 'Poppins Regular',
    marginBottom: 5,
    paddingRight: 10,
  }
});