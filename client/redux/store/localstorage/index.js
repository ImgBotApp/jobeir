export const loadState = () => {
  if (typeof window !== 'object') {
    return;
  }

  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }

    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = state => {
  if (typeof window !== 'object') {
    return;
  }

  // try {
  //   const serializedState = JSON.stringify(state);
  //   localStorage.setItem('state', serializedState);
  // } catch (err) {
  //   console.log(err);
  // }
};
