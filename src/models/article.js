export class Article {
  constructor(
    title: string,
    updateTime: number,
    category: string,
    comments: string[],
    paragraphs: any[],
  ) {
    this.title = title;
    this.updateTime = updateTime;
    this.category = category;
    this.comments = comments;
    this.paragraphs = paragraphs;
  }

  formatDate() {
    let date = new Date(this.updateTime);
    return `${this.processDateString(date.getMonth()+1)}/${this.processDateString(date.getDate())} ${this.processDateString(date.getHours())}:${this.processDateString(date.getMinutes())}`;
  }

  processDateString(number) {
    return number.toString().length === 2 ? number : `0${number}`;
  }
}
