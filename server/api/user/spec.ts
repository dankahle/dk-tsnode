import injector from '../../inversify.config';
import UserController from './controller';

describe('spec tests', (() => {
  let sut: UserController

  beforeAll(() => {
    sut = injector.get(UserController);
    const i = 5;
  })

  it('ctrl test', () => {
    expect(true).toBe(true);
  })

}))




