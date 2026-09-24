/**
 * Mark Tech Professional Product & Case Study Type Contracts
 * Governs MarkCare HMS, EduFlow, VERIQ, and future enterprise software products.
 */

export type VerificationStatus = 'VERIFIED' | 'INTEGRATION-READY' | 'ROADMAP';

export type ProductStatus = 'Production' | 'Active Development' | 'Beta' | 'Archived';

export type ProductCategory = 
  | 'Healthcare Informatics'
  | 'Educational Systems'
  | 'Verification & Telemetry'
  | 'Enterprise Web Platforms';

export type TechnologyLayer = 'Frontend' | 'Backend' | 'Database' | 'DevOps' | 'Security';

export interface TechnologyItem {
  name: string;
  layer: TechnologyLayer;
  version?: string;
  purpose: string;
}

export interface CapabilityItem {
  title: string;
  description: string;
  status: VerificationStatus;
}

export interface TechnicalChallenge {
  challenge: string;
  architecturalMitigation: string;
  outcome: string;
}

export interface TelemetryMetric {
  label: string;
  value: string;
  benchmarkContext: string;
}

export interface MediaAsset {
  url: string;
  alt: string;
  caption?: string;
  type: 'screenshot' | 'architecture-diagram' | 'mockup' | 'telemetry';
}

export interface CaseStudy {
  executiveSummary: string;
  problemStatement: string;
  solutionArchitecture: string;
  challenges: TechnicalChallenge[];
  capabilities: CapabilityItem[];
  telemetryMetrics: TelemetryMetric[];
  githubUrl?: string;
  liveUrl?: string;
  documentationUrl?: string;
}

export interface ProductContract {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: ProductCategory;
  status: ProductStatus;
  featured: boolean;
  order: number;
  coverImage: string;
  technologies: TechnologyItem[];
  caseStudy: CaseStudy;
  mediaGallery: MediaAsset[];
  createdAt: string;
  updatedAt: string;
}