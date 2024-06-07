import { useEffect, useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Button, ButtonGroup, Card, Datepicker, Input, Layout, List, Spinner, Text } from '@ui-kitten/components';
import { useAuthStore } from '../../store/auth/useAuthStore';
import { FullScreenLoader } from '../../components/ui/FullScreenLoader';
import { FAB } from '../../components/ui/FAB';
import type { RootStackParams } from '../../navigation/StackNavigation';
import { MainLayoutDoctor } from '../../layouts/MainLayoutDoctor';
import { CustomKittenIcon } from '../../components/ui/CustomKittenIcon';

import { useCitasPendientes } from '../../hooks/useCitasPendientes';
import { useDebouncedValueDate } from '../../hooks/useDebouncedValueDate';
import { Cita } from '../../../domain/entities/Cita';
import { cancelarCitaAction } from '../../../actions/get-citas';

export const CitasPendientesScreen = () => {

    const navigation = useNavigation<NavigationProp<RootStackParams>>();
    const { logout } = useAuthStore();

    const { isLoading, citasPendientes, doctoresNextPage, searchByFecha } = useCitasPendientes();
    const [termDate, setTermDate] = useState();
    const { debouncedValue, loading: debouncedLoading } = useDebouncedValueDate(termDate);

    const onConfirmCancelar = async (id: number) => {
        const data = await cancelarCitaAction(id);
        if (data.code === '1'){
            searchByFecha(termDate);
        }
        Alert.alert(data.messages);
    }

    const createAlertConfirmCancelar = (id : number, paciente : string, fecha: string) => {
        Alert.alert(`Cancelar cita de ${paciente} para el ${fecha}`, '¿Ésta seguro de cancelar el registro?', [
          { text: 'Cancelar Accion',style: 'cancel'},
          {text: 'Cancelar Cita', onPress:  () => onConfirmCancelar(id) ,  style:'destructive'},
        ]);
      }


    useEffect(() => {
        searchByFecha(debouncedValue);
    }, [debouncedValue])

    const renderItem = ({ item, index }: { item: Cita; index: number }): React.ReactElement => (

        <Card style={styles.item} status='basic'
            header={(<Text category='h6' status='warning'> {item.paciente} </Text>)}
            footer={(
                <Layout style={{flex: 1, justifyContent: 'center', alignItems:'center'}}>
                    <ButtonGroup appearance='ghost' size='tiny'
                        style={{
                            flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
                            width: '100%'
                        }}>
                        <Button accessoryLeft={<CustomKittenIcon name='edit' color='color-success-500' />}
                            onPress={() => { { navigation.navigate('RegistroCitaScreen', { id: item.citaId.toString() }) } }} />

                        <Button accessoryLeft={<CustomKittenIcon name='clock' color='color-danger-500' />}
                            onPress={() => { { navigation.navigate('ReprogramarCitaScreen', { id: item.citaId }) } }} />

                        <Button accessoryLeft={<CustomKittenIcon name='archive' color='color-danger-500' />}
                            onPress={() => { createAlertConfirmCancelar(item.citaId, item.paciente, item.fechacita) } } />

                        <Button accessoryLeft={<CustomKittenIcon name='checkmark-square' color='color-success-500' />}
                            onPress={() => { { navigation.navigate('FinalizarCitaScreen', { id: item.citaId }) } }} />
                    </ButtonGroup>
                </Layout>


            )}
        >
            <Text status='warning' >Fecha: {item.fechacita}</Text>
            <Text>Paciente : {item.paciente} </Text>
            <Text>Doctor: {item.doctor}</Text>
            <Text>Consultorio: {item.consultorio}</Text>
            <Text status='danger'>{item.fechaReprogramada ? "Fecha Anterior: " + item.fechaReprogramada : ''}</Text>

        </Card>

    );

    return (
        <>
            <MainLayoutDoctor title='Listado de Citas pendientes' isListPage
                subTitle='Citas en estado Programadas o Reprogramadas'
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

                                    <Datepicker placeholder='Busqueda por fecha'
                                        accessoryRight={<CustomKittenIcon name='calendar' />}
                                        //max={new Date()}
                                        //min={new Date(1920, 0, 1)}
                                        //date={values.fechaNacimiento}
                                        date={termDate}
                                        onSelect={setTermDate}
                                    />

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
                                        data={citasPendientes}
                                        contentContainerStyle={styles.contentContainer}
                                        keyExtractor={(item, index) => `${item.citaId}-${index}`}
                                        renderItem={renderItem}
                                        onEndReachedThreshold={0.7}
                                        onEndReached={doctoresNextPage}
                                    />

                                </Layout>


                            </>

                        )

                }

            </MainLayoutDoctor>

            <FAB status='info' iconName="plus-outline"
                onPress={() => navigation.navigate('RegistroCitaScreen', { id: 'create' })}
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