import GlobalBanner from '~/components/global/banners/GlobalBanner';
import FeedbackWidget from '~/components/global/feedback/FeedbackWidget';
import InterviewsFooter from '~/components/interviews/common/InterviewsFooter';
import InterviewsNavbar from '~/components/interviews/common/InterviewsNavbar';
import Section from '~/components/ui/Heading/HeadingContext';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function InterviewsSidebarLayout({ children }: Props) {
  return (
    <>
      <FeedbackWidget position="end" />
      <GlobalBanner />
      <div className="flex min-h-screen flex-col">
        <InterviewsNavbar hideOnDesktop={true} />
        <div className="grow">{children}</div>
        <Section>
          <InterviewsFooter />
        </Section>
      </div>
    </>
  );
}
