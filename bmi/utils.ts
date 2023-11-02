const enum Rating {
  Bad = 1,
  OK = 2,
  Good = 3
}

const enum RatingDescription {
  Bad = 'You need to work harder!',
  OK = 'Not too bad, but could be better',
  Good = 'Great job!'
}

export const ratingHelper = (average: number, target: number): Rating => {
  const getRating = average / target;

  if (getRating > 1) return Rating.Good;
  if (getRating > 0.8) return Rating.OK;
  return Rating.Bad;
};

export const descriptionHelper = (rating: Rating): string => {
  switch (rating) {
    case Rating.Good:
      return RatingDescription.Good;
    case Rating.OK:
      return RatingDescription.OK;
    case Rating.Bad:
      return RatingDescription.Bad;
    default:
      throw new Error('There was a problem with rating');
  }
};

export const isNotNumber = (argument: unknown): boolean => {
  return isNaN(Number(argument));
};
