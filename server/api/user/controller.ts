import UserRepo from './repo';
import {inject, injectable} from 'inversify';

@injectable()
export default class UserController {

  constructor(private repo: UserRepo) {
  }

  getMany(req, res, next) {
    this.repo.getMany(req.query)
      .then(items => res.send(items))
      .catch(next);
  }

  getOne(req, res, next) {
    this.repo.getOne(req.params.id)
      .then(item => res.send(item))
      .catch(next);
  }

  handlePost(req, res, next) {
    if (req.query.queryPost) {
      this.getMany(req, res, next);
    } else {
      this.add(req, res, next);
    }
  }

  add(req, res, next) {
    this.repo.add(req.body)
      .then(item => res.send(item));
  }

  update(req, res, next) {
    this.repo.update(req.params.id, req.body)
      .then(item => res.send(item))
      .catch(next);
  }

  remove(req, res, next) {
    this.repo.remove(req.params.id)
      .then(item => {
        if (item) {
          res.send(item);
        } else {
          res.status(204).end();
        }
      })
      .catch(next);
  }

}


