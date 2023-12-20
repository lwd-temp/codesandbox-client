import React, { Fragment, useEffect, useState } from 'react';
import { Button, Element, Icon, Stack, Text } from '@codesandbox/components';
import {
  CSB_FRIENDS_LINK,
  ORGANIZATION_CONTACT_LINK,
  PlanType,
  PricingPlan,
  PricingPlanFeatures,
  UBB_ENTERPRISE_FEATURES,
  UBB_ENTERPRISE_PLAN,
  UBB_FLEX_PLAN,
  UBB_FREE_FEATURES,
  UBB_FREE_PLAN,
  UBB_GROWTH_PLAN,
  UBB_PRO_FEATURES,
  UBB_STANDARD_PLAN,
} from 'app/constants';
import styled from 'styled-components';
import { useURLSearchParams } from 'app/hooks/useURLSearchParams';
import { useActions, useAppState, useEffects } from 'app/overmind';
import { VMTier, VMType } from 'app/overmind/effects/api/types';
import { StepProps } from '../types';
import { StepHeader } from '../StepHeader';
import { AnimatedStep } from '../elements';

export const Plans: React.FC<StepProps> = ({
  onNextStep,
  onEarlyExit,
  onPrevStep,
  onDismiss,
  currentStep,
  numberOfSteps,
}) => {
  const {
    getQueryParam,
    setQueryParam,
    removeQueryParam,
  } = useURLSearchParams();
  const { activeTeam } = useAppState();
  const actions = useActions();
  const effects = useEffects();
  const urlWorkspaceId = getQueryParam('workspace');
  const [tiers, setTiers] = useState<VMTier[]>([]);

  const tierMap = tiers.reduce((acc: Record<VMType, VMTier>, tier) => {
    acc[tier.shortid] = tier;
    return acc;
  }, {} as Record<VMType, VMTier>);

  useEffect(() => {
    // Reset selected value in the URL when going on prev step
    removeQueryParam('plan');
  }, []);

  useEffect(() => {
    effects.api.getVMSpecs().then(res => setTiers(res.vmTiers));
  }, []);

  useEffect(() => {
    if (activeTeam !== urlWorkspaceId) {
      actions.setActiveTeam({ id: urlWorkspaceId });
    }
  }, [urlWorkspaceId, activeTeam]);

  const handleChoosePlan = (plan: PlanType) => {
    setQueryParam('plan', plan);
    onNextStep();
  };

  return (
    <AnimatedStep>
      <Stack direction="vertical" gap={100}>
        <Stack direction="vertical" gap={12}>
          <StepHeader
            onPrevStep={onPrevStep}
            onDismiss={onDismiss}
            currentStep={currentStep}
            numberOfSteps={numberOfSteps}
            title="Choose a plan"
          />

          <Stack gap={6}>
            <StyledCard
              direction="vertical"
              align="center"
              gap={12}
              css={{
                background: '#1d1d1d',
                color: '#e5e5e5',
                width: 300,
                '& a': { color: '#DCF76E' },
              }}
            >
              <CardHeading>For learning and experimenting</CardHeading>
              <PlanAndPricing plan={UBB_FREE_PLAN} />
              <Button
                autoWidth
                css={{ background: '#323232' }}
                variant="secondary"
                size="large"
                onClick={onEarlyExit}
              >
                Choose Free
              </Button>
              <PlanCredits plan={UBB_FREE_PLAN} />
              <PlanFeatures
                features={[
                  '5 members',
                  '20 Sandboxes',
                  'Unlimited Devboxes',
                  'Unlimited repositories',
                ]}
              />
              <PlanVMs plan={UBB_FREE_PLAN} tierMap={tierMap} />
            </StyledCard>
            <StyledCard
              direction="vertical"
              align="center"
              gap={12}
              css={{ borderColor: '#9D8BF9' }}
            >
              <CardHeading>
                Pay as you go with a monthly subscription
              </CardHeading>
              <Element
                css={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  gap: '32px',
                }}
              >
                <Stack direction="vertical" gap={12} align="center">
                  <PlanAndPricing plan={UBB_FLEX_PLAN} />
                  <Button
                    variant="dark"
                    size="large"
                    onClick={() => handleChoosePlan('flex')}
                  >
                    Choose Pro Flex
                  </Button>
                  <PlanCredits plan={UBB_FLEX_PLAN} />
                </Stack>
                <Stack direction="vertical" gap={12} align="center">
                  <PlanAndPricing plan={UBB_STANDARD_PLAN} />
                  <Button
                    variant="dark"
                    size="large"
                    onClick={() => handleChoosePlan('standard')}
                  >
                    Choose Pro Standard
                  </Button>
                  <PlanCredits plan={UBB_STANDARD_PLAN} />
                </Stack>
                <Stack direction="vertical" gap={12} align="center">
                  <PlanAndPricing plan={UBB_GROWTH_PLAN} />
                  <Button
                    variant="dark"
                    size="large"
                    onClick={() => handleChoosePlan('growth')}
                  >
                    Choose Pro Growth
                  </Button>
                  <PlanCredits plan={UBB_GROWTH_PLAN} />
                </Stack>
              </Element>
              <PlanFeatures
                features={[
                  '20 members',
                  '50 Sandboxes',
                  'Unlimited Devboxes',
                  'Unlimited repositories',
                ]}
              />
              <PlanVMs plan={UBB_STANDARD_PLAN} tierMap={tierMap} />
            </StyledCard>
            <StyledCard
              direction="vertical"
              align="center"
              gap={12}
              css={{ borderColor: '#DCF76E', width: 300 }}
            >
              <CardHeading>
                The future of Cloud Development Environments
              </CardHeading>
              <PlanAndPricing plan={UBB_ENTERPRISE_PLAN} />
              <Button
                as="a"
                href={ORGANIZATION_CONTACT_LINK}
                variant="dark"
                size="large"
              >
                Contact us
              </Button>
              <Stack direction="vertical" gap={6}>
                <Text>Everything in Pro, plus:</Text>

                <PlanFeatures
                  features={[
                    'Unlimited members',
                    'Unlimited API',
                    'On-premise options',
                    'Private managed cloud',
                    'Dedicated support',
                    'SSO',
                  ]}
                />
              </Stack>

              <PlanVMs plan={UBB_ENTERPRISE_PLAN} tierMap={tierMap} />
            </StyledCard>
          </Stack>
          <CodeSandboxFriendsCard />
        </Stack>
        <VMSpecs tiers={tiers} />
        <FeaturesComparison
          plans={[UBB_FREE_FEATURES, UBB_PRO_FEATURES, UBB_ENTERPRISE_FEATURES]}
        />
      </Stack>
    </AnimatedStep>
  );
};

const StyledCard = styled(Stack)`
  border-top: 32px solid #323232;
  background: #fff;
  color: #000;
  padding: 40px 32px;
  border-radius: 8px;
`;

const CardHeading = styled(Text)`
  text-align: center;
  max-width: 220px;
`;

const GridCell = styled(Stack)`
  padding: 32px 16px;
  height: 100px;
  width: 100%;
  max-width: 250px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const PlanAndPricing: React.FC<{ plan: PricingPlan }> = ({ plan }) => {
  const isPro = plan.id !== 'free' && plan.id !== 'enterprise';

  return (
    <Stack direction="vertical" align="center" gap={2}>
      <Stack direction="vertical" align="center">
        {isPro ? (
          <Text size={7} fontFamily="everett" weight="medium">
            Pro
          </Text>
        ) : (
          <Element css={{ height: 37 }} />
        )}

        <Text size={7} fontFamily="everett" weight="medium">
          {plan.name}
        </Text>
      </Stack>
      <Text size={9} fontFamily="everett" weight="medium">
        {typeof plan.price === 'number' ? `$${plan.price}` : plan.price}
      </Text>
      {plan.id === 'free' && <Text weight="medium">forever</Text>}
      {plan.id === 'enterprise' && <Element css={{ height: '20px' }} />}
      {isPro && <Text weight="medium">per month</Text>}
    </Stack>
  );
};

const PlanCredits: React.FC<{ plan: PricingPlan }> = ({ plan }) => (
  <Stack direction="vertical" align="center">
    <Text>{plan.credits} credits per month</Text>
    {plan.additionalCreditsCost ? (
      <Text
        size={3}
        css={{ textWrap: 'balance', textAlign: 'center', maxWidth: '180px' }}
      >
        Access on-demand credits for ${plan.additionalCreditsCost}/cr
      </Text>
    ) : null}
  </Stack>
);

const PlanFeatures: React.FC<{ features: string[] }> = ({ features }) => (
  <Stack direction="vertical" align="center">
    {features.map(feature => (
      <Text key={feature}>{feature}</Text>
    ))}
  </Stack>
);

const PlanVMs: React.FC<{
  plan: PricingPlan;
  tierMap: Record<VMType, VMTier>;
}> = ({ plan, tierMap }) => (
  <Stack direction="vertical" align="center">
    <Text>Virtual machine options:</Text>
    <Text
      as="a"
      href="#vm-types"
      css={{
        textWrap: 'balance',
        textAlign: 'center',
        textDecoration: 'none',
        color: '#4E3BB0',
      }}
    >
      {plan.availableVMs
        .map(vmType => tierMap[vmType]?.name)
        .filter(Boolean)
        .join(', ')}
    </Text>
  </Stack>
);

const CodeSandboxFriendsCard = () => (
  <Stack
    css={{
      background: '#1d1d1d',
      color: '#e5e5e5',
      padding: '24px 32px',
      borderRadius: '8px',
      maxWidth: '1360px',
    }}
    align="center"
    gap={2}
  >
    <Stack direction="vertical" gap={2}>
      <Text weight="medium" fontFamily="everett" size={6}>
        Discounts for open source and non-profits
      </Text>
      <Text css={{ textWrap: 'balance' }}>
        Through our CodeSandbox Friends program, we offer free or low-cost
        access to CodeSandbox for people working on licensed open-source
        software, developer community projects or non-profit organizations.{' '}
      </Text>
    </Stack>
    <Button
      as="a"
      autoWidth
      size="large"
      href={CSB_FRIENDS_LINK}
      target="_blank"
      rel="noopener noreferrer"
      title="Learn more about CodeSandbox Friends"
    >
      Learn more
    </Button>
  </Stack>
);

const VMSpecs: React.FC<{ tiers: VMTier[] }> = ({ tiers }) => (
  <Stack direction="vertical" align="center" gap={9} css={{ color: '#e5e5e5' }}>
    <Text weight="medium" size={7} fontFamily="everett" id="vm-types">
      Virtual machine types
    </Text>
    <Element
      css={{
        display: 'grid',
        gridTemplateColumns: `repeat(5, 1fr)`,
        '& > *:not(:nth-child(-n+5))': {
          borderTop: '1px solid #252525',
        },
      }}
    >
      <GridCell />
      <GridCell css={{ justifyContent: 'flex-start' }}>
        <Text weight="medium" size={5}>
          Credits per hour
        </Text>
      </GridCell>
      <GridCell css={{ justifyContent: 'flex-start' }}>
        <Text weight="medium" size={5}>
          Cost per hour
        </Text>
        <Text
          size={3}
          color="#999"
          css={{
            maxWidth: '180px',
            textAlign: 'center',
            textWrap: 'balance',
          }}
        >
          Maximum cost, without subscription savings
        </Text>
      </GridCell>
      <GridCell css={{ justifyContent: 'flex-start' }}>
        <Text weight="medium" size={5}>
          CPU
        </Text>
      </GridCell>
      <GridCell css={{ justifyContent: 'flex-start' }}>
        <Text weight="medium" size={5}>
          RAM
        </Text>
      </GridCell>
      {tiers.map(tier => (
        <Fragment key={tier.shortid}>
          <GridCell direction="vertical" css={{ alignItems: 'flex-start' }}>
            <Text weight="medium" size={5}>
              {tier.name}
            </Text>
            {(tier.shortid === 'vm-3' || tier.shortid === 'vm-4') && (
              <Text size={3} color="#999">
                Available on Pro
              </Text>
            )}
            {(tier.shortid === 'vm-5' || tier.shortid === 'vm-6') && (
              <Text size={3} color="#999">
                Available on Enterprise
              </Text>
            )}
          </GridCell>
          <GridCell>
            <Text>{tier.creditBasis} credits</Text>
          </GridCell>
          <GridCell>
            <Text>${tier.creditBasis * 0.018}</Text>
          </GridCell>
          <GridCell>
            <Text>{tier.cpu} cores</Text>
          </GridCell>
          <GridCell>
            <Text>{tier.memory} GB</Text>
          </GridCell>
        </Fragment>
      ))}
    </Element>
  </Stack>
);

export const FeaturesComparison: React.FC<{ plans: PricingPlanFeatures[] }> = ({
  plans,
}) => (
  <Stack direction="vertical" align="center" gap={9} css={{ color: '#e5e5e5' }}>
    <Text weight="medium" fontFamily="everett" size={7}>
      Plan details
    </Text>

    <Element
      css={{
        display: 'grid',
        gridTemplateColumns: `repeat(4, 1fr)`,
        '& > *:not(:nth-child(-n+4))': {
          borderTop: '1px solid #252525',
        },
      }}
    >
      <GridCell />
      <GridCell>
        <Text weight="medium" size={5}>
          Free
        </Text>
      </GridCell>
      <GridCell>
        <Text weight="medium" size={5}>
          Pro
        </Text>
      </GridCell>
      <GridCell>
        <Text weight="medium" size={5}>
          Enterprise
        </Text>
      </GridCell>

      <FeatureComparisonNumbersRow
        title="Editors"
        description="Maximum number of editors in the workspace."
        plans={plans}
        property="editors"
      />
      <FeatureComparisonNumbersRow
        title="Sandboxes"
        description="Maximum number of sandboxes in the workspace."
        plans={plans}
        property="sandboxes"
      />
      <FeatureComparisonNumbersRow
        title="Devboxes"
        description="Maximum number of devboxes in the workspace."
        plans={plans}
        property="devboxes"
      />
      <FeatureComparisonNumbersRow
        title="Repositories"
        description="Maximum number of repositories that can be imported in the workspace."
        plans={plans}
        property="repositories"
      />
      <FeatureComparisonBooleanRow
        title="Shareable links"
        description="Share your devboxes and sandboxes with users outside of your workspace."
        plans={plans}
        property="shareableLinks"
      />
      <FeatureComparisonBooleanRow
        title="Live sessions"
        description="Collaborate with others on your devboxes and repositories."
        plans={plans}
        property="liveSessions"
      />
      <FeatureComparisonBooleanRow
        title="Private NPM"
        description="Use private npm packages from your own custom registry."
        plans={plans}
        property="privateNPM"
      />
      <FeatureComparisonBooleanRow
        title="API access"
        description="Automatically create, share and delete sandboxes and branches."
        plans={plans}
        property="apiAccess"
      />
      <FeatureComparisonBooleanRow
        title="Protected previews"
        description="Protect who can view your dev server preview. (Coming soon)."
        plans={plans}
        property="protectedPreviews"
      />
      <FeatureComparisonBooleanRow
        title="SSO"
        description="SSO support for Okta and more."
        plans={plans}
        property="sso"
      />

      <FeatureComparisonBooleanRow
        title="Private cloud"
        description="All static files are served via CDN."
        plans={plans}
        property="privateCloud"
      />

      <FeatureComparisonBooleanRow
        title="On-premise options"
        description="Run on your own infrastructure and we manage it."
        plans={plans}
        property="onPremise"
      />

      <FeatureComparisonBooleanRow
        title="Dedicated support"
        description="SSO support for Okta and more."
        plans={plans}
        property="dedicatedSupport"
      />
    </Element>
  </Stack>
);

type FeatureComparisonRowProps = {
  plans: PricingPlanFeatures[];
  property: keyof PricingPlanFeatures;
  title: string;
  description: string;
};

const FeatureComparisonNumbersRow: React.FC<FeatureComparisonRowProps> = ({
  plans,
  property,
  title,
  description,
}) => (
  <>
    <GridCell css={{ alignItems: 'flex-start' }}>
      <Text weight="medium" size={5}>
        {title}
      </Text>
      <Text size={3} color="#999">
        {description}
      </Text>
    </GridCell>

    {plans.map(p => (
      <GridCell key={p.id}>
        {p[property] === Number.MAX_SAFE_INTEGER ? 'Unlimited' : p[property]}
      </GridCell>
    ))}
  </>
);

const FeatureComparisonBooleanRow: React.FC<FeatureComparisonRowProps> = ({
  plans,
  property,
  title,
  description,
}) => (
  <>
    <GridCell css={{ alignItems: 'flex-start' }}>
      <Text weight="medium" size={5}>
        {title}
      </Text>
      <Text size={3} color="#999">
        {description}
      </Text>
    </GridCell>

    {plans.map(p => (
      <GridCell key={p.id}>
        <Icon
          name={p[property] ? 'simpleCheck' : 'cross'}
          color={p[property] ? '#43BB30' : '#DD5F5F'}
          size={16}
        />
      </GridCell>
    ))}
  </>
);
