import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { applicationService } from '../../services/applicationService';
import { useToast } from '../../context/ToastContext';
import { getErrorMessage } from '../../utils/helpers';
import ApplicationForm from '../../components/forms/ApplicationForm';
import Card from '../../components/common/Card';

const AddApplicationPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      const created = await applicationService.create(formData);
      toast.success('Application added successfully! 🎉');
      navigate(`/applications/${created.id}`);
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto animate-fade-in">
      {/* Header */}
      <div>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 mb-4 transition-colors group"
        >
          <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">Add New Application</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Track a new job application in your vault</p>
      </div>

      <Card>
        <ApplicationForm onSubmit={handleSubmit} loading={loading} submitLabel="Add Application" />
      </Card>
    </div>
  );
};

export default AddApplicationPage;
