//Class that get a string date on the format that the user see on front-end and
// transform in a format that can be save in database
export class DateMask {
  async execute(date: string) {
    const splitedDate = date.split('');
    const day = splitedDate[0] + splitedDate[1];
    const month = splitedDate[3] + splitedDate[4];
    const year =
      splitedDate[6] + splitedDate[7] + splitedDate[8] + splitedDate[9];
    const fullDate = year + '-' + month + '-' + day;
    return new Date(fullDate);
  }
}
