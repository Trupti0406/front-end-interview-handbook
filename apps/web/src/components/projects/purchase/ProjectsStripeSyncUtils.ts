import type Stripe from 'stripe';

import prisma from '~/server/prisma';

import type { ProjectsSubscriptionPlan } from '@prisma/client';

export function projectsDetermineSubscriptionPlan(
  price: Stripe.Price | null,
): ProjectsSubscriptionPlan {
  if (price == null) {
    throw new Error('Price is not found');
  }

  const { type, recurring } = price;

  if (type === 'recurring' && recurring != null) {
    const { interval, interval_count: intervalCount } = recurring;

    if (interval === 'year' && intervalCount === 1) {
      return 'ANNUAL';
    }

    if (interval === 'month' && intervalCount === 1) {
      return 'MONTH';
    }
  }

  throw new Error('Unable to determine plan');
}

export async function projectsCustomerAddPlan(
  customerId: Stripe.Customer | Stripe.DeletedCustomer | string,
  planName: ProjectsSubscriptionPlan,
  invoice: Stripe.Invoice,
) {
  await prisma.projectsProfile.updateMany({
    data: {
      plan: planName,
      premium: true,
    },
    where: {
      userProfile: {
        stripeCustomer: customerId.toString(),
      },
    },
  });
}

export async function projectsCustomerRemovePlan(
  customerId: Stripe.Customer | Stripe.DeletedCustomer | string,
) {
  await prisma.projectsProfile.updateMany({
    data: {
      plan: null,
      premium: false,
    },
    where: {
      userProfile: {
        stripeCustomer: customerId.toString(),
      },
    },
  });
}