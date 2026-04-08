'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { 
  FiCalendar, 
  FiCheckCircle, 
  FiXCircle, 
  FiTrendingUp, 
  FiFilter, 
  FiChevronLeft, 
  FiChevronRight,
  FiDownload,
  FiRefreshCw,
  FiUser,
  FiClock,
  FiBarChart2
} from 'react-icons/fi';

interface AttendanceRecord {
  _id: string;
  userName: string;
  userEmail: string;
  date: string;
  value: 'present' | 'absent';
  createdAt: string;
}

export default function StudentAttendancePage() {
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [activeView, setActiveView] = useState<'calendar' | 'table'>('calendar');
  const router = useRouter();

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    const name = localStorage.getItem('userName');
    
    if (!name) {
      router.replace('/login');
      return;
    }
    
    if (email) {
      setUserEmail(email);
      setUserName(name || '');
      fetchAttendanceRecords(email);
    } else {
      setError('Please log in to view your attendance');
      setLoading(false);
    }
  }, [startDate, endDate, router]);

  const fetchAttendanceRecords = async (email: string) => {
    try {
      setLoading(true);
      let url = `/api/attendence?userEmail=${email}`;

      if (startDate && endDate) {
        url += `&startDate=${startDate}&endDate=${endDate}`;
      }

      const res = await fetch(url);
      const data = await res.json();

      if (res.ok) {
        setAttendanceRecords(data.attendance || []);
      } else {
        setError(data.message || 'Failed to fetch attendance records');
      }
    } catch (error) {
      setError('Error fetching attendance records');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getAttendanceStats = () => {
    const totalRecords = attendanceRecords.length;
    const presentCount = attendanceRecords.filter(r => r.value === 'present').length;
    const absentCount = totalRecords - presentCount;
    const attendanceRate = totalRecords > 0 ? ((presentCount / totalRecords) * 100).toFixed(1) : '0';

    return { totalRecords, presentCount, absentCount, attendanceRate };
  };

  const getMonthlyAttendance = () => {
    const monthStart = new Date(currentYear, currentMonth, 1);
    const monthEnd = new Date(currentYear, currentMonth + 1, 0);

    return attendanceRecords.filter(record => {
      const recordDate = new Date(record.date);
      return recordDate >= monthStart && recordDate <= monthEnd;
    });
  };

  const generateCalendarView = () => {
    const monthlyRecords = getMonthlyAttendance();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    const calendar = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      calendar.push(<div key={`empty-${i}`} className="p-2"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dayRecord = monthlyRecords.find(record =>
        new Date(record.date).toDateString() === new Date(dateStr).toDateString()
      );

      const isToday = new Date().toDateString() === new Date(dateStr).toDateString();

      calendar.push(
        <div 
          key={day} 
          className={`relative p-3 border rounded-xl text-center transition-all duration-200 hover:scale-105 hover:shadow-md ${
            dayRecord
              ? dayRecord.value === 'present'
                ? 'bg-gradient-to-br from-green-50 to-green-100 border-green-200'
                : 'bg-gradient-to-br from-red-50 to-red-100 border-red-200'
              : 'bg-white border-gray-100'
          } ${isToday ? 'ring-2 ring-blue-500 ring-offset-1' : ''}`}
        >
          <div className={`font-semibold text-lg ${isToday ? 'text-blue-600' : 'text-gray-700'}`}>
            {day}
          </div>
          {dayRecord && (
            <div className={`mt-1 text-xs font-medium px-2 py-1 rounded-full inline-block ${
              dayRecord.value === 'present'
                ? 'bg-green-500 text-white'
                : 'bg-red-500 text-white'
            }`}>
              {dayRecord.value === 'present' ? '✓' : '✗'}
            </div>
          )}
          {isToday && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full"></div>
          )}
        </div>
      );
    }

    return calendar;
  };

  const stats = getAttendanceStats();
  const monthlyStats = getMonthlyAttendance();
  const monthlyPresent = monthlyStats.filter(r => r.value === 'present').length;
  const monthlyTotal = monthlyStats.length;
  const monthlyRate = monthlyTotal > 0 ? ((monthlyPresent / monthlyTotal) * 100).toFixed(1) : '0';

  const exportAttendance = () => {
    const csv = [
      ['Date', 'Status', 'Recorded At'],
      ...attendanceRecords.map(record => [
        new Date(record.date).toLocaleDateString(),
        record.value,
        new Date(record.createdAt).toLocaleString()
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `attendance_${userName}_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  if (!userEmail) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiUser className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-3">Access Required</h1>
          <p className="text-gray-600 mb-6">Please log in to view your attendance records.</p>
          <a 
            href="/login" 
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-full font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105"
          >
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Banner */}
      <div className="relative h-[350px] bg-blue-700 overflow-hidden mt-20">

        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white px-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm">
            <FiCalendar className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3 text-center">My Attendance</h1>
          <p className="text-lg text-blue-100 text-center max-w-2xl">
            Track your progress and stay on top of your study schedule
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-8 "></div>
      </div>

      <div className="container mx-auto px-4 py-8 -mt-8 relative z-10 mt-4">
        {/* User Welcome Card */}
        <div className="bg-gradient-to-r from-white to-blue-50 rounded-2xl  p-6 mb-8 border border-blue-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-1">Welcome back, <span className="text-blue-600">{userName}</span>!</h2>
              <p className="text-gray-600 flex items-center gap-2">
                <FiClock className="w-4 h-4" />
                Track your attendance and view your progress
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <button
                onClick={() => fetchAttendanceRecords(userEmail)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-blue-200 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors mr-3"
              >
                <FiRefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              <button
                onClick={exportAttendance}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all transform hover:scale-105"
              >
                <FiDownload className="w-4 h-4" />
                Export CSV
              </button>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-gradient-to-r from-red-50 to-red-100 border border-red-200 text-red-700 px-6 py-4 rounded-xl mb-6 flex items-center gap-3">
            <FiXCircle className="w-6 h-6 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Overall Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <FiCalendar className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-sm font-semibold text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
                Total
              </span>
            </div>
            <h3 className="text-sm font-medium text-blue-800 mb-2">Total Days</h3>
            <p className="text-3xl font-bold text-blue-600">{stats.totalRecords}</p>
            <div className="mt-4 h-2 bg-blue-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 rounded-full transition-all duration-500"
                style={{ width: '100%' }}
              ></div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <FiCheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-sm font-semibold text-green-700 bg-green-100 px-3 py-1 rounded-full">
                Present
              </span>
            </div>
            <h3 className="text-sm font-medium text-green-800 mb-2">Present Days</h3>
            <p className="text-3xl font-bold text-green-600">{stats.presentCount}</p>
            <div className="mt-4 h-2 bg-green-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-green-500 rounded-full transition-all duration-500"
                style={{ width: `${(stats.presentCount / Math.max(stats.totalRecords, 1)) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-50 to-red-100 border border-red-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <FiXCircle className="w-6 h-6 text-red-600" />
              </div>
              <span className="text-sm font-semibold text-red-700 bg-red-100 px-3 py-1 rounded-full">
                Absent
              </span>
            </div>
            <h3 className="text-sm font-medium text-red-800 mb-2">Absent Days</h3>
            <p className="text-3xl font-bold text-red-600">{stats.absentCount}</p>
            <div className="mt-4 h-2 bg-red-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-red-500 rounded-full transition-all duration-500"
                style={{ width: `${(stats.absentCount / Math.max(stats.totalRecords, 1)) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <FiTrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <span className={`text-sm font-semibold px-3 py-1 rounded-full ${
                parseFloat(stats.attendanceRate) >= 80 
                  ? 'text-green-700 bg-green-100' 
                  : parseFloat(stats.attendanceRate) >= 60 
                  ? 'text-yellow-700 bg-yellow-100' 
                  : 'text-red-700 bg-red-100'
              }`}>
                {stats.attendanceRate}%
              </span>
            </div>
            <h3 className="text-sm font-medium text-purple-800 mb-2">Attendance Rate</h3>
            <p className="text-3xl font-bold text-purple-600">{stats.attendanceRate}%</p>
            <div className="mt-4 h-2 bg-purple-200 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${
                  parseFloat(stats.attendanceRate) >= 80 
                    ? 'bg-green-500' 
                    : parseFloat(stats.attendanceRate) >= 60 
                    ? 'bg-yellow-500' 
                    : 'bg-red-500'
                }`}
                style={{ width: `${stats.attendanceRate}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex items-center justify-between mb-6">
          <div className="bg-white border border-gray-200 rounded-full p-1 inline-flex">
            <button
              onClick={() => setActiveView('calendar')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeView === 'calendar'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Calendar View
            </button>
            <button
              onClick={() => setActiveView('table')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeView === 'table'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Table View
            </button>
          </div>
        </div>

        {/* Filters Card */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <FiFilter className="w-5 h-5" />
              Filter Records
            </h3>
            <button
              onClick={() => {
                setStartDate('');
                setEndDate('');
              }}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Clear all
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
              <div className="relative">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-4 py-3 pl-10 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <FiCalendar className="w-5 h-5" />
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
              <div className="relative">
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-4 py-3 pl-10 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <FiCalendar className="w-5 h-5" />
                </div>
              </div>
            </div>
            
            <div className="flex items-end">
              <button
                onClick={() => fetchAttendanceRecords(userEmail)}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-md"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>

        {/* Calendar View */}
        {activeView === 'calendar' && (
          <div className="bg-white rounded-2xl shadow-md p-6 mb-8 border border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-1">
                  {new Date(currentYear, currentMonth).toLocaleDateString('en-US', { 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </h3>
                <p className="text-gray-600">
                  Monthly Attendance: <span className="font-semibold text-green-600">{monthlyPresent}</span> / 
                  <span className="font-semibold text-gray-800"> {monthlyTotal}</span> days
                  (<span className={`font-bold ${
                    parseFloat(monthlyRate) >= 80 ? 'text-green-600' : 
                    parseFloat(monthlyRate) >= 60 ? 'text-yellow-600' : 
                    'text-red-600'
                  }`}>{monthlyRate}%</span>)
                </p>
              </div>
              
              <div className="flex items-center gap-2 mt-4 md:mt-0">
                <button
                  onClick={() => {
                    if (currentMonth === 0) {
                      setCurrentMonth(11);
                      setCurrentYear(currentYear - 1);
                    } else {
                      setCurrentMonth(currentMonth - 1);
                    }
                  }}
                  className="p-3 bg-gray-50 text-gray-700 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <FiChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => {
                    const now = new Date();
                    setCurrentMonth(now.getMonth());
                    setCurrentYear(now.getFullYear());
                  }}
                  className="px-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 rounded-xl hover:from-blue-100 hover:to-indigo-100 transition-colors text-sm font-medium"
                >
                  Current Month
                </button>
                <button
                  onClick={() => {
                    if (currentMonth === 11) {
                      setCurrentMonth(0);
                      setCurrentYear(currentYear + 1);
                    } else {
                      setCurrentMonth(currentMonth + 1);
                    }
                  }}
                  className="p-3 bg-gray-50 text-gray-700 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <FiChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="p-3 text-center font-semibold text-gray-500 bg-gray-50 rounded-lg">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
              {generateCalendarView()}
            </div>

            {/* Legend */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Legend</h4>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span className="text-sm text-gray-600">Present</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500 rounded"></div>
                  <span className="text-sm text-gray-600">Absent</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-white border-2 border-gray-300 rounded"></div>
                  <span className="text-sm text-gray-600">No Record</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-white border-2 border-blue-500 rounded relative">
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full"></div>
                  </div>
                  <span className="text-sm text-gray-600">Today</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Table View */}
        {activeView === 'table' && (
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FiBarChart2 className="w-5 h-5" />
                Detailed Records
              </h3>
            </div>

            {loading ? (
              <div className="py-16 text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
                <p className="mt-4 text-gray-600 font-medium">Loading attendance records...</p>
              </div>
            ) : attendanceRecords.length === 0 ? (
              <div className="py-16 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiCalendar className="w-8 h-8 text-gray-400" />
                </div>
                <h4 className="text-lg font-semibold text-gray-700 mb-2">No records found</h4>
                <p className="text-gray-500 max-w-md mx-auto">
                  {startDate || endDate 
                    ? 'No attendance records match your current filters.'
                    : 'You don\'t have any attendance records yet.'
                  }
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Date</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Day</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Recorded At</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {attendanceRecords.map((record) => (
                      <tr 
                        key={record._id} 
                        className="hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">
                            {new Date(record.date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-600">
                            {new Date(record.date).toLocaleDateString('en-US', { weekday: 'long' })}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
                            record.value === 'present'
                              ? 'bg-gradient-to-r from-green-50 to-green-100 text-green-700 border border-green-200'
                              : 'bg-gradient-to-r from-red-50 to-red-100 text-red-700 border border-red-200'
                          }`}>
                            {record.value === 'present' ? (
                              <FiCheckCircle className="w-4 h-4" />
                            ) : (
                              <FiXCircle className="w-4 h-4" />
                            )}
                            {record.value === 'present' ? 'Present' : 'Absent'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-600">
                            {new Date(record.createdAt).toLocaleString()}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}