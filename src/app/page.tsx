import React from 'react';
import Hero from '@/components/landing/Hero';
import About from '@/components/landing/About';
import CourseTable from '@/components/landing/CourseTable';
import AssignmentsPreview from '@/components/landing/AssignmentsPreview';

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* About & Biodata Section */}
      <About />

      {/* Course Table Section */}
      <CourseTable />

      {/* Assignments / Projects Preview */}
      <AssignmentsPreview />
    </>
  );
}
