export interface JobInteractionState {
  savedJobIds: string[];
  appliedJobIds: string[];
}

export interface StoredApplication {
  id: string;
  userId: string;
  submittedAt: string;
  name: string;
  email: string;
  phone: string;
  coverLetter: string;
  resumeFileName: string;
}

export interface StoredProfileData {
  name: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
}

const safeParse = <T>(value: string | null, fallback: T): T => {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
};

const jobStateKey = (userId: string) => `mock-job-state:${userId}`;
const applicationsKey = (userId: string) => `mock-applications:${userId}`;
const profileKey = (userId: string) => `mock-profile:${userId}`;

export const getJobInteractionState = (userId: string): JobInteractionState => {
  return safeParse<JobInteractionState>(localStorage.getItem(jobStateKey(userId)), {
    savedJobIds: [],
    appliedJobIds: [],
  });
};

export const saveJobInteractionState = (
  userId: string,
  state: JobInteractionState
): void => {
  localStorage.setItem(jobStateKey(userId), JSON.stringify(state));
};

export const saveSubmittedApplication = (
  userId: string,
  application: Omit<StoredApplication, 'id' | 'userId' | 'submittedAt'>
): StoredApplication => {
  const current = safeParse<StoredApplication[]>(
    localStorage.getItem(applicationsKey(userId)),
    []
  );
  const newApplication: StoredApplication = {
    id: Date.now().toString(),
    userId,
    submittedAt: new Date().toISOString(),
    ...application,
  };
  localStorage.setItem(applicationsKey(userId), JSON.stringify([...current, newApplication]));
  return newApplication;
};

export const getStoredProfileData = (
  userId: string
): StoredProfileData | null => {
  return safeParse<StoredProfileData | null>(
    localStorage.getItem(profileKey(userId)),
    null
  );
};

export const saveStoredProfileData = (
  userId: string,
  profile: StoredProfileData
): void => {
  localStorage.setItem(profileKey(userId), JSON.stringify(profile));
};
