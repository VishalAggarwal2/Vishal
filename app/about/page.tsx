import path from 'path';
import { Fragment, Suspense } from 'react';
import { readMDXFile } from '../blog/utils';
import { CustomMDX } from '../components/mdx';

import Occupation from './occupation';

// Define the path to the content.mdx file
const contentPath = path.join(process.cwd(), 'app', 'about', 'content.mdx');
// Read the MDX file content
const { content } = readMDXFile(contentPath);

// Metadata for the page
export const metadata = {
  title: 'About',
  description: 'About Vishal Aggarwal - Backend & DevOps Engineer',
};

// Page component
export default function Page() {
  return (
    <Fragment>
      {/* Occupation Component */}
      <Occupation />

      {/* Render the MDX content */}
      <CustomMDX source={content} />
      {/* Suspense for async components */}
      <Suspense fallback={<div>Loading...</div>}>
        {/* GitHub Contributions Component */}
        {/* <GithubContributions /> */}

        {/* Top Tracks Component */}
        {/* <TopTracks /> */}
      </Suspense>
    </Fragment>
  );
}
