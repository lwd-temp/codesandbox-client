export const DIALOG_TRANSITION_DURATION = 0.25;
export const DIALOG_WIDTH = 420;
export const REPLY_TRANSITION_DELAY = 0.5;
export const SUBSCRIPTION_DOCS_URLS = {
  teams: {
    trial: '/docs/learn/plans/trials',
    non_trial: '/docs/learn/plans/workspace#managing-teams-and-subscriptions',
  },
};
export const ORGANIZATION_CONTACT_LINK =
  'https://webforms.pipedrive.com/f/ckvSiEQynHckLBoq0wghZhoy9cQGYZrzaCwP7suEln3tMu5zgFKxY6sSZjTYLRC16X';

export const CSB_FRIENDS_LINK = 'https://codesandbox.typeform.com/friends';

export interface Feature {
  key: string;
  label: string;
  pill?: string;
  highlighted?: boolean;
}

export const FREE_FEATURES: Feature[] = [
  {
    key: 'editor',
    label: 'Up to 5 editors',
  },
  {
    key: 'public_limit',
    label: 'Public repositories',
  },
  {
    key: 'public_boxes',
    label: 'Public devboxes and sandboxes',
  },
  { key: 'npm', label: 'Public npm packages' },
  { key: 'permissions', label: 'Limited permissions' },
  { key: 'vm_mem', label: '2GiB RAM' },
  { key: 'vm_cpu', label: '2 vCPUs' },
  { key: 'vm_disk', label: '6GB Disk' },
];

export const PRO_FEATURES: Feature[] = [
  {
    key: 'editors',
    label: 'Unlimited editors',
  },
  {
    key: 'repos',
    label: 'Unlimited private repositories',
  },
  {
    key: 'boxes',
    label: 'Unlimited private devboxes and sandboxes',
  },
  { key: 'npm', label: 'Private npm packages' },
  { key: 'live_sessions', label: 'Live sessions' },

  { key: 'vm_mem', label: '8GiB RAM' },
  { key: 'vm_cpu', label: '4 vCPUs' },
  { key: 'vm_disk', label: '12GB Disk' },
];

export const PRO_FEATURES_WITH_PILLS: Feature[] = [
  {
    key: 'editors',
    label: 'Unlimited editors',
  },
  {
    key: 'repos',
    label: 'Unlimited private repositories',
  },
  {
    key: 'boxes',
    label: 'Unlimited private devboxes and sandboxes',
  },
  { key: 'npm', label: 'Private npm packages' },
  { key: 'live_sessions', label: 'Live sessions' },

  { key: 'vm_mem', label: '8GiB RAM', pill: '4x capacity' },
  { key: 'vm_cpu', label: '4 vCPUs', pill: '2x faster' },
  { key: 'vm_disk', label: '12GB Disk', pill: '2x storage' },
];

export const ORG_FEATURES: Feature[] = [
  {
    key: 'intro',
    label: 'All Pro features, plus:',
  },
  { key: 'specs', label: 'Custom VM Specs' },
  { key: 'support', label: 'Custom support and Slack channel' },
  { key: 'customer', label: 'Customer success manager' },
];

// Soft limit of maximum amount of pro
// editor a team can have. Above this,
// we should prompt CTAs to enable
// custom pricing.
export const MAX_PRO_EDITORS = 20;

export const MAX_TEAM_FREE_EDITORS = 5;

export type PricingPlan = {
  id: string;
  name: string;
  price: number | string;
  credits: number;
  additionalCreditsCost: number | null;
  availableVMs: VMType[];
};

export type PricingPlanFeatures = {
  id: string;
  name: string;
  editors: number;
  sandboxes: number;
  devboxes: number;
  repositories: number;
  shareableLinks: boolean;
  privateNPM: boolean;
  liveSessions: boolean;
  apiAccess: boolean;
  protectedPreviews: boolean;
  sso: boolean;
  privateCloud: boolean;
  onPremise: boolean;
};

export type PlanType = 'free' | 'flex' | 'standard' | 'growth' | 'enterprise';

export type VMType = 'vm-1' | 'vm-2' | 'vm-3' | 'vm-4' | 'vm-5' | 'vm-6';

export const UBB_FREE_PLAN: PricingPlan = {
  id: 'free',
  name: 'Free',
  price: 0,
  credits: 400,
  additionalCreditsCost: null,
  availableVMs: ['vm-1', 'vm-2'],
};

export const UBB_FLEX_PLAN: PricingPlan = {
  id: 'flex',
  name: 'Flex',
  price: 9,
  credits: 500,
  additionalCreditsCost: 0.018,
  availableVMs: ['vm-1', 'vm-2', 'vm-3', 'vm-4'],
};

export const UBB_STANDARD_PLAN: PricingPlan = {
  id: 'pro',
  name: 'Standard',
  price: 18,
  credits: 1500,
  additionalCreditsCost: 0.018,
  availableVMs: ['vm-1', 'vm-2', 'vm-3', 'vm-4'],
};

export const UBB_GROWTH_PLAN: PricingPlan = {
  id: 'growth',
  name: 'Growth',
  price: 38,
  credits: 3000,
  additionalCreditsCost: 0.018,
  availableVMs: ['vm-1', 'vm-2', 'vm-3', 'vm-4'],
};

export const UBB_ENTERPRISE_PLAN: PricingPlan = {
  id: 'enterprise',
  name: 'Enterprise',
  price: 'Custom',
  credits: 0,
  additionalCreditsCost: 0,
  availableVMs: ['vm-1', 'vm-2', 'vm-3', 'vm-4', 'vm-5', 'vm-6'],
};

export const UBB_FREE_FEATURES: PricingPlanFeatures = {
  id: 'free',
  name: 'Free',
  editors: 5,
  sandboxes: 20,
  devboxes: Number.MAX_SAFE_INTEGER,
  repositories: Number.MAX_SAFE_INTEGER,
  shareableLinks: true,
  privateNPM: false,
  liveSessions: false,
  apiAccess: false,
  protectedPreviews: false,
  sso: false,
  privateCloud: false,
  onPremise: false,
};

export const UBB_PRO_FEATURES: PricingPlanFeatures = {
  id: 'pro',
  name: 'Pro',
  editors: 20,
  sandboxes: 50,
  devboxes: Number.MAX_SAFE_INTEGER,
  repositories: Number.MAX_SAFE_INTEGER,
  shareableLinks: true,
  privateNPM: true,
  liveSessions: true,
  apiAccess: false,
  protectedPreviews: false,
  sso: false,
  privateCloud: false,
  onPremise: false,
};

export const UBB_ENTERPRISE_FEATURES: PricingPlanFeatures = {
  id: 'enterprise',
  name: 'Enterprise',
  editors: Number.MAX_SAFE_INTEGER,
  sandboxes: Number.MAX_SAFE_INTEGER,
  devboxes: Number.MAX_SAFE_INTEGER,
  repositories: Number.MAX_SAFE_INTEGER,
  shareableLinks: true,
  privateNPM: true,
  liveSessions: true,
  apiAccess: true,
  protectedPreviews: true,
  sso: true,
  privateCloud: true,
  onPremise: true,
};

export const PRICING_PLANS: Record<PlanType, PricingPlan> = {
  free: UBB_FREE_PLAN,
  flex: UBB_FLEX_PLAN,
  standard: UBB_STANDARD_PLAN,
  growth: UBB_GROWTH_PLAN,
  enterprise: UBB_ENTERPRISE_PLAN,
};
