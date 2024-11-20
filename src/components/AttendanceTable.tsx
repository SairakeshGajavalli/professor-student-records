import React from 'react';

interface Student {
  name: string;
  SID: string;
  course: string;
  section: string;
  timings: string;
  timestamp: string;
}

interface AttendanceTableProps {
  students: Student[];
}

export const AttendanceTable: React.FC<AttendanceTableProps> = ({ students }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Section</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {students.map((student, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.SID}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.course}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.section}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.timings}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};