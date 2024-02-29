import './RichTextEditorTheme.css';

const RichTextEditorTheme = {
  code: 'EditorTheme__code',
  codeHighlight: {
    atrule: 'EditorTheme__tokenAttr',
    attr: 'EditorTheme__tokenAttr',
    boolean: 'EditorTheme__tokenProperty',
    builtin: 'EditorTheme__tokenSelector',
    cdata: 'EditorTheme__tokenComment',
    char: 'EditorTheme__tokenSelector',
    class: 'EditorTheme__tokenFunction',
    'class-name': 'EditorTheme__tokenFunction',
    comment: 'EditorTheme__tokenComment',
    constant: 'EditorTheme__tokenProperty',
    deleted: 'EditorTheme__tokenProperty',
    doctype: 'EditorTheme__tokenComment',
    entity: 'EditorTheme__tokenOperator',
    function: 'EditorTheme__tokenFunction',
    important: 'EditorTheme__tokenVariable',
    inserted: 'EditorTheme__tokenSelector',
    keyword: 'EditorTheme__tokenAttr',
    namespace: 'EditorTheme__tokenVariable',
    number: 'EditorTheme__tokenProperty',
    operator: 'EditorTheme__tokenOperator',
    prolog: 'EditorTheme__tokenComment',
    property: 'EditorTheme__tokenProperty',
    punctuation: 'EditorTheme__tokenPunctuation',
    regex: 'EditorTheme__tokenVariable',
    selector: 'EditorTheme__tokenSelector',
    string: 'EditorTheme__tokenSelector',
    symbol: 'EditorTheme__tokenProperty',
    tag: 'EditorTheme__tokenProperty',
    url: 'EditorTheme__tokenOperator',
    variable: 'EditorTheme__tokenVariable',
  },
  // TODO(projects): Use Anchor instead or at the very least reuse styling from Anchor.
  link: 'transition-colors font-medium text-brand-dark dark:text-brand hover:text-brand-dark dark:hover:text-brand hover:underline cursor-pointer',
  text: {
    bold: 'font-medium',
    italic: 'italic',
    strikethrough: 'line-through',
    underline: 'underline',
  },
};

export default RichTextEditorTheme;
