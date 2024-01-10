const { people } = require("../data");
const response = require("../utils/response");
const Validate = require("../utils/validate");

module.exports = class PeopleServices {
  constructor() {
    this.people = people;
    this.validate = new Validate();
  }

  add(
    {
      id,
      name,
      gender,
      birthDate,
      placeOfBirth,
      provinceId,
      cityId,
      districtId,
    },
    day,
    hour,
    provinceName,
    cityName,
    distictName
  ) {
    console.log("Sedang membuat data kependudukan");
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (this.validate.isExistData(this.people, id)) {
          return reject(
            response.error(
              400,
              "Gagal Membuat data kependudukan id penduduk sudah terdaftar"
            )
          );
        }

        if (!this.validate.workDay(day)) {
          return reject(
            response.error(400, "Layanan Pembuatan KTP hanya Senin-Jumat")
          );
        }

        if (!this.validate.workHours(hour)) {
          return reject(
            response.error(400, "Layanan Pembuatan KTP Sudah tutup")
          );
        }

        const nik = this.generateNIK(
          provinceId,
          cityId,
          districtId,
          gender,
          birthDate
        );

        if (nik.length < 1 || nik.length > 16) {
          return reject(
            response.error(400, "Gagal buat KTP, NIK lebih besar dari 16 digit")
          );
        }

        const isExistNik = this.people.find((data) => data.nik === nik);

        if (isExistNik) {
          return reject(
            response.error(400, "Gagal Bikin KTP, NIK sudah terdaftar!")
          );
        }

        const data = {
          id,
          nik,
          nama: name,
          jenisKelamin: gender,
          tempatTanggalLahir: `${placeOfBirth}, ${birthDate}`,
          provinsi: provinceName,
          kabupatenKota: cityName,
          kecamatan: distictName,
        };

        this.people.push(data);

        return resolve(
          response.successWithData(201, "Berhasil Membuat KTP", data)
        );
      }, 5000);
    });
  }

  getAll() {
    console.log("Sedang mencari data penduduk");

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!this.people.length) {
          return reject(
            response.error(404, "Belum ada data penduduk yang terdaftar")
          );
        }

        return resolve(
          response.successWithData(
            200,
            "Berhasil mendapatkan data penduduk",
            this.people
          )
        );
      }, 1000);
    });
  }

  generateNIK(provinceId, cityId, districtId, gender, birthDate) {
    let birthDateCode;
    const birthDateFormat = birthDate.split("-");
    const randomNumber = Math.floor(1000 + Math.random() * 8000);

    if (gender.toLowerCase() === "laki-laki") {
      birthDateCode = `${birthDateFormat[0]}${
        birthDateFormat[1]
      }${birthDateFormat[2].slice(2, 4)}`;
    } else if (gender.toLowerCase() === "perempuan") {
      birthDateCode = `${Number(birthDateFormat[0]) + 40}${
        birthDateFormat[1]
      }${birthDateFormat[2].slice(2, 4)}`;
    }

    return provinceId + cityId + districtId + birthDateCode + randomNumber;
  }
};
