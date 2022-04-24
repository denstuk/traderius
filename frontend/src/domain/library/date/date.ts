export const getWelcomeMessageBasedOnTime = (): string => {
	const hour = new Date().getHours();
	if (hour >= 6 && hour < 12) return "Доброе утро";
	if (hour >= 12 && hour < 18) return "Добрый день";
	return "Добрый вечер";
};
