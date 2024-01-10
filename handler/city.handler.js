const CityServices = require("../services/city.service");
const ProvinceService = require("../services/province.service");

module.exports = class CityHandler {
  constructor() {
    this.service = new CityServices();
    this.provinceService = new ProvinceService();
  }

  async run() {
    await this.getAllHandler();
    await this.addHandler("06", "Tanggamus", "18");
    await this.getAllHandler();
    await this.addHandler("05", "Pringsewu", "18");
    await this.addHandler("07", "Bandung", "19");
    await this.getAllHandler();
    await this.getAllByProvinceHandler("17");
    await this.getAllByProvinceHandler("18");
    await this.getAllByProvinceHandler("19");
    await this.getByIdHandler("9");
    await this.getByIdHandler("06");
    await this.updateByIdHandler("07", "Garut", "19");
    await this.getByIdHandler("07");
    await this.updateByIdHandler("07", "Bandar Lampung", "18");
    await this.getAllByProvinceHandler("18");
    await this.getAllHandler();
    await this.deleteByIdHandler("07");
    await this.getByIdHandler("07");
    await this.getAllHandler();
  }

  async addHandler(id, name, idProvince) {
    try {
      const province = await this.provinceService.getById(idProvince);
      const result = await this.service.add(id, name, province.data.id);
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

  async getAllByProvinceHandler(idProvince) {
    try {
      const result = await this.service.getAllByIdProvince(idProvince);
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

  async updateByIdHandler(id, name, idProvince) {
    try {
      const result = await this.service.update(id, name, idProvince);
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
