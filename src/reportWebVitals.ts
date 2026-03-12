import { onCLS, onINP, onLCP, type Metric } from 'web-vitals';

type WebVitalsHandler = (metric: Metric) => void;

const reportWebVitals = (onPerfEntry?: WebVitalsHandler) => {
  if (!onPerfEntry) return;

  onCLS(onPerfEntry);
  onINP(onPerfEntry);
  onLCP(onPerfEntry);
};

export default reportWebVitals;
