import { useState,useEffect } from 'react';
import { StyleSheet,Text } from 'react-native';
import { globalStyles } from '../styles/globalStyles';

function HelloWorld(props) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        setCount(count + 1);
    }, []);
  return (
    <>
        <Text>{props.children}</Text>
        <Text>{count}</Text>
        <Text style={globalStyles.red}>just red</Text>
        <Text style={styles.bigBlue}>just bigBlue</Text>
        <Text style={[styles.red, styles.bigBlue]}>red,then bigBlue</Text>
    </>
  )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
    },
    bigBlue: {
        color: 'blue',
        fontWeight: 'bold',
        fontSize : 30,
    },
    red: {
        color: 'red',
    },
});

export default HelloWorld;