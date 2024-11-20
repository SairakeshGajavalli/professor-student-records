import React from 'react';
import { Calendar, GraduationCap, Clock, User } from 'lucide-react';

interface FilterBarProps {
  onDateChange: (date: string) => void;
  onCourseChange: (course: string) => void;
  onSectionChange: (section: string) => void;
  onStudentChange: (sid: string) => void;
  selectedDate: string;
  selectedCourse: string;
  selectedSection: string;
  selectedStudent: string;
  students: Array<{ SID: string; name: string }>;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  onDateChange,
  onCourseChange,
  onSectionChange,
  onStudentChange,
  selectedDate,
  selectedCourse,
  selectedSection,
  selectedStudent,
  students,
}) => {
  const courses = [
    'All Courses',
    'Android',
    'Patterns',
    'GDP-1',
    'Java',
    'iOS',
    'Web Applications',
    'ADB',
  ];

  const sections = ['All Sections', '1', '2', '3'];
  const uniqueStudents = Array.from(new Set(students.map(s => ({ SID: s.SID, name: s.name }))));

  return (
    <div className="flex flex-wrap gap-4 mb-6 p-4 bg-white rounded-lg shadow">
      <div className="flex items-center gap-2">
        <Calendar className="text-green-600" size={20} />
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => onDateChange(e.target.value)}
          className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
      <div className="flex items-center gap-2">
        <GraduationCap className="text-green-600" size={20} />
        <select
          value={selectedCourse}
          onChange={(e) => onCourseChange(e.target.value)}
          className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          {courses.map((course) => (
            <option key={course} value={course}>
              {course}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center gap-2">
        <Clock className="text-green-600" size={20} />
        <select
          value={selectedSection}
          onChange={(e) => onSectionChange(e.target.value)}
          className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          {sections.map((section) => (
            <option key={section} value={section}>
              {section === 'All Sections' ? section : `Section ${section}`}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center gap-2">
        <User className="text-green-600" size={20} />
        <select
          value={selectedStudent}
          onChange={(e) => onStudentChange(e.target.value)}
          className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 min-w-[200px]"
        >
          <option value="All Students">All Students</option>
          {uniqueStudents.map((student) => (
            <option key={student.SID} value={student.SID}>
              {student.SID} - {student.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};