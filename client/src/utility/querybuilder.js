// Update query key field with new conditions or create it if it doesn't exist
module.exports.addOrUpdateQuery = (existingQuery, key, conditions) => {
  if (!existingQuery) {
    existingQuery = { filter: {} };
  }
  if (!("filter" in existingQuery)) {
    existingQuery.filter = {};
  }
  existingQuery.filter[key] = conditions;
  return existingQuery;
};

// Remove key field from query
module.exports.removeFromQuery = (existingQuery, key) => {
  try {
    delete existingQuery.filter[key];
  } catch (err) {
    console.log(err);
  }
  return existingQuery;
};
