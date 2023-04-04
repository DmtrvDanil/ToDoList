import { FormControl, FormLabel, Switch } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { changeTheme } from './store/themeSlice';
import { useTheme } from '../hooks/use-theme'


const ThemeSelector = () => {
    const dispatch = useDispatch();
    const theme = useSelector(state => state.persistedReducer.theme);


    useTheme();

    return (
        <FormControl display='flex' alignItems='center'>
            <FormLabel htmlFor={theme} mb='0'>
                Theme: {theme}
            </FormLabel>
            <button onClick={() => dispatch(changeTheme())}>Change Theme</button>
        </FormControl>
    )
}

export default ThemeSelector;
