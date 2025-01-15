import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { interviewService } from '../services/api';
import { motion } from 'framer-motion';

const Home = () => {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const token = localStorage.getItem('token');
        const data = await interviewService.getAllByUser(token);
        setInterviews(data);
      } catch (error) {
        console.error('Error fetching interviews:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInterviews();
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark', !darkMode);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-4rem)]">
        <motion.div
          className="text-purple-600 text-xl font-semibold"
          animate={{ rotate: 360 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          Loading...
        </motion.div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-4xl mx-auto pt-20 px-4 pb-12">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Your Interview Experiences
          </h1>
          <div className="flex items-center space-x-4">
            <Link
              to="/submit-interview"
              className="bg-purple-600 text-white px-6 py-2.5 rounded-lg hover:bg-purple-700 transform hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 active:scale-95"
            >
              Share Experience
            </Link>
          </div>
        </div>

        {/* Interview List */}
        <div className="space-y-4">
          {interviews.map((interview) => (
            <motion.div
              key={interview._id}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                {interview.company}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                Location: {interview.country}
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                Shared by: {interview.name}
              </p>
              <div className="mt-4">
                <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">
                  Interview Questions:
                </h3>
                <ul className="list-disc pl-5 space-y-2">
                  {interview.questions.map((question, index) => (
                    <li key={index} className="text-gray-700 dark:text-gray-300">
                      {question}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;