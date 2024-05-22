import { MainLayoutAdmin } from '../../layouts/MainLayoutAdmin';
import { List, ListItem } from '@ui-kitten/components';
import { useAuthStore } from '../../store/auth/useAuthStore';
import { useEspecialidades } from '../../hooks/useEspecialidades';
import { FullScreenLoader } from '../../components/ui/FullScreenLoader';
import { FAB } from '../../components/ui/FAB';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import type { RootStackParams } from '../../navigation/StackNavigation';
import type { Especialidad } from '../../../domain/entities/especialidad';
import { ButtonsActionsList } from '../../components/ui/ButtonsActionList';
import { Alert } from 'react-native';

export const EspecialidadesScreen = () => {

  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const { logout } = useAuthStore();

  const { isLoading, especialidades,deleteOne, reloadData } = useEspecialidades();
  
  const onConfirmDelete = async (id: number) => {
    const data = await deleteOne(id);
    if (data.code === '1'){
        reloadData();
    }
    Alert.alert(data.messages);
  }

  const createAlertConfirmDelete = (id : number, codigo : string) => {
    Alert.alert(`Eliminar Especialidad con código ${codigo}`, '¿Ésta seguro de eliminar el registro?', [
      { text: 'Cancelar',style: 'cancel'},
      {text: 'Eliminar', onPress:  () => onConfirmDelete(id) ,  style:'destructive'},
    ]);
  }

  const renderItem = ({ item, index }: { item: Especialidad; index: number }): React.ReactElement => (
    <ListItem
      title={`${item.descripcion} `}
      description={`${item.codigo} `}
      accessoryRight= {<ButtonsActionsList onPressEdit={() => { navigation.navigate('EspecialidadScreen', {id: item.id.toString()}) }} 
            onPressDelete={ () => {createAlertConfirmDelete(item.id, item.codigo) } } /> }
    />
  );

  return (
    <>
      <MainLayoutAdmin title='Listado de Especialidades' subTitle='Mantenimiento'
        rightAction={logout} isListPage
        rightActionIcon='log-out'
      >

        {

          isLoading
            ? (<FullScreenLoader />)
            :

            (
              <List style={{maxHeight: '78%'}}
                data={especialidades}
                keyExtractor={(item, index) => `${item.id}-${index}`}
                renderItem={renderItem}
              />

            )

        }

      </MainLayoutAdmin>

      <FAB status='info' iconName="plus-outline" style={{ position: 'absolute',bottom: 30,right: 20,}}
        onPress={() => navigation.navigate('EspecialidadScreen', {id: 'create'})} />

    </>
  )
}