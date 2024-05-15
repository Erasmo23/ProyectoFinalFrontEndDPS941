import { NavigationProp, useNavigation } from "@react-navigation/native";
import type { RootStackParams } from "../../navigation/StackNavigation";
import { useAuthStore } from "../../store/auth/useAuthStore";
import { useEstadoCitas } from "../../hooks/useEstadoCitas";
import { List, ListItem } from "@ui-kitten/components";
import { EstadoCitasResponse } from "../../../infrastructure/interfaces/catalogos.responses";
import { MainLayout } from "../../layouts/MainLayout";
import { FullScreenLoader } from "../../components/ui/FullScreenLoader";



export const EstadosCitasScreen = () => {

  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const { logout } = useAuthStore();

  const { isLoading, estadosCitas } = useEstadoCitas();

  const renderItem = ({ item, index }: { item: EstadoCitasResponse; index: number }): React.ReactElement => (
    <ListItem
      title={`${item.descripcion} `}
      description={`${item.codigo} `}
    />
  );


  return (
      <MainLayout title='Listado de Estados de Citas' subTitle='Distintos estados por lo cual puede pasar un cita'
        rightAction={logout}
        rightActionIcon='log-out'
      >

        {

          isLoading
            ? (<FullScreenLoader />)
            :

            (
              <List style={{maxHeight: '100%'}}
                data={estadosCitas}
                keyExtractor={(item, index) => `${item.codigo}-${index}`}
                renderItem={renderItem}
              />

            )

        }

      </MainLayout>
  )
}