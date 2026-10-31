export interface SkillItem {
  name: string;
  level: number; // 0 to 100
  category: 'cloud' | 'security' | 'identity' | 'automation';
  icon: string;
  badge?: string;
  tags: string[];
  telemetry?: {
    metric: string;
    value: string;
  };
}

export interface CareerLog {
  id: string;
  period: string;
  role: string;
  company: string;
  location: string;
  status: 'ACTIVE_NODE' | 'ARCHIVED_NODE';
  classification: string;
  highlights: string[];
  technologies: string[];
  stats: {
    label: string;
    value: string;
  }[];
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: 'devsecops' | 'automation' | 'endpoint' | 'cloud';
  architecture: string[];
  status: 'PRODUCTION DEPLOYED' | 'OPERATIONAL' | 'VERIFIED';
  statusColor: 'cyan' | 'emerald' | 'violet';
  githubUrl: string;
  demoMetrics: {
    label: string;
    value: string;
    change?: string;
  }[];
  features: string[];
  codeFiles?: {
    filename: string;
    language: string;
    code: string;
  }[];
}

export interface TerminalHistoryItem {
  id: string;
  command: string;
  output: React.ReactNode;
  timestamp: string;
}
