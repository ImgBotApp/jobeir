import React from 'react';
import styled from 'styled-components';

const PrimaryText = ({ prediction }) => {
  const {
    main_text,
    main_text_matched_substrings
  } = prediction.structured_formatting;

  if (main_text_matched_substrings.length === 1) {
    const obj = main_text_matched_substrings[0];
    const currentOffset = obj.offset;
    const currentLength = obj.offset + obj.length;

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

export const InputGoogleAutocomplete = ({ prediction, fetchPlaceId }) => {
  const {
    main_text,
    secondary_text,
    main_text_matched_substrings,
    matched_substrings
  } = prediction.structured_formatting;

  return (
    <ListItem onClick={fetchPlaceId}>
      <PrimaryText prediction={prediction} />
      <SeperatorText />
      <SecondaryText text={secondary_text} />
    </ListItem>
  );
};

export default InputGoogleAutocomplete;

const ListItem = styled.li`
  display: flex;
  padding: 16px 18px;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;

  &:not(:last-child) {
    border-bottom: 1px solid #e8e8e8;
  }

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

const ListItemSpace = styled.span`font-size: 16px;`;

const ListItemSecondaryText = styled.div`
  font-size: 16px;
  font-weight: 200;
  margin-left: 0.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #7e7c7c;
`;
const ListItemPrimaryText = styled.span`font-size: 16px;`;

const ListItemPrimaryTextInner = styled.span``;

const TextBold = styled.span`font-weight: 800;`;
