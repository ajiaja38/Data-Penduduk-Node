module.exports = class PeopleModel {
  constructor(
    id,
    name,
    gender,
    birthDate,
    placeOfBirth,
    provinceId,
    cityId,
    districtId
  ) {
    this.id = id;
    this.name = name;
    this.nik = "";
    this.gender = gender;
    this.birthDate = birthDate;
    this.placeOfBirth = placeOfBirth;
    this.provinceId = provinceId;
    this.cityId = cityId;
    this.districtId = districtId;
  }
};
