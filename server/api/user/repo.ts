import mg from 'mongoose';
import _ from 'lodash';


const schema = new mg.Schema({
  name: String,
  age: Number
});
schema.set('toObject', {
  virtuals: true,
  transform: (doc, rtn) => _.omit(rtn, ['_id'])
});

export default class UserRepo {
  Model;

  constructor() {
    this.Model = mg.model('User', schema);
  }

  getMany(filter) {
    return this.Model.find(filter).exec();
  }

  getOne(id) {
    return this.Model.findById(id).exec()
  }

  add(data) {
    return new this.Model(data).save();
  }

  update(id, data) {
    return this.Model.findById(id).exec()
      .then(doc => {
        doc = Object.assign(doc, data);
        return doc.save();
      })
  }

  remove(id) {
    return this.Model.findById(id).exec()
      .then(doc => {
        if (doc) {
          return this.Model.remove({_id: id})
            .then(() => doc)
        } else {
          return Promise.resolve();
        }
      })


    return this.Model.remove({_id: id})
  }

}


