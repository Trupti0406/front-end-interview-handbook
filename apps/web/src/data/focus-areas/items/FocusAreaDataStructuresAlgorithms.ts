import { TbBinaryTree } from 'react-icons/tb';
import type { IntlShape } from 'react-intl';

import type { QuestionListTheme } from '~/components/questions/common/QuestionsTypes';
import { QuestionCount } from '~/components/questions/listings/stats/QuestionCount';
import { themeGradientPinkPurple } from '~/components/ui/theme';

import type { FocusArea } from '../FocusAreas';

export function getFocusAreaDataStructuresAlgorithms(
  intl: IntlShape,
): FocusArea {
  return {
    description: intl.formatMessage(
      {
        defaultMessage:
          'With over {numberOfQuestions} questions, this is the most complete all-in-one front end interview preparation you can ever dream of.',
        description: 'Long description for three months study plan',
        id: 'JrmA6j',
      },
      {
        numberOfQuestions: QuestionCount,
      },
    ),
    href: '/focus-areas/data-structure-algorithms',
    longName: intl.formatMessage({
      defaultMessage: 'Data structures & algorithms',
      description: 'Name of focus area questions',
      id: 'lEECs5',
    }),
    name: intl.formatMessage({
      defaultMessage: 'Data structures & algorithms',
      description: 'Name of focus area questions',
      id: 'lEECs5',
    }),
    questions: {
      javascript: [
        'stack',
        'queue',
        'merge-sort',
        'quick-sort',
        'heap-sort',
        'topological-sort',
        'insertion-sort',
        'selection-sort',
        'binary-search',
        'depth-first-search',
        'breadth-first-search',
      ],
      // Use question importance for now.
      quiz: [],
      'system-design': [],
      'user-interface': [],
    },
    seo: {
      description: intl.formatMessage({
        defaultMessage:
          'Everything you need to study and practice for front end interviews for a complete preparation.',
        description: 'Description of 3 Months Preparation Plan page',
        id: '8UEoLG',
      }),
      title: intl.formatMessage({
        defaultMessage:
          'Study plan to prepare for front end interviews in 3 months',
        description: 'Title of 3 Months Preparation Plan page',
        id: '7Iapcq',
      }),
    },
    shortDescription: intl.formatMessage({
      defaultMessage:
        'Most complete all-in-one front end interview preparation.',
      description: 'Short description for 3 months study plan',
      id: '1PHE0Y',
    }),
    type: 'data-structure-algorithms',
  };
}

export function getFocusAreaThemeDataStructuresAlgorithms(): QuestionListTheme {
  return {
    iconBorderClass: 'border-indigo-600',
    iconClass: 'text-indigo-600',
    iconOutline: TbBinaryTree,
    iconSolid: TbBinaryTree,
    theme: themeGradientPinkPurple,
  };
}
