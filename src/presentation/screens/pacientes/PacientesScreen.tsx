import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Button,  Card,  Input, Layout, List, Spinner, Text } from '@ui-kitten/components';
import { useAuthStore } from '../../store/auth/useAuthStore';
import { FullScreenLoader } from '../../components/ui/FullScreenLoader';
import { FAB } from '../../components/ui/FAB';
import type { RootStackParams } from '../../navigation/StackNavigation';
import { MainLayoutDoctor } from '../../layouts/MainLayoutDoctor';
import { usePacientes } from '../../hooks/usePacientes';
import type { Paciente } from '../../../domain/entities/Paciente';
import { CustomKittenIcon } from '../../components/ui/CustomKittenIcon';
import { useDebouncedValue } from '../../hooks/useDebouncedValue';
import { DateUtils } from '../../../config/helpers/DateHelpers';

export const PacientesScreen = () => {

    const navigation = useNavigation<NavigationProp<RootStackParams>>();
    const { logout } = useAuthStore();

    const { isLoading, pacientes, pacientesNextPage, searchByDui } = usePacientes();
    const [term, setTerm] = useState('');
    const {debouncedValue, loading : debouncedLoading} = useDebouncedValue(term);


    useEffect(() => {
        searchByDui(debouncedValue);
    }, [debouncedValue])

    const renderItem = ({ item, index }: { item: Paciente; index: number }): React.ReactElement => (

        <Card style={styles.item} status='basic' 
            header={ ( <Text category='h6' status='warning'> {item.dui} </Text> )}
            footer={( 
               <Button size='tiny' appearance='ghost'
                    accessoryLeft={<CustomKittenIcon name='edit' color='color-success-500' />}
                onPress={() => {navigation.navigate('PacienteScreen', {id: item.pacienteId.toString()})}}  />
            )}
            >
            <Text>
                Nombre: {item.nombres} {item.apellidos} 
            </Text>
            <Text>
                Fecha de Nacimiento: {DateUtils.formatDate(item.fechaNacimiento)}
            </Text>

        </Card>

    );



    return (
        <>
            <MainLayoutDoctor title='Listado de Pacientes del Acilo' isListPage
                subTitle='Mantenimiento de las Pacientes que pueden ser atendidos'
                rightAction={logout}
                rightActionIcon='log-out'
            >

                {

                    isLoading
                        ? (<FullScreenLoader />)
                        :
                        (
                            <>
                                <Layout style={[styles.container, { marginTop: 25 }]}>

                                    <Input placeholder='Busqueda por Dui'
                                        accessoryLeft={<CustomKittenIcon name='search-outline' />}
                                        autoCapitalize='none'
                                        value={term}
                                        onChangeText={setTerm}
                                        style={{ marginHorizontal: 15 }} />

                                    <Layout style={{ height: 10 }} />

                                    
                                    {
                                        (debouncedLoading)
                                            ? (
                                                <Layout style={{ justifyContent: 'center', alignItems: 'center' }}>
                                                    <Spinner size="giant" />
                                                </Layout>
                                            )
                                            : null
                                    }

                                <List style={{ maxHeight: '72%' }}
                                    data={pacientes}
                                    contentContainerStyle={styles.contentContainer}
                                    keyExtractor={(item, index) => `${item.pacienteId}-${index}`}
                                    renderItem={renderItem}
                                    onEndReachedThreshold={0.7}
                                    onEndReached={pacientesNextPage}
                                />

                                </Layout>


                            </>

                        )

                }

            </MainLayoutDoctor>

            <FAB status='info' iconName="plus-outline"
                onPress={() => navigation.navigate('PacienteScreen', { id: 'create' })}
                style={{
                    position: 'absolute',
                    bottom: 30,
                    right: 20,
                }}
            />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 5,
      paddingBottom: 50
    },
    contentContainer: {
        paddingHorizontal: 8,
        paddingVertical: 4,
      },
      item: {
        marginVertical: 4,
      },
  });