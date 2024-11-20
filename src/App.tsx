import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from './firebase';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { format } from 'date-fns';
import { BookOpen } from 'lucide-react';
import { DashboardCard } from './components/DashboardCard';
import { FilterBar } from './components/FilterBar';
import { AttendanceTable } from './components/AttendanceTable';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

interface Student {
  name: string;
  SID: string;
  course: string;
  section: string;
  timings: string;
  timestamp: string;
}

function App() {
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [selectedCourse, setSelectedCourse] = useState('All Courses');
  const [selectedSection, setSelectedSection] = useState('All Sections');
  const [selectedStudent, setSelectedStudent] = useState('All Students');

  useEffect(() => {
    const studentsRef = ref(database, 'student-details');
    onValue(studentsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const studentList = Object.values(data) as Student[];
        setStudents(studentList);
      }
    });
  }, []);

  const filteredStudents = students.filter((student) => {
    const dateMatch = format(new Date(student.timestamp), 'yyyy-MM-dd') === selectedDate;
    const courseMatch = selectedCourse === 'All Courses' || student.course === selectedCourse;
    const sectionMatch = selectedSection === 'All Sections' || student.section === selectedSection;
    const studentMatch = selectedStudent === 'All Students' || student.SID === selectedStudent;
    return dateMatch && courseMatch && sectionMatch && studentMatch;
  });

  const courseData = {
    labels: ['Android', 'Patterns', 'GDP-1', 'Java', 'iOS', 'Web Applications', 'ADB'],
    datasets: [{
      data: ['Android', 'Patterns', 'GDP-1', 'Java', 'iOS', 'Web Applications', 'ADB'].map(
        course => filteredStudents.filter(student => student.course === course).length
      ),
      backgroundColor: [
        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#47B39C'
      ],
    }]
  };

  const sectionData = {
    labels: ['Section 1', 'Section 2', 'Section 3'],
    datasets: [{
      label: 'Students per Section',
      data: ['1', '2', '3'].map(
        section => filteredStudents.filter(student => student.section === section).length
      ),
      backgroundColor: '#4BC0C0',
    }]
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4">
          <div className="flex items-center gap-3">
            <BookOpen className="text-green-600" size={32} />
            <h1 className="text-3xl font-bold text-gray-900">Professor's Analytics Dashboard</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 px-4">
        <FilterBar
          selectedDate={selectedDate}
          selectedCourse={selectedCourse}
          selectedSection={selectedSection}
          selectedStudent={selectedStudent}
          onDateChange={setSelectedDate}
          onCourseChange={setSelectedCourse}
          onSectionChange={setSelectedSection}
          onStudentChange={setSelectedStudent}
          students={students}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <DashboardCard title="Total Attendance">
            <div className="text-4xl font-bold text-green-600">{filteredStudents.length}</div>
            <div className="text-sm text-gray-500">students present</div>
          </DashboardCard>

          <DashboardCard title="Unique Courses">
            <div className="text-4xl font-bold text-blue-600">
              {new Set(filteredStudents.map(s => s.course)).size}
            </div>
            <div className="text-sm text-gray-500">active courses</div>
          </DashboardCard>

          <DashboardCard title="Active Sections">
            <div className="text-4xl font-bold text-purple-600">
              {new Set(filteredStudents.map(s => s.section)).size}
            </div>
            <div className="text-sm text-gray-500">sections with attendance</div>
          </DashboardCard>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <DashboardCard title="Course Distribution">
            <div className="h-[300px] flex items-center justify-center">
              <Pie data={courseData} options={{ maintainAspectRatio: false }} />
            </div>
          </DashboardCard>

          <DashboardCard title="Section Distribution">
            <div className="h-[300px]">
              <Bar
                data={sectionData}
                options={{
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                      ticks: { stepSize: 1 }
                    }
                  }
                }}
              />
            </div>
          </DashboardCard>
        </div>

        <DashboardCard title="Attendance Details">
          <AttendanceTable students={filteredStudents} />
        </DashboardCard>
      </main>
    </div>
  );
}

export default App;