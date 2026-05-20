export const formatDate = (dateStr) => {
  if (!dateStr) return '—';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
};

export const formatDateInput = (dateStr) => {
  if (!dateStr) return '';
  return new Date(dateStr).toISOString().split('T')[0];
};

export const todayISO = () => new Date().toISOString().split('T')[0];

export const getInitials = (name = '') => {
  if (!name) return 'U';
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export const truncate = (str, len = 40) => {
  if (!str) return '';
  return str.length > len ? str.slice(0, len) + '…' : str;
};

export const getPlatformLabel = (value) => {
  const map = {
    linkedin: 'LinkedIn',
    naukri: 'Naukri',
    indeed: 'Indeed',
    glassdoor: 'Glassdoor',
    company_website: 'Company Website',
    internshala: 'Internshala',
    unstop: 'Unstop',
    angellist: 'AngelList',
    referral: 'Referral',
    other: 'Other',
  };
  return map[value] || value;
};

export const getErrorMessage = (error) => {
  if (!error) return 'An error occurred';
  if (error.response?.data) {
    const data = error.response.data;
    if (typeof data === 'string') return data;
    if (data.detail) return data.detail;
    if (data.message) return data.message;
    const firstKey = Object.keys(data)[0];
    if (firstKey) {
      const val = data[firstKey];
      return Array.isArray(val) ? `${firstKey}: ${val[0]}` : `${firstKey}: ${val}`;
    }
  }
  if (error.message) return error.message;
  return 'Something went wrong';
};

export const debounce = (fn, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};
