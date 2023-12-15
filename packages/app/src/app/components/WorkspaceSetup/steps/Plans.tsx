import React, { Fragment } from 'react';
import { Element, Icon, Stack, Text } from '@codesandbox/components';
import { FEATURE_LABELS, PRICING_PLANS, PlanType } from 'app/constants';
import styled from 'styled-components';
import { StyledButton } from 'app/components/dashboard/Button';
import { useHistory } from 'react-router-dom';
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
  const history = useHistory();

  const plans = Object.values(PRICING_PLANS);

  const handleChoosePlan = (plan: PlanType) => {
    const searchParams = new URLSearchParams(history.location.search);
    searchParams.set('plan', plan);
    history.replace(`${history.location.pathname}?${searchParams.toString()}`);
    onNextStep();
  };

  return (
    <AnimatedStep>
      <Stack direction="vertical" gap={6}>
        <StepHeader
          onPrevStep={onPrevStep}
          onDismiss={onDismiss}
          currentStep={currentStep}
          numberOfSteps={numberOfSteps}
          title="Choose a plan"
        />

        <Stack gap={4}>
          <StyledCard
            direction="vertical"
            align="center"
            gap={6}
            css={{ background: '#e5e5e5', width: 300 }}
          >
            <Text css={{ maxWidth: '210px', textAlign: 'center' }}>
              For learning and experimenting
            </Text>
            <Text size={9} fontFamily="everett" weight="700">
              Free
            </Text>
          </StyledCard>
          <StyledCard
            direction="vertical"
            align="center"
            gap={6}
            css={{ borderColor: '#AC9CFF' }}
          >
            <Text css={{ maxWidth: '210px', textAlign: 'center' }}>
              Pay as you go with a monthly subscription
            </Text>
            <Stack gap={4}>
              <Stack direction="vertical" gap={6}>
                <Stack direction="vertical" align="center">
                  <Text size={9} fontFamily="everett" weight="700">
                    Pro
                  </Text>
                  <Text size={9} fontFamily="everett" weight="700">
                    Flex
                  </Text>
                </Stack>
              </Stack>
              <Stack direction="vertical" gap={6}>
                <Stack direction="vertical" align="center">
                  <Text size={9} fontFamily="everett" weight="700">
                    Pro
                  </Text>
                  <Text size={9} fontFamily="everett" weight="700">
                    Standard
                  </Text>
                </Stack>
              </Stack>
              <Stack direction="vertical" gap={6}>
                <Stack direction="vertical" align="center">
                  <Text size={9} fontFamily="everett" weight="700">
                    Pro
                  </Text>
                  <Text size={9} fontFamily="everett" weight="700">
                    Growth
                  </Text>
                </Stack>
              </Stack>
            </Stack>
          </StyledCard>
          <StyledCard
            direction="vertical"
            align="center"
            gap={6}
            css={{ borderColor: '#EAFF96', width: 300 }}
          >
            <Text css={{ maxWidth: '210px', textAlign: 'center' }}>
              The future of Cloud Development Environments
            </Text>
            <Text size={9} fontFamily="everett" weight="700">
              Enterprise
            </Text>
          </StyledCard>
        </Stack>

        <StyledGrid>
          <Text />
          {plans.map(p => (
            <Text key={p.id} size={9}>
              {p.name}
            </Text>
          ))}

          <Text variant="muted">{FEATURE_LABELS.price}</Text>
          {plans.map(p => (
            <Text key={p.id} size={9}>
              ${p.price}
            </Text>
          ))}

          <Text variant="muted">{FEATURE_LABELS.credits}</Text>
          {plans.map(p => (
            <Stack key={p.id} direction="vertical" gap={1}>
              <Text size={6} key={p.id}>
                {p.credits} credits
              </Text>
              <Text variant="muted">
                {'='}
                {p.credits / 10} hours on Nano VMs
              </Text>
            </Stack>
          ))}

          <Text variant="muted">{FEATURE_LABELS.additionalCreditsCost}</Text>
          {plans.map(p => (
            <Fragment key={p.id}>
              {p.additionalCreditsCost ? (
                <Text>${p.additionalCreditsCost}/credit</Text>
              ) : (
                <Icon
                  aria-label="Additional credits cannot be bought on a free plan"
                  name="cross"
                  size={16}
                />
              )}
            </Fragment>
          ))}

          <Text variant="muted">{FEATURE_LABELS.users}</Text>
          {plans.map(p => (
            <Text size={6} key={p.id}>
              {p.users}
            </Text>
          ))}

          <Text variant="muted">{FEATURE_LABELS.sandboxes}</Text>
          {plans.map(p => (
            <Stack key={p.id} direction="vertical" gap={1}>
              <Text size={6}>{p.sandboxes.base}</Text>
              {p.sandboxes.extra50SandboxesCost ? (
                <Text variant="muted">
                  Add 50 more for ${p.sandboxes.extra50SandboxesCost}/mo
                </Text>
              ) : null}
            </Stack>
          ))}

          <Text variant="muted">{FEATURE_LABELS.devboxes}</Text>
          {plans.map(p => (
            <Text size={6} key={p.id}>
              {p.devboxes === Number.MAX_SAFE_INTEGER
                ? 'Unlimited'
                : p.devboxes}
            </Text>
          ))}

          <Text variant="muted">{FEATURE_LABELS.privateDevboxes}</Text>
          {plans.map(p => (
            <Icon
              size={16}
              key={p.id}
              name={p.privateDevboxes ? 'simpleCheck' : 'cross'}
            />
          ))}

          <Text variant="muted">{FEATURE_LABELS.privateRepositories}</Text>
          {plans.map(p => (
            <Icon
              size={16}
              key={p.id}
              name={p.privateRepositories ? 'simpleCheck' : 'cross'}
            />
          ))}

          <Text variant="muted">{FEATURE_LABELS.highestVM}</Text>
          {plans.map(p => (
            <Text size={6} key={p.id}>
              up to {p.highestVM}
            </Text>
          ))}

          <Text variant="muted">{FEATURE_LABELS.storage}</Text>
          {plans.map(p => (
            <Stack key={p.id} direction="vertical" gap={1}>
              <Text size={6}>{p.storage.base}</Text>
              {p.storage.extra20GbCost ? (
                <Text variant="muted">
                  Add 20Gb for ${p.storage.extra20GbCost}/mo
                </Text>
              ) : null}
            </Stack>
          ))}

          <Text variant="muted">{FEATURE_LABELS.api}</Text>
          {plans.map(p => (
            <Text key={p.id} size={6}>
              {p.api}
            </Text>
          ))}

          <Text />

          <StyledButton variant="secondary" onClick={onEarlyExit}>
            Choose Free
          </StyledButton>
          <StyledButton
            variant="secondary"
            onClick={() => handleChoosePlan('flex')}
          >
            Choose Flex
          </StyledButton>
          <StyledButton
            variant="primary"
            onClick={() => handleChoosePlan('standard')}
          >
            Choose Pro
          </StyledButton>
          <StyledButton
            variant="secondary"
            onClick={() => handleChoosePlan('growth')}
          >
            Choose Growth
          </StyledButton>
        </StyledGrid>
      </Stack>
    </AnimatedStep>
  );
};

const StyledGrid = styled(Element)`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 2rem;
  max-width: 1200px;
  align-items: center;

  & *:nth-child(5n + 2):not(button) {
    color: #999999;
  }
`;

const StyledCard = styled(Stack)`
  border-top: 32px solid #ccc;
  background: #fff;
  color: #000;
  padding: 40px 32px;
  border-radius: 2px;
`;
