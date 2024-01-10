const { province } = require("../data");
const response = require("../utils/response");
const Validate = require("../utils/validate");

module.exports = class ProvinceService {
  constructor() {
    this.province = province;
    this.validate = new Validate();
  }

  add({ id, name }) {
    console.log("Sedang membuat data provinsi");

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const isExist = this.validate.isExistData(this.province, id);

        if (isExist) {
          return reject(
            response.error(
              400,
              "Gagal menambahkan data provinsi, provinsi sudah terdaftar!"
            )
          );
        }

        const data = {
          id,
          name,
        };

        this.province.push(data);

        return resolve(
          response.success(201, "Berhasil menambahkan data provinsi")
        );
      }, 1000);
    });
  }

  getAll() {
    console.log("sedang mencari seluruh data provinsi");

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!this.province.length) {
          return reject(
            response.error(404, "Belum ada provinsi yang terdaftar")
          );
        }

        return resolve(
          response.successWithData(
            200,
            "Berhasil mendapatkan data provinsi",
            this.province
          )
        );
      }, 1000);
    });
  }

  getById(id) {
    console.log("Sedang mencari data provisi");

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const result = this.validate.isExistData(this.province, id);

        if (!result) {
          return reject(
            response.error(
              404,
              "data provinsi tidak ditemukan, id tidak terdaftar!"
            )
          );
        }

        return resolve(
          response.successWithData(
            200,
            "Berhasil Mendapatkan data provinsi",
            result
          )
        );
      }, 1000);
    });
  }

  update(id, name) {
    console.log("Sedang mengupdate data provinsi");

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const result = this.validate.isExistData(this.province, id);

        if (!result) {
          return reject(
            response.error(404, "Gagal Update Provinsi id tidak ditemukan")
          );
        }

        result.name = name;

        return resolve(response.success(200, "Berhasil update data provinsi"));
      }, 1000);
    });
  }

  delete(id) {
    console.log("Sedang menghapus data provinsi");

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const isExist = this.validate.isExistData(this.province, id);

        if (!isExist) {
          return reject(
            response.error(404, "Gagal Hapus Provinsi, id tidak ditemukan")
          );
        }

        const filterProvince = this.province.filter((data) => data.id !== id);

        this.province = filterProvince;

        return resolve(response.success(200, "Berhasil hapus data provinsi"));
      }, 1000);
    });
  }
};
