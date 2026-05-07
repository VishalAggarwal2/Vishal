import path from 'path';
import { Fragment, Suspense } from 'react';
import { readMDXFile } from '../blog/utils';
import { CustomMDX } from '../components/mdx';
import Reveal from '../components/reveal';
import TechConstellation from '../components/tech-stack/tech-constellation';
import Occupation from './occupation';

const introPath = path.join(process.cwd(), 'app', 'about', 'content-intro.mdx');
const workPath = path.join(process.cwd(), 'app', 'about', 'content-work.mdx');
const { content: introContent } = readMDXFile(introPath);
const { content: workContent } = readMDXFile(workPath);

export const metadata = {
  title: 'About',
  description: 'About Vishal Aggarwal - Backend & DevOps Engineer',
};

export default function Page() {
  return (
    <Fragment>
      <Reveal>
        <Occupation />
      </Reveal>

      <Reveal delay={0.1}>
        <CustomMDX source={introContent} />
      </Reveal>

      <TechConstellation />

      <Reveal>
        <CustomMDX source={workContent} />
      </Reveal>

      <Suspense fallback={null} />
    </Fragment>
  );
}
