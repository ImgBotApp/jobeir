import React from 'react';
import styled from 'styled-components';

/**
 * Autocomplete result builds the list item seen within the
 * dropdown of Google's results. It handles breaking apart
 * the matched strings and the rest. Matched strings are regular
 * font-weight, unmatched are bold, and secondary text is a
 * lighter grey.
*/
const PrimaryText = ({ prediction }) => {
  const {
    main_text,
    main_text_matched_substrings
  } = prediction.structured_formatting;

  /**
   * When there's only a single matched string the parsing is simpler
   * since there will always be a start, matched, and end.
   */
  if (main_text_matched_substrings.length === 1) {
    const obj = main_text_matched_substrings[0];
    const currentOffset = obj.offset;
    const currentLength = obj.offset + obj.length;

    // remember, bold means unmatched/autocompleted string
    const boldStart = main_text.substring(0, currentOffset);
    const regular = main_text.substring(currentOffset, currentLength);
    const boldEnd = main_text.substring(currentOffset + currentLength);

    return (
      <ListItemPrimaryText>
        <TextBold>
          {boldStart}
        </TextBold>
        <span>
          {regular}
        </span>
        <TextBold>
          {boldEnd}
        </TextBold>
      </ListItemPrimaryText>
    );
  } else {
    /**
     * Where there are multiple matched strings we have to look over them
     * and build the dropdown item accordingly
     */
    const weights = main_text_matched_substrings.map((obj, index, array) => {
      const currentOffset = obj.offset;
      const currentLength = obj.offset + obj.length;
      const nextOffset =
        main_text_matched_substrings[index + 1] &&
        main_text_matched_substrings[index + 1].offset;
      const nextLength =
        main_text_matched_substrings[index + 1] &&
        main_text_matched_substrings[index + 1].length;
      const currentNextDifference = nextOffset - currentLength;

      const regular = main_text.substring(currentOffset, currentLength);
      const bold = Number.isNaN(currentNextDifference)
        ? main_text.substring(currentLength)
        : main_text.substring(
            currentLength + currentOffset,
            currentLength + currentNextDifference
          );

      return { bold, regular };
    });

    return (
      <ListItemPrimaryText>
        {weights.map(weight =>
          <ListItemPrimaryTextInner key={weight.regular}>
            <span>
              {weight.regular}
            </span>
            <TextBold>
              {weight.bold}
            </TextBold>
          </ListItemPrimaryTextInner>
        )}
      </ListItemPrimaryText>
    );
  }
};

// Used usually to define the City, Province and Country.
const SecondaryText = ({ text }) => {
  return (
    <ListItemSecondaryText>
      {text}
    </ListItemSecondaryText>
  );
};

const SeperatorText = () => {
  return (
    <ListItemSpace>
      {', '}
    </ListItemSpace>
  );
};

export const AutocompleteResult = ({ prediction, fetchPlaceId, selected }) => {
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
`;

const ListItemButton = styled.button`
  display: flex;
  padding: 1rem;
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 0;
  touch-callout: none;
  user-select: none;
  cursor: pointer;
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
