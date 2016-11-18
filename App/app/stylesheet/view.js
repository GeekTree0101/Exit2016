import { StyleSheet } from 'react-native';

const view = StyleSheet.create({

    bgcolor: {
        backgroundColor : '#2A363B'
    },

    center: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },

    left: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'left',
        alignItems: 'center'
    },

    right: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'right',
        alignItems: 'center'
    }

})

module.exports = view;