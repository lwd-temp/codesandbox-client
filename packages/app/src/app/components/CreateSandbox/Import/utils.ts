import { OrganizationFragment, ProfileFragment } from 'app/graphql/types';
import { findBestMatch } from 'string-similarity';
import track from '@codesandbox/common/lib/utils/analytics';

const REGEX_PLAIN = /(?<owner>^\w+)(?<slash>\/)(?<name>[\w.-]+$)/g;

export const getOwnerAndNameFromInput = (input: string) => {
  let sanitizedInput = input.replace(/\s/, '');

  // Invalidate if input is empty.
  if (!sanitizedInput) {
    return null;
  }

  // If it starts with "www.", "github.com" or "http(s?)://", it
  // should be an url.
  if (sanitizedInput.match(/(^www.)|(^github.com)|(^http(s?):\/\/)/g)) {
    try {
      // If the input doesn't start with "http(s?)://", add it so
      // the new URL constructor.
      const parsedUrl = new URL(
        /^(?!https?:\/\/)/g.test(sanitizedInput)
          ? `https://${sanitizedInput}`
          : sanitizedInput
      );

      // Remove slashes from the beginning and end of the
      // pathname before splitting it, also remove ".git".
      const pathnameParts = parsedUrl.pathname
        .replace(/^\/|(\/$)|(\.git$)/g, '')
        .split('/');

      // If the pathname is correctly formed (owner/name),
      // the length should equal 2.
      if (pathnameParts.length !== 2) {
        throw new Error('Invalid pathanme.');
      }

      return { owner: pathnameParts[0], name: pathnameParts[1] };
    } catch (error) {
      return null;
    }
  }

  // Check if the input is a SSH clone url.
  if (sanitizedInput.startsWith('git@')) {
    // If it's the case, extract the owner and name
    // to be returned in the next step.
    sanitizedInput = sanitizedInput.replace(/^git@github.com:|(\.git$)/g, '');
  }

  // Check if the input matches "owner/name".
  if (sanitizedInput.match(REGEX_PLAIN)) {
    const matches = REGEX_PLAIN.exec(sanitizedInput);
    return matches?.groups
      ? { owner: matches.groups.owner, name: matches.groups.name }
      : null;
  }

  return null;
};

export const fuzzyMatchGithubToCsb = (
  teamName: string,
  accounts: Array<ProfileFragment | OrganizationFragment>
) => {
  const match = findBestMatch(
    teamName,
    accounts.map(account => account.login)
  );

  const bestMatch = accounts.find(
    account => account.login === match.bestMatch.target
  );

  if (bestMatch) {
    track('Match GH to CSB - success', {
      codesandbox: 'V1',
      event_source: 'UI',
    });

    return bestMatch;
  }

  track('Match GH to CSB - fail', {
    codesandbox: 'V1',
    event_source: 'UI',
  });

  return accounts[0];
};

export const getEventName = (
  isEligibleForTrial: boolean,
  isTeamAdmin: boolean
): string => {
  if (isEligibleForTrial) {
    const event = 'Limit banner: import - Start trial';
    return isTeamAdmin ? event : `${event} - As non-admin`;
  }

  return 'Limit banner: import - Upgrade';
};
