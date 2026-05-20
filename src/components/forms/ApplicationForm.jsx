import { useForm, Controller } from 'react-hook-form';
import Input from '../common/Input';
import Select from '../common/Select';
import Button from '../common/Button';
import FileUpload from './FileUpload';
import { STATUS_OPTIONS, PLATFORM_OPTIONS } from '../../utils/constants';
import { todayISO } from '../../utils/helpers';

const ApplicationForm = ({ defaultValues = {}, onSubmit, loading = false, submitLabel = 'Save Application' }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      company_name: '',
      job_role: '',
      job_description: '',
      platform: '',
      job_url: '',
      applied_date: todayISO(),
      status: 'Applied',
      notes: '',
      ...defaultValues,
    },
  });

  const processSubmit = (data) => {
    const formData = new FormData();
    const submitData = { ...data };
    // Remove applied_platform so it doesn't conflict with the remapped 'platform' field
    delete submitData.applied_platform;
    
    Object.entries(submitData).forEach(([key, value]) => {
      if (key === 'resume') {
        if (value instanceof File) formData.append('resume', value);
      } else if (value !== undefined && value !== null && value !== '') {
        const fieldName = key === 'platform' ? 'applied_platform' : key;
        formData.append(fieldName, value);
      }
    });
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit(processSubmit)} className="space-y-5" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input
          label="Company Name"
          required
          placeholder="e.g. Google"
          error={errors.company_name?.message}
          {...register('company_name', { required: 'Company name is required' })}
        />
        <Input
          label="Job Role"
          required
          placeholder="e.g. Software Engineer"
          error={errors.job_role?.message}
          {...register('job_role', { required: 'Job role is required' })}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Controller
          name="platform"
          control={control}
          rules={{ required: 'Platform is required' }}
          render={({ field }) => (
            <Select
              label="Platform"
              required
              placeholder="Select platform"
              options={PLATFORM_OPTIONS}
              error={errors.platform?.message}
              {...field}
            />
          )}
        />
        <Input
          label="Job URL"
          type="url"
          placeholder="https://..."
          error={errors.job_url?.message}
          {...register('job_url', {
            pattern: { value: /^https?:\/\/.+/, message: 'Enter a valid URL' },
          })}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input
          label="Applied Date"
          type="date"
          required
          max={todayISO()}
          error={errors.applied_date?.message}
          {...register('applied_date', {
            required: 'Applied date is required',
            validate: (v) => v <= todayISO() || 'Future dates are not allowed',
          })}
        />
        <Controller
          name="status"
          control={control}
          rules={{ required: 'Status is required' }}
          render={({ field }) => (
            <Select
              label="Status"
              required
              options={STATUS_OPTIONS}
              error={errors.status?.message}
              {...field}
            />
          )}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Job Description</label>
        <textarea
          rows={4}
          placeholder="Paste the job description here..."
          className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/80 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none transition-all"
          {...register('job_description')}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Notes</label>
        <textarea
          rows={3}
          placeholder="Any notes about this application..."
          className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/80 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none transition-all"
          {...register('notes')}
        />
      </div>

      <Controller
        name="resume"
        control={control}
        render={({ field: { onChange, value } }) => (
          <FileUpload
            label="Resume"
            value={value}
            onChange={onChange}
            error={errors.resume?.message}
          />
        )}
      />

      <Button type="submit" loading={loading} fullWidth size="lg">
        {submitLabel}
      </Button>
    </form>
  );
};

export default ApplicationForm;
