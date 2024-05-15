import { CustomKittenIcon } from "./CustomKittenIcon";
import { StyleSheet, View } from "react-native";
import { Text } from "@ui-kitten/components";

interface Props {
    text: string;
}

export const RenderCaptionInput = ( { text } : Props): React.ReactElement => {
    return (
        <View style={styles.captionContainer}>
            <CustomKittenIcon name='alert-circle-outline' styleCustom={styles.captionIcon} />
            <Text style={styles.captionText}>
                {text}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    captionContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    captionIcon: {
        width: 20,
        height: 20,
        marginRight: 5,
        marginTop: 3
    },
    captionText: {
        fontSize: 12,
        fontWeight: '400',
        fontFamily: 'opensans-regular',
        color: '#8F9BB3',
    },
});
