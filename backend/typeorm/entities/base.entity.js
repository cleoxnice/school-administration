const { timestampToString } = require("./transformer/timestamp-to-string");

const baseEntity = {
  createdAt: {
    type: "timestamp",
    createDate: true,
    select: false,
    transformer: timestampToString,
  },
  updatedAt: {
    type: "timestamp",
    updateDate: true,
    select: false,
    transformer: timestampToString,
  },
  deletedAt: {
    type: "timestamp",
    deleteDate: true,
    select: false,
    transformer: timestampToString,
  },
};

module.exports = { baseEntity };
