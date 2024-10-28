import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';

import useQuestionsWithCompletionStatus from '~/components/interviews/questions/listings/filters/hooks/useQuestionsWithCompletionStatus';
import QuestionsStudyListSlideOut from '~/components/interviews/questions/listings/learning/QuestionsStudyListSlideOut';
import { useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import Text from '~/components/ui/Text';

import type {
  QuestionMetadata,
  QuestionQuiz,
} from '../../common/QuestionsTypes';

type Props = Readonly<{
  question: QuestionQuiz;
  questionList: ReadonlyArray<QuestionMetadata>;
  studyList?: Readonly<{ listKey: string; name: string }>;
}>;

export default function QuestionQuizPagination({
  question,
  questionList,
  studyList,
}: Props) {
  const intl = useIntl();
  // Loop through list to get next, prev and current question number vs total question list.
  let prevQuestion = null;
  let nextQuestion = null;
  const questionsWithCompletionStatus = useQuestionsWithCompletionStatus(
    questionList ?? [],
  );

  for (let i = 0; i < questionList.length; i++) {
    if (questionList[i].slug !== question.metadata.slug) {
      continue;
    }
    // We have found the active item.
    if (i > 0) {
      prevQuestion = questionList[i - 1];
    }
    if (i + 1 < questionList.length) {
      nextQuestion = questionList[i + 1];
    }
    break;
  }

  return (
    <nav
      aria-label={intl.formatMessage({
        defaultMessage: 'Pagination',
        description: 'Screenreader text for the pagination component',
        id: 'C8/0hU',
      })}
      className="flex items-center justify-center py-1">
      <div className="flex">
        <Button
          addonPosition="start"
          href={prevQuestion?.href}
          icon={RiArrowLeftSLine}
          isDisabled={!prevQuestion?.href}
          label={intl.formatMessage({
            defaultMessage: 'Prev',
            description: 'Label for button leading to the previous page',
            id: 'frl+Af',
          })}
          size="xs"
          variant="secondary"
        />
        <Text className="flex items-center px-6" size="body2" weight="medium">
          <QuestionsStudyListSlideOut
            isDisabled={false}
            questions={questionsWithCompletionStatus}
            studyList={studyList}
          />
        </Text>
        <Button
          href={nextQuestion?.href}
          icon={RiArrowRightSLine}
          isDisabled={!nextQuestion?.href}
          label={intl.formatMessage({
            defaultMessage: 'Next',
            description: 'Label for button leading to the next page',
            id: 'b2csyI',
          })}
          size="xs"
          variant="secondary"
        />
      </div>
    </nav>
  );
}
