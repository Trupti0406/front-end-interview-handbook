import { SiLodash } from 'react-icons/si';
import type { IntlShape } from 'react-intl';

import type { QuestionListTheme } from '~/components/interviews/questions/common/QuestionsTypes';
import type { ThemeGradient } from '~/components/ui/theme';

import type { FocusArea } from '../FocusAreas';

export function getFocusAreaLodash(intl: IntlShape): FocusArea {
  return {
    description: intl.formatMessage({
      defaultMessage:
        'Implement various Lodash functions and methods to manipulate and transform data efficiently, a common task given during front end interviews and improve your front end interview readiness.',
      description: 'Description for interview preparation focus area',
      id: 'gNEj/r',
    }),
    href: '/focus-areas/lodash',
    longName: intl.formatMessage({
      defaultMessage: 'Lodash Functions',
      description: 'Name of focus area questions',
      id: '0HOYxB',
    }),
    name: intl.formatMessage({
      defaultMessage: 'Lodash Functions',
      description: 'Name of focus area questions',
      id: '0HOYxB',
    }),
    questions: {
      algo: [],
      javascript: [
        'chunk',
        'clamp',
        'compact',
        'count-by',
        'curry',
        'debounce',
        'deep-clone',
        'deep-equal',
        'difference',
        'drop-right-while',
        'drop-while',
        'fill',
        'find-index',
        'find-last-index',
        'flatten',
        'from-pairs',
        'get',
        'group-by',
        'in-range',
        'intersection',
        'intersection-by',
        'intersection-with',
        'is-empty',
        'limit',
        'once',
        'size',
        'throttle',
        'unique-array',
      ],
      // Use question importance for now.
      quiz: [],
      'system-design': [],
      'user-interface': [],
    },
    seo: {
      description: intl.formatMessage({
        defaultMessage:
          'Implement various Lodash functions and methods to manipulate and transform data efficiently and improve your front end interview readiness.',
        description: 'Description for interview preparation focus area',
        id: 'j+FaML',
      }),
      title: intl.formatMessage({
        defaultMessage: 'Practice building Lodash utility functions',
        description: 'Title for interview preparation focus area',
        id: 'mnJ9uY',
      }),
    },
    shortDescription: intl.formatMessage({
      defaultMessage:
        'Strengthen your proficiency in JavaScript through writing Lodash functions from scratch.',
      description: 'Description for interview preparation focus area',
      id: 'NoFZV/',
    }),
    type: 'lodash',
  };
}

const gradient: ThemeGradient<'#7474BF', '#348AC7'> = {
  className: 'bg-[linear-gradient(133.77deg,_#7474BF_0%,_#348AC7_97.95%)]',
  endColor: '#348AC7',
  startColor: '#7474BF',
};

export function getFocusAreaThemeLodash(): QuestionListTheme {
  return {
    gradient,
    iconOutline: SiLodash,
    iconSolid: SiLodash,
  };
}
