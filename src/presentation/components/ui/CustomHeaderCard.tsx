import { Layout, Text } from '@ui-kitten/components';

interface Props {
    text: string;
}

export const CustomHeaderCard = (  {text} : Props) => (
    <Layout style={{paddingHorizontal:10 , alignItems:'center' }}> 
      <Text style={{fontWeight:'bold'}} >
        {text}
      </Text>
    </Layout>
);