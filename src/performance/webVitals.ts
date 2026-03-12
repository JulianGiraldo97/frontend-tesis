import { Metric } from 'web-vitals';

type VitalName = 'LCP' | 'INP' | 'CLS';
type VitalStatus = 'good' | 'needs-improvement' | 'poor';

interface VitalThreshold {
  good: number;
  poor: number;
}

interface StoredVital {
  name: VitalName;
  value: number;
  status: VitalStatus;
  path: string;
  timestamp: string;
}

const STORAGE_KEY = 'web-vitals-history';
const MAX_STORED_METRICS = 60;

export const WEB_VITAL_THRESHOLDS: Record<VitalName, VitalThreshold> = {
  LCP: { good: 2500, poor: 4000 },
  INP: { good: 200, poor: 500 },
  CLS: { good: 0.1, poor: 0.25 },
};

const getVitalStatus = (name: VitalName, value: number): VitalStatus => {
  const threshold = WEB_VITAL_THRESHOLDS[name];
  if (value <= threshold.good) return 'good';
  if (value <= threshold.poor) return 'needs-improvement';
  return 'poor';
};

const safeReadVitals = (): StoredVital[] => {
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];

  try {
    return JSON.parse(raw) as StoredVital[];
  } catch {
    return [];
  }
};

export const getStoredWebVitals = (): StoredVital[] => {
  if (typeof window === 'undefined') return [];
  return safeReadVitals();
};

export const clearStoredWebVitals = (): void => {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(STORAGE_KEY);
};

export const recordWebVitalMetric = (metric: Metric): void => {
  if (typeof window === 'undefined') return;

  const metricName = metric.name as string;
  if (!['LCP', 'INP', 'CLS'].includes(metricName)) {
    return;
  }

  const name = metricName as VitalName;
  const value = Number(metric.value.toFixed(name === 'CLS' ? 4 : 2));

  const entry: StoredVital = {
    name,
    value,
    status: getVitalStatus(name, value),
    path: window.location.pathname,
    timestamp: new Date().toISOString(),
  };

  const history = safeReadVitals();
  const next = [...history, entry].slice(-MAX_STORED_METRICS);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));

  // Útil para diagnóstico rápido en navegador sin backend.
  if (process.env.NODE_ENV !== 'test') {
    // eslint-disable-next-line no-console
    console.info('[WebVitals]', entry);
  }
};
