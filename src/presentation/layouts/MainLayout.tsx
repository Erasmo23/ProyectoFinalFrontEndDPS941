import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Divider, Layout, MenuItem, OverflowMenu, TopNavigation, TopNavigationAction } from "@ui-kitten/components";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CustomKittenIcon } from "../components/ui/CustomKittenIcon";
import { useState } from "react";
import { RootStackParams } from "../navigation/StackNavigation";

interface Props {
    title: string;
    subTitle?: string;

    rightAction?: () => void;
    rightActionIcon?: string;

    children?: React.ReactNode;

}

export const MainLayout = ({ title, subTitle, rightAction, rightActionIcon = 'arrow-back', children }: Props) => {


    const { top } = useSafeAreaInsets();
    const { canGoBack, goBack, navigate } = useNavigation();

    const navigation = useNavigation<NavigationProp<RootStackParams>>();

    const [menuVisible, setMenuVisible] = useState(false);

    const toggleMenu = (): void => {
        setMenuVisible(!menuVisible);
    };

    const renderBackAction = () => (
        <TopNavigationAction icon={<CustomKittenIcon name="arrow-back-outline" />}
            onPress={() => navigation.navigate('HomeScreen')}
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