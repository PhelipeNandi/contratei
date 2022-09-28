import { extendTheme } from 'native-base';

export const THEME = extendTheme({
    colors: {
        primary: {
            600: '#425EAE',
            700: '#3A539B'
        },
        secondary: {
            600: '#5384D4',
            700: '#4B77BE'
        },
        red: {
            600: '#E11D48',
            500: '#FF375B'
        },
        green: {
            600: '#1A9F4C',
            700: '#15803D'
        },
        yellow: {
            600: '#FDCA47',
            700: '#FBBF24'
        },
        gray: {
            700: '#121214',
            600: '#202024',
            500: '#29292E',
            400: '#323238',
            300: '#7C7C8A',
            200: '#C4C4CC',
            100: '#E1E1E6'
        },
        status: {
            open: '#4B77BE',
            inProgress: '#EAB308',
            closed: '#15803D',
            canceled: '#CD2315'
        },
        white: '#FFFFFF',
        background: '#FEFBF6'
    },
    fonts: {
        heading: 'Poppins_700Bold',
        body: 'Poppins_400Regular',
    },
    fontSizes: {
        xs: 12,
        sm: 14,
        md: 16,
        lg: 20,
        subTitle: 25,
        title: 30,
        menu: 18
    },
    sizes: {
        14: 56
    }
});