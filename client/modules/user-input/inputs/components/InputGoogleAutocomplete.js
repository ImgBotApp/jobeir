import React from 'react';
import styled from 'styled-components';

const PrimaryText = text => {
  return (
    <div>
      {text}
    </div>
  );
};

const SecondaryText = text => {
  return (
    <div>
      {text}
    </div>
  );
};

export const InputGoogleAutocomplete = prediction => {
  console.log(prediction);
  const {
    main_text,
    secondary_text,
    main_text_matched_substrings,
    matched_substrings
  } = prediction.structured_formatting;
  const mainTextArray = main_text.split('');

  if (main_text_matched_substrings.length === 1) {
    const obj = main_text_matched_substrings[0];
    const currentOffset = obj.offset;
    const currentLength = obj.offset + obj.length;

    const regularStart = main_text.substring(0, currentOffset);
    const bold = main_text.substring(currentOffset, currentLength);
    const regularEnd = main_text.substring(currentOffset + currentLength);

    console.log({ regularStart, bold, regularEnd });
  } else {
    const matchedStrings = main_text_matched_substrings.map(
      (obj, index, array) => {
        const currentOffset = obj.offset;
        const currentLength = obj.offset + obj.length;
        const nextOffset =
          main_text_matched_substrings[index + 1] &&
          main_text_matched_substrings[index + 1].offset;
        const nextLength =
          main_text_matched_substrings[index + 1] &&
          main_text_matched_substrings[index + 1].length;
        const currentNextDifference = nextOffset - currentLength;
        console.log(currentNextDifference);

        const bold = main_text.substring(currentOffset, currentLength);

        const regular = Number.isNaN(currentNextDifference)
          ? main_text.substring(currentLength)
          : main_text.substring(
              currentLength + currentOffset,
              currentLength + currentNextDifference
            );

        return { bold, regular };
      }
    );

    console.log(matchedStrings);
  }

  return (
    <ul>
      <PrimaryText />
      <SecondaryText text={secondary_text} />
    </ul>
  );
};

export default InputGoogleAutocomplete;

const yolo = styled.div``;
