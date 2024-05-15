import { Button, ButtonGroup } from '@ui-kitten/components';
import { CustomKittenIcon } from './CustomKittenIcon';

interface Props {
    onPressEdit : () => void;
    onPressDelete : () => void;
}

export const ButtonsActionsList = ( { onPressEdit, onPressDelete } : Props) => {
  return (
    <>
        <Button onPress={() => onPressEdit()} size='tiny' appearance='ghost'
            accessoryLeft={<CustomKittenIcon name='edit' color='color-success-500' />} />
        <Button onPress={ () => onPressDelete()} size='tiny' appearance='ghost' 
            accessoryLeft={<CustomKittenIcon name='trash-2' color='color-danger-500' />} />        
    </>
  )
}