import { ReactNode } from 'react';
import SectionContainer from './section-container';

interface Props {
  children: ReactNode;
}

export default function MainLayout({ children }: Props) {
  return (
    <SectionContainer>
      <main className="mb-auto">{children}</main>
    </SectionContainer>
  );
}
