import { type ReactNode, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { useThemeStore } from '../../stores/themeStore';
import { darkTheme, lightTheme } from '../../utils/theme';

type Props = { children: ReactNode };

const mapToCssVars = (theme: Record<string, string>) => ({
    '--bg': theme.background,
    '--surface': theme.surface,
    '--text': theme.text,
    '--muted-text': theme.mutedText,
    '--primary': theme.primary,
    '--border': theme.border,
});

export function ThemingProvider({ children }: Props) {
    const mode = useThemeStore((s) => s.mode);
    const theme = mode === 'dark' ? darkTheme : lightTheme;

    useEffect(() => {
        const vars = mapToCssVars(theme as Record<string, string>);
        const root = document.documentElement;
        Object.entries(vars).forEach(([key, value]) => {
            root.style.setProperty(key, value);
        });
    }, [theme]);

    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
