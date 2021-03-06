import container from '../../inversify.config';
import UserController from './controller';
import UserRepo from './repo';

describe('user controller tests', (() => {
  let sut: UserController, repo, res, next, users;

  beforeEach(() => {
    repo = jasmine.createSpyObj('repo',['getMany', 'getOne', 'add', 'update', 'remove']);
    res = jasmine.createSpyObj('res', ['status', 'send']);
    next = jasmine.createSpy('next');
    users = [{name:'dank'}, {name: 'carl'}];
    // container.rebind(UserRepo).toConstantValue(repo); // fails randomly like below
    // it's a race condition, this binding being before we mock it, sometimes already there, sometimes not
    // this appears to be the only way to do it.
    if (container.isBound(UserRepo)) {
      container.unbind(UserRepo);
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
    repo.getMany.and.returnValue(Promise.resolve(users));
    await sut.getMany(<any>req, res, next)
      .then(() => {
        expect(repo.getMany).toHaveBeenCalledWith(query);
        expect(res.send).toHaveBeenCalledWith(users);
      })

  })

  it('getOne', async () => {
    const params = {id: 'xxx'};
    const req = {params};
    repo.getOne.and.returnValue(Promise.resolve(users[1]));
    await sut.getOne(<any>req, res, next)
      .then(() => {
        expect(repo.getOne).toHaveBeenCalledWith(params.id);
        expect(res.send).toHaveBeenCalledWith(users[1]);
        expect(res.send.calls.first().args[0].name).toBe('carllala');
      })

  })

}))




