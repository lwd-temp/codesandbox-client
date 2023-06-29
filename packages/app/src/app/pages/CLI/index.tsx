import React, { FunctionComponent, useEffect, useState } from 'react';
import css from '@styled-system/css';
import { withTheme } from 'styled-components';
import { Element, ThemeProvider, Button } from '@codesandbox/components';

import { useActions, useAppState } from 'app/overmind';

import { SubTitle } from 'app/components/SubTitle';
import { Title } from 'app/components/Title';

import { SignIn } from 'app/pages/SignIn/SignIn';
import { LogoFull } from '@codesandbox/common/lib/components/Logo';
import { Prompt } from './Prompt';
import { LocalStorageToken } from './LocalStorageToken';
import { DevToken } from './DevToken';
import { Container, Buttons, ContentContainer } from './elements';

/**
 * This component renders the CLI token page. By giving a query of "local=true" it will store
 * the exchange JWT token in local storage and notify when it is available. This allows an iFrame
 * codesandbox.stream page to sign in through the parent by making it open a popup to this page
 */
const AuthorizedCLI: FunctionComponent = () => {
  const { authToken, error, isLoadingAuthToken, isLoggedIn } = useAppState();
  const actions = useActions();
  const localToken = window.location.search.includes('local=true');
  const devToken = window.location.search.includes('dev=true') && window.location.origin === 'https://codesandbox.stream'

  useEffect(() => {
    // We want to reauthorize when we change logged in state
    if (isLoggedIn) {
      actions.internal.authorize();
    }
  }, [isLoggedIn]);

  if (error) {
    return (
      <>
        <LogoFull style={{ paddingBottom: 32 }} />

        <Title>An error occurred:</Title>
        <SubTitle>{error}</SubTitle>

        <Buttons>
          <Button
            autoWidth
            href="/?from-app=1"
            style={{
              fontSize: 16,
              height: 40,
              width: '100%',
              marginTop: '1rem',
            }}
          >
            Go to homepage
          </Button>
        </Buttons>
      </>
    );
  }

  if (isLoadingAuthToken) {
    return <Title>Fetching authorization key...</Title>;
  }

  if (authToken && devToken) {
    return <DevToken authToken={authToken} />
  } else if (authToken && localToken) {
    return <LocalStorageToken authToken={authToken} />
  } else if (authToken) {
    return <Prompt authToken={authToken} />
  }

  return (
    <>
      <LogoFull style={{ paddingBottom: 32 }} />
      <Title>
        Welcome to <br />
        CodeSandbox!
      </Title>

      <SubTitle style={{ paddingBottom: 16 }}>
        You need to sign in to use the CLI.
      </SubTitle>

      <SignIn />
    </>
  );
};

/**
 * This component does the initial authorization of the user, which leads to being logged in or not
 */
export const CLI: FunctionComponent = withTheme(({ theme }) => {
  const actions = useActions();

  // Because we need to run `authorize` (given we are logged in) before evaluating what to render,
  // we have to wait until the effect has run before showing any UI
  const [hasRunInitialAuthorization, setHasRunInitialAuthorization] = useState(
    false
  );

  useEffect(() => {
    actions.cliMounted().then(() => {
      setHasRunInitialAuthorization(true);
    });
  }, []);

  return (
    <ThemeProvider theme={theme.vsCode}>
      <Element
        css={css({
          width: '100vw',
          overflow: 'hidden',
          backgroundColor: 'sideBar.background',
        })}
      >
        <Container>
          <ContentContainer>
            {hasRunInitialAuthorization ? (
              <AuthorizedCLI />
            ) : (
              <Title>Authorizing...</Title>
            )}
          </ContentContainer>
        </Container>
      </Element>
    </ThemeProvider>
  );
});
