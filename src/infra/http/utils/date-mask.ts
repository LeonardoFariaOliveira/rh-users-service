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

  executeInverse(date: Date) {
    const stringDate = date.toISOString();
    const splitedDate = stringDate.split('');
    const day = splitedDate[8] + splitedDate[9];
    const month = splitedDate[5] + splitedDate[6];
    const year =
      splitedDate[0] + splitedDate[1] + splitedDate[2] + splitedDate[3];
    const fullDate = day + '-' + month + '-' + year;
    return fullDate;
  }
}
