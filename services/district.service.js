const { district } = require("../data");
const response = require("../utils/response");
const Validate = require("../utils/validate");

module.exports = class DistrictServices {
  constructor() {
    this.distict = district;
    this.validate = new Validate();
  }

  add(id, name, idCity) {
    console.log("Sedang menambahkan data Kecamatan");

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const isExist = this.validate.isExistData(this.distict, id);

        if (isExist) {
          return reject(
            response.error(400, "Gagal menambahkan data, id sudah terdaftar")
          );
        }

        const data = {
          id,
          name,
          idCity,
        };

        this.distict.push(data);

        return resolve(
          response.success(
            201,
            `Berhasil menambahkan data Kecamatan ${data.name}`
          )
        );
      }, 1000);
    });
  }

  getAll() {
    console.log("Sedang mencari data Kecamatan");

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!this.distict.length) {
          return reject(
            response.error(404, "Belum ada Kecamatan yang terdaftar")
          );
        }

        return resolve(
          response.successWithData(
            200,
            "Berhasil Mendapatkan data Kecamatan",
            this.distict
          )
        );
      }, 1000);
    });
  }

  getAllByIdCity(idCity) {
    console.log("Sedang mencari data Kecamatan");

    return new Promise((resolve, reject) => {
      const result = this.distict.filter((data) => data.idCity === idCity);

      if (!result.length) {
        return reject(
          response.error(404, `Belum ada Kecamatan pada provinsi ${idCity}`)
        );
      }

      return resolve(
        response.successWithData(
          200,
          "Berhasil Mendapatkan data Kecamatan",
          result
        )
      );
    });
  }

  getById(id) {
    console.log("Sedang mencari berdasarkan id Kecamatan");

    return new Promise((resolve, reject) => {
      const result = this.validate.isExistData(this.distict, id);

      if (!result) {
        return reject(
          response.error(
            404,
            "Gagal mendapatkan data Kecamatan, Id tidak terdaftar"
          )
        );
      }

      return resolve(
        response.successWithData(
          200,
          "Berhasil mendapatkan data Kecamatan",
          result
        )
      );
    });
  }

  update(id, name, idCity) {
    console.log("Sedang mengupdate Kecamatan");

    return new Promise((resolve, reject) => {
      const data = this.validate.isExistData(this.distict, id);

      if (!data) {
        return reject(
          response.error(404, "Gagal update data Kecamatan, id tidak terdaftar")
        );
      }

      data.name = name;
      data.idCity = idCity;

      return resolve(
        response.success(200, `Berhasil Update data Kecamatan ${data.name}`)
      );
    });
  }

  delete(id) {
    console.log("sedang delete data Kecamatan");

    return new Promise((resolve, reject) => {
      if (!this.validate.isExistData(this.distict, id)) {
        return reject(
          response.error(404, "Gagal hapus data Kecamatan, id tidak terdaftar")
        );
      }

      const filteredCity = this.distict.filter((data) => data.id !== id);
      console.log(filteredCity);

      this.distict = filteredCity;

      return resolve(response.success(200, "Berhasil hapus data Kecamatan"));
    });
  }
};
