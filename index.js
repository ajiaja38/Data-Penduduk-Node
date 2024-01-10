const CityHandler = require("./handler/city.handler");
const DistrictHandler = require("./handler/district.handler");
const PeopleHandler = require("./handler/people.handler");
const ProvinceHandler = require("./handler/province.handler");

const main = async () => {
  const provinceHandler = new ProvinceHandler();
  const cityHandler = new CityHandler();
  const districtHandler = new DistrictHandler();
  const peopleHandler = new PeopleHandler();

  await provinceHandler.run();
  await cityHandler.run();
  await districtHandler.run();
  await peopleHandler.run();
};

main().catch((error) => {
  console.log(error);
});
