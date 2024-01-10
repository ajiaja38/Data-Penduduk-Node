module.exports = class Validate {
  constructor() {}

  workHours(hours) {
    if (hours >= 8 && hours <= 14) {
      return true;
    }

    return false;
  }

  workDay(day) {
    const listDay = ["senin", "selasa", "rabu", "kamis", "jumat"];

    const isWorkDay = listDay
      .map((data) => data.toLowerCase())
      .includes(day.toLowerCase());

    if (isWorkDay) {
      return true;
    }

    return false;
  }

  isExistData(data, id) {
    return data.find((item) => item.id === id);
  }
};
