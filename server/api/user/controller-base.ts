import UserRepo from './repo';


export class ControllerBase {
  constructor(protected repo: UserRepo, private val) {
  }

  getOne(req, res, next) {
    return this.repo.getOne(req.params.id)
      .then(item => {
        item.name = item.name + this.val;
        return item;
      })
      .then(item => res.send(item))
      .catch(next);
  }

}
