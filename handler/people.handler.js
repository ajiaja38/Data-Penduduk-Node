const PeopleModel = require("../model/people.model");
const CityServices = require("../services/city.service");
const DistrictServices = require("../services/district.service");
const PeopleServices = require("../services/people.service");
const ProvinceService = require("../services/province.service");

module.exports = class PeopleHandler {
  constructor() {
    this.service = new PeopleServices();
    this.provinceService = new ProvinceService();
    this.cityService = new CityServices();
    this.districtService = new DistrictServices();
  }

  async run() {
    await this.addHandler(
      "01",
      "M. Aji Perdana",
      "Laki-laki",
      "24-09-2001",
      "Gisting",
      "18",
      "06",
      "13",
      "Rabu",
      8
    );
    await this.addHandler(
      "02",
      "Frasiska Risma Yolanda",
      "Perempuan",
      "21-07-2001",
      "Gading Rejo",
      "18",
      "05",
      "14",
      "Rabu",
      8
    );
    await this.getAllHandler();
  }

  async addHandler(
    id,
    name,
    gender,
    birthDate,
    placeOfBirth,
    provinceId,
    cityId,
    districtId,
    day,
    hour
  ) {
    try {
      const province = await this.provinceService.getById(provinceId);
      const city = await this.cityService.getById(cityId);
      const distict = await this.districtService.getById(districtId);
      const people = new PeopleModel(
        id,
        name,
        gender,
        birthDate,
        placeOfBirth,
        province.data.id,
        city.data.id,
        distict.data.id
      );
      const result = await this.service.add(
        people,
        day,
        hour,
        province.data.name,
        city.data.name,
        distict.data.name
      );
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  async getAllHandler() {
    try {
      const result = await this.service.getAll();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
};
