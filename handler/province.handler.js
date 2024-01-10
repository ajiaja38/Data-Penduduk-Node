const ProvinceModel = require("../model/province.schema");
const ProvinceService = require("../services/province.service");

module.exports = class ProvinceHandler {
  constructor() {
    this.service = new ProvinceService();
  }

  async run() {
    try {
      await this.getAllHandler();
      await this.addProvinceHandler("18", "Lampung");
      await this.getAllHandler();
      await this.getByIdHandler("14");
      await this.getByIdHandler("18");
      await this.addProvinceHandler("19", "Banten");
      await this.getAllHandler();
      await this.getByIdHandler("19");
      await this.updateByIdHandler("19", "Jawa Barat");
      await this.getAllHandler();
      await this.addProvinceHandler("20", "Jawa Tengah");
      await this.getAllHandler();
      await this.deleteByIdHandler("21");
      await this.deleteByIdHandler("20");
      await this.getAllHandler();
    } catch (error) {
      console.log(error);
    }
  }

  async addProvinceHandler(id, name) {
    try {
      const province = new ProvinceModel(id, name);
      const result = await this.service.add(province);
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

  async getByIdHandler(id) {
    try {
      const result = await this.service.getById(id);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  async updateByIdHandler(id, name) {
    try {
      const result = await this.service.update(id, name);
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
