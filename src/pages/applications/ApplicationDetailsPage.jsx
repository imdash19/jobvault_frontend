import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { applicationService } from '../../services/applicationService';
import { useToast } from '../../context/ToastContext';
import { getErrorMessage, formatDate, getPlatformLabel } from '../../utils/helpers';
import { STATUS_OPTIONS } from '../../utils/constants';
import Card from '../../components/common/Card';
import StatusBadge from '../../components/common/StatusBadge';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import { SectionLoader } from '../../components/common/Spinner';

const DetailRow = ({ label, value }) => (
  <div className="flex flex-col gap-1">
    <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">{label}</p>
    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{value || '—'}</p>
  </div>
);

const ApplicationDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statusLoading, setStatusLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [newStatus, setNewStatus] = useState('');

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await applicationService.getById(id);
        setApplication(data);
        setNewStatus(data.status);
      } catch (err) {
        toast.error(getErrorMessage(err));
        navigate('/applications');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  const handleStatusUpdate = async () => {
    if (newStatus === application.status) return;
    setStatusLoading(true);
    try {
      const updated = await applicationService.update(id, { status: newStatus });
      setApplication(updated);
      toast.success('Status updated!');
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setStatusLoading(false);
    }
  };

  const handleDelete = async () => {
    setDeleteLoading(true);
    try {
      await applicationService.delete(id);
      toast.success('Application deleted');
      navigate('/applications');
    } catch (err) {
      toast.error(getErrorMessage(err));
      setDeleteLoading(false);
    }
  };

  if (loading) return <SectionLoader />;
  if (!application) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Back + actions header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <button
          onClick={() => navigate('/applications')}
          className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors group"
        >
          <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          All Applications
        </button>
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigate(`/applications/${id}/edit`)}
            icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>}
          >
            Edit
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => setDeleteModal(true)}
            icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>}
          >
            Delete
          </Button>
        </div>
      </div>

      {/* Hero card */}
      <Card className="relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-indigo-500/10 to-transparent rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="relative z-10 flex items-start gap-5">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-2xl font-extrabold text-white shadow-lg shrink-0">
            {(application.company_name || 'A')[0].toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">{application.company_name}</h1>
                <p className="text-base text-gray-500 dark:text-gray-400 font-medium mt-0.5">{application.job_role}</p>
              </div>
              <StatusBadge status={application.status} />
            </div>
            <div className="flex flex-wrap gap-4 mt-4">
              <span className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Applied {formatDate(application.applied_date)}
              </span>
              <span className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                {getPlatformLabel(application.applied_platform)}
              </span>
              {application.job_url && (
                <a
                  href={application.job_url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-sm text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
                >
                  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  View Job Posting
                </a>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Details grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Details card */}
          <Card>
            <h2 className="text-base font-bold text-gray-900 dark:text-white mb-5">Application Details</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
              <DetailRow label="Company" value={application.company_name} />
              <DetailRow label="Job Role" value={application.job_role} />
              <DetailRow label="Platform" value={getPlatformLabel(application.applied_platform)} />
              <DetailRow label="Applied Date" value={formatDate(application.applied_date)} />
              <DetailRow label="Status" value={<StatusBadge status={application.status} />} />
              {application.job_url && (
                <div className="flex flex-col gap-1">
                  <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Job URL</p>
                  <a href={application.job_url} target="_blank" rel="noreferrer"
                    className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline truncate">
                    Open Link
                  </a>
                </div>
              )}
            </div>
          </Card>

          {/* Job description */}
          {application.job_description && (
            <Card>
              <h2 className="text-base font-bold text-gray-900 dark:text-white mb-4">Job Description</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-wrap">
                {application.job_description}
              </p>
            </Card>
          )}

          {/* Notes */}
          {application.notes && (
            <Card>
              <h2 className="text-base font-bold text-gray-900 dark:text-white mb-4">Notes</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-wrap">
                {application.notes}
              </p>
            </Card>
          )}
        </div>

        {/* Right: Sidebar actions */}
        <div className="space-y-6">
          {/* Update status */}
          <Card>
            <h2 className="text-base font-bold text-gray-900 dark:text-white mb-4">Update Status</h2>
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-3 cursor-pointer transition-all"
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
            <Button
              fullWidth
              onClick={handleStatusUpdate}
              loading={statusLoading}
              disabled={newStatus === application.status}
              variant={newStatus === application.status ? 'secondary' : 'primary'}
              size="sm"
            >
              {newStatus === application.status ? 'No Changes' : 'Save Status'}
            </Button>
          </Card>

          {/* Resume */}
          <Card>
            <h2 className="text-base font-bold text-gray-900 dark:text-white mb-4">Resume</h2>
            {application.resume ? (
              <a
                href={application.resume}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl border border-green-200 dark:border-green-700/40 bg-green-50 dark:bg-green-900/10 hover:border-green-400 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-green-700 dark:text-green-400 group-hover:underline truncate">Download Resume</p>
                  <p className="text-xs text-green-600/70 dark:text-green-500/70">Click to open</p>
                </div>
              </a>
            ) : (
              <div className="flex flex-col items-center justify-center py-6 text-center">
                <svg className="w-8 h-8 text-gray-300 dark:text-gray-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-sm text-gray-400 dark:text-gray-500">No resume uploaded</p>
                <button onClick={() => navigate(`/applications/${id}/edit`)}
                  className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline mt-1">Upload one →</button>
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Delete Modal */}
      <Modal
        isOpen={deleteModal}
        onClose={() => setDeleteModal(false)}
        title="Delete Application"
        size="sm"
        footer={
          <>
            <Button variant="secondary" onClick={() => setDeleteModal(false)}>Cancel</Button>
            <Button variant="danger" loading={deleteLoading} onClick={handleDelete}>Delete</Button>
          </>
        }
      >
        <div className="text-center py-4">
          <div className="w-14 h-14 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </div>
          <p className="font-semibold text-gray-800 dark:text-gray-200">Delete "{application.company_name}"?</p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">This action cannot be undone.</p>
        </div>
      </Modal>
    </div>
  );
};

export default ApplicationDetailsPage;
