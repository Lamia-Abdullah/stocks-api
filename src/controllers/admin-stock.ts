export function upsertadminController(admins: any[], new_admin: any) {
    const adminsIndex = admins.findIndex((el) => el.id === new_admin.id);
    if (adminsIndex === -1) {
      admins.push(new_admin);
    } else {
      admins[adminsIndex] = {
        ...admins[adminsIndex],
        ...new_admin,
      };
    }
    return admins;
  }