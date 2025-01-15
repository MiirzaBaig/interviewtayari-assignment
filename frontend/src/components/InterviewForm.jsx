import { useState } from 'react';

const InterviewForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    company: '',
    questions: ['']
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...formData.questions];
    newQuestions[index] = value;
    setFormData((prevState) => ({
      ...prevState,
      questions: newQuestions
    }));
  };

  const addQuestion = () => {
    setFormData((prevState) => ({
      ...prevState,
      questions: [...prevState.questions, '']
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8080/api/interviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setFormData({
          name: '',
          country: '',
          company: '',
          questions: ['']
        });
        alert('Interview experience submitted successfully!');
      } else {
        throw new Error('Failed to submit interview experience');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to submit interview experience');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-colors duration-600">
        <h1 className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-4">Share Your Interview Experience</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Your Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your name"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Country</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              placeholder="Enter your country"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Company</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              placeholder="Enter company name"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Interview Questions</label>
            {formData.questions.map((question, index) => (
              <textarea
                key={index}
                value={question}
                onChange={(e) => handleQuestionChange(index, e.target.value)}
                placeholder="Share a question from your interview"
                className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-500"
                required
              />
            ))}
            <button
              type="button"
              onClick={addQuestion}
              className="text-purple-600 dark:text-purple-400 font-semibold hover:text-purple-700 transition-colors"
            >
              + Add Another Question
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 transition-transform transform hover:scale-105"
          >
            Submit Experience
          </button>
        </form>
      </div>
    </div>
  );
};

export default InterviewForm;