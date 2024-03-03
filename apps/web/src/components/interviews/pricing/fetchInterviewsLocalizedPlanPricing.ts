import type { InterviewsPricingPlansLocalized } from '~/data/interviews/InterviewsPricingPlans';
import { InterviewsPricingPlansConfig } from '~/data/interviews/InterviewsPricingPlans';
import pppValues from '~/data/purchase/purchasingPowerParity.json';

import type { PurchasingPowerParity } from '~/components/payments/PurchasePPPUtils';
import {
  defaultPpp,
  localizePlanDetails,
} from '~/components/payments/PurchasePPPUtils';

import logMessage from '~/logging/logMessage';

type CountryCode = keyof typeof pppValues;

export default async function fetchInterviewsLocalizedPlanPricing(
  countryCode: string,
): Promise<InterviewsPricingPlansLocalized> {
  // Default PPP.
  let purchasingPowerParity: PurchasingPowerParity = defaultPpp;

  try {
    if (countryCode !== 'US') {
      // TODO: Make a union for country codes.
      if (pppValues[countryCode as CountryCode] == null) {
        throw 'Error fetching details';
      }
      purchasingPowerParity = pppValues[countryCode as CountryCode];
    }
  } catch {
    // Ignore and proceed with default ppp.
    logMessage({
      level: 'error',
      message: `Error fetching purchasing power parity for ${countryCode}`,
      title: 'Purchasing power parity error',
    });
    // Fallback to US ppp.
    purchasingPowerParity = defaultPpp;
  }

  // Repeating for typesafety.
  return {
    annual: {
      ...localizePlanDetails(
        countryCode,
        InterviewsPricingPlansConfig.annual,
        purchasingPowerParity,
      ),
      planType: 'annual',
    },
    lifetime: {
      ...localizePlanDetails(
        countryCode,
        InterviewsPricingPlansConfig.lifetime,
        purchasingPowerParity,
      ),
      planType: 'lifetime',
    },
    monthly: {
      ...localizePlanDetails(
        countryCode,
        InterviewsPricingPlansConfig.monthly,
        purchasingPowerParity,
      ),
      planType: 'monthly',
    },
    quarterly: {
      ...localizePlanDetails(
        countryCode,
        InterviewsPricingPlansConfig.quarterly,
        purchasingPowerParity,
      ),
      planType: 'quarterly',
    },
  };
}
