// FILEPATH: /Users/pmueller/workspace/intern/cashbox/frontend/src/app/auth/auth.model.spec.ts

import { Auth } from './auth.model';

describe('Auth', () => {
  let auth: Auth;

  beforeEach(() => {
    auth = new Auth('test@test.com', 'token', new Date());
  });

  it('should be created', () => {
    expect(auth).toBeTruthy();
  });

  it('should return token if token expiration date is in the future', () => {
    auth = new Auth('test@test.com', 'token', new Date(new Date().getTime() + 10000));
    expect(auth.token).toEqual('token');
  });

  it('should return null if token expiration date is in the past', () => {
    auth = new Auth('test@test.com', 'token', new Date(new Date().getTime() - 10000));
    expect(auth.token).toBeNull();
  });

  it('should return null if token expiration date is not set', () => {
    auth = new Auth('test@test.com', 'token', null);
    expect(auth.token).toBeNull();
  });
});