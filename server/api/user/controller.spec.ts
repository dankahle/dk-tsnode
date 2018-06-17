import container from '../../inversify.config';
import UserController from './controller';
import UserRepo from './repo';

describe('user controller tests', (() => {
  let sut: UserController;
  let repo = jasmine.createSpyObj('repo',['getMany', 'getOne', 'add', 'update', 'remove']);
  let res = jasmine.createSpyObj('res', ['status', 'send']);
  let next = jasmine.createSpy('next');
  let users = [{name:'dank'}, {name: 'carl'}];

  beforeAll(() => {
    repo.getMany.and.returnValue(Promise.resolve(users))
    // container.rebind(UserRepo).toConstantValue(repo); // fails randomly like below
    // it's a race condition, this binding being before we mock it, sometimes already there, sometimes not
    // this appears to be the only way to do it.
    if (container.isBound(UserRepo)) {
      container.unbind(UserRepo);
      console.log('>>>>>>>>>>> unbind')
    }
    container.bind(UserRepo).toConstantValue(repo);
    const val = container.get(UserRepo);
    sut = container.get(UserController);
  })

  // only way to test a promise chain is to wait for it as it steps out for a spin, so controller methods have to return their promise
  // then we can wait for it to test.
  it('getMany', async () => {
    const query = {};
    const req = {query};
    const val = repo.getMany({});
    await sut.getMany(<any>req, res, next)
      .then(() => {
        expect(repo.getMany).toHaveBeenCalledWith(query);
        expect(res.send).toHaveBeenCalledWith(users);
      })

  })

}))




