import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Button, Card, Datepicker, Layout, List, Spinner, Text } from '@ui-kitten/components';
import { useAuthStore } from '../../store/auth/useAuthStore';
import { FullScreenLoader } from '../../components/ui/FullScreenLoader';
import type { RootStackParams } from '../../navigation/StackNavigation';
import { MainLayoutDoctor } from '../../layouts/MainLayoutDoctor';
import { CustomKittenIcon } from '../../components/ui/CustomKittenIcon';
import { useDebouncedValueDate } from '../../hooks/useDebouncedValueDate';
import type { Cita } from '../../../domain/entities/Cita';
import { useHistorialCitas } from '../../hooks/useHistorialCitas';

export const HistorialCitasScreen = () => {

    const navigation = useNavigation<NavigationProp<RootStackParams>>();
    const { logout } = useAuthStore();

    const { isLoading, citasPendientes, citasNextPage, searchByFecha } = useHistorialCitas();
    const [termDate, setTermDate] = useState();
    const { debouncedValue, loading: debouncedLoading } = useDebouncedValueDate(termDate);


    useEffect(() => {
        searchByFecha(debouncedValue);
    }, [debouncedValue])

    const renderItem = ({ item, index }: { item: Cita; index: number }): React.ReactElement => (

        <Card style={styles.item} status='basic'
            header={(<Text category='h6' status='warning'> {item.paciente} </Text>)}
            footer={(
                <Button size='tiny' appearance='ghost'
                    accessoryLeft={<CustomKittenIcon name='eye-outline' color='color-primary-500' />}
                onPress={() => {navigation.navigate('VerCitaScreen', {id: item.citaId})}}  />
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
            <MainLayoutDoctor title='Historial de Citas' isListPage
                subTitle='Citas en estado Finalizadas o Canceladas'
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
                                        onEndReached={citasNextPage}
                                    />

                                </Layout>


                            </>

                        )

                }

            </MainLayoutDoctor>
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