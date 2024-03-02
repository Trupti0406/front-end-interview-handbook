const i18nLabelOptions: ReadonlyArray<{
  isBeta: boolean;
  label: string; // Label strings do not need to be translated and should be in the native language!
  locale: string;
}> = [
  {
    isBeta: false,
    label: 'English (US)',
    locale: 'en-US',
  },
  {
    isBeta: true,
    label: '中文 (简体)',
    locale: 'zh-CN',
  },
  {
    isBeta: true,
    label: 'Português (Brasil)',
    locale: 'pt-BR',
  },
];

export default i18nLabelOptions;