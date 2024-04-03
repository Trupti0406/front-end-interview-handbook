import clsx from 'clsx';

import InterviewsLogo from '~/components/global/logos/InterviewsLogo';
import ProjectsLogo from '~/components/global/logos/ProjectsLogo';
import Anchor from '~/components/ui/Anchor';
import Badge from '~/components/ui/Badge';
import Text from '~/components/ui/Text';
import {
  themeBackgroundElementColor,
  themeBackgroundElementEmphasizedStateColor_Focus,
  themeBackgroundElementEmphasizedStateColor_Hover,
  themeBorderElementColor,
} from '~/components/ui/theme';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

function NavProductDropdownMenuItem({
  beta = false,
  href,
  logo: Logo,
  label,
  subtitle,
}: Readonly<{
  beta?: boolean;
  href: string;
  label: string;
  logo: (props: Readonly<{ height?: number }>) => JSX.Element;
  subtitle: string;
}>) {
  return (
    <DropdownMenu.Item
      asChild={true}
      className={clsx(
        'relative flex flex-col gap-3 rounded p-4',
        'select-none outline-none',
        themeBackgroundElementEmphasizedStateColor_Hover,
        themeBackgroundElementEmphasizedStateColor_Focus,
      )}>
      <Anchor aria-label={label} href={href} variant="unstyled">
        <div className="flex justify-between">
          <Logo height={32} />
          {beta && (
            <span>
              <Badge label="Beta" size="sm" variant="primary" />
            </span>
          )}
        </div>
        <Text color="secondary" size="body2">
          {subtitle}
        </Text>
      </Anchor>
    </DropdownMenu.Item>
  );
}

export default function NavProductDropdownMenuContent() {
  return (
    <DropdownMenu.Content
      align="start"
      className={clsx(
        'flex flex-col gap-2',
        'w-[360px] rounded-lg p-4',
        ['border', themeBorderElementColor],
        themeBackgroundElementColor,
        'z-dropdown',
      )}
      sideOffset={8}>
      <NavProductDropdownMenuItem
        href="/prepare"
        label="GreatFrontEnd Interviews"
        logo={InterviewsLogo}
        subtitle="Learn and train for your front end interviews"
      />
      <NavProductDropdownMenuItem
        beta={true}
        href="/projects"
        label="GreatFrontEnd Projects"
        logo={ProjectsLogo}
        subtitle="Build real-world projects to learn skills or for portfolio"
      />
    </DropdownMenu.Content>
  );
}