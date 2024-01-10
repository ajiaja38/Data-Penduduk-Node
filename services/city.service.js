const { city } = require("../data");
const response = require("../utils/response");
const Validate = require("../utils/validate");

module.exports = class CityServices {
  constructor() {
    this.city = city;
    this.validate = new Validate();
  }

  add(id, name, idProvince) {
    console.log("Sedang menambahkan data Kabupaten/Kota");

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const isExist = this.validate.isExistData(this.city, id);

        if (isExist) {
          return reject(
            response.error(400, "Gagal menambahkan data, id sudah terdaftar")
          );
        }

        const data = {
          id,
          name,
          idProvince,
        };

        this.city.push(data);

        return resolve(
          response.success(
            201,
            `Berhasil menambahkan data Kabupaten/Kota ${data.name}`
          )
        );
      }, 1000);
    });
  }

  getAll() {
    console.log("Sedang mencari data Kabupaten/Kota");

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!this.city.length) {
          return reject(
            response.error(404, "Belum ada Kabupaten/Kota yang terdaftar")
          );
        }

        return resolve(
          response.successWithData(
            200,
            "Berhasil Mendapatkan data kabupaten/kota",
            this.city
          )
        );
      }, 1000);
    });
  }

  getAllByIdProvince(idProvince) {
    console.log("Sedang mencari data Kabupaten/Kota");

    return new Promise((resolve, reject) => {
      const result = this.city.filter((data) => data.idProvince === idProvince);

      if (!result.length) {
        return reject(
          response.error(
            404,
            `Belum ada kabupaten/kota pada provinsi ${idProvince}`
          )
        );
      }

      return resolve(
        response.successWithData(
          200,
          "Berhasil Mendapatkan data kabupaten/kota",
          result
        )
      );
    });
  }

  getById(id) {
    console.log("Sedang mencari berdasarkan id kabupaten/kota");

    return new Promise((resolve, reject) => {
      const result = this.validate.isExistData(this.city, id);

      if (!result) {
        return reject(
          response.error(
            404,
            "Gagal mendapatkan data kabupaten/kota, Id tidak terdaftar"
          )
        );
      }

      return resolve(
        response.successWithData(
          200,
          "Berhasil mendapatkan data kabupaten/kota",
          result
        )
      );
    });
  }

  update(id, name, idProvince) {
    console.log("Sedang mengupdate kabupaten/kota");

    return new Promise((resolve, reject) => {
      const data = this.validate.isExistData(this.city, id);

      if (!data) {
        return reject(
          response.error(
            404,
            "Gagal update data kabupaten/kota, id tidak terdaftar"
          )
        );
      }

      data.name = name;
      data.idProvince = idProvince;

      return resolve(
        response.success(
          200,
          `Berhasil Update data kabupaten/kota ${data.name}`
        )
      );
    });
  }

  delete(id) {
    console.log("sedang delete data kabupaten/kota");

    return new Promise((resolve, reject) => {
      if (!this.validate.isExistData(this.city, id)) {
        return reject(
          response.error(
            404,
            "Gagal hapus data kabupaten/kota, id tidak terdaftar"
          )
        );
      }

      const filteredCity = this.city.filter((data) => data.id !== id);
      console.log(filteredCity);

      this.city = filteredCity;

      return resolve(
        response.success(200, "Berhasil hapus data kabupaten/kota")
      );
    });
  }
};
