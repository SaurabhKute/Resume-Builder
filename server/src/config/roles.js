const allRoles = {
  user: [],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

export default {
  roles,
  roleRights,
};
