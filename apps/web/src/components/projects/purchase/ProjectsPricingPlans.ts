import type {
  PurchasePrice,
  PurchasePricingPlanPaymentConfigBase,
} from '~/data/purchase/PurchaseTypes';

import type { ProjectsSubscriptionPlan } from '@prisma/client';

export type ProjectsSubscriptionPlanIncludingFree =
  | ProjectsSubscriptionPlan
  | 'FREE';

export type ProjectsPricingPlanPaymentConfigLocalized = PurchasePrice &
  PurchasePricingPlanPaymentConfigBase;

export type ProjectsPricingPlanPaymentConfigLocalizedRecord = Record<
  ProjectsSubscriptionPlan,
  ProjectsPricingPlanPaymentConfigLocalized
>;

export const ProjectsPricingPlansPaymentConfig: Record<
  ProjectsSubscriptionPlan,
  PurchasePricingPlanPaymentConfigBase
> = {
  ANNUAL: {
    allowPromoCode: true,
    basePriceInUSD: {
      after: 108,
      before: 108, // Not used
    },
    checkoutMode: 'subscription',
    discount: 20,
    priceType: 'recurring',
    recurring: { count: 1, interval: 'year' },
  },
  MONTH: {
    allowPromoCode: true,
    basePriceInUSD: {
      after: 15,
      before: 15, // Not used
    },
    checkoutMode: 'subscription',
    discount: 0,
    priceType: 'recurring',
    recurring: { count: 1, interval: 'month' },
  },
};
