import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { applicationService } from '../../services/applicationService';
import { useToast } from '../../context/ToastContext';
import { getErrorMessage, formatDateInput } from '../../utils/helpers';
import ApplicationForm from '../../components/forms/ApplicationForm';
import Card from '../../components/common/Card';
import { SectionLoader } from '../../components/common/Spinner';

const EditApplicationPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [application, setApplication] = useState(null);
  const [fetching, setFetching] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await applicationService.getById(id);
        setApplication(data);
      } catch (err) {
        toast.error(getErrorMessage(err));
        navigate('/applications');
      } finally {
        setFetching(false);
      }
    };
    fetch();
  }, [id]);

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      await applicationService.update(id, formData);
      toast.success('Application updated successfully!');
      navigate(`/applications/${id}`);
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <SectionLoader />;

  const defaults = application
    ? {
        ...application,
        platform: application.applied_platform,
        applied_date: formatDateInput(application.applied_date),
        resume: application.resume || null,
      }
    : {};

  return (
    <div className="space-y-6 max-w-3xl mx-auto animate-fade-in">
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
        <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">Edit Application</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {application?.company_name} — {application?.job_role}
        </p>
      </div>

      <Card>
        <ApplicationForm
          defaultValues={defaults}
          onSubmit={handleSubmit}
          loading={loading}
          submitLabel="Save Changes"
        />
      </Card>
    </div>
  );
};

export default EditApplicationPage;
