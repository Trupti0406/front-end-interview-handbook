import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

import { isProhibitedCountry } from '~/lib/stripeUtils';

import type { InterviewsPricingPlanType } from '~/components/interviews/purchase/InterviewsPricingPlans';

import {
  createSupabaseAdminClientGFE_SERVER_ONLY,
  readViewerFromToken,
} from '~/supabase/SupabaseServerGFE';
import { getErrorMessage } from '~/utils/getErrorMessage';

import type {
  CheckoutProductDomain,
  CheckoutQueryParams,
} from './checkout_session_internal_and_called_on_server_only__';

import type { ProjectsSubscriptionPlan } from '@prisma/client';

export const config = {
  // We have to use edge runtime because we need the geo data.
  runtime: 'edge',
};

// Prohibited by partners like DBS and Stripe.
const prohibitedCities = new Set([
  'crimea',
  'donetsk',
  'kherson',
  'luhansk',
  'zaporizhzhia',
]);

// This API exists as a standard API route because the Stripe npm module
// uses some Node.js APIs which are not available in Edge runtimes.
// So we separate out the checkout session generation functionality into
// two parts:
//  1. Part that requires next/server (available on middlewares and Edge runtime) like geolocation to get the user location and convert it into a currency (this file).
//  2. Part that requires Node.js APIs, the generation of the checkout session.
export default async function handler(req: NextRequest) {
  // Step 1: Check if request has identity.
  const user = await readViewerFromToken(
    req.cookies.get('supabase-auth-token')?.value,
  );

  if (user == null) {
    return new Response(
      JSON.stringify({
        error: {
          message: 'Unauthorized request. Check that you are logged in.',
        },
        success: false,
      }),
      {
        headers: {
          'content-type': 'application/json',
        },
        status: 401,
      },
    );
  }

  try {
    // Step 2: Check if request location is banned.
    const countryCode = req.geo?.country ?? 'US';

    if (isProhibitedCountry(countryCode)) {
      throw new Error(`Prohibited country: ${countryCode}`);
    }

    const city = req.geo?.city;

    if (city != null && prohibitedCities.has(city.toLowerCase())) {
      throw new Error(`Prohibited city: ${city}`);
    }

    const region = req.geo?.region;

    // We don't really know what region refers to, so we just check
    // against prohibited cities as well.
    if (region != null && prohibitedCities.has(region.toLowerCase())) {
      throw new Error(`Prohibited region: ${region}`);
    }

    // Step 3: Create Stripe customer if it doesn't exist for the user..
    const supabaseAdmin = createSupabaseAdminClientGFE_SERVER_ONLY();
    // Can't use Prisma here because it's not supported in edge functions.
    const { data: userProfile, error } = await supabaseAdmin
      .from('Profile')
      .select('stripeCustomer')
      .eq('id', user.id)
      .single();

    if (error != null) {
      throw new Error(error.message);
    }

    if (userProfile == null) {
      throw new Error(`No user found for ${user.id}`);
    }

    let stripeCustomerId = userProfile.stripeCustomer;

    // This happens when Supabase's webhooks don't fire during user signup
    // and there's no corresponding Stripe customer for the user.
    // We create a customer on the fly and update the `Profile` table.
    if (!stripeCustomerId) {
      console.info(`No Stripe customer found for ${user.id}, creating one`);

      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
        apiVersion: '2023-10-16',
      });

      const customer = await stripe.customers.create({
        email: user.email,
      });

      // Can't use Prisma here because it's not supported in edge functions.
      await supabaseAdmin
        .from('Profile')
        .update({
          stripeCustomer: customer.id,
        })
        .eq('id', user.id);

      stripeCustomerId = customer.id;
    }

    // Step 4: Create checkout session.
    const url = new URL(req.url);
    const { origin, searchParams } = url;
    const productDomain = searchParams.get(
      'product_domain',
    ) as CheckoutProductDomain;
    const planType = searchParams.get('plan_type');

    const commonQueryParams = {
      country_code: countryCode,
      // First Promoter tracking ID.
      first_promoter_tid: req.cookies.get('_fprom_tid')?.value,
      receipt_email: user?.email,
      stripe_customer_id: stripeCustomerId,
    };

    const queryParams: CheckoutQueryParams =
      productDomain === 'interviews'
        ? {
            ...commonQueryParams,
            plan_type: planType as InterviewsPricingPlanType,
            product_domain: productDomain,
          }
        : {
            ...commonQueryParams,
            plan_type: planType as ProjectsSubscriptionPlan,
            product_domain: productDomain,
          };

    const response = await fetch(
      `${origin}/api/payments/purchase/checkout_session_internal_and_called_on_server_only__?${new URLSearchParams(
        queryParams,
      )}`,
    );
    const payload = await response.json();

    return NextResponse.json(payload);
  } catch (error: unknown) {
    console.error(error);

    return new Response(
      JSON.stringify({
        error: {
          message: getErrorMessage(error),
        },
        success: false,
      }),
      {
        headers: {
          'content-type': 'application/json',
        },
        status: 500,
      },
    );
  }
}
