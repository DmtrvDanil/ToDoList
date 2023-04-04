import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const useTheme = () => {
    const theme = useSelector(state => state.persistedReducer.theme);
    useEffect(() => {
        document.body.style.background = theme === 'Light' ? '#fff' : '#ccc';
    }, [theme]);
};

export {useTheme};