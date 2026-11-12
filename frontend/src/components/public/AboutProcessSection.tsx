import React from 'react';
import { WebsiteContentData } from '@/types';
import { AboutFirmSection } from './AboutFirmSection';
import { ProcessTimelineSection } from './ProcessTimelineSection';

interface AboutProcessSectionProps {
  content: WebsiteContentData;
}

export function AboutProcessSection({ content }: AboutProcessSectionProps) {
  return (
    <>
      <AboutFirmSection content={content} />
      <ProcessTimelineSection content={content} />
    </>
  );
}
