import type Stripe from 'stripe';

type PriceValues = Readonly<{
  after: number;
  before: number;
}>;

type UnitCostPrice = Readonly<{
  base: PriceValues;
  withPPP: PriceValues;
}>;

export type PurchasePrice = Readonly<{
  conversionFactor: number;
  countryCode: string;
  currency: string;
  symbol: string;
  unitCostCurrency: UnitCostPrice;
  unitCostUSD: UnitCostPrice;
}>;

export type PurchasePricingPlanDetailsBase = Readonly<{
  allowPromoCode: boolean;
  basePriceInUSD: PriceValues;
  checkoutMode: Stripe.Checkout.Session.Mode;
  // Vs monthly for recurring. Vs before for one-time.
  discount: number;
  priceType: Stripe.Price.Type;
  // Null when one-time payment.
  recurring: Readonly<{
    count: number;
    interval: Stripe.Price.Recurring.Interval;
  }> | null;
}>;

export type PurchasePricingPlanDetailsLocalized = PurchasePrice &
  PurchasePricingPlanDetailsBase;
