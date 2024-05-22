import { Text } from "@ui-kitten/components"

interface Props {
    text: string
}

export const LabelErrorForm = ( { text } : Props) => {
  return (
    <Text status='danger' category='label' style={{marginBottom: 10, fontSize: 12}} >{text}</Text>
  )
}