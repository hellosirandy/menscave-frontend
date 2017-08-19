export class Article {
  constructor(
    title: string,
    updateTime: number,
    createTime: number,
    category: string,
    comments: string[],
    paragraphs: any[],
    previewKey: string,
  ) {
    this.title = title;
    this.updateTime = updateTime;
    this.createTime = createTime;
    this.category = category;
    this.comments = comments;
    this.paragraphs = paragraphs;
    this.previewKey = previewKey;
  }

  formatDate() {
    let date = new Date(this.createTime);
    return `${this.processDateString(date.getMonth()+1)}/${this.processDateString(date.getDate())} ${this.processDateString(date.getHours())}:${this.processDateString(date.getMinutes())}`;
  }

  processDateString(number) {
    return number.toString().length === 2 ? number : `0${number}`;
  }
}
