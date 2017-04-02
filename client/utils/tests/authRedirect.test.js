import authRedirect from '../authRedirect';

describe('[Utility] authRedirect', () => {
  it('should a login next path if no signup path matches', () => {
    expect(authRedirect('/path')).toEqual('/login?next=/path');
  });

  it('should a signup next path if no signup path matches', () => {
    expect(authRedirect('/create/job')).toEqual('/signup?next=/create/job');
  });
});
