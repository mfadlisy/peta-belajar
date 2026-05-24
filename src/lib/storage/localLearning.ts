export interface LearningProfile {
  vark_scores: { V: number; A: number; R: number; K: number };
  kolb_style: string;
  sdlrs_score: number;
  sdlrs_level?: string;
  updated_at?: string;
}

export interface LocalRoadmapStep {
  id: string;
  title: string;
  description: string;
  source_url: string;
  source_type: string;
  step_order: number;
  is_completed: boolean;
  learning_style_focus: string;
}

export interface LocalRoadmap {
  id: string;
  title: string;
  description: string;
  steps: LocalRoadmapStep[];
  updated_at?: string;
}

const PROFILE_KEY = 'peta_belajar_profile';
const ROADMAP_KEY = 'peta_belajar_roadmap';
const LEGACY_PROFILE_KEY = 'temp_assessment_results';
const LEGACY_ROADMAP_KEY = 'temp_roadmap_data';

const defaultProfile: LearningProfile = {
  vark_scores: { V: 2, A: 1, R: 1, K: 2 },
  kolb_style: 'Converger',
  sdlrs_score: 7,
  sdlrs_level: 'Cukup Mandiri (Moderate Learner Autonomy)',
};

function canUseStorage() {
  return typeof window !== 'undefined' && Boolean(window.localStorage);
}

function readJson<T>(key: string): T | null {
  if (!canUseStorage()) return null;

  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function writeJson<T>(key: string, value: T) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function getLearningProfile(): LearningProfile {
  const profile = readJson<LearningProfile>(PROFILE_KEY);
  if (profile) return profile;

  const legacy = readJson<{
    varkScores?: LearningProfile['vark_scores'];
    kolbStyle?: string;
    sdlrsScore?: number;
    sdlrsLevel?: string;
  }>(LEGACY_PROFILE_KEY);

  if (legacy) {
    const migrated = saveLearningProfile({
      vark_scores: legacy.varkScores || defaultProfile.vark_scores,
      kolb_style: legacy.kolbStyle || defaultProfile.kolb_style,
      sdlrs_score: legacy.sdlrsScore || defaultProfile.sdlrs_score,
      sdlrs_level: legacy.sdlrsLevel || defaultProfile.sdlrs_level,
    });
    window.localStorage.removeItem(LEGACY_PROFILE_KEY);
    return migrated;
  }

  return defaultProfile;
}

export function saveLearningProfile(profile: LearningProfile): LearningProfile {
  const value = {
    ...profile,
    updated_at: new Date().toISOString(),
  };
  writeJson(PROFILE_KEY, value);
  return value;
}

export function getRoadmap(): LocalRoadmap | null {
  const roadmap = readJson<LocalRoadmap>(ROADMAP_KEY);
  if (roadmap) return roadmap;

  const legacy = readJson<Omit<LocalRoadmap, 'id' | 'updated_at'> & { id?: string }>(LEGACY_ROADMAP_KEY);
  if (legacy) {
    const migrated = saveRoadmap({
      id: legacy.id || 'local',
      title: legacy.title,
      description: legacy.description,
      steps: legacy.steps || [],
    });
    window.localStorage.removeItem(LEGACY_ROADMAP_KEY);
    return migrated;
  }

  return null;
}

export function saveRoadmap(roadmap: LocalRoadmap): LocalRoadmap {
  const value = {
    ...roadmap,
    updated_at: new Date().toISOString(),
  };
  writeJson(ROADMAP_KEY, value);
  return value;
}

export function clearLocalLearningData() {
  if (!canUseStorage()) return;
  window.localStorage.removeItem(PROFILE_KEY);
  window.localStorage.removeItem(ROADMAP_KEY);
  window.localStorage.removeItem(LEGACY_PROFILE_KEY);
  window.localStorage.removeItem(LEGACY_ROADMAP_KEY);
}
