import themeList from 'monaco-themes/themes/themelist.json';
import { useEffect, useState } from 'react';

async function loadMonacoTheme(themeKey: string) {
  const themeModule = await import(
    `monaco-themes/themes/${themeList[themeKey as keyof typeof themeList]}.json`
  );

  return themeModule.default;
}

export default function useMonacoTheme(themeKey: string) {
  const [theme, setTheme] = useState<object | null>(null);

  useEffect(() => {
    loadMonacoTheme(themeKey).then(setTheme);
  }, [themeKey]);

  return theme;
}
