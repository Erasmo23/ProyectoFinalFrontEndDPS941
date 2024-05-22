import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Divider, Layout, TopNavigation, TopNavigationAction } from "@ui-kitten/components";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CustomKittenIcon } from "../components/ui/CustomKittenIcon";
import { RootStackParams } from "../navigation/StackNavigation";

interface Props {
    title: string;
    subTitle?: string;

    rightAction?: () => void;
    rightActionIcon?: string;
    isListPage ?: boolean;

    children?: React.ReactNode;

}

export const MainLayoutAdmin = ({ title, subTitle, rightAction, isListPage= false,
    rightActionIcon = 'arrow-back', children }: Props) => {


    const { top } = useSafeAreaInsets();
    const { canGoBack, goBack } = useNavigation();

    const navigation = useNavigation<NavigationProp<RootStackParams>>();

    const renderBackAction = () => (
        <TopNavigationAction icon={<CustomKittenIcon name="arrow-back-outline" />}
            onPress={() => {
                (isListPage) ? navigation.navigate('HomeScreen')
                : goBack() 
            } }
        />
    )

    const RenderRightAction = () => {

        if (rightAction === undefined || rightActionIcon === undefined) return null;

        return (
          <TopNavigationAction 
            onPress={ rightAction }
            icon={ <CustomKittenIcon name={rightActionIcon} /> }
          />
        )
    
    }

    return (
        <Layout style={{ paddingTop: top }}>
            <TopNavigation
                title={title}
                subtitle={subTitle}
                alignment="center"
                accessoryLeft={canGoBack() ? renderBackAction : undefined}
                accessoryRight={() => <RenderRightAction />}
            />
            <Divider />

            <Layout style={{ height: '100%' }}>
                {children}
            </Layout>

        </Layout>
    )
}