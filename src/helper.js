export const formatDate = (date) => {
   // Получаем текущую дату и обнуляем время

   if (!date) return;

   const today = new Date();
   today.setHours(0, 0, 0, 0);

   // Создаем копию текущей даты для манипуляций
   const tomorrow = new Date(today);
   tomorrow.setDate(today.getDate() + 1);

   const yesterday = new Date(today);
   yesterday.setDate(today.getDate() - 1);

   // Дата на 6 дней вперед от сегодня
   const sixDaysLater = new Date(today);
   sixDaysLater.setDate(today.getDate() + 6);

   // Убираем время у входной даты
   const inputDate = new Date(date);
   inputDate.setHours(0, 0, 0, 0);

   if (inputDate.getTime() === today.getTime()) {
      return "Today";
   }

   if (inputDate.getTime() === tomorrow.getTime()) {
      return "Tomorrow";
   }

   if (inputDate.getTime() === yesterday.getTime()) {
      return "Yesterday";
   }

   if (inputDate >= today && inputDate <= sixDaysLater) {
      const daysOfWeek = [
         "Sunday",
         "Monday",
         "Tuesday",
         "Wednesday",
         "Thursday",
         "Friday",
         "Saturday",
      ];
      return daysOfWeek[inputDate.getDay()];
   }

   // Форматирование даты в формате dd.mm.yyyy
   let day = inputDate.getDate();
   let month = inputDate.getMonth() + 1;
   let year = inputDate.getFullYear();

   day = day < 10 ? "0" + day : day;
   month = month < 10 ? "0" + month : month;

   return `${day}.${month}.${year}`;
};
