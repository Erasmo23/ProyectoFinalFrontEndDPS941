import AwesomeAlert from "react-native-awesome-alerts";

interface Props {
    showAlert: boolean;
    title: string,
    message: string,
    textConfirmButton : string,

    showProgress ?: boolean,

    showCancelButton ?: boolean,
    textCancelButton ?: string,
    onPressCancel ?: () => void;

    onPressConfirm ?: () => void;
    colorButtonConfirm ?: string,
    colorButtonCancel ?: string
}

export const CustomConfirmDialog = ( { showAlert,title, message,textConfirmButton,  onPressCancel, 
        onPressConfirm, showCancelButton=false, textCancelButton='',showProgress = false,
        colorButtonConfirm='#006FD6', colorButtonCancel='#DB2C66' } : Props ) => {

  return (
    <AwesomeAlert show={showAlert} showProgress={showProgress} title={title} message={message}
          closeOnTouchOutside={false} closeOnHardwareBackPress={false} 
          
          showConfirmButton={true} 
          confirmText={textConfirmButton}
          confirmButtonColor={colorButtonConfirm}
          onConfirmPressed={() => {
            onPressConfirm && onPressConfirm();
          }}

          showCancelButton={showCancelButton}
          cancelText={textCancelButton}
          onCancelPressed={() => {
            onPressCancel && onPressCancel();
          }}
          cancelButtonColor={colorButtonCancel}
          
        />
  )
}