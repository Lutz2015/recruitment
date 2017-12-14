/**
 * Created by Logan on 2017/10/28.
 */
module.exports = {
    error(res, msg = 'parameter error') {
        res.json({
            status: -1,
            msg,
            data: null
        })
    },
    success(res, data = {}) {
        res.json({
            status: 0,
            msg: null,
            data
        })
    },
    getError(msg) {
        return {
            status: -1,
            msg,
            data: null
        }
    },
    getSuccess(data) {
        return {
            status: 0,
            msg: null,
            data
        }
    },
    findAll(model, conditions = {}) {
        return new Promise((resolve, reject) => {
            model.find(conditions, (err, doc) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(doc)
                }
            })
        })
    },
    findOne(model, conditions = {}) {
        return new Promise((resolve, reject) => {
            model.findOne(conditions, (err, doc) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(doc)
                }
            })
        })
    },
    findPagination(model, conditions, page = 1, pageSize = 10) {
        return new Promise((resolve, reject) => {
            model.count(conditions, (err, count) => {
                if (err) {
                    reject(err);
                } else {
                    let tempModel = model.find(conditions).skip((page - 1) * pageSize).limit(pageSize);
                    tempModel.exec((err, doc) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve({
                                currentPage: page,
                                pageSize,
                                count,
                                list: doc
                            })
                        }
                    })
                }
            });
        })
    },
    add(model, data) {
        return new Promise((resolve, reject) => {
            model.create(data, (err, doc) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(doc)
                }
            })
        })
    },
    update(model, conditions, update) {
        return new Promise((resolve, reject) => {
            model.update(conditions, update, (err, doc) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(doc)
                }
            })
        })
    },
    remove(model, conditions) {
        return new Promise((resolve, reject) => {
            model.remove(conditions, (err, doc) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(doc)
                }
            })
        })
    }
};
