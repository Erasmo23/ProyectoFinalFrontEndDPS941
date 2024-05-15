import { Button } from '@ui-kitten/components';
import { StyleProp, ViewStyle } from 'react-native';
import { CustomKittenIcon } from './CustomKittenIcon';


interface Props {
  iconName: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  status ?: 'info' | 'primary' | 'success' | 'warning' | 'danger';  
}


export const FAB = ({ style, iconName, onPress, status = 'primary' }: Props) => {


  return (
    <Button 
      style={[style, {
        shadowColor: 'black',
        shadowOffset: {
          width: 0,
          height: 10,
        },
        shadowOpacity: 0.4,
        shadowRadius: 10,
        elevation: 3,
        borderRadius: 13,
      }]}
      accessoryLeft={<CustomKittenIcon name={ iconName } white />}
      onPress={onPress}
      status={status}
    />
  )
}