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
          'Hone your computer science fundamentals by implementing important data structures and algorithms from scratch and practice the questions where algorithmic efficiency is key.',
        description: 'Description for interview preparation focus area',
        id: 'FcKhvG',
      },
      {
        numberOfQuestions: QuestionCount,
      },
    ),
    href: '/focus-areas/data-structures-algorithms',
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
        'data-selection',
        'event-emitter',
        'event-emitter-ii',
        'table-of-contents',
        'unique-array',
      ],
      quiz: [],
      'system-design': [],
      'user-interface': [
        'transfer-list',
        'transfer-list-ii',
        'undoable-counter',
        'wordle',
      ],
    },
    seo: {
      description: intl.formatMessage({
        defaultMessage:
          'Hone your computer science fundamentals by implementing important data structures and algorithms from scratch and practice the questions where algorithmic efficiency is key.',
        description: 'Description for interview preparation focus area',
        id: 'FcKhvG',
      }),
      title: intl.formatMessage({
        defaultMessage:
          'Prepare for tackling data structures and algorithms questions in front end interviews',
        description: 'Title for interview preparation focus area',
        id: 'r1cPM9',
      }),
    },
    shortDescription: intl.formatMessage({
      defaultMessage:
        'Hone your computer science fundamentals by implementing important data structures and algorithms from scratch.',
      description: 'Description for interview preparation focus area',
      id: 'HMJJLh',
    }),
    type: 'data-structures-algorithms',
  };
}

export function getFocusAreaThemeDataStructuresAlgorithms(): QuestionListTheme {
  return {
    gradient: themeGradientPinkPurple,
    iconOutline: TbBinaryTree,
    iconSolid: TbBinaryTree,
  };
}
