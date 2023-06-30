import { BiUniversalAccess } from 'react-icons/bi';
import type { IntlShape } from 'react-intl';

import type { QuestionListTheme } from '~/components/questions/common/QuestionsTypes';
import { themeGradientBlueGreen } from '~/components/ui/theme';

import type { FocusArea } from '../FocusAreas';

export function getFocusAreaAccessibility(intl: IntlShape): FocusArea {
  return {
    description: intl.formatMessage({
      defaultMessage:
        'Practice developing inclusive and accessible web experiences. Explore the principles and techniques of web accessibility, including semantic HTML, ARIA roles, keyboard navigation, and screen reader compatibility, a skill which differentiates senior from junior front end engineers.',
      description: 'Description for interview preparation focus area',
      id: 'lNxRzi',
    }),
    href: '/focus-areas/accessibility',
    longName: intl.formatMessage({
      defaultMessage: 'Accessibility',
      description: 'Name of focus area questions',
      id: '1kiNiW',
    }),
    name: intl.formatMessage({
      defaultMessage: 'Accessibility',
      description: 'Name of focus area questions',
      id: '1kiNiW',
    }),
    questions: {
      javascript: [],
      quiz: [],
      'system-design': [],
      'user-interface': [
        'accordion',
        'accordion-ii',
        'accordion-iii',
        'tabs',
        'tabs-ii',
        'tabs-iii',
      ],
    },
    seo: {
      description: intl.formatMessage({
        defaultMessage:
          'Practice developing inclusive and accessible web experiences, a skill which differentiates senior from junior front end engineers.',
        description: 'Description for interview preparation focus area',
        id: 'T8HWQC',
      }),
      title: intl.formatMessage({
        defaultMessage:
          'Showcase your knowledge of web accessibility in front end interviews',
        description: 'Title for interview preparation focus area',
        id: 'OumyBP',
      }),
    },
    shortDescription: intl.formatMessage({
      defaultMessage:
        'Practice developing inclusive and accessible web experiences.',
      description: 'Description for interview preparation focus area',
      id: 'Sj1CaY',
    }),
    type: 'accessibility',
  };
}

export function getFocusAreaThemeAccessibility(): QuestionListTheme {
  return {
    gradient: themeGradientBlueGreen,
    iconOutline: BiUniversalAccess,
    iconSolid: BiUniversalAccess,
  };
}
