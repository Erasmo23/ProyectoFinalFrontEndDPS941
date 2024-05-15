import { MainLayout } from '../../layouts/MainLayout';
import { List, ListItem } from '@ui-kitten/components';
import { useAuthStore } from '../../store/auth/useAuthStore';
import { FullScreenLoader } from '../../components/ui/FullScreenLoader';
import { FAB } from '../../components/ui/FAB';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import type { RootStackParams } from '../../navigation/StackNavigation';
import { ButtonsActionsList } from '../../components/ui/ButtonsActionList';
import { useConsultorio } from '../../hooks/useConsultorios';
import type { Consultorio } from '../../../domain/entities/consultorio';
import { Alert } from 'react-native';

export const ConsultoriosScreen = () => {

  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const { logout } = useAuthStore();

  const { isLoading, consultorios, deleteOne, reloadData } = useConsultorio();

  const onConfirmDelete = async (id: number) => {
    const data = await deleteOne(id);
    if (data.code === '1'){
        reloadData();
    }
    Alert.alert(data.messages);
  }

  const createAlertConfirmDelete = (id : number, codigo : string) => {
    Alert.alert(`Eliminar Consultorio con código ${codigo}`, '¿Ésta seguro de eliminar el registro?', [
      { text: 'Cancelar',style: 'cancel'},
      {text: 'Eliminar', onPress:  () => onConfirmDelete(id) ,  style:'destructive'},
    ]);
  }

  const renderItem = ({ item, index }: { item: Consultorio; index: number }): React.ReactElement => (
    <ListItem
      title={`${item.descripcion} `}
      description={`Código: ${item.codigo} - Creado el: ${item.fechaCreacion}`}
      accessoryRight= {
        <ButtonsActionsList onPressEdit={() => { navigation.navigate('ConsultorioScreen', {id: item.id.toString()}) }} 
              onPressDelete={ () => {createAlertConfirmDelete(item.id, item.codigo) } } /> }
    />
  );

  return (
    <>
      <MainLayout title='Listado de Consultorios del Acilo' 
        subTitle='Mantenimiento de las habitacion habilitadas para consultas'
        rightAction={logout}
        rightActionIcon='log-out'
      >

        {

          isLoading
            ? (<FullScreenLoader />)
            :

            (
              <List style={{maxHeight: '78%'}}
                data={consultorios}
                keyExtractor={(item, index) => `${item.id}-${index}`}
                renderItem={renderItem}
              />

            )

        }

      </MainLayout>

      <FAB status='info' iconName="plus-outline"
        onPress={() => navigation.navigate('ConsultorioScreen',{id: 'create'})}
        style={{
          position: 'absolute',
          bottom: 30,
          right: 20,
        }}
      />
    </>
  )
}