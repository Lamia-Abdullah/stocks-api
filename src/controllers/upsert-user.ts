export function upsertuserController (users: any[], new_user: any) {
	const userIndex = users.findIndex((el) => el.id === new_user.id);
	if (userIndex === -1) {
		users.push(new_user);
	} else {
		users[userIndex] = {
			...users[userIndex],
			...new_user,
		};
	}
	return users;
}