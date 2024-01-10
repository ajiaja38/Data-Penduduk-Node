const CityServices = require("../services/city.service");
const DistrictServices = require("../services/district.service");

module.exports = class DistrictHandler {
  constructor() {
    this.service = new DistrictServices();
    this.cityServices = new CityServices();
  }

  async run() {
    await this.getAllHandler();
    await this.addHandler("13", "Sumberejo", "06");
    await this.getAllHandler();
    await this.addHandler("14", "Wates Selatan", "05");
    await this.addHandler("12", "Gunung Alip", "06");
    await this.addHandler("15", "Pajarisuk", "05");
    await this.addHandler("15", "Pajar sadboy", "00");
    await this.getAllHandler();
    await this.getAllByCityHandler("06");
    await this.getAllByCityHandler("05");
    await this.getAllByCityHandler("19");
    await this.getByIdHandler("13");
    await this.getByIdHandler("14");
    await this.getByIdHandler("12");
    await this.getByIdHandler("98");
    await this.updateByIdHandler("15", "Pagelaran", "05");
    await this.getByIdHandler("15");
    await this.updateByIdHandler("15", "Gading Rejo", "02");
    await this.getAllByCityHandler("05");
    await this.getAllHandler();
    await this.deleteByIdHandler("15");
    await this.getByIdHandler("15");
    await this.getAllHandler();
  }

  async addHandler(id, name, idCity) {
    try {
      const city = await this.cityServices.getById(idCity);
      const result = await this.service.add(id, name, city.data.id);
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

  async getAllByCityHandler(idCity) {
    try {
      const result = await this.service.getAllByIdCity(idCity);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  async getByIdHandler(id) {
    try {
      const result = await this.service.getById(id);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  async updateByIdHandler(id, name, idCity) {
    try {
      const result = await this.service.update(id, name, idCity);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteByIdHandler(id) {
    try {
      const result = await this.service.delete(id);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
};
