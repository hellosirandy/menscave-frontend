export class Comment {
  constructor(
    content: string,
    commenter: string,
    updateTime: number
  ) {
    this.content = content;
    this.commenter = commenter;
    this.updateTime = updateTime;
  }

  formatDate() {
    let date = new Date(this.updateTime);
    return `${this.processDateString(date.getMonth()+1)}/${this.processDateString(date.getDate())} ${this.processDateString(date.getHours())}:${this.processDateString(date.getMinutes())}`;
  }

  processDateString(number) {
    return number.toString().length === 2 ? number : `0${number}`;
  }
}
