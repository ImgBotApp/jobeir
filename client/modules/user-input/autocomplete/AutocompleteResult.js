// @flow
import React from 'react';
import styled from 'styled-components';
import { media } from '../../../styles/breakpoints';

/**
 * Autocomplete result builds the list item seen within the
 * dropdown of Google's results. It handles breaking apart
 * the matched strings and the rest. Matched strings are regular
 * font-weight, unmatched are bold, and secondary text is a
 * lighter grey.
*/
const PrimaryText = (props: {
  prediction: {
    structured_formatting: {
      main_text: string,
      main_text_matched_substrings: Array<{ offset: number, length: number }>
    }
  }
}) => {
  const {
    main_text,
    main_text_matched_substrings
  } = props.prediction.structured_formatting;

  /**
   * When there's only a single matched string the parsing is simpler
   * since there will always be a start, matched, and end.
   */
  if (main_text_matched_substrings.length === 1) {
    const obj: { offset: number, length: number } =
      main_text_matched_substrings[0];

    const currentOffset: number = obj.offset;
    const currentLength: number = obj.offset + obj.length;

    // remember, bold means unmatched/autocompleted string
    const boldStart: string = main_text.substring(0, currentOffset);
    const regular: string = main_text.substring(currentOffset, currentLength);
    const boldEnd: string = main_text.substring(currentOffset + currentLength);

    return (
      <ListItemPrimaryText>
        <TextBold>{boldStart}</TextBold>
        <span>{regular}</span>
        <TextBold>{boldEnd}</TextBold>
      </ListItemPrimaryText>
    );
  }
  /**
   * Where there are multiple matched strings we have to look over them
   * and build the dropdown item accordingly
   */
  const weights: Array<{
    regular: string,
    bold: string
  }> = main_text_matched_substrings.map(
    (obj: { offset: number, length: number }, index: number) => {
      const currentOffset: number = obj.offset;
      const currentLength: number = obj.offset + obj.length;
      const nextOffset: number =
        main_text_matched_substrings[index + 1] &&
        main_text_matched_substrings[index + 1].offset;
      const currentNextDifference: number = nextOffset - currentLength;

      const regular: string = main_text.substring(currentOffset, currentLength);
      const bold: string = Number.isNaN(currentNextDifference)
        ? main_text.substring(currentLength)
        : main_text.substring(
            currentLength + currentOffset,
            currentLength + currentNextDifference
          );

      return { bold, regular };
    }
  );

  return (
    <ListItemPrimaryText>
      {weights.map(weight => (
        <ListItemPrimaryTextInner key={weight.regular}>
          <span>{weight.regular}</span>
          <TextBold>{weight.bold}</TextBold>
        </ListItemPrimaryTextInner>
      ))}
    </ListItemPrimaryText>
  );
};

// Used usually to define the City, Province and Country.
const SecondaryText = (props: { text: string }) => (
  <ListItemSecondaryText>{props.text}</ListItemSecondaryText>
);

const SeperatorText = () => <ListItemSpace>{', '}</ListItemSpace>;

/**
 * <AutocompleteResult />
 * Builds  the autocomplete result list item. This is looped over and creates
 * each text list item within the dropdown of the autocomplete input
 * @param {*} props 
 */
const AutocompleteResult = (props: {
  prediction: {},
  fetchPlaceId: Function,
  selected: boolean
}) => {
  const { prediction, fetchPlaceId, selected } = props;

  return (
    <ListItem onClick={fetchPlaceId} selected={selected}>
      <PrimaryText prediction={prediction} />
      <SeperatorText />
      <SecondaryText text={prediction.structured_formatting.secondary_text} />
    </ListItem>
  );
};

export default AutocompleteResult;

const ListItem = styled.li`
  display: flex;
  padding: 16px 18px;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  border-bottom: 1px solid #e8e8e8;
  background: ${props => (props.selected ? 'rgba(0, 0, 0, 0.05)' : '#fff')};

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }

  ${media.phablet`
    padding: 14px 15px;
  `};
`;

const ListItemSpace = styled.span`
  font-size: 16px;
  white-space: nowrap;
`;

const ListItemSecondaryText = styled.div`
  font-size: 16px;
  font-weight: 200;
  margin-left: 0.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #7e7c7c;
`;

const ListItemPrimaryText = styled.span`
  font-size: 16px;
  white-space: nowrap;
`;

const ListItemPrimaryTextInner = styled.span``;

const TextBold = styled.span`font-weight: 800;`;
